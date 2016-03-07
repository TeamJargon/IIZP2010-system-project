<?php
try {
    // db-init.php
    $db = new PDO('mysql:host=178.62.246.71;dbname=drugbank_01;charset=utf8',
                  'teamj', 'ZFntr83!(55%3f');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
}
catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>