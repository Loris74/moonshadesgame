<?php 
    require("application.php");
    
    if ($_POST["valaszolt"] == 0) {
        $iid = $db->q("INSERT INTO kerdoiv_valaszok (felhasznalo_id,valaszolt,mikor) VALUES (?,?,NOW())" , array($_SESSION["felhasznalo_id"],0));
    }
    if ($_POST["valaszolt"] == 1) {
        $iid = $db->q("INSERT INTO kerdoiv_valaszok (felhasznalo_id,valaszolt,mikor,valasz1,valasz2,valasz3,valasz4,valasz_egyeb) VALUES (?,?,NOW(),?,?,?,?,?)" , array($_SESSION["felhasznalo_id"],1,$_POST["valasz1"],$_POST["valasz2"],$_POST["valasz3"],$_POST["valasz4"],$_POST["valasz_egyeb"]));
    }

?>