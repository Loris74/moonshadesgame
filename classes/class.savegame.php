<?php

class SaveGame {
	private $felhasznalo_id = 0;
    
    private $karakterek = null;
    private $ellensegek = null;
    private $terkepek = null;
    private $npck = null;

    private $elso_mentes = 0;
    
    public function __construct($felhasznalo_id) {
        $this->felhasznalo_id = $felhasznalo_id;
        
    }  
    
    // ez akkor van ha main menupbol leterehozt a akarikat ilyenkor a terkpet es a mobokat itt generaljuk le az elso siznthez
    public function elso_mentes() {
        $this->ellensegek = "";
        $this->terkepek = "";
        $this->npck = "";
        
        $this->screen = "";
        
        $this->elso_mentes = 1;
    }  
    
    public function setNpck($npck) {
        $this->npck = $npck;
    }
    


    
    public function setKarakterek($karakterek) {
        $this->karakterek = $karakterek;
        
        
        if ($this->elso_mentes == 1) {
            // hozz akell adnunk a karakter objektumhoz nehany kezdo targyat a classtol fugggoen!
            // eloszor ki kell kodolni a jsont aztan hozzadni aztan visszakodolni!
            $obj = json_decode($karakterek);
            
            
            // egyelore nem kapnak semmilyen targyat innen hanem majd a jatekoban az elso ladabol!
            
            for ($i=0;$i<count($obj);$i++) {
                if ($obj[$i]->osztaly == "4") {
                    // melyik targyakat kapja meg
                    // a targy id-t generalni kell ahogy a JS ben
                    //$obj[$i]->inventory[0] = 1;
                    //$obj[$i]->inventory[1] = 1;
                }
            }
            
            $karakterek = json_encode($obj);
            
            
            
        }
        
        $this->karakterek = $karakterek;
    }
    
    public function setTerkep($terkep) {
        $this->terkepek = $terkep;
        
        if ($this->elso_mentes == 1) {
            
        } else {
            // itt tobb terkepet is tarolnunk kell! es betoltesnel az aktualis szintet betolteni
        }
    }
    
    

    
    
    public function betoltes($id = 0) {
        global $db;
        $ret = array("karakterek" => "", "ellensegek" => "", "terkepek" => "");
        // ha az id 0 akkor jatekkezdesrol van szo tehat az egyetlen letezo allast toltjuk be!
        if ($id == 0) {
            $sor = $db->fr("SELECT * FROM mentesek WHERE felhasznalo_id = ?" , array($this->felhasznalo_id));
        } else {
            $sor = $db->fr("SELECT * FROM mentesek WHERE felhasznalo_id = ? AND mentes_id = ?" , array($this->felhasznalo_id,$id));
        }
        
        $ret["karakterek"] = $sor["karakterek"];
        $ret["ellensegek"] = $sor["ellensegek"];
        $ret["terkepek"] = $sor["terkepek"];
        $ret["npck"] = $sor["npck"];
        
        return $ret;
    }
    
	public function mentes () {
        global $db;
        
        if ($this->elso_mentes == 1) {
            // megnezzuk van e mar mentese, ha van akkro aozkat toroljuk hiszen uj jatekot kezdett!
            $sor = $db->f("SELECT * FROM mentesek WHERE felhasznalo_id = ?" , array($this->felhasznalo_id));
            if($sor["sorok_szama"] != 0) {
                $iid = $db->q("DELETE FROM mentesek WHERE felhasznalo_id = ?" , array($this->felhasznalo_id));
            }
            
            
        }
        
        $iid = $db->q("INSERT INTO mentesek (felhasznalo_id,mentes_datuma,karakterek,ellensegek,terkepek,npck) VALUES (?,NOW(),?,?,?,?)" , array(
            $this->felhasznalo_id,
            $this->karakterek,
            $this->ellensegek,
            $this->terkepek,
            $this->npck
        ));
        
        return $iid;
	}
}

?>