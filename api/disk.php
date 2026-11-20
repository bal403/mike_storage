<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? $_POST['action'] ?? 'bitmap';

if ($action === 'bitmap') {
    $disk = get_disk_state($conn);
    $freeBlocks = count(array_filter($disk['blocks'], fn($b) => (int)$b === 0));
    $usedBlocks = $disk['total'] - $freeBlocks;

    $indexBlocks = [];
    $resIdx = $conn->query("SELECT index_block FROM files WHERE is_trashed = 0 AND allocation_type = 'indexed' AND index_block IS NOT NULL");
    if ($resIdx) {
        while ($r = $resIdx->fetch_assoc()) {
            $indexBlocks[] = (int)$r['index_block'];
        }
    }

    echo json_encode([
        'ok' => true,
        'total' => $disk['total'],
        'block_kb' => $disk['block_kb'],
        'free_blocks' => $freeBlocks,
        'used_blocks' => $usedBlocks,
        'total_kb' => $disk['total'] * $disk['block_kb'],
        'used_kb' => $usedBlocks * $disk['block_kb'],
        'free_kb' => $freeBlocks * $disk['block_kb'],
        'index_blocks' => $indexBlocks,
        'blocks' => $disk['blocks'],
    ]);
    exit;
}

if ($action === 'stats') {
    $disk = get_disk_state($conn);
    $free = count(array_filter($disk['blocks'], fn($b) => (int)$b === 0));
    $used = $disk['total'] - $free;
    echo json_encode([
        'ok' => true,
        'total_blocks' => $disk['total'],
        'used_blocks' => $used,
        'free_blocks' => $free,
        'block_size_kb' => $disk['block_kb'],
        'total_capacity_kb' => $disk['total'] * $disk['block_kb'],
        'used_space_kb' => $used * $disk['block_kb'],
        'available_space_kb' => $free * $disk['block_kb'],
    ]);
    exit;
}

if ($action === 'configure') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin permission required to configure virtual disk']);
        exit;
    }

    $totalBlocks = (int)($_POST['total_blocks'] ?? 64);
    $blockKb = (int)($_POST['block_size_kb'] ?? 4);

    if ($totalBlocks < 16 || $totalBlocks > 256 || $blockKb < 1 || $blockKb > 64) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Total blocks must be 16–256 and block size 1–64 KB']);
        exit;
    }

    $newBitmap = json_encode(array_fill(0, $totalBlocks, 0));
    $stmt = $conn->prepare("UPDATE disk_config SET total_blocks = ?, block_size_kb = ?, bitmap_json = ? WHERE id = 1");
    $stmt->bind_param('iis', $totalBlocks, $blockKb, $newBitmap);
    $stmt->execute();

    $conn->query("DELETE FROM shares WHERE resource_type = 'file'");
    $conn->query("DELETE FROM files");

    echo json_encode([
        'ok' => true,
        'total_blocks' => $totalBlocks,
        'block_size_kb' => $blockKb,
    ]);
    exit;
}

if ($action === 'blocks_of') {
    $fileId = (int)($_GET['file_id'] ?? 0);
    $stmt = $conn->prepare("SELECT id, filename, size_kb, allocation_type, allocated_blocks_json, index_block FROM files WHERE id = ?");
    $stmt->bind_param('i', $fileId);
    $stmt->execute();
    $file = $stmt->get_result()->fetch_assoc();

    if (!$file) {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'File not found']);
        exit;
    }

    echo json_encode([
        'ok' => true,
        'file' => $file,
        'blocks' => json_decode($file['allocated_blocks_json'] ?? '[]', true) ?: [],
    ]);
    exit;
}

if ($action === 'reset') {
    if (current_role() !== 'admin') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Admin only']);
        exit;
    }
    $disk = get_disk_state($conn);
    save_bitmap($conn, array_fill(0, $disk['total'], 0));
    $conn->query("DELETE FROM files");
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Unsupported disk action']);