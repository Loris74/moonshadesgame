<?php 
    require("application.php");
    
    $mit = date("Y-m-d H:i:s") . ": " . $_POST["mit"] . "\n";
    
    file_put_contents(DEF_DIR . "log/mozgas_". $_SESSION["felhasznalo_id"] .".log",$mit,FILE_APPEND);
    
    
?>