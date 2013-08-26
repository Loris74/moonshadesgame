<?php 
    require("application.php");

    if (!helyes_email($_POST["email"])) {
        //echo "2";
        //exit;
    }
    
    if ($_POST["email"] == "" OR $_POST["jelszo"] == "" OR $_POST["jelszo2"] == "") {
        echo "3";
        exit;
    }
    
    $sor = $db->f("SELECT * FROM felhasznalok WHERE email = ?" , array($_POST["email"]));
    
    
    
    
    if($sor["sorok_szama"] == 0) {
        $db->q("INSERT INTO felhasznalok (email,jelszo,regisztracio_ideje) VALUES (?,?,NOW())" , array(
            $_POST["email"],
            $_POST["jelszo"]
        ));
        
        echo "1";
    } else {
        echo "0";
    }
    
?>