<?php 
    require("application.php");
    
    if ($_SESSION["belepve"] == 1) {
        // csak belepett user indithat!
        
        $save = new SaveGame($_SESSION["felhasznalo_id"]);
        $adatok = $save->betoltes($_POST["id"]);
        
        if ($_POST["mit"] == "karakterek") {
            echo $adatok["karakterek"];    
        }
        if ($_POST["mit"] == "ellensegek") {
            echo $adatok["ellensegek"];    
        }
        if ($_POST["mit"] == "terkepek") {
            echo $adatok["terkepek"];    
        }
        if ($_POST["mit"] == "npck") {
            echo $adatok["npck"];    
        }
        
    }

?>