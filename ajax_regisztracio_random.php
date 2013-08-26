<?php 
    require("application.php");

    $_POST["email"] = uniqid();
    $_POST["jelszo"] = uniqid();
    
    $iid = $db->q("INSERT INTO felhasznalok (email,jelszo,regisztracio_ideje) VALUES (?,?,NOW())" , array(
        $_POST["email"],
        $_POST["jelszo"]
    ));
    
    // be is leptetjuk
    $_SESSION["belepve"] = 1;
    $_SESSION["felhasznalo_id"] = $iid;
    
?>