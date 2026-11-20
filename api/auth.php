<?php
require_once __DIR__ . '/../config/db.php';
header('Content-Type: application/json');

$action = $_GET['action'] ?? $_POST['action'] ?? 'whoami';

if ($action === 'whoami') {
    echo json_encode([
        'ok' => true,
        'role' => current_role(),
        'user_label' => ucfirst(current_role()),
    ]);
    exit;
}

if ($action === 'switch_user') {
    $role = strtolower(trim($_POST['role'] ?? 'admin'));
    if (!in_array($role, ['admin', 'user', 'guest'], true)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Invalid role selected']);
        exit;
    }
    $_SESSION['role'] = $role;
    echo json_encode([
        'ok' => true,
        'role' => $role,
        'user_label' => ucfirst($role),
    ]);
    exit;
}

if ($action === 'list_users') {
    echo json_encode([
        'ok' => true,
        'users' => [
            ['role' => 'admin', 'name' => 'Mikee (Admin)', 'desc' => 'Full read/write/execute & disk config'],
            ['role' => 'user', 'name' => 'Student User', 'desc' => 'Assigned file/folder permissions'],
            ['role' => 'guest', 'name' => 'Guest', 'desc' => 'Restricted / view-only access'],
        ],
    ]);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Unsupported auth action']);