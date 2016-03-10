<?php
require_once('../db-init.php');

$brand = $_GET['brand'];

$sql = <<<SQLEND
SELECT Indication FROM medicine WHERE brand = (SELECT PrimaryKey FROM brand WHERE Brand = :brand) LIMIT 1;
SQLEND;

$query = $db->prepare("$sql");
$query->bindValue(':brand', $brand, PDO::PARAM_STR);
$query->execute();

if ($query->rowCount() >= 1) {
    $rows = array();
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $row['Indication'];
    }
    
    echo json_encode($rows);
} else {
    echo null;
}

?>