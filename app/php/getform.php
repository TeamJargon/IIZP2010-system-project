<?php
require_once('../../db-init.php');

if (isset($_GET['brand'])) {
    $brand = $_GET['brand'];
}

$sql = <<<SQLEND
SELECT Form FROM form WHERE PrimaryKey = ANY (SELECT Form FROM medicine WHERE Brand = (SELECT PrimaryKey FROM brand WHERE Brand = :brand));
SQLEND;

$query = $db->prepare("$sql");
$query->bindValue(':brand', $brand, PDO::PARAM_STR);
$query->execute();

if ($query->rowCount() >= 1) {
    $rows = array();
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $row['Form'];
    }
    
    echo json_encode($rows);
} else {
    echo null;
}

?>