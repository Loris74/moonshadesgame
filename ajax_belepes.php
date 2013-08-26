<?php 
    require("application.php");
    
    $sor = $db->fr("SELECT * FROM felhasznalok WHERE email = ? AND jelszo = ? AND statusz = 1" , array(
        $_POST["email"],
        $_POST["jelszo"]
    ));
    if($db->sorok_szama()) {
        $_SESSION["belepve"] = 1;
        $_SESSION["felhasznalo_id"] = $sor["felhasznalo_id"];
        echo "1";
        exit;
    } else {
        echo "0";
        exit;
    }
    
?>