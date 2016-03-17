<?php
require_once('../../db-init.php');

if (isset($_GET['category'])) {
    $category = $_GET['category'];
}

$sql = <<<SQLEND
SELECT Brand FROM brand WHERE PrimaryKey = ANY (SELECT Brand FROM medicine WHERE Classification = (SELECT PrimaryKey FROM classification WHERE Classification = :category));
SQLEND;

$query = $db->prepare("$sql");
$query->bindValue(':category', $category, PDO::PARAM_STR);
$query->execute();

if ($query->rowCount() >= 1) {
    $rows = array();
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        $rows[] = $row['Brand'];
    }
    
    echo json_encode($rows);
} else {
    echo null;
}

?>