<?php
    function helyes_email($email){
        return preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email);
    }
    
    function file_merete($fajl) {
        if (file_exists($fajl)) {
            return byteConvert(filesize($fajl));    
        } else {
            return 0;
        }
        
    }
    
    function byteConvert($bytes)
    {   
        if ($bytes != 0) {
            $s = array('B', 'Kb', 'MB', 'GB', 'TB', 'PB');
            $e = floor(log($bytes)/log(1024));

            //return sprintf('%.2f '.$s[$e], ($bytes/pow(1024, floor($e))));
            return sprintf('%.0f '.$s[$e], ($bytes/pow(1024, floor($e))));
            
        } else {
            return "0 B";
        }
    }

    
    function str2int($string, $concat = true) {
        $length = strlen($string);   
        for ($i = 0, $int = '', $concat_flag = true; $i < $length; $i++) {
            if (is_numeric($string[$i]) && $concat_flag) {
                $int .= $string[$i];
            } elseif(!$concat && $concat_flag && strlen($int) > 0) {
                $concat_flag = false;
            }       
        }
       
        return (int) $int;
    }    
    
    function szam_formazas($szam) {
        $szam = str_replace(",",".",$szam);
        if (intval($szam) == $szam) {
            return number_format($szam, 0, ',', ' ');
        } else {
            return number_format($szam, 1, ',', ' ');    
        }
        
    }
    
    function honap_neve($honap) {
        if ($honap == 1) { return "január"; }
        if ($honap == 2) { return "február"; }
        if ($honap == 3) { return "március"; }
        if ($honap == 4) { return "április"; }
        if ($honap == 5) { return "május"; }
        if ($honap == 6) { return "június"; }
        if ($honap == 7) { return "július"; }
        if ($honap == 8) { return "augusztus"; }
        if ($honap == 9) { return "szeptember"; }
        if ($honap == 10) { return "október"; }
        if ($honap == 11) { return "november"; }
        if ($honap == 12) { return "december"; }

    }    
    
    function datum_formazas($datum) {
        $ev = substr($datum,0,4);
        $honap  = substr($datum,5,2);
        $nap  = substr($datum,8,2);
        
        return $ev . ". " . honap_neve(intval($honap)) . " " . $nap . ".";
    }
    
    function email_kuldes($emailcim,$targy,$tartalom) {
        try {
            $mail = new PHPMailer(true);
            $mail->CharSet = "utf-8";

            $mail->From = EMAIL_FROM;
            $mail->FromName = EMAIL_FROM_NAME;
            $mail->AddAddress($emailcim);

            $mail->WordWrap = 50; // set word wrap to 50 characters
            $mail->IsHTML(true); // set email format to HTML

            $mail->Subject = $targy;
            //$mail->Body    = $tartalom;
            
            $email_tartalom = "";
            $email_tartalom .= EMAIL_FEJLEC;
            $email_tartalom .= $tartalom;
            $email_tartalom .= EMAIL_LABLEC;
            
            
            
            $mail->MsgHTML($email_tartalom,BASE_DIR);
            
        
            if(!$mail->Send())
            {
                
               //echo "Hiba: " . $mail->ErrorInfo;
               //exit;
               
            }
    
        } catch (phpmailerException $exception) {
            // ha hiba van itt lekapjuk
        }

        
                        
    }
    
    function szoveg_vagas($text,$length=64,$tail="...") {
        $text = strip_tags( trim($text) );
        $txtl = mb_strlen($text);
        if($txtl > $length) {
            for($i=1;$text[$length-$i]!=" ";$i++) {
                if($i == $length) {
                    return mb_substr($text,0,$length) . $tail;
                }
            }
            $text = mb_substr($text,0,$length-$i+1) . $tail;
        }
        return $text;
    } 
    
    function websafe($string){
        $a = "()!$'?: ,&+/ÁÉÍÓÖŐÚÜŰáéíóöőúüű\"\\/";
        $b = "_______-____AEIOOOUUUaeiooouuu___";
        $string = utf8_decode($string);
        $string = strtr($string, utf8_decode($a), $b);
        $string = strtolower($string);
        return utf8_encode($string);
    }
    
    
    /*
        melyik_tabla = hol keresunk ugyanolyan nevu url-t, azert nezzuk csak egy tablaban mert a seo_url ek elott midnig van egy azonosito, pl forumnal /temek/url, recept/url, stb.
        nev = amibol a seo_url-t generaljuk
        
        
    */
    function seo_url($melyik_tabla,$nev,$idnev ="",$id = "") {
        global $db;
        
        //csinalunk beleole websafe cimet:
        $nev_safe = websafe($nev);
        
        $sql_add = "";
        if ($idnev != "" AND $id != "") {
            $sql_add = " AND $idnev != $id ";
        }
        
        // megnezzuk, hogy adott tablaban van e mar ilyen nevu
        $vane = $db->fr("SELECT seo_url FROM " . $melyik_tabla  ." WHERE seo_url = '" . $nev_safe  . "' $sql_add ");
        
        if ($vane) {
            // van mar ilyen tehat masikat kell csinalni timestamp a vegen
            return $nev_safe . time();
        } else {
            return $nev_safe;
        }
    }
    
    
    function belepett_ertek($mezo,$felhasznalo_adatok) {
        global $db;
        if ($_SESSION["loggedin"] == 1) {
            if (isset($felhasznalo_adatok[$mezo])) {
                return $felhasznalo_adatok[$mezo];    
            } else {
                return "";
            }
            
        } else {
            return "";
        }
        
    }
 ?>