<?php
require_once('../../db-init.php');

$sql = <<<SQLEND
SELECT COUNT(*) FROM brand
SQLEND;

$query = $db->prepare("$sql");
$query->execute();

if ($query->rowCount() >= 1) {
    $rows = array();
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $row['COUNT(*)'];
    }
    
    echo json_encode($rows);
} else {
    echo null;
}

?>