<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

function build_dir_path(mysqli $conn, int $dirId): string {
    $parts = [];
    $curr = $dirId;
    $guard = 0;

    while ($curr && $curr > 0 && $guard < 50) {
        $guard++;
        $stmt = $conn->prepare("SELECT id, name, parent_id, is_root FROM directories WHERE id = ?");
        $stmt->bind_param('i', $curr);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        if (!$row) break;
        if ((int)$row['is_root'] === 1) break;
        array_unshift($parts, $row['name']);
        $curr = $row['parent_id'] !== null ? (int)$row['parent_id'] : 0;
    }

    return '/' . implode('/', $parts);
}

if ($action === 'tree') {
    $res = $conn->query("SELECT id, name, parent_id, is_root, is_public, owner_role FROM directories WHERE is_trashed = 0 ORDER BY is_root DESC, name ASC");
    $tree = [];
    while ($row = $res->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['parent_id'] = $row['parent_id'] !== null ? (int)$row['parent_id'] : null;
        $row['is_root'] = (int)$row['is_root'];
        $row['is_public'] = (int)$row['is_public'];
        $tree[] = $row;
    }
    echo json_encode(['ok' => true, 'tree' => $tree]);
    exit;
}

if ($action === 'list') {
    $dirId = (int)($_GET['dir_id'] ?? 1);
    if ($dirId <= 0) $dirId = 1;

    $stmtDir = $conn->prepare("SELECT id, name, parent_id, is_root, is_public, owner_role, created_at, updated_at FROM directories WHERE id = ? AND is_trashed = 0");
    $stmtDir->bind_param('i', $dirId);
    $stmtDir->execute();
    $dirInfo = $stmtDir->get_result()->fetch_assoc();
    if (!$dirInfo) {
        $dirId = 1;
        $dirInfo = $conn->query("SELECT id, name, parent_id, is_root, is_public, owner_role, created_at, updated_at FROM directories WHERE id = 1")->fetch_assoc();
    }

    $path = build_dir_path($conn, $dirId);

    $stmtSub = $conn->prepare("SELECT id, name, parent_id, is_public, owner_role, created_at, updated_at FROM directories WHERE parent_id = ? AND is_trashed = 0 ORDER BY name ASC");
    $stmtSub->bind_param('i', $dirId);
    $stmtSub->execute();
    $subRes = $stmtSub->get_result();
    $directories = [];
    while ($d = $subRes->fetch_assoc()) {
        $d['id'] = (int)$d['id'];
        $d['parent_id'] = (int)$d['parent_id'];
        $d['is_public'] = (int)$d['is_public'];
        $d['location'] = $path;
        $directories[] = $d;
    }

    $stmtFiles = $conn->prepare("SELECT id, dir_id, filename, extension, size_kb, allocation_type, allocated_blocks_json, index_block, perm_admin, perm_user, perm_guest, is_public, owner_role, created_at, updated_at FROM files WHERE dir_id = ? AND is_trashed = 0 ORDER BY filename ASC");
    $stmtFiles->bind_param('i', $dirId);
    $stmtFiles->execute();
    $fRes = $stmtFiles->get_result();
    $files = [];
    while ($f = $fRes->fetch_assoc()) {
        $f['id'] = (int)$f['id'];
        $f['dir_id'] = (int)$f['dir_id'];
        $f['size_kb'] = (int)$f['size_kb'];
        $f['index_block'] = $f['index_block'] !== null ? (int)$f['index_block'] : null;
        $f['blocks'] = json_decode($f['allocated_blocks_json'] ?? '[]', true) ?: [];
        $f['location'] = $path;
        $files[] = $f;
    }

    echo json_encode([
        'ok' => true,
        'dir_id' => $dirId,
        'path' => $path,
        'directory' => $dirInfo,
        'directories' => $directories,
        'files' => $files,
    ]);
    exit;
}

if ($action === 'mkdir') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Only Admin can create directories']);
        exit;
    }
    $name = trim($_POST['name'] ?? '');
    $parentId = (int)($_POST['parent_id'] ?? 1);
    if ($name === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Folder name is required']);
        exit;
    }

    $role = current_role();
    $stmt = $conn->prepare("INSERT INTO directories (name, parent_id, is_root, is_public, is_trashed, owner_role) VALUES (?, ?, 0, 0, 0, ?)");
    $stmt->bind_param('sis', $name, $parentId, $role);
    $stmt->execute();

    echo json_encode(['ok' => true, 'id' => $conn->insert_id]);
    exit;
}

if ($action === 'rename_dir') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Only Admin can rename directories']);
        exit;
    }
    $dirId = (int)($_POST['dir_id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    if ($dirId <= 1 || $name === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Invalid directory ID or name']);
        exit;
    }
    $stmt = $conn->prepare("UPDATE directories SET name = ? WHERE id = ? AND is_root = 0");
    $stmt->bind_param('si', $name, $dirId);
    $stmt->execute();
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'rmdir') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Only Admin can move folders to trash']);
        exit;
    }
    $dirId = (int)($_POST['dir_id'] ?? 0);
    if ($dirId <= 1) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Cannot delete Root directory']);
        exit;
    }
    $stmt = $conn->prepare("UPDATE directories SET is_trashed = 1 WHERE id = ? AND is_root = 0");
    $stmt->bind_param('i', $dirId);
    $stmt->execute();
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'restore_dir') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin only']);
        exit;
    }
    $dirId = (int)($_POST['dir_id'] ?? 0);
    $stmt = $conn->prepare("UPDATE directories SET is_trashed = 0 WHERE id = ?");
    $stmt->bind_param('i', $dirId);
    $stmt->execute();
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'delete_dir_forever') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin only']);
        exit;
    }
    $dirId = (int)($_POST['dir_id'] ?? 0);
    $stmt = $conn->prepare("DELETE FROM directories WHERE id = ? AND is_root = 0");
    $stmt->bind_param('i', $dirId);
    $stmt->execute();
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'public_dir') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin only']);
        exit;
    }
    $dirId = (int)($_POST['dir_id'] ?? 0);
    $isPublic = (int)($_POST['is_public'] ?? 1) ? 1 : 0;
    $stmt = $conn->prepare("UPDATE directories SET is_public = ? WHERE id = ?");
    $stmt->bind_param('ii', $isPublic, $dirId);
    $stmt->execute();
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'list_public') {
    $dirs = [];
    $resD = $conn->query("SELECT id, name, parent_id, owner_role, created_at FROM directories WHERE is_public = 1 AND is_trashed = 0 ORDER BY name ASC");
    while ($d = $resD->fetch_assoc()) {
        $d['id'] = (int)$d['id'];
        $dirs[] = $d;
    }

    $files = [];
    $resF = $conn->query("SELECT id, dir_id, filename, extension, size_kb, allocation_type, owner_role, created_at FROM files WHERE is_public = 1 AND is_trashed = 0 ORDER BY filename ASC");
    while ($f = $resF->fetch_assoc()) {
        $f['id'] = (int)$f['id'];
        $f['size_kb'] = (int)$f['size_kb'];
        $files[] = $f;
    }

    echo json_encode(['ok' => true, 'directories' => $dirs, 'files' => $files]);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Unsupported directory action']);