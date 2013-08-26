<?php 
    require("application.php");
    
    $terkep = $_POST["terkep"];
    
    file_put_contents(DEF_DIR . "assets/editor/". $_POST["id"]."_dungeon.moon",$terkep);
    
    
?>