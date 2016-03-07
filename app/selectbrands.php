<?php
require_once('/db-init.php');

$sql = <<<SQLEND
SELECT brand FROM brand
SQLEND;


$stmt = $db->prepare($sql);
$stmt->execute();

if ($stmt->rowCount() >= 1) {
    echo "asd";
}

echo "yasd";


?>