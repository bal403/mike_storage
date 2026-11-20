<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'mikee_virtualdrive';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
if ($conn->connect_error) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['ok' => false, 'error' => 'MySQL connection failed: ' . $conn->connect_error]);
    exit;
}

$conn->query("CREATE DATABASE IF NOT EXISTS `$DB_NAME` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$conn->select_db($DB_NAME);
$conn->set_charset('utf8mb4');

$conn->query("CREATE TABLE IF NOT EXISTS disk_config (
    id INT PRIMARY KEY DEFAULT 1,
    total_blocks INT NOT NULL DEFAULT 64,
    block_size_kb INT NOT NULL DEFAULT 4,
    bitmap_json LONGTEXT NOT NULL
)");

$conn->query("CREATE TABLE IF NOT EXISTS directories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    parent_id INT NULL,
    is_root TINYINT(1) NOT NULL DEFAULT 0,
    is_public TINYINT(1) NOT NULL DEFAULT 0,
    is_trashed TINYINT(1) NOT NULL DEFAULT 0,
    owner_role VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

$conn->query("CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dir_id INT NOT NULL DEFAULT 1,
    filename VARCHAR(160) NOT NULL,
    extension VARCHAR(24) NOT NULL DEFAULT '',
    size_kb INT NOT NULL DEFAULT 4,
    content LONGTEXT,
    allocation_type ENUM('contiguous','linked','indexed') NOT NULL DEFAULT 'contiguous',
    allocated_blocks_json TEXT NOT NULL,
    index_block INT NULL,
    perm_admin VARCHAR(3) NOT NULL DEFAULT 'rwx',
    perm_user VARCHAR(3) NOT NULL DEFAULT 'rw-',
    perm_guest VARCHAR(3) NOT NULL DEFAULT 'r--',
    is_public TINYINT(1) NOT NULL DEFAULT 0,
    is_trashed TINYINT(1) NOT NULL DEFAULT 0,
    owner_role VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

$conn->query("CREATE TABLE IF NOT EXISTS shares (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_type ENUM('file','directory') NOT NULL,
    resource_id INT NOT NULL,
    target_user VARCHAR(100) NOT NULL,
    shared_with_role VARCHAR(20) NOT NULL DEFAULT 'user',
    permission VARCHAR(3) NOT NULL DEFAULT 'r--',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)");

$resCfg = $conn->query("SELECT id FROM disk_config WHERE id = 1");
if ($resCfg && $resCfg->num_rows === 0) {
    $emptyBitmap = json_encode(array_fill(0, 64, 0));
    $stmt = $conn->prepare("INSERT INTO disk_config (id, total_blocks, block_size_kb, bitmap_json) VALUES (1, 64, 4, ?)");
    $stmt->bind_param('s', $emptyBitmap);
    $stmt->execute();
}

$resRoot = $conn->query("SELECT id FROM directories WHERE id = 1");
if ($resRoot && $resRoot->num_rows === 0) {
    $conn->query("INSERT INTO directories (id, name, parent_id, is_root, is_public, is_trashed, owner_role) VALUES (1, 'Root', NULL, 1, 0, 0, 'admin')");
    $conn->query("INSERT INTO directories (name, parent_id, is_root, is_public, is_trashed, owner_role) VALUES
        ('Documents', 1, 0, 0, 0, 'admin'),
        ('Projects', 1, 0, 0, 0, 'admin'),
        ('System', 1, 0, 0, 0, 'admin'),
        ('Public_Share', 1, 0, 1, 0, 'admin')");
}

if (!isset($_SESSION['role'])) {
    $_SESSION['role'] = 'admin';
}

function current_role(): string {
    $r = $_SESSION['role'] ?? 'admin';
    return in_array($r, ['admin', 'user', 'guest'], true) ? $r : 'admin';
}

function get_disk_state(mysqli $conn): array {
    $row = $conn->query("SELECT total_blocks, block_size_kb, bitmap_json FROM disk_config WHERE id = 1")->fetch_assoc();
    $total = (int)($row['total_blocks'] ?? 64);
    $blockKb = (int)($row['block_size_kb'] ?? 4);
    $blocks = json_decode($row['bitmap_json'] ?? '[]', true);
    if (!is_array($blocks) || count($blocks) !== $total) {
        $blocks = array_fill(0, $total, 0);
    }
    return [
        'total' => $total,
        'block_kb' => $blockKb,
        'blocks' => array_map('intval', $blocks),
    ];
}

function save_bitmap(mysqli $conn, array $blocks): void {
    $json = json_encode(array_values(array_map('intval', $blocks)));
    $stmt = $conn->prepare("UPDATE disk_config SET bitmap_json = ? WHERE id = 1");
    $stmt->bind_param('s', $json);
    $stmt->execute();
}