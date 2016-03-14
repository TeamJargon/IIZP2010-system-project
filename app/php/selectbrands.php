<?php
require_once('../db-init.php');
  
$sql = <<<SQLEND
SELECT brand FROM brand
SQLEND;

$stmt = $db->prepare("$sql");
$stmt->execute();

if ($stmt->rowCount() >= 1) {
    $rows = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $row['brand'];
    }

    echo json_encode($rows);
} else {
    echo null;
}

?>