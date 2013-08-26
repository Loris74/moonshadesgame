<?php
	//header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	//header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	//header("Cache-Control: no-store, no-cache, must-revalidate");
	//header("Cache-Control: post-check=0, pre-check=0", false);
	//header("Pragma: no-cache");
	header("Content-type: text/html; charset=utf-8");
	function defVal(&$arg_1,$arg_2)	{
		if (!isset($arg_1)) {
			$arg_1 = $arg_2;
		}
	}
    
	error_reporting(E_ALL);
    ini_set('diplay_errors',1);


    require_once("config/config.inc.php");
    

    function __autoload($class_name) {
        require "classes/class." . strtolower($class_name) . '.php';
    }
    require_once("inc/functions.inc.php");
        
    $db = new Adatbazis(DB_HOST, DB_USER, DB_USER_PW, DB_DEFDB);
    //$db->debug = 1;
    //$db->lekerdezes_log = 1;
    
	session_name("moonshades");

	session_start();
    
    if( !isset($_SESSION["belepve"]) ) {
        $_SESSION["belepve"] = 0;
    }
    
    if( !isset($_SESSION["felhasznalo_id"]) ) {
        $_SESSION["felhasznalo_id"] = 0;
    }
    
    

    
    if (!isset($_COOKIE["intro_futott_mar"])) {
        //setcookie( "intro_futott_mar", 1, strtotime( '+30 days' ) );
        
        //header("Location: intro.php");
        //exit;

    }
    
?>