<?php
/*
    Hasznalat:
    
    // tobb soros lkeredeses:
    $row = $db->f('select * from users') 
    $row = $db->f('select * from users where name=?', array('Neve')) 
    $row = $db->f('select * from users where name=:neve', array("neve" => "Viktor")) 
    
    // limit:
    $row = $db->f('select * from users',array(),0,10) 
    
    // ezzel lehet insert,update, deletet csinalni. insernel visszadja az iid-t
    $sorok2 = $db->q("INSERT INTO hirek (hir_cime,hir_lead,hir_rogzitve,hir_kep) VALUES (?,?,NOW(),?)",array("ize1","ize2","kep"));
    
    

*/
class Adatbazis extends mysqli  {
	
    var $sql_string;
    var $sql_string_feldolgozva;
    var $parameterek = array();
    var $lekerdezes_log = 0;
    var $debug = 0;
    var $log_dir = LOG_DIR;
    var $log_file = "mysql.log";
    var $eredmeny;
    var $sorok_szama;
    
    public function __construct($host,$user,$pass,$defdb) {
        parent::__construct($host,$user,$pass,$defdb);

        if (mysqli_connect_error()) {
            $this->logolas("kapcsolodasi hiba:" . mysqli_connect_error());
            exit;
        }        
        
        parent::query("SET CHARACTER SET 'utf8'");
        parent::query("SET NAMES utf8");
        
    }    
    
    private function logolas($mit) {
        $log = new Log($this->log_dir . $this->log_file);
        $log->log_to_file($mit);
    }
    
    // fetch: visszadja egy tombben az osszes sort
    public function f($sql,$parameterek = array(),$startrow = NULL,$rowsperpage = NULL) {
        if (!is_null($startrow)) {
            $sql.= " LIMIT " . intval($startrow);
        }
        if (!is_null($rowsperpage)) {
            $sql.= "," . intval($rowsperpage);
        }
        
        $ret = array();
        $adatok = array();
        if ($this->q($sql,$parameterek)) {
            while ($sor = $this->eredmeny->fetch_assoc()) { 
                $adatok[] = $sor;
            }
        }
         
        $ret["sorok"] = $adatok; 
        $ret["sorok_szama"] = $this->sorok_szama();
        
        return $ret;
    }
    
    //fetch row: csak egy sort kerdez le, sorok szamat sem ad vissza igy egyszerubb a tobbel dolgozni
    // ha nincs ilyen sor akkor NULL t ad vissza
    public function fr($sql,$parameterek = array(),$htmlspecialchars = 0) {
        $sor = array();
        if ($this->q($sql,$parameterek)) {
            if ($htmlspecialchars) {
                $sor = $this->htmlspecialchars_deep($this->eredmeny->fetch_assoc());    
            } else {
                $sor = $this->eredmeny->fetch_assoc();
            }
        }
         
        return $sor;
    }
    
    // ezzel sepcko karaktereket ataalkitjuk mielott atadjuk az eredmeny tombot. PL formban  value="{ertek}" ha itt " lenne akkor az oldal behal, de ha atalakitjuk akkro mehet az inputba is " jel stb.
    function htmlspecialchars_deep($mixed, $quote_style = ENT_QUOTES, $charset = 'UTF-8')
    {
        if (is_array($mixed)) {
            foreach($mixed as $key => $value) {
                $mixed[$key] = $this->htmlspecialchars_deep($value, $quote_style, $charset);
            }
        } elseif (is_string($mixed)) {
            $mixed = htmlspecialchars(htmlspecialchars_decode($mixed, $quote_style), $quote_style, $charset);
        }
        return $mixed;
    }     
    
    // ezt mindig kozvetlenul a kerdeses query utan kell futtatni
    public function sorok_szama() {
        // kiszedjuk a limitet a querybol ha van
        $pos = strrpos($this->sql_string_feldolgozva,"LIMIT ");
        if ($pos !== false) {
            $sorok_szama_sql = substr($this->sql_string_feldolgozva,0,$pos);
            $sorok_szama_eredmeny = parent::query($sorok_szama_sql);
            if ($sorok_szama_eredmeny) {
                $sorok_szama_eredmeny->fetch_assoc();
                
                return $sorok_szama_eredmeny->num_rows;
            } else {
                return false;
            }
        } else {
            return $this->eredmeny->num_rows;
        }
        

    }
    
        
    // query
    public function q($sql,$parameterek = array()) {
        $this->sql_string = $sql;
        $this->parameterek = $parameterek;
        
        
        // eszkepelunk ha kell es csereljuk a ? ket a tombben megadottakra:
        $this->sql_parameterekkel();
        
        //echo $this->sql_string_feldolgozva;
        
        $this->eredmeny = parent::query($this->sql_string_feldolgozva);
        
        
        if (!$this->eredmeny) {
            $this->logolas("HIBA! " . $this->error . " sql: " . $this->sql_string_feldolgozva);
            if ($this->debug) {
                echo "SQL ERROR: " . $this->error . " sql: " . $this->sql_string_feldolgozva;    
            }
            
        }
        
        if ($this->lekerdezes_log == 1) {
            $this->logolas("SQL: " . $this->sql_string_feldolgozva);
        }
        
        if ($this->eredmeny) {
            // ha insert volt akkor visszadjuk az insert_id-t!
            $pos = strpos($this->sql_string_feldolgozva,"INSERT INTO");
            if ($pos !== false) {
                return $this->insert_id;
            } else {
                return true;    
            }
        } else {
            return false;
        }
    }

    
    /* csereljuk a ? jeleket vagy a :nev-et a megfelelo ertekekre */
    function sql_parameterekkel() {
        // ha nincsenek paramterek ( esykepelendo sztringek es kerdojelek ) 
        if(count($this->parameterek) == 0) {
            $this->sql_string_feldolgozva = $this->sql_string;
            return;
        }
        
        // ha van mint cserelni akkor cserelunk
        $parts = explode('?', $this->sql_string);
        $query = array_shift($parts); 
        
        $parameterek = $this->prepareData($this->parameterek);
        
        
        $newParams = array();
        foreach($parameterek as $key => $value) {
            // ha szam akkor ? jelek vannak egyebkent meg nevekkel van osszerendelve
            if(is_numeric($key)) {
                $query .= $value . array_shift($parts);
            } else {
                $newParams[ ':' . $key ] = $value;
            }
        }
        
        krsort($newParams);
        
        $query = str_replace( array_keys($newParams), $newParams, $query);
        
        $this->sql_string_feldolgozva = $query;
        
    }
    
    private function prepareData($data) {
        $values = array();
        
        
        foreach($data as $key=>$value) {
            $escape = true;
            // megnezzuk kell e eszkepelni, de csak akkor csinaljuk ha value nem tomb mert akkro nem kell. pl
            // $sorok = $db->f("SELECT * FROM hirek WHERE  hirek.hir_cime = :cim  AND hirek.hir_id IN (:idk) ",array("cim" => "ezaz","idk" => array("1,2,3,6")));
            // itt nem lesz idezojelezve es eszkepelve
            if(is_array($value) && !is_object($value)) {
                $escape = false;
                $value = array_shift($value);
            }
            if($escape) {
                $values[$key] = "'" . $this->escapeString($value) . "'";
            } else {
                $values[$key] = $value;
            }
        }
        
        
        return $values;
    }
    
    protected function escapeString($string) {
        if (get_magic_quotes_gpc()) {
            $string = stripslashes($string);
        }
        return $this->escape_string($string);
    }    
    



}

?>