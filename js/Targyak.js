var Targyak = {};

Targyak = function () {
    //drop_kategoria: basic, fine, masterwork ,  rare

    /*
        Targyak struktura
        ID: egyedi kell minden targyhoz
        MINOSEG: basic,fine,masterwork,rare
        KEP_FAJL_NEVE: lehetoleg egyezzen az ID val
        TARGY_FOKATEGORIA: fegyver(ezeket lehet kezbe rakni tamadashoz ide tartozik a pajzs is aminek nem lesz attack erteke),pancel(ezeket lehet felvenni ruhakent),ital,dragako, kulcs, papir, ellenseg_darabok ( ezeket dobjak a megold mobok transmutehoz )
        TARGY_ALKATEGORIA: 
            fegyvernel: kard,ketkezes_kard,katana,scimitar,falchion,pajzs,ij,szamszerij,fejsze,kes,csephadaro,alabard,kalapacs,morningstar,vivobot,kasza,szigony,landzsa,csuzli,bot,palca
            pancel: sapka,kesztyu,mellvert,cipo,ov!!nincs hozza kep!igy kimarad,nadrag,nyaklanc, gyuru
            ital: mana,
            dragako: runa
            ellenseg_darabok: csont
        SEBESSEG: miliszekunbumban az ujratoltes ideje, minel kisebb annal gyorsann a fegyver
        ATTACK1, ATTACK2: mettol meddig sebezhet 
        HATOTAVOLSAG: 1,2,3,4,5  minel nagyobb annal tobb kockanyi helyen tudja elerni az ellenseget. 
        STRENGTH, stb: pluszban ennyit ad
        egyeb adatok:
        KULONLEGES_KEPESSEG: 1-HP-t ad pl poti vagy alma
        KULONLEGES_KEPESSEG_TULAJDONSAG_1: HP-t ado cucccnal, mennyi HP t ad
        [ID,"MINOSEG","KEP_FAJL_NEVE.PNG","TARGY NEVE","TARGY_FOKATEGORIA","TARGY_ALKATEGORIA","SEBESSEG","ATTACK1","ATTACK2","HATOTAVOLSAG","POWER","dexterity","DEFENSE","VITALITY","MAGIC_FIND","SZINT",{egyeb adatok}],
            egyeb adatok: "KULONLEGES_KEPESSEG","KULONLEGES_KEPESSEG_TULAJDONSAG_1"
    */
    
    this.targyak = 
        [
            [1,"basic","short_sword1.png","Short Sword","fegyver","kard","7000","20","25","1","13","10","0","10","1","1"],
            [2,"basic","short_sword1.png","Short Sword","fegyver","kard","7000","20","25","1","10","13","0","10","1","1"],
            [3,"basic","short_sword1.png","Short Sword","fegyver","kard","7000","20","25","1","10","10","0","13","1","1"],
            [4,"basic","short_sword1.png","Short Sword","fegyver","kard","7000","20","25","1","10","10","0","10","2","1"],

            [5,"fine","short_sword1.png","Short Sword Of Power","fegyver","kard","7000","25","30","1","15","10","0","10","1","1"],
            [6,"fine","short_sword1.png","Short Sword Of Dexterity","fegyver","kard","7000","25","30","1","10","15","0","10","1","1"],
            [7,"fine","short_sword1.png","Short Sword Of Vitality","fegyver","kard","7000","25","30","1","10","10","0","15","1","1"],
            [8,"fine","short_sword1.png","Short Sword Of Luck","fegyver","kard","7000","25","30","1","10","10","0","10","3","1"],
            
            [9,"masterwork","short_sword1.png","Short Sword Of Greater Power","fegyver","kard","7000","30","35","1","17","10","0","10","1","1"],
            [10,"masterwork","short_sword1.png","Short Sword Of Greater Dexterity","fegyver","kard","7000","30","35","1","10","17","0","10","1","1"],
            [11,"masterwork","short_sword1.png","Short Sword Of Greater Vitality","fegyver","kard","7000","30","35","1","10","10","0","17","1","1"],
            [12,"masterwork","short_sword1.png","Short Sword Of Greater Luck","fegyver","kard","7000","30","35","1","10","10","0","10","4","1"],
            
            [13,"rare","short_sword1.png","Arcane Shortsword of Death","fegyver","kard","7000","35","40","1","20","10","0","10","1","1"],
            [14,"rare","short_sword1.png","Eternal Shortsword of the Hero","fegyver","kard","7000","35","40","1","10","20","0","10","1","1"],
            [15,"rare","short_sword1.png","Runic Shortsword of the Underworld","fegyver","kard","7000","35","40","1","10","10","0","20","1","1"],
            [16,"rare","short_sword1.png","Sharp Shortsword of Hope","fegyver","kard","7000","35","40","1","10","10","0","10","5","1"],
            
            
            [100,"basic","crossbow1.png","Crossbow","fegyver","szamszerij","7000","30","35","2","10","10","10","10","1","1"],

            [101,"fine","crossbow1.png","Crossbow Of Power","fegyver","szamszerij","7000","30","35","2","15","10","0","10","1","1"],
            [102,"fine","crossbow1.png","Crossbow Of Dexterity","fegyver","szamszerij","7000","30","35","2","10","15","0","10","1","1"],
            [103,"fine","crossbow1.png","Crossbow Of Vitality","fegyver","szamszerij","7000","30","35","2","10","10","0","15","1","1"],
            [104,"fine","crossbow1.png","Crossbow Of Luck","fegyver","szamszerij","7000","30","35","2","10","10","0","10","2","1"],

            [105,"masterwork","crossbow1.png","Crossbow Of Power","fegyver","szamszerij","7000","30","35","2","15","10","0","10","1","1"],
            [106,"masterwork","crossbow1.png","Crossbow Of Dexterity","fegyver","szamszerij","7000","30","35","2","10","15","0","10","1","1"],
            [107,"masterwork","crossbow1.png","Crossbow Of Vitality","fegyver","szamszerij","7000","30","35","2","10","10","0","15","1","1"],
            [108,"masterwork","crossbow1.png","Crossbow Of Luck","fegyver","szamszerij","7000","30","35","2","10","10","0","10","2","1"],
            
            [109,"rare","crossbow1.png","Crossbow Of Power","fegyver","szamszerij","7000","30","35","2","15","10","0","10","1","1"],
            [110,"rare","crossbow1.png","Crossbow Of Dexterity","fegyver","szamszerij","7000","30","35","2","10","15","0","10","1","1"],
            [111,"rare","crossbow1.png","Crossbow Of Vitality","fegyver","szamszerij","7000","30","35","2","10","10","0","15","1","1"],
            [112,"rare","crossbow1.png","Crossbow Of Luck","fegyver","szamszerij","7000","30","35","2","10","10","0","10","2","1"],
            
            
            [115,"basic","broad_axe1.png","Axe","fegyver","fejsze","7000","20","34","1","10","10","0","10","1","1"],
            
            [130,"basic","knife.png","Knife","fegyver","kes","7000","20","34","1","10","10","0","10","1","1"],
            
            [150,"basic","flail1.png","Flail","fegyver","csephadaro","7000","20","34","1","10","10","0","10","1","1"],

            [170,"basic","halberd1.png","Halberd","fegyver","alabard","7000","20","34","1","10","10","0","10","1","1"],

            [190,"basic","hammer1.png","Hammer","fegyver","kalapacs","7000","20","34","1","10","10","0","10","1","1"],
            
            [210,"basic","morningstar1.png","Morningstar","fegyver","morningstar","7000","20","34","1","10","10","0","10","1","1"],

            [230,"basic","quarterstaff.png","Quarterstaff","fegyver","vivobot","7000","20","34","1","10","10","0","10","1","1"],

            [250,"basic","scythe1.png","Scythe","fegyver","kasza","7000","20","34","1","10","10","0","10","1","1"],

            [270,"basic","trident1.png","Trident","fegyver","szigony","7000","20","34","1","10","10","0","10","1","1"],
            
            [290,"basic","spear2.png","Spear","fegyver","landzsa","7000","20","34","1","10","10","0","10","1","1"],

            [310,"basic","sling1.png","Sling","fegyver","csuzli","7000","20","34","2","10","10","0","10","1","1"],

            [330,"basic","bow1.png","Bow","fegyver","ij","7000","20","34","2","10","10","0","10","1","1"],
            
            [350,"basic","shield3_round.png","Shield","fegyver","pajzs","7000","","","1","10","10","10","10","1",""],
            
            [370,"basic","greatsword1.png","Greatsword","fegyver","ketkezes_kard","7000","20","34","1","10","10","0","10","1","1"],
            
            [390,"basic","katana2.png","Katana","fegyver","katana","7000","20","34","1","10","10","0","10","1","1"],
            
            [410,"basic","scimitar1.png","Scimitar","fegyver","scimitar","7000","20","34","1","10","10","0","10","1","1"],
            
            [430,"basic","falchion1.png","Falchion","fegyver","falchion","7000","20","34","1","10","10","0","10","1","1"],
            
            [450,"basic","staff07.png","Staff","fegyver","bot","7000","20","34","1","10","10","0","10","1","1"],
            
            [470,"basic","gem_bone.png","Wand","fegyver","palca","7000","20","34","1","10","10","0","10","1","1"],
            

            [1001,"fine","runes/rune_cerebov.png","Cerebov Rune","dragako","runa","","","","","10","10","","","","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1002,"fine","runes/rune_cocytus.png","Cocytus Rune","dragako","runa","","","","","10","","10","","","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1003,"fine","runes/rune_dis.png","Dis Rune","dragako","runa","","","","","10","","","10","","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1004,"fine","runes/rune_gehenna.png","Gehenna Rune","dragako","runa","","","","","","10","10","","","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1005,"fine","runes/rune_gloorx_vloq.png","Gloorx vloq Rune","dragako","runa","","","","","","10","","10","","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1006,"fine","runes/rune_lom_lobon.png","Lom Lobon Rune","dragako","runa","","","","","","","10","10","","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1007,"fine","runes/rune_mnoleg.png","Mnoleg Rune","dragako","runa","","","","","","","","","5","",[{"leiras":"Can be embedded into weapon or armor."}]],
            [1008,"fine","runes/rune_tartarus.png","Tartarus Rune","dragako","runa","","","","","3","3","3","3","1","",[{"leiras":"Can be embedded into weapon or armor."}]],
            
            [6000,"fine","key.png","Golden key","kulcs","kulcs","","","","","","","","","",""],
            [6001,"fine","key.png","Old Golden key","kulcs","kulcs","","","","","","","","","",""],
            [6002,"fine","mirror.png","Mirror","kulcs","tukor","","","","","","","","","",""],
            [6003,"fine","book_of_the_dead.png","Book of the Dead","kulcs","konyv","","","","","","","","","",""],
            
            
            
            [2000,"basic","armors/chain_mail1.png","Chain Mail","pancel","mellvert","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2001,"basic","armors/chain_mail1.png","Chain Mail","pancel","mellvert","","","","","10","13","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2002,"basic","armors/chain_mail1.png","Chain Mail","pancel","mellvert","","","","","10","10","13","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2003,"basic","armors/chain_mail1.png","Chain Mail","pancel","mellvert","","","","","10","10","10","13","1","1",[{"pancel_anyaga":"plate"}]],
            [2004,"basic","armors/chain_mail1.png","Chain Mail","pancel","mellvert","","","","","10","10","10","10","2","1",[{"pancel_anyaga":"plate"}]],

            [2005,"fine","armors/chain_mail1.png","Chain Mail Of Power","pancel","mellvert","","","","","15","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2006,"fine","armors/chain_mail1.png","Chain Mail Of Dexterity","pancel","mellvert","","","","","10","15","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2007,"fine","armors/chain_mail1.png","Chain Mail Of Defense","pancel","mellvert","","","","","10","10","15","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2008,"fine","armors/chain_mail1.png","Chain Mail Of Vitality","pancel","mellvert","","","","","10","10","10","15","1","1",[{"pancel_anyaga":"plate"}]],
            [2009,"fine","armors/chain_mail1.png","Chain Mail Of Luck","pancel","mellvert","","","","","10","10","10","10","3","1",[{"pancel_anyaga":"plate"}]],

            [2015,"masterwork","armors/chain_mail1.png","Chain Mail Of Greater Power","pancel","mellvert","","","","","17","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2016,"masterwork","armors/chain_mail1.png","Chain Mail Of Greater Dexterity","pancel","mellvert","","","","","10","17","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2017,"masterwork","armors/chain_mail1.png","Chain Mail Of Greater Defense","pancel","mellvert","","","","","10","10","17","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2018,"masterwork","armors/chain_mail1.png","Chain Mail Of Greater Vitality","pancel","mellvert","","","","","10","10","10","17","1","1",[{"pancel_anyaga":"plate"}]],
            [2019,"masterwork","armors/chain_mail1.png","Chain Mail Of Greater Luck","pancel","mellvert","","","","","10","10","10","10","4","1",[{"pancel_anyaga":"plate"}]],

            [2025,"rare","armors/chain_mail1.png","Chain Mail Of Power","pancel","mellvert","","","","","20","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2026,"rare","armors/chain_mail1.png","Chain Mail Of Dexterity","pancel","mellvert","","","","","10","20","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2027,"rare","armors/chain_mail1.png","Chain Mail Of Defense","pancel","mellvert","","","","","10","10","20","10","1","1",[{"pancel_anyaga":"plate"}]],
            [2028,"rare","armors/chain_mail1.png","Chain Mail Of Vitality","pancel","mellvert","","","","","10","10","10","20","1","1",[{"pancel_anyaga":"plate"}]],
            [2029,"rare","armors/chain_mail1.png","Chain Mail Of Magic Find","pancel","mellvert","","","","","10","10","10","10","5","1",[{"pancel_anyaga":"plate"}]],
            
            [2020,"rare","headgear/helmet2_etched.png","Helmet Of Power","pancel","sapka","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],

            [2040,"basic","amulet/bone_gray.png","Amulet","pancel","nyaklanc","","","","","13","10","10","10","1","1"],

            [2070,"basic","ring/brass.png","Ring","pancel","gyuru","","","","","13","10","10","10","1","1"],

            [2090,"basic","armors/boots2_jackboots.png","Boots","pancel","cipo","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            
            [2110,"basic","armors/glove1.png","Plate Glove","pancel","kesztyu","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"plate"}]],
            
            
            
            
            
            [2500,"basic","armors/glove2.png","Leather Glove","pancel","kesztyu","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"leather"}]],
            
            
            
            [2600,"basic","armors/leather_armour2.png","Leather armor","pancel","mellvert","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"leather"}]],
            
            
            
            
            [2800,"basic","armors/glove3.png","Cloth Glove","pancel","kesztyu","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"cloth"}]],

            
            [2900,"basic","armors/robe2.png","Cloth armor","pancel","mellvert","","","","","13","10","10","10","1","1",[{"pancel_anyaga":"cloth"}]],
            
            [4000,"rare","scroll.png","Strange Scroll part 1/3 - quest item","papir","papir","","","","","","","","","","1",[{"leiras":"The name of... ( the scroll is not complete )"}]],
            [4001,"rare","scroll.png","Strange Scroll part 2/3 - quest item","papir","papir","","","","","","","","","","1",[{"leiras":"...the demon is Ca... ( the scroll is not complete )"}]],
            [4002,"rare","scroll.png","Strange Scroll part 3/3 - quest item","papir","papir","","","","","","","","","","1",[{"leiras":"...ton"}]],
            
            [4005,"rare","scroll.png","Golden Scroll part 1/2 - quest item","papir","papir","","","","","","","","","","1",[{"leiras":"The word you searching for is Amal... ( the scroll is not complete )"}]],
            [4006,"rare","scroll.png","Golden Scroll part 2/2 - quest item","papir","papir","","","","","","","","","","1",[{"leiras":"...ryn ( the scroll is not complete )"}]],
            
            [5000,"basic","brilliant_blue.png","Mana Potion","ital","mana","","","","","","","","","","1",[{"leiras":"Restores 20 mana","mennyi_manat_ad":20}]],
            [5001,"masterwork","brilliant_blue.png","Mana Potion","ital","mana","","","","","","","","","","1",[{"leiras":"Restores 30 mana","mennyi_manat_ad":30}]],
            
            [8000,"basic","skeleton_humanoid_large.png","Bones from a skeleton","ellenseg_darabok","csont","","","","","","","","","","1",[{"leiras":"Can be used for transmutation"}]]
            
        ];
    

    
    
}

Targyak.prototype.alap_targyadatok = function (targy_alap_id)  {
    
    var ret = {id:0,kep_fajl:"",fokategoria:"",alkategoria:"",kategoria_neve:"",kategoria_szine:"",targy_neve:"",targy_leirasa:"",statok:{sebesseg:0,attack1:0,attack2:0,hatotavolsag:0,power:0,dexterity:0,defense:0,vitality:0,magicfind:0}};
    
    
    for (var i=0;i<this.targyak.length;i++) {
        if (this.targyak[i][0] == targy_alap_id) {
            ret.id = targy_alap_id;
            ret.statok = {sebesseg:this.targyak[i][6],attack1:this.targyak[i][7],attack2:this.targyak[i][8],hatotavolsag:this.targyak[i][9],power:this.targyak[i][10],dexterity:this.targyak[i][11],defense:this.targyak[i][12],vitality:this.targyak[i][13],magicfind:this.targyak[i][14]};
            break;
        }
        
    }
    
    
    return ret;
}

Targyak.prototype.random_ertek_generalas = function (eredeti_ertek)  {
    var ret;
    
    if (eredeti_ertek != 0) {
        eredeti_ertek = parseInt(eredeti_ertek);
        var tol = parseInt(eredeti_ertek - (eredeti_ertek*0.1));
        var ig = parseInt(eredeti_ertek + (eredeti_ertek*0.1));
        
        var rand = randint(tol,ig);
        
        if (rand == 0) {
            rand = 1;
        }
        
        ret = rand;
    } else {
        ret = 0;
    }
    
    return ret;
}


// ezzel hozzuk letra a random statokat a targyon
// ezt hasznaljuk arra is, hogy ha pl egy kulcsot kell megnezni megvan e a taskaban. hiszen a kulcs tipusu itemek ugyanazt a base64 et eredmenyezik mert nincs rajtuk valtozo stat!;
Targyak.prototype.targy_generalas = function (targy_alap_id)  {
    var ret = "";
    
    /*
        felepites:
        alap_targy_id|sebesseg|ATTACK1|ATTACK2|POWER|dexterity|DEFENSE|VITALITY|MAGIC_FIND
        
        ezt base64kodoljuk. ha valahol nincs ertek akkor ott ures marad a || kozott
        
    */
    var alap_targyadatok = this.alap_targyadatok(targy_alap_id);
    
    
    ret = base64_encode(targy_alap_id + '|' + this.random_ertek_generalas(alap_targyadatok.statok.sebesseg) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.attack1) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.attack2) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.power) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.dexterity) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.defense) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.vitality) + '|' + this.random_ertek_generalas(alap_targyadatok.statok.magicfind) );
    
    
    
    return ret;
}


Targyak.prototype.mi_a_kategoria_szine = function (kategoria_neve)  {
    var ret = "";
    if (kategoria_neve == "basic") { ret = "cccccc";}
    if (kategoria_neve == "fine") { ret = "62A4DA";}
    if (kategoria_neve == "masterwork") { ret = "1A9306";}
    if (kategoria_neve == "rare") { ret = "FCD00B";}
    
    return ret;
}




Targyak.prototype.targyadatok = function (kodolt_targy_id)  {
    // kikodoljuk a random statos targy_id t
    
    if (typeof kodolt_targy_id === "undefined")  {
        return false;
    }
    
    
    
    var kikodolt_sztring = base64_decode(kodolt_targy_id);
    //console.log(kikodolt_sztring);

    
    var kikodolt_tomb = kikodolt_sztring.split("|");
    
    //console.log(kikodolt_tomb);
    var kikodolt_targy_id = kikodolt_tomb[0];
    
    
    
    var ret = {id:0,kep_fajl:"",fokategoria:"",alkategoria:"",kategoria_neve:"",kategoria_szine:"",targy_neve:"",targy_leirasa:"",statok:{sebesseg:0,attack1:0,attack2:0,hatotavolsag:0,power:0,dexterity:0,defense:0,vitality:0,magicfind:0},pancel_anyaga:""};
    
    //console.log("targy_id:" + targy_id);
    
    
    for (var i=0;i<this.targyak.length;i++) {
        if (this.targyak[i][0] == kikodolt_targy_id) {
            //ret.id = this.targyak[i][0];
            ret.id = kodolt_targy_id;
            ret.statok = {sebesseg:kikodolt_tomb[1],attack1:kikodolt_tomb[2],attack2:kikodolt_tomb[3],hatotavolsag:this.targyak[i][9],power:kikodolt_tomb[4],dexterity:kikodolt_tomb[5],defense:kikodolt_tomb[6],vitality:kikodolt_tomb[7],magicfind:kikodolt_tomb[8]};
            ret.kep_fajl = this.targyak[i][2];
            ret.fokategoria = this.targyak[i][4];
            ret.alkategoria =  this.targyak[i][5];
            ret.kategoria_neve = this.targyak[i][1];
            ret.kategoria_szine = this.mi_a_kategoria_szine(this.targyak[i][1]);
            ret.targy_kepe = this.targyak[i][2];
            ret.targy_neve = this.targyak[i][3];
            ret.targy_leirasa = ""; 
            ret.targy_leirasa += "<strong style='color:#"+ret.kategoria_szine+"'>" + this.targyak[i][3] + "</strong><br>";
            
            if (this.targyak[i][4] == "fegyver") {
                if (this.targyak[i][5] == "kard") {
                    ret.targy_leirasa += "<span class='kicsi'>(One handed sword)</span><br>";    
                }
                if (this.targyak[i][5] == "ketkezes_kard") {
                    ret.targy_leirasa += "<span class='kicsi'>(Two handed sword)</span><br>";    
                }
                if (this.targyak[i][5] == "katana") {
                    ret.targy_leirasa += "<span class='kicsi'>(Katana)</span><br>";    
                }
                if (this.targyak[i][5] == "scimitar") {
                    ret.targy_leirasa += "<span class='kicsi'>(Scimitar)</span><br>";    
                }
                if (this.targyak[i][5] == "falchion") {
                    ret.targy_leirasa += "<span class='kicsi'>(Falchion)</span><br>";    
                }
                if (this.targyak[i][5] == "pajzs") {
                    ret.targy_leirasa += "<span class='kicsi'>(Shield)</span><br>";    
                }
                if (this.targyak[i][5] == "ij") {
                    ret.targy_leirasa += "<span class='kicsi'>(Bow)</span><br>";    
                }
                if (this.targyak[i][5] == "szamszerij") {
                    ret.targy_leirasa += "<span class='kicsi'>(Crossbow)</span><br>";    
                }
                if (this.targyak[i][5] == "fejsze") {
                    ret.targy_leirasa += "<span class='kicsi'>(Axe)</span><br>";    
                }
                if (this.targyak[i][5] == "kes") {
                    ret.targy_leirasa += "<span class='kicsi'>(Knife)</span><br>";    
                }
                if (this.targyak[i][5] == "csephadaro") {
                    ret.targy_leirasa += "<span class='kicsi'>(Flail)</span><br>";    
                }
                if (this.targyak[i][5] == "alabard") {
                    ret.targy_leirasa += "<span class='kicsi'>(Halberd)</span><br>";    
                }
                if (this.targyak[i][5] == "kalapacs") {
                    ret.targy_leirasa += "<span class='kicsi'>(Hammer)</span><br>";    
                }
                if (this.targyak[i][5] == "morningstar") {
                    ret.targy_leirasa += "<span class='kicsi'>(Morningstar)</span><br>";    
                }
                if (this.targyak[i][5] == "vivobot") {
                    ret.targy_leirasa += "<span class='kicsi'>(Quarterstaff)</span><br>";    
                }
                if (this.targyak[i][5] == "kasza") {
                    ret.targy_leirasa += "<span class='kicsi'>(Scythe)</span><br>";    
                }
                if (this.targyak[i][5] == "szigony") {
                    ret.targy_leirasa += "<span class='kicsi'>(Trident)</span><br>";    
                }
                if (this.targyak[i][5] == "landzsa") {
                    ret.targy_leirasa += "<span class='kicsi'>(Spear)</span><br>";    
                }
                if (this.targyak[i][5] == "csuzli") {
                    ret.targy_leirasa += "<span class='kicsi'>(Sling)</span><br>";    
                }
                if (this.targyak[i][5] == "bot") {
                    ret.targy_leirasa += "<span class='kicsi'>(Staff)</span><br>";    
                }
                if (this.targyak[i][5] == "palca") {
                    ret.targy_leirasa += "<span class='kicsi'>(Wand)</span><br>";    
                }
                
            }

            
            ret.targy_leirasa += "<br>";
            
            // ha az alap targynak nem 0 az adott stat erteke akkor kiirjuk de a random egenraltat nem az eredetit
            if (this.targyak[i][7] != 0 && this.targyak[i][8] != 0) {
                ret.targy_leirasa += "Damage: " + kikodolt_tomb[2] + "-"+ kikodolt_tomb[3] +"<br>";
            }
            if (this.targyak[i][10] != 0) {
                ret.targy_leirasa += "Power: +" + kikodolt_tomb[4] + "<br>";
            }
            if (this.targyak[i][11] != 0) {
                ret.targy_leirasa += "Dexterity: +" + kikodolt_tomb[5] + "<br>";
            }
            if (this.targyak[i][12] != 0) {
                ret.targy_leirasa += "Defense: +" + kikodolt_tomb[6] + "<br>";
            }
            if (this.targyak[i][13] != 0) {
                ret.targy_leirasa += "Vitality: +" + kikodolt_tomb[7] + "<br>";
            }
            if (this.targyak[i][14] != 0) {
                ret.targy_leirasa += "Magic Find:" + kikodolt_tomb[8] + "%<br>";
            }
            if (this.targyak[i][6] != 0) {
                ret.targy_leirasa += "<br>Speed: " + kikodolt_tomb[1] + "<br>";
            }
            if (this.targyak[i][15] != 0) {
                ret.targy_leirasa += "<br>Level: " + this.targyak[i][15] + "<br>";
            }
            
            
            
            
            
            if (this.targyak[i][16]) {
                var egyeb_adatok = this.targyak[i][16];

                for (var j=0;j<egyeb_adatok.length;j++) {
                    //console.log(egyeb_adatok[j]);
                    if (typeof egyeb_adatok[j].mennyi_manat_ad !== "undefined")  {
                        ret.mennyi_manat_ad = egyeb_adatok[j].mennyi_manat_ad;        
                    }
                    
                    if (typeof egyeb_adatok[j].leiras !== "undefined")  {
                        ret.targy_leirasa += "<br>" + egyeb_adatok[j].leiras + "<br>";        
                    }
                    if (typeof egyeb_adatok[j].gyogyit !== "undefined")  {
                        ret.targy_leirasa += "<br>Restores " + egyeb_adatok[j].gyogyit + " HP<br>";        
                    }
                    if (typeof egyeb_adatok[j].pancel_anyaga !== "undefined")  {
                        ret.pancel_anyaga = egyeb_adatok[j].pancel_anyaga;        
                    }
                    
                }
                
            }
            if (this.targyak[i][4] == "fegyver") {
                ret.targy_leirasa += "<br>2 unused gem slot<br>";
            }
            
            ret.targy_leirasa += "<br><strong style='color:#"+ret.kategoria_szine+"'>" + this.targyak[i][1] + "</strong><br><br>";

            if (this.targyak[i][4] == "fegyver" || this.targyak[i][4] == "pancel" ) {
                if (this.targyak[i][1] == "basic") { ret.targy_leirasa += "Price: 15 gold<br>"; }
                if (this.targyak[i][1] == "fine") { ret.targy_leirasa += "Price: 30 gold<br>"; }
                if (this.targyak[i][1] == "masterwork") { ret.targy_leirasa += "Price: 50 gold<br>"; }
                if (this.targyak[i][1] == "rare") { ret.targy_leirasa += "Price: 75 gold<br>"; }
                
            }

            break;
        }
    }
    
   
   return ret; 
}
