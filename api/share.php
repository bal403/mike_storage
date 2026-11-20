<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? $_POST['action'] ?? 'shared_with_me';

if ($action === 'share_dir') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin only']);
        exit;
    }

    $dirId = (int)($_POST['dir_id'] ?? 0);
    $targetUser = trim($_POST['target_user'] ?? '');
    $perm = trim($_POST['permission'] ?? 'r--');

    if ($dirId <= 0 || $targetUser === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Directory ID and target user are required']);
        exit;
    }

    $sharedRole = 'user';
    $stmt = $conn->prepare("INSERT INTO shares (resource_type, resource_id, target_user, shared_with_role, permission) VALUES ('directory', ?, ?, ?, ?)");
    $stmt->bind_param('isss', $dirId, $targetUser, $sharedRole, $perm);
    $stmt->execute();

    echo json_encode(['ok' => true, 'id' => $conn->insert_id]);
    exit;
}

if ($action === 'shared_with_me') {
    $sql = "SELECT s.id, s.resource_type, s.resource_id, s.target_user, s.shared_with_role, s.permission, s.created_at,
                   d.name AS dir_name, f.filename AS filename
            FROM shares s
            LEFT JOIN directories d ON s.resource_type = 'directory' AND s.resource_id = d.id AND d.is_trashed = 0
            LEFT JOIN files f ON s.resource_type = 'file' AND s.resource_id = f.id AND f.is_trashed = 0
            ORDER BY s.id DESC";
    $res = $conn->query($sql);
    $items = [];
    while ($row = $res->fetch_assoc()) {
        $row['id'] = (int)$row['id'];
        $row['resource_id'] = (int)$row['resource_id'];
        $items[] = $row;
    }
    echo json_encode(['ok' => true, 'items' => $items]);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Unsupported share action']);