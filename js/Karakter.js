function Karakter () {
    // ezzel azonositjuk  meg kell egyeznie a CSS ID val! karakter_1_kez_1, karakter_1_kez_2, karakter_2_kez_1, stb
    this.id = 0;
    
    this.nev = "";
    
    this.kep = "";
    
    this.penz = 0;
    
    // melyik sorban van: 1,2,3,4
    this.hanyadik_sorban_van = 1;
    
    this.sorban_melyik_oldal = "bal";
    
    this.max_taskahely = 48;
    this.szabad_taskahely = 48;
    
    // egyelore mindnek 100
    this.max_hp = 100;
    
    // ez csokken ha sebzodik
    this.hp = 100;
    
    this.max_mana = 100;
    this.mana = 100;
    
    // hany szazalekot regeneralodik masodpercenkent!
    this.mana_regen = 0.5;
    
    // ha harcban van akkor nincs manaregen es nem tud boznyos targyakat hasznalni stb. 
    this.harcban_van = 0;
    
    // mennyi XP je van
    this.xp = 0;
    
    this.szintlepes_ertekek = [
        {szint:2,xp:15},
        {szint:3,xp:20},
        {szint:4,xp:40},
        {szint:5,xp:80}
    ];
    
    this.szint = 1;
    
    // race: 1- human male, 2-human female, 3-Dwarf male, 4-Dwarf female, 5-Fallens male, 6-fallen female
    this.faj = 1;
    
    // class 1-Fanatic, 2- Heretic, 3-Paladin, 4-Warrior, 5-Sorcerer, 6- Thief, 7-Pathfinder, 8-Berserker
    this.osztaly = 1;
    
    // ezeket karigeneralaskor hozzuak letre es nem valtoznak csak szintlepeskor!!
    this.statok_alapertekek = {power:10,dexterity:10,defense:10,vitality:10,szint:1,magicfind:0};
    
    // ez az eppen aktualis ertekeket mutatja benne van a targyakon kapott plusz es az alapertek is , harcanl ebbol szmaolunk
    // ha van buff stb akkro aozk is hozza vannak adva
    this.statok = {power:0,dexterity:0,defense:0,vitality:0,szint:1,magicfind:0};
    
    // ebben csak az alap+ a felszerelesek vannak. a hatasok ebbol szmolodnak. mert egyebkent folyamatosan novekedne
    this.statok_hatasok_nelkul = {power:10,dexterity:10,defense:10,vitality:10,szint:1,magicfind:0};
    
    
    // aktiv es passziv skillek mivel szazalekosan adnak ezert a skill_id hoz van tarolva hogy melyik mennyit adott
    // ezek az ertekek az alap statok es a gear statok osszeadasa utan szmolodnak!
    this.statok_skillekbol = {
        
            power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0
    };

    
    /*
    this.skillek = {
        passziv:Array(1,2,3),
        aktiv:Array(4,5,6)
    };
    */
    
    // ezeket a skilleket ismeri tehat tanulhatja/hasznlhatja. passziv es aktiv is itt van
    this.hasznalhato_skillek = [];
    
    this.megtanult_skillek = [];
    
    // mindegyiknek itt kell lennie a masttol kapott bufofk miatt
    this.osszes_skill = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
    
    // 2-5 sizntig kap egyet aztan csak 10-15ig aztan 20-25 stb.
    // alapbol level1 en van naki 1 amivel a heal melle valaszthat valamit
    this.elkoltheto_skill_pontok = 1;
    
    // init utan ebbe kerulnek a kiszamolt plusz ertekek
    this.skillek_hatasok = [];
    
    // balkezben item id
    this.targy_balkezben = null;  // kez aoznosito 1
    this.targy_jobbkezben = null; // kez aoznosito 2
    
    this.balkez_eppen_ut = false;
    this.jobbkez_eppen_ut = false;
    
    this.utesTimeout_balkez = null;
    this.utesTimeout_jobbkez = null;
    
    // menteshez itt is tarolnunk kell az inventoryt a karilapot es a spelleket
    // egyzeruen az inventoryban levo targy_idk vannnak itt sorban
    this.inventory = [];
    
    // menteshez itt taroljjuk a karilapon levo cuccokat
    this.karakterlap = [];
    
    // menteshez itt taroljuk a portre skilleket
    this.portre_skillek = [];
    
    // statok targyak stb stb
    this.letrehozas = function(id,nev) {
        
        this.id = id;
        this.nev = nev;
        
        
        karakterek.push(this);
        

        //this.skillek_hatasok_szamolas();

        //this.skill_hasznalat(2);

        //this.skillek_hatasok_szamolas();
    }
    
    // az adott class tudja e hasznalni
    this.tudja_e_hasznalni = function(targy_id) {
        var tudja_e = true;
        var targyadatok = targyak.targyadatok(targy_id);
        
        var milyen_fegyvereket_tud_hasznalni = [];
        var milyen_pancelokat_tud_hasznalni = [];
        // class 1-Fanatic, 2- Heretic, 3-Paladin, 4-Warrior, 5-Sorcerer, 6- Thief, 7-Pathfinder, 8-Berserker
     
     //kard,ketkezes_kard,katana,scimitar,falchion,pajzs,ij,szamszerij,fejsze,kes,csephadaro,alabard,kalapacs,morningstar,vivobot,kasza,szigony,landzsa,csuzli,bot,palca
        if (this.osztaly == 1) { milyen_fegyvereket_tud_hasznalni = ["kard","ketkezes_kard","katana","scimitar","falchion","pajzs","ij","szamszerij","fejsze","kes","csephadaro","alabard","kalapacs","morningstar","vivobot","kasza","szigony","landzsa","csuzli","bot","palca"]; }
        if (this.osztaly == 2) { milyen_fegyvereket_tud_hasznalni = ["bot","palca","kes","csuzli"]; }
        if (this.osztaly == 3) { milyen_fegyvereket_tud_hasznalni = ["kard","ketkezes_kard","katana","scimitar","falchion","pajzs","ij","szamszerij","fejsze","kes","csephadaro","alabard","kalapacs","morningstar","vivobot","kasza","szigony","landzsa","csuzli","bot","palca"]; }
        if (this.osztaly == 4) { milyen_fegyvereket_tud_hasznalni = ["kard","ketkezes_kard","katana","scimitar","falchion","pajzs","ij","szamszerij","fejsze","kes","csephadaro","alabard","kalapacs","morningstar","vivobot","kasza","szigony","landzsa","csuzli","bot","palca"]; }
        if (this.osztaly == 5) { milyen_fegyvereket_tud_hasznalni = ["bot","palca","kes","csuzli"]; }
        if (this.osztaly == 6) { milyen_fegyvereket_tud_hasznalni = ["kes","kard","ij","szamszerij","csuzli"]; }
        if (this.osztaly == 7) { milyen_fegyvereket_tud_hasznalni = ["kes","kard","ij","szamszerij","csuzli"];  }
        if (this.osztaly == 8) { milyen_fegyvereket_tud_hasznalni = ["kard","ketkezes_kard","katana","scimitar","falchion","pajzs","ij","szamszerij","fejsze","kes","csephadaro","alabard","kalapacs","morningstar","vivobot","kasza","szigony","landzsa","csuzli","bot","palca"]; }
        
        if (this.osztaly == 1) { milyen_pancelokat_tud_hasznalni = ["plate","leather"]; }
        if (this.osztaly == 2) { milyen_pancelokat_tud_hasznalni = ["leather","cloth"]; }
        if (this.osztaly == 3) { milyen_pancelokat_tud_hasznalni = ["plate"]; }
        if (this.osztaly == 4) { milyen_pancelokat_tud_hasznalni = ["plate","leather"]; }
        if (this.osztaly == 5) { milyen_pancelokat_tud_hasznalni = ["cloth"]; }
        if (this.osztaly == 6) { milyen_pancelokat_tud_hasznalni = ["leather"]; }
        if (this.osztaly == 7) { milyen_pancelokat_tud_hasznalni = ["leather","cloth"]; }
        if (this.osztaly == 8) { milyen_pancelokat_tud_hasznalni = ["plate","leather"]; }
        
        if (targyadatok.fokategoria == "fegyver") {
            if (jQuery.inArray(targyadatok.alkategoria, milyen_fegyvereket_tud_hasznalni) == -1) {
                tudja_e = false;
            }
        }
        if (targyadatok.fokategoria == "pancel") {
            if (jQuery.inArray(targyadatok.pancel_anyaga, milyen_pancelokat_tud_hasznalni) == -1) {
                tudja_e = false;
            }
            
        }
        
        return tudja_e;
    }
    
    this.karakterlap_objektum_frissitese = function () {
        var karakterlap_tomb = new Array();
        
        var karekterlap_felszerelesek = $("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children();
        
        for (i=0;i<karekterlap_felszerelesek.length;i++) {
            var felszereles_hely = karekterlap_felszerelesek[i];
            if ($(felszereles_hely).html() != "") {
                // van itt valami 
                karakterlap_tomb.push($(felszereles_hely).children().attr("data-item-id"));
            } else {
                // ha nincs ott semmi akkor 0 at irunk bele
                karakterlap_tomb.push(0);
            }
            
        }
        
        this.karakterlap = karakterlap_tomb;
        //console.log(this.karakterlap);
    }
    
    // ezzel toltjuk fel loadgamebol a karilapot
    this.karakterlapra_item = function(targy_id,hely) {
        var karekterlap_felszerelesek = $("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children();
        
        var karekterlap_hely = karekterlap_felszerelesek[hely];
        
        var targyadatok = targyak.targyadatok(targy_id);
        
        $(karekterlap_hely).append('<img title="'+ targyadatok.targy_leirasa +'" class="item" data-item-id="'+ targyadatok.id +'" src="assets/items/'+targyadatok.kep_fajl+'">');
        $('.item').qtip(tooltip_options);

        //$( ".karakterlap_felszereles" ).droppable(karakterlap_felszereles_droppable_options);        
        
        
        // ha a kezobe rakjuk akkor atmasoljuk a skillbarra is!
        if ($(karekterlap_hely).attr("id") == "karakterlap_"+this.id+"_bal_kez") {
            $("#karakter_"+(this.id)+"_kez_1").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');  
        }
        if ($(karekterlap_hely).attr("id") == "karakterlap_"+this.id+"_jobb_kez") {
            $("#karakter_"+(this.id)+"_kez_2").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');  
        }
        

        
    }
    
        
    this.portre_skillek_objektum_frissitese = function () {
        var portre_skillek_tomb = new Array();
        var portre_skillek = $("#portre_skill_ikonok_" + this.id).children(".portre_skill_egy_ikon");
        
        
                  
        for (i=0;i<portre_skillek.length;i++) {
            var portre_skill = portre_skillek[i];
            
            if ($(portre_skill).html() != "") {
                // van itt valami 
                //console.log($(portre_skill).children().attr("data-skill-id"));
                portre_skillek_tomb.push($(portre_skill).children().attr("data-skill-id"));
            } else {
                // ha nincs ott semmi akkor 0 at irunk bele
                portre_skillek_tomb.push(0);
            }
        };
        this.portre_skillek = portre_skillek_tomb;
        //console.log(this.portre_skillek);
    }
    
    this.inventory_objektum_frissitese = function () {
        var inventory_tomb = new Array();
        var taska_helyek = $("#inventory_" + this.id).children("#inventory_elemek").children();
                     
        for (i=0;i<taska_helyek.length;i++) {
            var taska_hely = taska_helyek[i];
            
            if ($(taska_hely).html() != "") {
                // van itt valami 
                inventory_tomb.push($(taska_hely).children().attr("data-item-id"));
            } else {
                // ha nincs ott semmi akkor 0 at irunk bele
                inventory_tomb.push(0);
            }
        };
        this.inventory = inventory_tomb;
        //console.log(this.inventory);
    }
    
    this.benne_van_a_skill_a_hatasaokban = function (skill_id) {
        var ret = {benne_van:0,hanyadik:0};
        
        for (var j=0;j<this.skillek_hatasok.length;j++) {
            if (this.skillek_hatasok[j].skill_id == skill_id) {
                ret.benne_van = 1;
                ret.hanyadik = j;
                break;
            }
                    
         }
         
         return ret;
    }
    
    // feltoltjuk a skill hatasok tombot a katater skilljeivel
    // minden tipusu skillhez adunk hatasokat mert pl lehet egy aktiv skill ami egyben buffot is ad!
    this.skillek_init = function() {
        // itt meg teljhesen ures a hatasok tomb
        
        // ezt egy masikbol kell feltoltnei mert a hatasok kozott szerlepenie kell az altala nem hasznalhato skilleknek is.
        // pl ha buffot kap mastol
        for (var i=0;i<this.osszes_skill.length;i++) {
            var skill_id = this.osszes_skill[i];
            
            // buff_bekapcsolt: ha 1 akkor eppen aktivalodott egy buff amit nem o nyomott el hanem kondicioktol fugg
            var mit = {skill_id:skill_id,mikor_aktivalta:"",power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0,hp:0,buff_lejart:0,buff_bekapcsolt:0,forras_karakter_id:this.id};
            
            
            this.skillek_hatasok.push(mit);
            
        }

    }
    
    this.skill_hasznalat_celpont_valasztas = function(skill_id,forras_karakter_id) {
        var skill_adatok = skillek.skill_adatok(skill_id);
        
        var hatasok_index = this.skillek_hatasok_index(skill_id);
        // megnezzuk nincs e CD n a skill
        if (this.skillek_hatasok[hatasok_index].mikor_aktivalta != "") {
            //CD n van nem hasznalhatja
            hang_lejatszas(38,{pan:0,volume:40});
            info_szoveg("This skill is on cooldown.");
            return;
        }
        
        
        info_szoveg(skill_adatok.nev + ': Select your target!');   
        
        $("body").css("cursor","crosshair");
        
        var that = this;
        $(".portre_kep").unbind('click');
        $(".portre_kep").click(function(){
            $("body").css("cursor","auto");
            $(".portre_kep").unbind('click');
            
            that.portre_kep_listener();
            
            var celpont_karakter_id = $(this).attr("data-id");
            
            that.skill_hasznalat(skill_id,celpont_karakter_id,forras_karakter_id);
        });
    }
    
    // ha a jatek.php ban elnyom egy skillt. celpont_karakter_id-gyogyitasnal erre a karira nyomja
    // forras_karakter_id- a skill frorasa. olyan bufofknal amik pl mindekire hatnak!
    this.skill_hasznalat = function(skill_id,celpont_karakter_id,forras_karakter_id) {
        //console.log(this.id);
        //console.log("skill hasznalat");
        
        // halottan nem hasznalhatja
        if (this.hp <= 0) {
            return false;
        }
        
        mozgas_logolas("SKILLT HASZNAL skill_id:" + skill_id);
        
        var hatasok_index = this.skillek_hatasok_index(skill_id);
        
        this.skillek_hatasok[hatasok_index].forras_karakter_id = forras_karakter_id;
        
        var skill_adatok = skillek.skill_adatok(skill_id);
        
        // passzivot nem hasznalhat
        if (skill_adatok.tipus == "passziv") {
            return false;
        }
        
        //console.log("this.skillek_hatasok[hatasok_index]");
        //console.log(this.skillek_hatasok[hatasok_index]);
        
        // megnezzuk nincs e CD n a skill
        //console.log("this.skillek_hatasok[hatasok_index]:");
        //console.log(this.skillek_hatasok[hatasok_index]);
        if (this.skillek_hatasok[hatasok_index].mikor_aktivalta != "") {
            //CD n van nem hasznalhatja
            hang_lejatszas(38,{pan:0,volume:40});
            info_szoveg("This skill is on cooldown.");
            return false;
        }
        
        
        
        // ki van rakva a skillbarra?
        // ha a forras karakter o maga akkor kint kell lennie a skillbaorn hogy hasznalhassa
        // ha valaki mas a foras akkor nem kell kintlennie, sot a hasznalhato skillek kozott sem kell lennie!
        if (forras_karakter_id == this.id) {
            if (!this.ki_van_rakva_a_skillbarra(skill_id)) {
                // ha nincs kirakva nem nyomhatja el
                return false;
            }
            
            // mana kezeles
            // csak attol vonjuk le aki elnyomta

            if ((this.mana - skill_adatok.mana) >= 0) {
                this.mana -= skill_adatok.mana;
                var mennyi_mana_maradt_szazalekban = parseInt((this.mana/this.max_mana)*119);
                this.mana_csik_animalas(mennyi_mana_maradt_szazalekban);
                
            } else {
                hang_lejatszas(38,{pan:0,volume:50}); 
                info_szoveg("Not enough mana to use that skill.");
                return false;
            }
            
        }
        
        //console.log("skill hasznalat, skillid:" + skill_id);
        
        //console.log("celpont_karakter_id:" + celpont_karakter_id);
        
        
        //console.log(skill_adatok);
        
        
        
        
        
        
        

        // meg kell nezni tenyleg elnyomhatja e!
        
        
        var skillekhez_karakteradatok_adatok = {karakter_id:this.id,power:this.statok_hatasok_nelkul.power,dexterity:this.statok_hatasok_nelkul.dexterity,defense:this.statok_hatasok_nelkul.defense,vitality:this.statok_hatasok_nelkul.vitality,szint:this.statok_hatasok_nelkul.szint,magicfind:this.statok_hatasok_nelkul.magicfind,hp:this.hp,max_hp:this.max_hp,hanyadik_sorban_van:this.hanyadik_sorban_van}
        
        var hatasok_index = this.skillek_hatasok_index(skill_id);
        
        //console.log("hatasok_index" + hatasok_index);
        //console.log("this.skillek_hatasok:");
        //console.log(this.skillek_hatasok);
        
        //console.log(this.id);
        //console.log(skillekhez_karakteradatok_adatok);
        
        var valasz = skillek.skill_inditasa(skill_id,skillekhez_karakteradatok_adatok,this.skillek_hatasok[hatasok_index]);    
        
        //console.log("hatasok_index" + hatasok_index);
        //console.log("this.skillek_hatasok:");
        //console.log(this.skillek_hatasok);
        
        //console.log(valasz);
        
        //console.log("hatasok_index" + hatasok_index);
        //console.log("this.skillek_hatasok:");
        //console.log(this.skillek_hatasok);  
        this.skillek_hatasok[hatasok_index] = valasz;
        
        //console.log(this.skillek_hatasok[hatasok_index]);



        // megnezzuk, hogy a skill baron hol van a skill, azt is ha otbb helyen van!! es elfedjuk
        var mikor_hasznalhato_ujra = skill_adatok.cd+(skill_adatok.mennyi_ideig_marad_aktiv*1000);
    
    
        var elemek = $("#portre_skill_ikonok_" + this.id).children();
        //console.log(elemek.length);
        for (var i=0;i<elemek.length;i++) {
            if ($(elemek[i]).html() != "") {
                // van benne skill
                var portre_skill_id = $(elemek[i]).children().attr("data-skill-id");
                var div_pozicio = $(elemek[i]).position();
                if (portre_skill_id == skill_id) {
                    // ezen a helyen ott van az adott skill
                    var melyik_ikon_hely = $(elemek[i]).attr("id");
                    
                    //console.log("melyik_ikon_hely:" + melyik_ikon_hely);
                    
                    
                    // teszunk ra egy fedot:
                    // de csak akkor ha nem passziv skill mert annak nincs cd je!
                    
                    if (skill_adatok.tipus != "passziv") {
                        //$("#portre_skill_ikonok_"+karakter_adatok.karakter_id).append("<div class='skill_fedo' id='portre_skill_fedo_"+karakter_adatok.karakter_id+"_"+skill_id_kulso+"_fedo'></div>");
                        $("#"+melyik_ikon_hely).append("<div class='skill_fedo' id='portre_skill_fedo_"+this.id+"_"+skill_id+"_fedo'></div>");
                        //
                        $("#portre_skill_fedo_"+this.id+"_"+skill_id+"_fedo").css("left",0) ;
                        $("#portre_skill_fedo_"+this.id+"_"+skill_id+"_fedo").css("top",0) ;
                        
                        // csak akkro jon le ha lejart a cd:
                        
                        var that = this;
                        
                        var skill_cd_Interval = setInterval(function() {
                            //$("#karakter_"+that.id+"_kez_"+melyik_kez).children("div.utes_tiltva").hide();
                            //$("#karakter_"+that.id+"_kez_"+melyik_kez).children("div.utes_sikeres").hide();
                            
                            // lszedjuk a fedot
                            $("#portre_skill_fedo_"+that.id+"_"+skill_id+"_fedo").remove();
                            
                            // a skill hatasok ban a mikor aktivalta "" lesz:
                            that.skillek_hatasok[hatasok_index].mikor_aktivalta = "";
                            
                            //if (melyik_kez == 1) { that.balkez_eppen_ut = false; }
                            //if (melyik_kez == 2) { that.jobbkez_eppen_ut = false; }
                            clearInterval(skill_cd_Interval);
                        },mikor_hasznalhato_ujra); 
                        
                    }
                    
                }
                
                
                
                
            }
            //console.log($(elemek[i]).html());
        }
        
        // hozzadjuk a domhoz ha buff

        if (skill_adatok.tipus == "buff" || skill_adatok.tipus == "passziv" ) {
            this.buff_hozzadas_a_domhoz(skill_adatok.ikon,skill_id);
            
        }

        // ha debuffot is ad az ellensegre:
        if (typeof valasz.enemy_damage !== "undefined" || typeof valasz.enemy_power !== "undefined" || typeof valasz.enemy_defense !== "undefined") {
            this.debuff_ellensegre(skill_id,valasz);
        }
        
        
        // ha aktiv skill akkor sebzunkvele:  csak akkor sebez ha sebzo aktoiv skill 
        if (skill_adatok.tipus == "aktiv" && skill_adatok.alap_sebzes != 0) {
            this.sebzes_skillel(skill_id,valasz.mennyit_sebzett);    
        }
        
        
        
        
        // gyogyittasnal atadjuk azt is hogy kire nyomta:
        if (skill_adatok.tipus == "gyogyitas") {
            this.gyogyitas_skillel(skill_id,valasz.mennyit_sebzett,celpont_karakter_id);    
        }
        
        

        // a calpont kari id 99 lesz, hogy ne fusson le a vizsgalat a tobbi kari objetumon
        
        // ha a forras nyomja el a skillt akkor tovabbadja a tobbi karinak ha kell!
        
        //console.log("forras_karakter_id:" + forras_karakter_id + " this.id:" + this.id);
        if (forras_karakter_id == this.id) {
            if (skill_adatok.mindenki_megkapja == "mindenki") {
                for (var i=0;i<karakterek.length;i++) {
                    if (karakterek[i].id != this.id) {
                        karakterek[i].skill_hasznalat(skill_id,0,forras_karakter_id);    
                    }
                    
                }
            }
            
            // minden kari megkapja a buffot kiveve az indito kari:
            if (skill_adatok.mindenki_megkapja == "mindenki_kiveve_caster") {
                // minden masik kari is megkapja
                for (var i=0;i<karakterek.length;i++) {
                    if (karakterek[i].id != this.id) {
                        karakterek[i].skill_hasznalat(skill_id,0,forras_karakter_id);      
                    } else {
                        // az inditorol leszedjuk:
                        this.buff_eltavaolitasa_a_dombol(skill_id);
                        //var alap = {skill_id:skill_id,mikor_aktivalta:"",power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0,hp:0,buff_lejart:1,buff_bekapcsolt:0,forras_karakter_id:this.id};
                        var alap = {skill_id:skill_id,mikor_aktivalta:"",power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0,hp:0,buff_lejart:1,buff_bekapcsolt:0,forras_karakter_id:this.id};
                        this.skillek_hatasok[hatasok_index] = alap;        
                    }
                    
                }
                
            }  
            
            // indito kapja a buffot es a mellette allo
            if (skill_adatok.mindenki_megkapja == "caster_es_mellette_allo") {
                for (var i=0;i<karakterek.length;i++) {
                    if (karakterek[i].hanyadik_sorban_van == this.hanyadik_sorban_van && karakterek[i].id != this.id) {
                        karakterek[i].skill_hasznalat(skill_id,0,forras_karakter_id);
                    } else {
                        // mindekirol leszedjuk aki nem a caster kari mellett all:
                        //this.buff_eltavaolitasa_a_dombol(skill_id);
                        //var alap = {skill_id:skill_id,mikor_aktivalta:"",power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0,hp:0,buff_lejart:1,buff_bekapcsolt:0,forras_karakter_id:this.id};
                        //this.skillek_hatasok[hatasok_index] = alap;        
                    }
                    
                }
                
            }  
        

        }
        
        
        
        // ha elnyomott valamit akkor egybol ellenorizunk. mert ez egyebkent csak fel mp kent fut magatol a karakter tick
        if (skill_adatok.tipus != "aktiv" && skill_adatok.tipus != "gyogyitas" ) {
            this.skillek_hatasok_szamolas();    
        }
        
        this.statok_ujraszamolas();
        
        
        
        
        
    }
    
    // visszadja a skillek_hatasok tombbol azt az indexet ahol a skillnek megfelelo hatas van
    this.skillek_hatasok_index = function(skill_id) {
        var ret = ""; 
        // vegigmegyuk a hatasokon es kivalsztjuk azt amiben az adott ksill van
        for (var i=0;i<this.skillek_hatasok.length;i++) {
            if (this.skillek_hatasok[i].skill_id == skill_id) {
                ret = i;
                break;
            }
        }
        
        return ret;
    }
    
    this.ki_van_rakva_a_skillbarra = function(skill_id) {
        var ret = false;
        var portre_skillek = $("#portre_skill_ikonok_" + this.id).children(".portre_skill_egy_ikon");
        for (var k=0; k<portre_skillek.length; k++) {
            var portre_skill = portre_skillek[k];
            
            if ($(portre_skill).html() != "") {
                    //console.log($(portre_skill).children().attr("data-skill-id"));
                if ($(portre_skill).children().attr("data-skill-id") == skill_id) {
                    ret = true;
                    break;
                }
            }
        }
        //console.log("skill:id:" + skill_id + " kivanrakva:" +ret);
        
        return ret;
    }
    
    this.skillek_hatasok_szamolas = function() {
        
        //this.statok_ujraszamolas();
        
        //console.log("---- skillek_hatasok_szamolas function eleje ----");
        //console.log(" skillek_hatasok for elott:");
        //console.log(this.skillek_hatasok);
        
        // vegigmegyunk a skillen es kiszmoljuk a hatasaikat

        for (var i=0;i<this.osszes_skill.length;i++) {
            var skill_adatok = skillek.skill_adatok(this.osszes_skill[i]);
            
            // aktiv skilleket nem futtatjuk. azok csak a hasnzalatkor futnak le egyszer!
            if (skill_adatok.tipus == "aktiv" || skill_adatok.tipus == "gyogyitas" ) {
                continue;
            }
            
            //console.log(i);
            //console.log("this.skillek[i]" + this.skillek[i]);
            var hatasok_index = this.skillek_hatasok_index(this.osszes_skill[i]);
            
            //console.log("this.skillek_hatasok[hatasok_index].forras_karakter_id:" + this.skillek_hatasok[hatasok_index].forras_karakter_id);
            //console.log("this.id:" +this.id);            
            // ha a forras sajat maga akkor kint kell lennie a skillbaron! ha mas a forras akkor nem kell kintlennie
            if (this.id == this.skillek_hatasok[hatasok_index].forras_karakter_id) {
                // ha nincs a skill kirakva a skilbarra akkor leszedjuk a buff ikont es a hatasokat is 0 ra irjuk!
                if (!this.ki_van_rakva_a_skillbarra(this.osszes_skill[i])) {
                    // ha nincs kirakva akkor leszedjuk de csak akkor ha nem egy  mindekki megkapja tipusu buff az kirakas nelkul is fent lehet
                    this.buff_eltavaolitasa_a_dombol(this.osszes_skill[i]);
                    var alap = {skill_id:this.osszes_skill[i],mikor_aktivalta:"",power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0,hp:0,buff_lejart:1,buff_bekapcsolt:0,forras_karakter_id:this.id};
                    this.skillek_hatasok[hatasok_index] = alap;
                    
                    continue;  
                }
                
            }
            
            
            var skillekhez_karakteradatok_adatok = {karakter_id:this.id,power:this.statok_hatasok_nelkul.power,dexterity:this.statok_hatasok_nelkul.dexterity,defense:this.statok_hatasok_nelkul.defense,vitality:this.statok_hatasok_nelkul.vitality,szint:this.statok_hatasok_nelkul.szint,magicfind:this.statok_hatasok_nelkul.magicfind,hp:this.hp,max_hp:this.max_hp,hanyadik_sorban_van:this.hanyadik_sorban_van};
            
            //console.log("this.statok.power" + this.statok.power);
            
            var valasz = skillek.skill_futtatasa(this.osszes_skill[i],skillekhez_karakteradatok_adatok,this.skillek_hatasok[hatasok_index]);
            
            //console.log(valasz);
            
            if (valasz.buff_lejart == 1) {
                this.buff_eltavaolitasa_a_dombol(this.osszes_skill[i]);
                //valasz.buff_lejart = 2;
            }
            if (valasz.buff_bekapcsolt == 1) {
                this.buff_hozzadas_a_domhoz(skill_adatok.ikon,this.osszes_skill[i]);
                valasz.buff_bekapcsolt = 0;
            }
            this.skillek_hatasok[hatasok_index] = valasz;

            
            
            
                //console.log("skill_adatok:");
                //console.log(skill_adatok);
                
                //console.log(" skillek_hatasok 3333:");
                //console.log(this.skillek_hatasok);
                
                
                //var valasz = skillek.skill_futtatasa(this.skillek[i],skillekhez_karakteradatok_adatok);
                
                //console.log(" skillek_hatasok 22222:");
                //console.log(this.skillek_hatasok);
                
                
                
                //console.log(this.skillek_hatasok);
                
                
                //console.log("skillid:" + this.skillek[i] + " hatasok_index" + hatasok_index);
                //console.log("skillid:" + this.skillek[i]);
                
                //console.log(" skillek_hatasok 11111:");
                //console.log(this.skillek_hatasok);
                            
                //console.log("ezmi");
                
                
                //console.log(" skillek_hatasok valasz elott:");
                //console.log(this.skillek_hatasok);
                
                //csak azokon szamolunk hatast ami be van teve a skillslotba! a psszivokat is be kell tenni! 
                

                
                
                
                
            
            
            

        }        
        
        
        //console.log(this.skillek_hatasok[0]);
        
        //console.log("console.log(this.skillek_hatasok):");
        //console.log(this.skillek_hatasok);
    }
    
    this.tick = function() {
        this.statok_ujraszamolas();
        
        this.skillek_hatasok_szamolas();
        
        this.harcban_van_e();
        
        // vegigmegyunk a skilleken es a Skillek objektumnak megfeleloen kezlejuk oket
        /*
        for (var i=0;i<this.skillek.passziv.length;i++) {
            var skill_adatok = skillek.skill_adatok(this.skillek.passziv[i]);
            var skillekhez_karakteradatok_adatok = {power:this.statok.power,dexterity:this.statok.dexterity,defense:this.statok.defense,vitality:this.statok.vitality,szint:this.statok.szint,magicfind:this.statok.magicfind,hp:this.hp}
            var valasz = skillek.skill_futtatasa(this.skillek.passziv[i],skillekhez_karakteradatok_adatok);
            
            if (typeof valasz !== "undefined") {
                //console.log(valasz.power);
                this.statok.power = valasz.power;
                this.statok.dexterity = valasz.dexterity;
                this.statok.defense = valasz.defense;
                this.statok.vitality = valasz.vitality;
                this.statok.magicfind = valasz.magicfind;
                this.hp = valasz.hp;
                
                //console.log( this.statok.power);
                
                this.statok_ujraszamolas();
            }
        }
        */
    }
    
    this.harcban_van_e = function() {
        // megnezzuk van e olyan enemy ami mellettuk all ha igen akkor harcban van egyebkent megnezzuk van eolyan enemy ami koveti a jatekost ha igen akkor harcban van ha nincs akkor nincs
        var harcban_van = 0;
        
        for(var i=0;i<ellensegek.length;i++) {
            if (ellensegek[i].milyen_messze_van_a_jatekostol() <= 100) {
                harcban_van = 1;
                break;
            } else {
                if (ellensegek[i].koveti_a_jatekost === true) {
                    harcban_van = 1;    
                    break;
                }
            }
        }
        
        this.harcban_van = harcban_van;
        
    }
    
    
    
    this.getFaj = function() {
        if (this.faj == 1) { return "Human male"; }
        if (this.faj == 2) { return "Human female"; }
        if (this.faj == 3) { return "Dwarf male"; }
        if (this.faj == 4) { return "Dwarf female"; }
        if (this.faj == 5) { return "Fallen male"; }
        if (this.faj == 6) { return "Fallen female"; }
    }
    
    
    this.getOsztaly = function() {
        if (this.osztaly == 1) { return "Fanatic"; }
        if (this.osztaly == 2) { return "Heretic"; }
        if (this.osztaly == 3) { return "Paladin"; }
        if (this.osztaly == 4) { return "Warrior"; }
        if (this.osztaly == 5) { return "Sorcerer"; }
        if (this.osztaly == 6) { return "Thief"; }
        if (this.osztaly == 7) { return "Pathfinder"; }
        if (this.osztaly == 8) { return "Berserker"; }
       
    }
    
    // mindne olyan adatot kiolvasunk amit menteskor vissz akarunk tolteni es ebben az osztalyban this.valtozokent van definialva
    this.adatok_beolvasasa_mentesbol = function(adatok) {
        this.statok_alapertekek.power = this.statok.power = adatok.statok_alapertekek.power;
        this.statok_alapertekek.dexterity = this.statok.dexterity  = adatok.statok_alapertekek.dexterity;
        this.statok_alapertekek.defense = this.statok.defense  = adatok.statok_alapertekek.defense;
        this.statok_alapertekek.vitality = this.statok.vitality  = adatok.statok_alapertekek.vitality;

        this.xp = adatok.xp;
        this.szint = adatok.szint;
        this.hp = adatok.hp;
        this.mana = adatok.mana;
        this.kep = adatok.kep;
        this.faj = adatok.faj;
        this.osztaly = adatok.osztaly;
        this.penz = adatok.penz;
        
        this.elkoltheto_skill_pontok = adatok.elkoltheto_skill_pontok;
        this.megtanult_skillek = adatok.megtanult_skillek;
        
        // az osztalynak megfeleloen beallitjuk a skilleket:
        // class 1-Fanatic, 2- Heretic, 3-Paladin, 4-Warrior, 5-Sorcerer, 6- Thief, 7-Pathfinder, 8-Berserker
        if (this.osztaly == 1) { this.hasznalhato_skillek = [1,2,29,30,31]; }
        if (this.osztaly == 2) { this.hasznalhato_skillek = [18,3,36,17,12,19,16,15,14]; }
        if (this.osztaly == 3) { this.hasznalhato_skillek = [20,9,4,21,22,25,23,24]; }
        if (this.osztaly == 4) { this.hasznalhato_skillek = [6,7,8,10,11,13]; }
        if (this.osztaly == 5) { this.hasznalhato_skillek = [5,26,34,28,32,33,27,35]; }
        if (this.osztaly == 6) { this.hasznalhato_skillek = []; }
        if (this.osztaly == 7) { this.hasznalhato_skillek = []; }
        if (this.osztaly == 8) { this.hasznalhato_skillek = []; }

        this.skillek_init();

        // beallitjuk a max manat:
        if (this.osztaly == 1 || this.osztaly == 3 || this.osztaly == 4  || this.osztaly == 6 || this.osztaly == 7  || this.osztaly == 8 ) { this.max_mana = 100; }
        if (this.osztaly == 2 || this.osztaly == 5 ) { this.max_mana = 200; }
        // a csikot hozzaigazitjuk:
        
        

        
        
        // beallitjuk a max HP t:
        this.max_hp = this.max_hp_mennyi();
        
        
        // elindul a tick
        var that = this;
        setInterval(function(){
            that.tick();
        },500);
        
        // elindul a manaregen ami masodpercenkent fut
        setInterval(function(){
            that.mana_regeneralas();
        },1000);
        
        
    }
    
    this.mana_regeneralas = function() {
        
        if (this.mana < this.max_mana && this.harcban_van == 0) {
            this.mana += this.max_mana * (this.mana_regen/100);
            
            var mennyi_mana_maradt_szazalekban = parseInt((this.mana/this.max_mana)*119);
            this.mana_csik_animalas(mennyi_mana_maradt_szazalekban);
            
            //console.log(this.mana);
        }
    }
    
    this.adatok_beolvasasa_chargenbol = function(adatok) {
        this.statok_alapertekek.power = this.statok.power = adatok.stat_power;
        this.statok_alapertekek.dexterity = this.statok.dexterity  = adatok.stat_dexterity;
        this.statok_alapertekek.defense = this.statok.defense  = adatok.stat_defense;
        this.statok_alapertekek.vitality = this.statok.vitality  = adatok.stat_vitality;
        
        this.faj = adatok.faj;
        this.osztaly = adatok.osztaly;
        this.kep = adatok.kep;
        
        // beallitjuk a max manat:
        if (this.osztaly == 1 || this.osztaly == 3 || this.osztaly == 4  || this.osztaly == 6 || this.osztaly == 7  || this.osztaly == 8 ) { this.max_mana = 100; }
        if (this.osztaly == 2 || this.osztaly == 5 ) { this.max_mana = 200; }
        
        this.mana = this.max_mana;
        
        // a max hpt:
        this.max_hp = 100 + (this.statok.vitality*2);
        this.hp = this.max_hp;
        
    }
    
    this.buff_hozzadas_a_domhoz = function(ikon,skill_id){
        // megnezzuk hozza lett e mar adva:
        
        if ($("#karakter_"+this.id+"skill_"+skill_id).length > 0) {
            // mar ott van
        } else {
            var dom = '<div class="egy_buff" id="karakter_'+this.id+'skill_'+skill_id+'"><img width="20" src="'+ikon+'"></div>';
            $("#buffok_" +this.id).append(dom);
        }
        
    }
    
    this.buff_eltavaolitasa_a_dombol = function(skill_id){
        // megnezzuk hozza lett e mar adva:
        
        if ($("#karakter_"+this.id+"skill_"+skill_id).length > 0) {
            // ott van
            $('#karakter_'+this.id+'skill_'+skill_id).remove();
        }
        
    }
    
    this.hozzadas_a_domhoz = function() {
        
        var portre_kep = this.kep;
        if (this.hp <= 0) {
            portre_kep = 'assets/images/skull_portre_kicsi.png';
        }
        
        
        
        
        var karakter_dom = '';
        karakter_dom += '<div class="portre" data-id="'+this.id+'">';
        karakter_dom += '<div class="portre_kep" data-id="'+this.id+'">';
        karakter_dom += '<div class="portre_kep_kep" id="portre_kep_'+this.id+'"><img width="40" src="'+portre_kep+'"></div>';
        karakter_dom += '<div class="portre_kep_szint" id="portre_kep_szint_'+this.id+'">'+this.szint+'</div>';
        karakter_dom += '</div>';
        karakter_dom += '<div class="portre_nev" data-id="'+this.id+'">'+this.nev+'</div>';
        karakter_dom += '<div class="hp_es_mana"><div class="hp_szam" id="hp_szam_'+this.id+'">'+this.hp+'/'+this.max_hp+'</div><div class="mana_szam" id="mana_szam_'+this.id+'">'+this.mana+'/'+this.max_mana+'</div>';
        karakter_dom += '<div id="hp_'+this.id+'" class="hp_bar"></div>';
        karakter_dom += '<div id="mana_'+this.id+'" class="mana_bar"></div>';
        karakter_dom += '</div>';
        karakter_dom += '<div class="kezek_hatter">';
        karakter_dom += '<div class="kez1" data-karakter-id="'+this.id+'" id="karakter_'+this.id+'_kez_1"></div>';
        karakter_dom += '<div class="kez1" data-karakter-id="'+this.id+'" id="karakter_'+this.id+'_kez_2"></div>';
        karakter_dom += '</div>';
        karakter_dom += '<div class="portre_ikonok">';
        karakter_dom += '<div data-id="'+this.id+'" class="portre_ikon_karakterlap"><img width="20" src="assets/images/ikon_karakterlap.png"></div>';
        karakter_dom += '<div data-id="'+this.id+'" class="portre_ikon_inventory"><img width="20" src="assets/images/ikon_inventory.png"></div>';
        karakter_dom += '<div data-id="'+this.id+'" class="portre_ikon_skills"><img width="20" src="assets/images/ikon_skills.png"></div>';
        karakter_dom += '<div data-id="'+this.id+'" class="portre_ikon_abilities"><img width="20" src="assets/images/ikon_abilities.png"></div>';
        karakter_dom += '</div>';
        karakter_dom += '<div class="portre_skill_ikonok" data-karakter-id="'+this.id+'" id="portre_skill_ikonok_'+this.id+'">';
        
        
        
        if (this.osztaly == 1 || this.osztaly == 3 || this.osztaly == 4 || this.osztaly == 6 ||  this.osztaly == 7 ||  this.osztaly == 8) {
            // csak 2 skillje lehet
            karakter_dom += '<div class="portre_skill_kitolto2"></div>';
            karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_1"></div>';
            karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_2"></div>';
            //karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_3"></div>';

        } else {
            karakter_dom += '<div class="portre_skill_kitolto"></div>';
            karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_1"></div>';
            karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_2"></div>';
            karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_3"></div>';
            //karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_4"></div>';
            //karakter_dom += '<div class="portre_skill_egy_ikon" id="portre_skill_'+this.id+'_5"></div>';
        }
        
        karakter_dom += '</div>';
        karakter_dom += '<br class="clear"><div class="buffok" id="buffok_'+this.id+'"></div><div class="debuffok"></div>';
        karakter_dom += '</div>';
        
        
        
        $("#portre_kontener").append(karakter_dom);
        
        
        
                
        // a karihoz tartozo karakterlapot is felvesszuk!
        var karakterlap_dom = '';
        karakterlap_dom += '<div class="karekterlap_hatter" id="karekterlap_'+this.id+'">';
        karakterlap_dom += '<div class="lapok_dragndrop"></div>';
        karakterlap_dom += '<div class="lapok_bezar" data-id="karekterlap_'+this.id+'"></div>';
        karakterlap_dom += '<div id="karekterlap_felszerelesek" data-karakter-id="'+ this.id +'">';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_fej" id="karakterlap_'+this.id+'_fej"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_nyak" id="karakterlap_'+this.id+'_nyak"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_torzs" id="karakterlap_'+this.id+'_torzs"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_bal_kez" id="karakterlap_'+this.id+'_bal_kez"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_jobb_kez" id="karakterlap_'+this.id+'_jobb_kez"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_gyuru1" id="karakterlap_'+this.id+'_gyuru1"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_gyuru2" id="karakterlap_'+this.id+'_gyuru2"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_kesztyu" id="karakterlap_'+this.id+'_kesztyu"></div>';
        karakterlap_dom += '<div class="karakterlap_felszereles karakterlap_cipo" id="karakterlap_'+this.id+'_cipo"></div>';
        karakterlap_dom += '</div>';
        karakterlap_dom += '<div id="karakterlap_portre"><img src="'+this.kep+'" width="80"><br>'+this.nev+'<br>Level <span id="karakter_'+this.id+'_szint">'+ this.szint +'</span><br>'+ this.getFaj() +'<br>'+this.getOsztaly()+'<br>XP: <span id="karakter_'+this.id+'_xp">'+this.xp+'</span></div>';
        karakterlap_dom += '<div id="karakterlap_statok">';
        karakterlap_dom += '<div class="karakterlap_stat_sor">Power: '+this.statok.power+'</div>';
        karakterlap_dom += '<div class="karakterlap_stat_sor">Dexterity: '+this.statok.dexterity+'</div>';
        karakterlap_dom += '<div class="karakterlap_stat_sor">Defense: '+this.statok.defense+'</div>';
        karakterlap_dom += '<div class="karakterlap_stat_sor">Vitality: '+this.statok.vitality+'</div>';
        karakterlap_dom += '<div class="karakterlap_stat_sor">Magic find: '+this.statok.magicfind+'%</div>';
        karakterlap_dom += '<div class="karakterlap_stat_sor">Mana regen: '+this.mana_regen+'%</div>';
        karakterlap_dom += '</div>';
        karakterlap_dom += '<div class="karakterlap_szintlepes" id="karakterlap_szintlepes_'+ this.id+'">';
        karakterlap_dom += '</div>';
        karakterlap_dom += '</div>';
        
        $("body").append(karakterlap_dom);
        
        // dom letrehozas utan megnezzuk lepett e sizntet:
        // mert be kell allitani a portren a level up feliratot
        // egyben visszakapjuk azt is hogy lepett es es mennyit
        var szintlepes = this.lepett_e_szintet();
        //var ret = {lepett_e:0,mennyit:0,mennyi_pontot_oszthat:0};
        
        
        // ha volt sizntlepes beallitjuk a vezerlokhoz tartozo eventeket
        // es a domot is itt adjuk hozza
        if (szintlepes.lepett_e == 1) {
            this.szintlepes_kezelok();
            
            
        }       
        
        

        // skills:
        var karakterspells_dom = ''; 
        karakterspells_dom += '<div class="skills_hatter"  id="skills_'+this.id+'">'; 
        karakterspells_dom += '<div class="lapok_dragndrop"></div>'; 
        karakterspells_dom += '<div class="lapok_bezar" data-id="skills_'+this.id+'"></div>'; 
        //karakterspells_dom += '<div id="skill_szintek_szoveg_kulso"><div id="skill_szintek_szoveg">aa</div></div>'; 
        karakterspells_dom += '<div class="skill_szovegek">'; 
        karakterspells_dom += '<div class="skill_szoveg_passziv"></div>'; 
        karakterspells_dom += '<div class="skill_szoveg_buff"></div>'; 
        karakterspells_dom += '<div class="skill_szoveg_aktiv"></div>'; 
        karakterspells_dom += '</div>'; 
        karakterspells_dom += '<div id="skill_szintek_szoveg1">1</div>'; 
        karakterspells_dom += '<div id="skill_szintek_szoveg2">5</div>'; 
        karakterspells_dom += '<div id="skill_szintek_szoveg3">15</div>'; 
        karakterspells_dom += '<div id="skill_szintek_szoveg4">30</div>'; 
        karakterspells_dom += '<div id="skill_szintek_szoveg5">50</div>'; 
        karakterspells_dom += '<div class="skills_elemek" data-karakter-id="'+this.id+'">'; 
        for (var i=1; i<=20; i++) {
            karakterspells_dom += '<div class="egy_skills_hely" id="skills_hely_'+this.id+'_'+i+'"></div>'; 
        }
        karakterspells_dom += '</div>'; 
        karakterspells_dom += '<div class="skill_kolthet_szoveg">You have <span id="elkoltheto_skill_pont_'+this.id+'">'+ this.elkoltheto_skill_pontok +'</span> skill points to spend.</div>'; 
        karakterspells_dom += '</div>'; 
        
        $("body").append(karakterspells_dom);
        
        this.skillek_feltoltese();
        
        
        
        // karakterhez tartozo inventory:
        var karakterinv_dom = '';      
        karakterinv_dom += '<div class="inventory_hatter"  id="inventory_'+this.id+'">';
        karakterinv_dom += '<div class="lapok_dragndrop"></div>';
        karakterinv_dom += '<div class="lapok_bezar" data-id="inventory_'+this.id+'"></div>';
        karakterinv_dom += '<div id="inventory_elemek" data-karakter-id="'+ this.id +'">';
        for (var i=1; i<=48; i++) {
            karakterinv_dom += '<div class="egy_taskahely" id="taskahely_'+this.id+'_'+i+'"></div>';    
        }
        karakterinv_dom += '</div>';
        karakterinv_dom += '</div>';
        
        $("body").append(karakterinv_dom);
        
        
        // karihoz tartozo abilities:
        var karakterabi_dom = '';
        karakterabi_dom += '<div class="abilities_hatter" id="abilities_'+this.id+'">';
        karakterabi_dom += '<div class="lapok_dragndrop"></div>';
        karakterabi_dom += '<div class="lapok_bezar" data-id="abilities_'+this.id+'"></div>';
        karakterabi_dom += '<div class="abilities_tartalom">';
        karakterabi_dom += '<div class="abilities_sor">Mana regeneration: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Maximum mana: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Door lock pick: 4</div>';
        karakterabi_dom += '<div class="abilities_sor">Chest lock pick: 2</div>';
        karakterabi_dom += '<div class="abilities_sor">Disarm trap: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Healing power: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Buff type skill effectiveness: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Passive type skill effectiveness: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Active type skill effectiveness: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Mental stability: 0 debuffok elkerulese</div>';
        karakterabi_dom += '<div class="abilities_sor">Knowledge: 0 cucc aoznositahsoz</div>';
        karakterabi_dom += '<div class="abilities_sor">Search: 0 titkos ajtok keresese</div>';
        karakterabi_dom += '<div class="abilities_sor">Weapon: 0 fegyv haszn. pl 50-70 es sebzot 60-70 eskent</div>';
        karakterabi_dom += '<div class="abilities_sor">Táska: 0 tobb cucc fer az inventoryaba</div>';
        karakterabi_dom += '<div class="abilities_sor">Disarm trap: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Disarm trap: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Disarm trap: 0</div>';
        karakterabi_dom += '<div class="abilities_sor">Disarm trap: 0</div>';
        karakterabi_dom += '</div>';
        karakterabi_dom += '</div>';

        $("body").append(karakterabi_dom);
        
        
        // sozvegbubroek:
        var bubble_dom = '<div class="speech_bubble" id="bubble_'+ this.id+'"><div class="speech_bubble_szoveg" id="bubble_szoveg_'+ this.id+'"></div></div>';
        
        $("body").append(bubble_dom);
        
        

        var that = this;
        $("#karakter_"+ this.id +"_kez_1").click(function(){
            that.tamadas(1); 
        });
        
        $("#karakter_"+ this.id +"_kez_2").click(function(){
            that.tamadas(2); 
        });
        
        
    }
    
    // ezt betoltes utan hivjuk es a hp, mana csikot allitja a megfelelo helyre. azert itt, mert csak ilyenkor adodtak ossze a statok es tudjuk mennyi a vitalitibol a max hp ja
    this.hp_es_mana_beallitasa = function() {
        
        this.statok_ujraszamolas();
        
        // elvegzunk nehany beallitast az adatok alapjan pl a HP mana csik beallitasat.
        // ez azert kell mert ha betoltotte a jatekot akkor ezek nem alaperteken vannak!
        //console.log(this.hp);
        //console.log(this.max_hp);
        // 119 a hp csik hossza
        var mennyi_hp_maradt_szazalekban = parseInt((this.hp/this.max_hp)*119);
        //console.log("mennyi_hp_maradt_szazalekban" + mennyi_hp_maradt_szazalekban);
        
        $("#hp_" + this.id).css("width",mennyi_hp_maradt_szazalekban);
        //this.hp_csik_animalas(mennyi_hp_maradt_szazalekban);
    }
    
    
    
    this.szintlepes_kezelok = function() {
        $("#karakterlap_szintlepes_" + this.id).empty();
        
        var szintlepes = this.lepett_e_szintet();
        
        var elkoltheto_stat_pont = szintlepes.mennyi_pontot_oszthat;

        
        karakterlap_dom = '';
        karakterlap_dom += '<div class="csoport_szoveg">You have <span><span id="elkoltheto_pont_'+this.id+'">'+szintlepes.mennyi_pontot_oszthat+'</span> points to spend</span></div>';
        karakterlap_dom += '<div class="stat_egy">';
        karakterlap_dom += '<div class="stat_egy_neve">Power:</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_balra_'+this.id+' stat_egy_nyil_balra" data-stat="power"><img width="10" src="assets/images/nyil_balra.png"></div>';
        karakterlap_dom += '<div class="stat_egy_ertek" id="stat_power_'+this.id+'">0</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_jobbra_'+this.id+' stat_egy_nyil_jobbra" data-stat="power"><img width="10"  src="assets/images/nyil_jobbra.png"></div>';
        karakterlap_dom += '</div>';
        karakterlap_dom += '<div class="stat_egy">';
        karakterlap_dom += '<div class="stat_egy_neve">Dexterity:</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_balra_'+this.id+' stat_egy_nyil_balra" data-stat="dexterity"><img width="10" src="assets/images/nyil_balra.png"></div>';
        karakterlap_dom += '<div class="stat_egy_ertek" id="stat_dexterity_'+this.id+'">0</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_jobbra_'+this.id+'  stat_egy_nyil_jobbra" data-stat="dexterity"><img width="10"  src="assets/images/nyil_jobbra.png"></div>';
        karakterlap_dom += '</div>';
        karakterlap_dom += '<div class="stat_egy">';
        karakterlap_dom += '<div class="stat_egy_neve">Defense:</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_balra_'+this.id+' stat_egy_nyil_balra" data-stat="defense"><img width="10" src="assets/images/nyil_balra.png"></div>';
        karakterlap_dom += '<div class="stat_egy_ertek" id="stat_defense_'+this.id+'">0</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_jobbra_'+this.id+'  stat_egy_nyil_jobbra"  data-stat="defense"><img width="10"  src="assets/images/nyil_jobbra.png"></div>';
        karakterlap_dom += '</div>';
        karakterlap_dom += '<div class="stat_egy">';
        karakterlap_dom += '<div class="stat_egy_neve">Vitality:</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_balra_'+this.id+' stat_egy_nyil_balra" data-stat="vitality"><img width="10" src="assets/images/nyil_balra.png"></div>';
        karakterlap_dom += '<div class="stat_egy_ertek" id="stat_vitality_'+this.id+'">0</div>';
        karakterlap_dom += '<div class="stat_egy_nyil_jobbra_'+this.id+'  stat_egy_nyil_jobbra" data-stat="vitality"><img width="10"  src="assets/images/nyil_jobbra.png"></div>';
        karakterlap_dom += '</div>';
        karakterlap_dom += '<div><input type="button" value="Save" disabled="disabled" id="szintlepes_mentes_'+this.id+'"></div>';
        
        
        $("#karakterlap_szintlepes_" + this.id).append(karakterlap_dom);
        
        var that = this;
        
        $(".stat_egy_nyil_jobbra_"+this.id).click(function(){
            var melyik_stat = $(this).attr("data-stat"); 
            //console.log(melyik_stat);
            
            var ertek = parseInt($("#stat_" + melyik_stat + '_'+that.id).html());
            //console.log("#stat_" + melyik_stat + '_'+that.id);
            
            
            if (elkoltheto_stat_pont > 0) {
                $("#szintlepes_mentes_" + that.id).attr('disabled','disabled');
                
                $("#stat_"+melyik_stat + '_'+that.id).html(ertek+1);
                elkoltheto_stat_pont--;
                $("#elkoltheto_pont_" + that.id).html(elkoltheto_stat_pont);
                
            }
            if (elkoltheto_stat_pont == 0) {
                $("#szintlepes_mentes_" + that.id).removeAttr('disabled');
            }
            
        }); 
        
        $(".stat_egy_nyil_balra_"+this.id).click(function(){
            var melyik_stat = $(this).attr("data-stat"); 
            console.log(melyik_stat);
            
            var ertek = parseInt($("#stat_" + melyik_stat + '_'+that.id).html());
            //console.log("#stat_" + melyik_stat + '_'+that.id);
            
            
            if (ertek > 0) {
                $("#szintlepes_mentes_" + that.id).attr('disabled','disabled');
                
                $("#stat_"+melyik_stat + '_'+that.id).html(ertek-1);
                elkoltheto_stat_pont++;
                $("#elkoltheto_pont_" + that.id).html(elkoltheto_stat_pont);
                
            }
            if (elkoltheto_stat_pont == 0) {
                $("#szintlepes_mentes_" + that.id).removeAttr('disabled');
            }
            
        }); 
        
        $("#szintlepes_mentes_" + this.id).click(function(){
            // elmentjuk a plusz statokat!
            
            var plusz_power = parseInt($("#stat_power_" + that.id).html());
            var plusz_dexterity = parseInt($("#stat_dexterity_" + that.id).html());
            var plusz_defense = parseInt($("#stat_defense_" + that.id).html());
            var plusz_vitality = parseInt($("#stat_vitality_" + that.id).html());
            
            $("#karakterlap_szintlepes_" + that.id).empty();

            
            that.statok_alapertekek.power += plusz_power;
            that.statok_alapertekek.dexterity += plusz_dexterity;
            that.statok_alapertekek.defense += plusz_defense;
            that.statok_alapertekek.vitality += plusz_vitality;
            
            that.statok_ujraszamolas();
            
            that.szint += szintlepes.mennyit;
            
            $("#karakter_" +that.id+ "_szint").html(that.szint);

            $('#portre_kep_szint_'+that.id).html(that.szint);
            
        });
        
    }
    
    this.portre_kep_listener = function() {
        $(".portre_kep").click(function() {
            
            minden_ablak_ki();
            
            var melyik = $(this).parent().attr("data-id");
            inventory_be(melyik);
            karakterlap_be(melyik); 
            skills_be(melyik); 
            abilities_be(melyik);
            
            hang_lejatszas(33,{pan:0,volume:80});

        });
        
    }
    
    this.listenerek_kikapcsolasa = function() {
        $(".portre_nev").unbind("contextmenu");
        $(".portre_ikon_karakterlap").off("click");
        $(".portre_ikon_inventory").off("click");
        $(".portre_ikon_skills").off("click");
        $(".portre_ikon_abilities").off("click");
        
        $(".portre_skill_egy_ikon").off("click");
        $(".portre_kep").off("click");
        $("#karakter_"+ this.id +"_kez_1").off("click");
        $("#karakter_"+ this.id +"_kez_2").off("click");
        
        $(".skillbook_fedo").off('click');
        
    }
    
    // ezt csak egyszer hivjuk meg ha midnen karit letrehoztunk. mert tobbszori hovasnal tobb onclick lenne midnenre.
    this.listenerek_bekapcsolasa = function() {
        
        
        
        this.listenerek_kikapcsolasa();
        
        var that = this;
        
        // ez a kari csere miatt van itt
        $("#karakter_"+ this.id +"_kez_1").click(function(){
            that.tamadas(1); 
        });
        
        $("#karakter_"+ this.id +"_kez_2").click(function(){
            that.tamadas(2); 
        });

        $(".skillbook_fedo").click(function(){
            
            var karakter_id = $(this).parent().parent().attr("data-karakter-id");
            var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id);
            var felelos_karakter = karakterek[karakter_index];
            
            var skill_id = $(this).attr("data-skill-id");
            
            // ha egyaltala nincs elkoltheto pontja akkor nem tud semmit tanulni
            if (felelos_karakter.elkoltheto_skill_pontok <= 0) {
                info_szoveg('You dont have any skill point to spend.');
                hang_lejatszas(38,{pan:0,volume:40});
                return false;
            }

            var skill_adatok = skillek.skill_adatok(skill_id);
            // ha van pontja akkor emgnezzuk eleg e a skillhez
            if (skill_adatok.mennyi_skillpontba_kerul > felelos_karakter.elkoltheto_skill_pontok) {
                info_szoveg('You dont have enough skill points to learn this skill.');
                hang_lejatszas(38,{pan:0,volume:40});
                return false;
            }
            
            // ha van eleg pontja akkor megnezzuk a sizntje eleg e:
            
            if (skill_adatok.szint <= felelos_karakter.szint) {
                // eleg magas a sizntje rakrdezunk biztos meg akarja e tanulni
                var valasz = confirm('Do you want to learn the ' + skill_adatok.nev + ' skill?');
                if (valasz) {
                    // ha igennel valaszol akkor belerul a megtanult skillelk koze. es lekerul a fedo
                    
                    hang_lejatszas(71,{pan:0,volume:40});
                    
                    felelos_karakter.megtanult_skillek.push(parseInt(skill_id));
                    
                    $(this).off('click');
                    $(this).remove();
                    
                    // elkoltheto csokken annnyival amennyibe kerult a skill
                    felelos_karakter.elkoltheto_skill_pontok -= skill_adatok.mennyi_skillpontba_kerul;
                    
                    // a domban is atirjuk az ujra
                    $("#elkoltheto_skill_pont_" + felelos_karakter.id).html(felelos_karakter.elkoltheto_skill_pontok);

                    //console.log('megtanulta:' + skill_id);
                }
            } else {
                hang_lejatszas(38,{pan:0,volume:40});
                info_szoveg('Your level is not high enough to learn this skill!');
            }
            
            
        });        
      
        //console.log("this.id:");
        //console.log(this.id);
        
        $(".portre_nev").bind("contextmenu", function(e) {
            e.preventDefault();
            if (karakter_cserere_kijelolve == 0) {
                $(this).parent().css("background-color","red");
                karakter_cserere_kijelolve = $(this).attr("data-id");
                info_szoveg("Select character to replace with.");
                
            } else {
                //ha nem 0 akkor mar ki van jelolve valaki cserere tehat amire most kattint azzal cserlnek helyet
                
                if (karakter_cserere_kijelolve != $(this).attr("data-id")) {
                    // ha nem ugyanaz
                    var copy_to = $(this).parent().clone(false);
                    var copy_from = $('.portre[data-id="'+karakter_cserere_kijelolve+'"]').clone(false);
                    
                    $('.portre[data-id="'+karakter_cserere_kijelolve+'"]').replaceWith(copy_to);
                    $(this).parent().replaceWith(copy_from);
                    
                    // beallitjuk a megfelelo sort es oldalt!
                    var copy_to_karakter_id = $(this).attr("data-id");
                    var copy_from_karakter_id = karakter_cserere_kijelolve;
                    
                    var karakter_index_to = karakter_hanyadik_a_tombben_id_alapjan(copy_to_karakter_id);
                    var karakter_index_from = karakter_hanyadik_a_tombben_id_alapjan(copy_from_karakter_id);
                    
                    var hanyadik_sorban_van_to = karakterek[karakter_index_to].hanyadik_sorban_van;
                    var sorban_melyik_oldal_to = karakterek[karakter_index_to].sorban_melyik_oldal;
                    
                    var hanyadik_sorban_van_from = karakterek[karakter_index_from].hanyadik_sorban_van;
                    var sorban_melyik_oldal_from = karakterek[karakter_index_from].sorban_melyik_oldal;
                    
                    karakterek[karakter_index_to].hanyadik_sorban_van = hanyadik_sorban_van_from;
                    karakterek[karakter_index_to].sorban_melyik_oldal = sorban_melyik_oldal_from;
                    
                    karakterek[karakter_index_from].hanyadik_sorban_van = hanyadik_sorban_van_to;
                    karakterek[karakter_index_from].sorban_melyik_oldal = sorban_melyik_oldal_to;
                    
                    $('.portre[data-id="'+karakter_cserere_kijelolve+'"]').css("background-color","transparent");
                    
                    karakter_cserere_kijelolve = 0;
                    
                    //$( ".portre_skill_egy_ikon" ).droppable( "destroy" );
                    //$( ".portre_skill_egy_ikon" ).droppable(portre_skill_droppable_options);        

                    
                    
                    for (var k=0;k<karakterek.length;k++) {
                        karakterek[k].listenerek_bekapcsolasa();
                    }
                    
                    
                    //console.log("karakter_index_to:" + karakter_index_to);
                    //console.log("copy_from_karakter_id:" + copy_from_karakter_id);
                    //console.log("hanyadik_sorban_van_to:" + hanyadik_sorban_van_to);
                    //console.log("hanyadik_sorban_van_from:" + hanyadik_sorban_van_from);
                } else {
                     $('.portre[data-id="'+karakter_cserere_kijelolve+'"]').css("background-color","transparent");
                    
                    karakter_cserere_kijelolve = 0;
                }
                
            }
        });
       
        
        $(".portre_ikon_karakterlap").click(function() {
            var melyik = $(this).attr("data-id");
            karakterlap_kibe(melyik); 
            
            hang_lejatszas(15,{pan:0,volume:50});

        });
        $(".portre_ikon_inventory").click(function() {
            var melyik = $(this).attr("data-id");
            inventory_kibe(melyik);
            
            hang_lejatszas(15,{pan:0,volume:50});

        });
        $(".portre_ikon_skills").click(function() {
            var melyik = $(this).attr("data-id");
            skills_kibe(melyik);
            
            hang_lejatszas(15,{pan:0,volume:50});

        });
        $(".portre_ikon_abilities").click(function() {
            var melyik = $(this).attr("data-id");
            abilities_kibe(melyik);
            
            hang_lejatszas(15,{pan:0,volume:50});

        });
        
        
        
        
        this.portre_kep_listener();

        
        
        $(".portre_skill_egy_ikon").click(function() {
            
            //console.log("portre_skill_egy_ikon ONCLICK");
            
            if ($(this).children().length > 0) {
                var karakter_id = $(this).parent().parent().attr("data-id");
                var skill_id = $(this).children().attr("data-skill-id");
                
                var felelos_karakter = karakterek[karakter_id-1];
                
                var skill_adatok = skillek.skill_adatok(skill_id);
                
                if (skill_adatok.tipus == "gyogyitas") {
                    felelos_karakter.skill_hasznalat_celpont_valasztas(skill_id,karakter_id);
                } else {
                    
                    felelos_karakter.skill_hasznalat(skill_id,0,karakter_id);    
                }
                
                
                //that.skill_hasznalat(2);
                //console.log(skill_id);
                
            }
        })
        
        //listeners:
        //$( ".karakterlap_felszereles" ).droppable(karakterlap_felszereles_droppable_options);        
        $( ".egy_taskahely" ).droppable(inventory_droppable_options);
        $( ".item" ).draggable(inventory_draggable_options);
        
        $( ".skill" ).draggable(skills_draggable_options);
        $( ".portre_skill_egy_ikon" ).droppable(portre_skill_droppable_options);        

        $( ".karekterlap_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".inventory_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".skills_hatter" ).draggable({ scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".abilities_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        
        /*
        $(".inventory_hatter").mouseenter(function(){
            console.log("iventory enter");
            $(this).css("z-index","9");
        })
        
        $(".karekterlap_hatter").mouseenter(function(){
            console.log("karilap enter");
            $(this).css("z-index","9");
        })
        */
        
        
        
        $(".lapok_bezar").click(function(){
            var id = $(this).attr("data-id");
            $("#" + id).fadeOut(300); 
        });
        

    }
    
    
    this.statok_ujraszamolas = function() {
        //console.log("statok_ujraszamolas:" + this.id);
        
        var power = this.statok_alapertekek.power;
        var dexterity = this.statok_alapertekek.dexterity;
        var defense = this.statok_alapertekek.defense;
        var vitality = this.statok_alapertekek.vitality;
        var magicfind = this.statok_alapertekek.magicfind;

        // megnezzuk milyen cuccok vannak rajta es osszeadjuk a statokat!
        // kesobb eleg lenne csak az eppen felvett targy alapjan ujraszmolni. ha levette akkor levonni
        var felszereles_elemek = $("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children();
        
        //console.log($("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children());
        //console.log("felszereles_elemek.length:" + felszereles_elemek.length);
        
        
        for (var i=0;i<felszereles_elemek.length;i++) {
            //console.log(felszereles_elemek[i]);
            if ($(felszereles_elemek[i]).html() != "") {
                // van benee cucc, lekerjuk az id-t
                var item_id = $(felszereles_elemek[i]).children().attr("data-item-id");
                var targyadatok = targyak.targyadatok(item_id);
                power += parseInt(targyadatok.statok.power);
                dexterity += parseInt(targyadatok.statok.dexterity);
                defense += parseInt(targyadatok.statok.defense);
                vitality += parseInt(targyadatok.statok.vitality);
                magicfind += parseInt(targyadatok.statok.magicfind);
                
            }
        }
        
        // a hatasokat nem adjuk hozza, mert a hatasok az alap statokbol smzolodnak
        this.statok_hatasok_nelkul.power = power;
        this.statok_hatasok_nelkul.dexterity = dexterity;
        this.statok_hatasok_nelkul.defense = defense;
        this.statok_hatasok_nelkul.vitality = vitality;
        this.statok_hatasok_nelkul.magicfind = magicfind;        
        
        //megnezzuk askillek hatasait is es ha kell hozzadjuk
        for (var j=0;j<this.skillek_hatasok.length;j++) {
            
            power += this.skillek_hatasok[j].power;
            dexterity += this.skillek_hatasok[j].dexterity;
            defense += this.skillek_hatasok[j].defense;
            vitality += this.skillek_hatasok[j].vitality;
            magicfind += this.skillek_hatasok[j].magicfind;
                    
         }        
        
        // azert, hogy ne kelljen mindig iteralni elmentjuk az osztajba a statokat, igy pl harcanl csak le kell kerdezni!
        this.statok.power = power;
        this.statok.dexterity = dexterity;
        this.statok.defense = defense;
        this.statok.vitality = vitality;
        this.statok.magicfind = magicfind;
        

        
        
        var html_szoveg = '';
        html_szoveg += '<div class="karakterlap_stat_sor">Power: ' + power +'</div>'; 
        html_szoveg += '<div class="karakterlap_stat_sor">Dexterity: ' + dexterity +'</div>';
        html_szoveg += '<div class="karakterlap_stat_sor">Defense: ' + defense +'</div>';
        html_szoveg += '<div class="karakterlap_stat_sor">Vitality: ' + vitality +'</div>';
        html_szoveg += '<div class="karakterlap_stat_sor">Magic find: ' + magicfind +'%</div>';
        html_szoveg += '<div class="karakterlap_stat_sor">Mana regen: '+this.mana_regen+'%</div>';

        //console.log("katakter > this.id" + this.id);
        
        $("#karekterlap_" + this.id).children("#karakterlap_statok").html(html_szoveg);
        
        // beallitjuk a max_HPt is a statoknak megfeleloen
        
        // ha maximumon volt a plusz stat hozzadasakor  akkor a hp is megnovekszik a max HP val egyutt
        if (this.hp == this.max_hp) {
            this.max_hp = this.max_hp_mennyi();
            this.hp = this.max_hp;
        } else {
            // ha serult volt akkor csak a max hp novekszik
            this.max_hp = this.max_hp_mennyi();
        }
        
        
        
        // es hozzaigazitjuk a hp csikot es a szoveget is is:
        $("#hp_szam_" + this.id).html(parseInt(this.hp) + '/' + this.max_hp);
        
    }
    
    this.max_hp_mennyi = function() {
        return (100 + (this.statok.vitality*2));
    }

    
    // ez pl allas betoltesnel kell!
    this.targy_kezbe_vetel = function(targy_id,melyik_kez) {
        var targyadatok = targyak.targyadatok(targy_id);
        var targy_dom = '<img title="'+ targyadatok.targy_leirasa +'" class="item" data-item-id="'+ targyadatok.id +'" src="assets/items/'+targyadatok.kep_fajl+'">';
        $("#karakter_"+this.id+"_kez_"+melyik_kez).append(targy_dom);
        
        $('.item').qtip(tooltip_options);
        //$( ".item" ).draggable(inventory_draggable_options);
        //$( ".egy_taskahely" ).droppable(inventory_droppable_options);
    }
    
    this.sebzodes = function(mennyit) {
        //console.log("KARAKTER SEBOZDIK ID:" + this.id + " mennyit:" +mennyit);
        // itt ki kell mszoalni, hogy a vedelmetol fuggoen mennyit kap be a sebzesbol
        
        // ezt jo lenne osszevetni az ellenseg adataival. pl ha az ellenseg strengthje nagyobb mint a karakter defenseje akkor nagyobbat sebzodik mintha kisebb lenne plusz a szintkulonbseget is figyelembe kell venni!
        
        // egyelroe a szintjet nem kalkulaljuk bele hame e szerint szmaolunk: 
        // Assuming that the code-base has not been fiddled with, we know by looking at the Help file that the standard damage calculation is:
        // 4 * Attacker_STR - 2 * Defender_DEF 
        
        // a defender defbe belatartozik az alapertek amit kezdeskor kapott + a targyakon levo def
        // es egy kis veletlenszeruseg is belekerul
        // -mob alap sebzese/3 es a +mob alap sebzese/3 kozott
        var veletlen_szam_sebzodeshez = randint(-(mennyit/3),(mennyit/3));
        
        // ezt majd szmaolni kell, de elosztjuk majd valamennyivel hogy azert ne legyen a sebzes mindig 0
        
        var vedelem = this.statok.defense/5;
        
        var kiszamolt_sebzodes = parseInt(mennyit - ((vedelem * 2)) + veletlen_szam_sebzodeshez);
        if (kiszamolt_sebzodes < 0) {
            kiszamolt_sebzodes = 0;
        }
        
        
        hang_lejatszas(11,{pan:0,volume:70});
        
        this.hp -=  kiszamolt_sebzodes;
        
        // nullanal ne legyen kevesebb
        if (this.hp < 0) {
            this.hp = 0;
        }
        
        info_szoveg(this.nev + " got " + kiszamolt_sebzodes + " damage!");
        
        // 117 a hp csik hossza
        var mennyi_hp_maradt_szazalekban = parseInt((this.hp/this.max_hp)*119);
        
        
        // dumak
        var rand_mondja = randint(1,3);

        // csak 33% ban mondja
        if (rand_mondja == 1) {
            var rand_mitmond = randint(1,6);
            if (mennyi_hp_maradt_szazalekban < 50 && this.hp > 0) {
                if (rand_mitmond == 1) { this.szovegbuborek('I need some healing.'); }
                if (rand_mitmond == 2) { this.szovegbuborek('I wont go down that easy.'); }
                if (rand_mitmond == 3) { this.szovegbuborek('Fear not!'); }
                if (rand_mitmond == 4) { this.szovegbuborek('Die!'); }
                if (rand_mitmond == 5) { this.szovegbuborek('Banish the evil!'); }
                if (rand_mitmond == 6) { this.szovegbuborek('Just a bruise'); }
                
                
                
                
            }
            if (mennyi_hp_maradt_szazalekban < 20 && this.hp > 0) {
                if (rand_mitmond == 1) { this.szovegbuborek('Heal meeeee!'); }
                if (rand_mitmond == 2) { this.szovegbuborek('That hurts!'); }
                if (rand_mitmond == 3) { this.szovegbuborek('Im going to die...'); }
                if (rand_mitmond == 4) { this.szovegbuborek('Wanna lend some help here'); }
                if (rand_mitmond == 5) { this.szovegbuborek('Help!'); }
                if (rand_mitmond == 6) { this.szovegbuborek('Show me your best!'); }
                
                
            }
            if (mennyi_hp_maradt_szazalekban < 10 && this.hp > 0) {
                if (rand_mitmond == 1) { this.szovegbuborek('I will die for sure.'); }
                if (rand_mitmond == 2) { this.szovegbuborek('Forgive...me.'); }
                if (rand_mitmond == 3) { this.szovegbuborek('Cant keep this up..'); }
                if (rand_mitmond == 4) { this.szovegbuborek('Bring me back..'); }
                if (rand_mitmond == 5) { this.szovegbuborek('My power will remain..'); }
                if (rand_mitmond == 6) { this.szovegbuborek('Take my.. weapons..'); }
            }
            
        }
        
        //$("#hp_" + this.id).css("width",mennyi_hp_maradt_szazalekban);
        this.hp_csik_animalas(mennyi_hp_maradt_szazalekban);
        
        
        //a portre felett felvillan a sebzes piros hatterrel
        var div_pozicio = $("#portre_kep_" + this.id).position();
        $("#portre_kep_" + this.id).append("<div class='portre_fedo' id='portre_fedo_"+this.id+"'>"+ kiszamolt_sebzodes +"</div>");
        $("#portre_fedo_"+this.id).css("left",div_pozicio.left) ;
        $("#portre_fedo_"+this.id).css("top",div_pozicio.top) ;

        // csak akkro jon le ha lejart a cd:
        var that = this;
        var portre_fedo_Interval = setInterval(function() {
            //$("#karakter_"+that.id+"_kez_"+melyik_kez).children("div.utes_tiltva").hide();
            //$("#karakter_"+that.id+"_kez_"+melyik_kez).children("div.utes_sikeres").hide();
            
            $("#portre_fedo_"+that.id).remove();
            
            //if (melyik_kez == 1) { that.balkez_eppen_ut = false; }
            //if (melyik_kez == 2) { that.jobbkez_eppen_ut = false; }
            clearInterval(portre_fedo_Interval);
        },1000);         
        
        
        
        
        
        if (this.hp <=0 ) {
            // meghalt!
            
            mozgas_logolas("KARAKTER MEGHALT NEV:" + this.nev);
            
            info_szoveg(this.nev + " is DEAD! ");
            
            hang_lejatszas(12,{pan:0,volume:80});
            
            // portre helyere koponya:
            $("#portre_kep_" + this.id).html('<img src="assets/images/skull_portre_kicsi.png">')
            
        }
        
        return true;
    }
    
    
    this.hp_csik_animalas = function(hova) {
        
        // beallitjuk a sozveges ertekeket is
        $("#hp_szam_" + this.id).html(parseInt(this.hp) + '/' + this.max_hp);
        
        
        $("#hp_" + this.id).stop(true).animate({
            width: hova
        }, 700);
    }
    
    this.mana_csik_animalas = function(hova) {
        
        // beallitjuk a sozveges ertekeket is
        $("#mana_szam_" + this.id).html(parseInt(this.mana) + '/' + this.max_mana);
        
        $("#mana_" + this.id).stop(true).animate({
            width: hova
        }, 700);
    }

    
    // csak fegyverrel uthet
    this.fegyver_van_e_a_kezben = function(melyik_kez) {
        var targy_id = 0;
        
        if (melyik_kez == 1) {
            targy_id = $("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children("#karakterlap_"+this.id+"_bal_kez").children().attr("data-item-id");
            //console.log($("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children("#karakterlap_bal_kez").children());
        }
        if (melyik_kez == 2) {
            targy_id = $("#karekterlap_" + this.id).children("#karekterlap_felszerelesek").children("#karakterlap_"+this.id+"_jobb_kez").children().attr("data-item-id");
        }
        if (typeof targy_id === "undefined") {
            // semmi nincs a kezeben!
            return false;
        } else {
            var targyadatok = targyak.targyadatok(targy_id);
            //console.log(targy_id);
            if (targyadatok.fokategoria == "fegyver" && targyadatok.alkategoria != "pajzs") {
                // ha van  kezeben fegyo akkor visszadjuk az id -t
                // ez kell a sebzes szmitashoz
                return targy_id;
                //return true;
            } else {
                return false;
            }
            
        }

    }
    
    this.tamadas = function(melyik_kez) {
        /*
          1.megnezzuk van e valami enemy  akit eler ha nincs akkor miss egybol
          2. ha van valaki elotte akkor kalkulalunk tud e sebezni es ha igen mennyit ehhez valszeg le kell kerni az enemytol a vedelmet stb
          3. ha megvan a sebzes akkor azt beirjuk az enemy osztalyba ott megnezzuk meghalt e a mob ha igen akkor
        *     - leveszuk a scenebol animalunk stb
        *     - dobjuk a lootot
        *     - XP t adunk az osszes karakternek, aki megolte annak kicsit tobbet
        */
        //console.log(melyik_kez);
        
        // megnezzuk, hogy fegyver van e aabban akezeben amivel utni akar
        
        var fegyver_a_kezben = this.fegyver_van_e_a_kezben(melyik_kez);
        
        if (fegyver_a_kezben) {
            var uthet = false;
            if (melyik_kez == 1) {
                if (this.balkez_eppen_ut == false) {
                    var uthet = true;        
                }
            }
            if (melyik_kez == 2) {
                if (this.jobbkez_eppen_ut == false) {
                    var uthet = true;        
                }
            }
            
            if (uthet && this.hp > 0) {
                
                mozgas_logolas("TAMAD kari_id:" + this.id + " melyik_kez:" + melyik_kez);
                
                if (melyik_kez == 1) { this.balkez_eppen_ut = true; }
                if (melyik_kez == 2) { this.jobbkez_eppen_ut = true; }
                var eredmeny = this.sebzes_szamitas(melyik_kez,fegyver_a_kezben);
                    
                this.css_animacio(eredmeny,melyik_kez);
                
            }
            
            if (uthet === false) {
                hang_lejatszas(38,{pan:0,volume:40});
            }
        } else {
            info_szoveg("Equip a weapon to attack!");
        }
        
        
        
        
        
    };
    
    
    // itt majd a hatulrol tamadokat is neznki ekll mert pl ijjal messzebre lohet!
    
    this.sebzodo_ellensegek = function(targy_id,skill_id) {
        // van a a kozzelben enemy es ha igen akkor melyik?
        
        var kamera_erre_nez = deg(camera.rotation.y);

        
        var sebzodo_ellensegek = new Array();
        for(var i=0;i<ellensegek.length;i++) {
            var fele_nezunk = 0;    
            
            var Tx = Math.abs(Math.floor(((ellensegek[i].mesh.position.x ) / cubesize)));
            var Ty = Math.abs(Math.floor(((ellensegek[i].mesh.position.z ) / cubesize)));     
            
            // a jatekos pozicioja:
            var Tx_jatekos = Math.abs(Math.floor(((MovingCube.position.x ) / cubesize)));
            var Ty_jatekos = Math.abs(Math.floor(((MovingCube.position.z ) / cubesize)));
                   
            // azt is meg kell nezni, hogy az adott ellenseg fele nezunk e!
            // eszak
            if (kamera_erre_nez == 0) {
                if (Ty < Ty_jatekos) {fele_nezunk = 1;}
            }            
            //nyugat
            if (kamera_erre_nez == 90) {
                if (Tx < Tx_jatekos) {fele_nezunk = 1;}
            }
            //del            
            if (kamera_erre_nez == 180) {
                if (Ty > Ty_jatekos) {fele_nezunk = 1;}
            }            
            if (kamera_erre_nez == 270) {
                if (Tx > Tx_jatekos) {fele_nezunk = 1;}
            }            
            
            // a modelleknel van amit lejebb ell huzni hogy a foldon legyen
            // a tavolsag szamitas elott felemeljuk az y-t 0 ra igy pontosan 100 lesz a tavaolsag ha elotte all
            var ellenseg_pozicio = ellensegek[i].mesh.position.clone();
            ellenseg_pozicio.y = 0;
        
            if (MovingCube.position.distanceTo(ellenseg_pozicio) <= 100 && fele_nezunk) {
                if (targy_id != 0) {
                    var targyadatok = targyak.targyadatok(targy_id);
                    if (targyadatok.statok.hatotavolsag <= 1) {
                        // ha a fegyver hatotavolsaga 1 akkor csak az elso sorbol eri el!
                        if (this.hanyadik_sorban_van == 1) {
                            sebzodo_ellensegek.push(ellensegek[i]);    
                        }
                    }
                    if (targyadatok.statok.hatotavolsag >= 2) {
                        // ha a fegyver hatotavolsaga 2 vagy tobb akkor a hatso sorbol is tamadhat vele
                        // tehat nem nezzuk melyik sorban van
                        sebzodo_ellensegek.push(ellensegek[i]);    
                    }
                }
                
                if (skill_id != 0) {
                    sebzodo_ellensegek.push(ellensegek[i]);   
                }
            
            }

        }
        
        return sebzodo_ellensegek;
    }
    
    this.manat_kap = function(mennyit) {
        this.mana += mennyit;
        if (this.mana > this.max_mana) {
            this.mana = this.max_mana;
        }
        
        var mennyi_mana_maradt_szazalekban = parseInt((this.mana/this.max_mana)*119);
        this.mana_csik_animalas(mennyi_mana_maradt_szazalekban);
        
        info_szoveg(this.nev + ' restored ' + mennyit + ' mana.');
    }
    
    // a mennyit_sebzett ebben az esetben a gyogyitas merteke
    this.gyogyitas_skillel = function(skill_id,mennyit_sebzett,celpont_karakter_id){
        var celpont = karakterek[celpont_karakter_id-1];
        
        celpont.gyogyulas(skill_id,mennyit_sebzett);
    }
    
    this.gyogyulas = function(skill_id,mennyit) {
        // csak akko rgyogyit ha a celpont nem halott!
        // kiveve a esurrect skill 
        var skill_adatok = skillek.skill_adatok(skill_id);
        
        if (skill_adatok.funkcio == "resurrect") {
            if (this.hp <= 0 ) {
                info_szoveg(skill_adatok.nev +': ' + this.nev + ' resurrected.');
                this.hp = mennyit;
                
                var mennyi_hp_maradt_szazalekban = parseInt((this.hp/this.max_hp)*119);
                this.hp_csik_animalas(mennyi_hp_maradt_szazalekban);
                
                // a portret is visszalllitjuk
                $("#portre_kep_" + this.id).html('<img width="40" src="'+this.kep+'">');
                
            } else {
                info_szoveg("Target is not dead!");
            }
        } else {
            if (this.hp > 0 ) {
                
                
                if (this.hp+mennyit > this.max_hp) {
                    info_szoveg(skill_adatok.nev +': restored ' +  (this.max_hp - this.hp ) + ' hp on ' + this.nev);
                    this.hp = this.max_hp;
                    
                } else {
                    info_szoveg(skill_adatok.nev +': restored ' + mennyit + ' hp on ' + this.nev);
                    this.hp+= mennyit;
                }
                
                
                // 119 a hp csik hossza
                var mennyi_hp_maradt_szazalekban = parseInt((this.hp/this.max_hp)*119);
                //console.log("mennyi_hp_maradt_szazalekban" + mennyi_hp_maradt_szazalekban);
                
                //$("#hp_" + this.id).css("width",mennyi_hp_maradt_szazalekban);
                this.hp_csik_animalas(mennyi_hp_maradt_szazalekban);
            } else {
                info_szoveg('Target is dead, you need to resurrect him before heal.');
            }
            
        }

        
    }
    
    
    this.debuff_ellensegre = function(skill_id,parameterek) {
        var sebzodo_ellensegek = new Array();
        
        sebzodo_ellensegek = this.sebzodo_ellensegek(0,skill_id);
        
        var skill_adatok = skillek.skill_adatok(skill_id);
        
        var debuff = {"karakter_id":this.id,"skill_id":skill_adatok.id,"debuff_ido":skill_adatok.buff_hany_mpig_marad,"elozo_tick":0,"parameterek":parameterek};
        
        for(var i=0;i<sebzodo_ellensegek.length;i++) {
            sebzodo_ellensegek[i].debuffot_kap(debuff);
        }
    }
    
    //mennyit_sebzett: ez a skill base damageja! ebbol kalkulalunk tenyleges sebzest a statokbol es a mob vedelmebol
    this.sebzes_skillel = function(skill_id,mennyit_sebzett) {
        //var random_talalte = randint(0,1);
        var random_talalte = 1;
        var sebzodo_ellensegek = new Array();
        
        //console.log(mennyit_sebzett);
        
        sebzodo_ellensegek = this.sebzodo_ellensegek(0,skill_id);
        
        var skill_adatok = skillek.skill_adatok(skill_id);
        
        if (sebzodo_ellensegek.length > 0) {

            if (random_talalte == 0) { info_szoveg("Skill: Miss"); }
            if (random_talalte == 1) { 
                // meghivjuk az enemy osztalyt, a sebzessel
                for(var i=0;i<sebzodo_ellensegek.length;i++) {
                    
                    var ellenseg_statok = sebzodo_ellensegek[i].statok;
                    
                    // Damage = Spell Power * 4 + (Level * Magic Power * Spell Power / 32)
                    var damage = parseInt(( skill_adatok.alap_sebzes *4 ) + ( this.szint * (this.statok.power - ellenseg_statok.defense) * skill_adatok.alap_sebzes / 16));
                    
                    console.log("damage:" + damage);
                    
                    // meg egy kis random:
                    var plusz_random = parseInt(damage*0.1);
                    var plusz_random2 = parseInt(damage*0.1)*-1;
                    
                    var damage = damage + randint(plusz_random2,plusz_random);
                    
                    var dot = null;
                    
                    if (skill_adatok.dot != 0) {
                        // sozmni kell majd
                        //var dot_damage = 11;
                        var dot_damage = parseInt(( skill_adatok.dot *4 ) + ( this.szint * (this.statok.power - ellenseg_statok.defense) * skill_adatok.dot / 16));
                        
                        dot = {"karakter_id":this.id,"dot_damage":dot_damage,"dot_ido":skill_adatok.dot_ido,"skill_id":skill_adatok.id,"elozo_tick":0};
                        
                        // ha van dot akkor atadjuk, de nem a sebzodesnel hanem kulon es majd az  enemy tick inezi
                        sebzodo_ellensegek[i].dotot_kap(dot);
                    }
                    var ret_ellensegtol = sebzodo_ellensegek[i].sebzodes(damage);
          
                    var szoveg = "";
                    szoveg = this.nev + ' attack with '+ skill_adatok.nev +': Hit! ' + damage + ' damage';
                    if (ret_ellensegtol.halott == 1) {
                        szoveg += ', Enemy Dead!';
                        
                        // xp:
                        //this.mindenki_xpt_kap(sebzodo_ellensegek[i].xp);    
                    }
                    info_szoveg(szoveg);
                    
                    if (ret_ellensegtol.targy != "") {
                        info_szoveg("Loot on the floor!");
                    }
                    
                    
                    
                }
            }
        } else {
            // nincs sneki a kozelbe missel!
            if (skill_adatok.alap_sebzes != 0) {
                info_szoveg(skill_adatok.nev +': no target in line of sight.');    
            } else {
                // vannak olyan aktiv skillek amiknem sebeznek. pl leveszik a CDt minden fegyorol
            }
            
        }
    }
    
    this.sebzes_szamitas = function(melyik_kez,targy_id) {
        var ret = {utes_eredmenye:"SIKERTELEN",mennyit_sebez:0,ellenseg_halott:0,targy:"",xpt_ad:0};
        
        var sebzodo_ellensegek = new Array();
        sebzodo_ellensegek = this.sebzodo_ellensegek(targy_id,0);
        
        if (sebzodo_ellensegek.length > 0) {
            // lekerjuk az ellensegtol a statjait
            // Damage = Weapon.attack * (1+(Actor.attack-Enemy.defense)/100)   [Basically the Diablo 2 formula]
            
            
            for(var i=0;i<sebzodo_ellensegek.length;i++) {
                var ellenseg_statok = sebzodo_ellensegek[i].statok;
                var targyadatok = targyak.targyadatok(targy_id);
                var tamado_fegyver_statok = targyadatok.statok;
                
                /*
                    formula:
                 a1 = karakter.dex + ellenseg.dex
                 a2 = randint(0,a1);
                 if (a2 <= karakter.dex) {
                    talalt
                 } else {
                    miss
                 }
                
                */
                var talalt_e = 1;
                var rand = randint (0,(this.statok.dexterity+ellenseg_statok.dexterity));
                if (rand <= this.statok.dexterity) {
                    var talalt_e = 1;
                } else {
                    var talalt_e = 0;
                }
                
                if (talalt_e == 0) { ret.utes_eredmenye = "SIKERTELEN"; }
                if (talalt_e == 1) { 
                    ret.utes_eredmenye = "SIKERES"; 
                    
                    var fegyver_rand = randint(tamado_fegyver_statok.attack1,tamado_fegyver_statok.attack2);
                    
                    
                    var damage = parseInt(fegyver_rand * ( 1+(this.statok.power - ellenseg_statok.defense)/100 ));
                    
                    // meg egy kis random:
                    var plusz_random = parseInt(damage*0.1);
                    var plusz_random2 = parseInt(damage*0.1)*-1;
                    
                    var damage = damage + randint(plusz_random2,plusz_random);
                    
                    //console.log(damage);
                    ret.mennyit_sebez = damage;
                    
                    // meghivjuk az enemy osztalyt, a sebzessel
                    var dot = null;
                    var ret_ellensegtol = sebzodo_ellensegek[i].sebzodes(damage);
                    ret.ellenseg_halott = ret_ellensegtol.halott;
                    ret.targy = ret_ellensegtol.targy;
                    
                    // ha meghalt az ellenseg akor mindeki megkapja az XPt:
                    if (ret_ellensegtol.halott == 1) {
                        //this.mindenki_xpt_kap(sebzodo_ellensegek[i].xp);    
                    }
                }             
                
            }
            
           
        } else {
            // nincs sneki a kozelbe missel!
            // itt majd a hatolrol tamadokat is neznki ekll mert pl ijjal messzebre lohet!
            ret.utes_eredmenye = "SIKERTELEN_NEM_LAT_SENKIT";
        }
        
        
        
        return ret;
    }
    
    this.mindenki_xpt_kap = function(xp) {
        // mindenki megkapja az xp t de csak akkor ha nem halott!!
        for(i=0;i<karakterek.length;i++) {
            if (karakterek[i].hp > 0) {
                var veletlen = randint(-5,5);
                karakterek[i].xp += (xp+veletlen);
                console.log(karakterek[i].nev + "xp:" + (karakterek[i].xp));
                
                // frissitjuk a karilapon az erteket:
                $("#karakter_"+karakterek[i].id+"_xp").html(karakterek[i].xp);
                
                // megnezzuk lepett e szintet!
                
                var lepett_e = karakterek[i].lepett_e_szintet();
                if (lepett_e.lepett_e == 1) {
                    karakterek[i].szintlepes_kezelok();   
                    
                    // annyi plusz ksillontot kap amennyi sizntet lepett
                    
                    karakterek[i].elkoltheto_skill_pontok += lepett_e.mennyit;
                    
                    // a domot is allitjuk:
                    $("#elkoltheto_skill_pont_" + karakterek[i].id).html(karakterek[i].elkoltheto_skill_pontok);
                }
                
                
                
            }
        }
    }
    
    this.lepett_e_szintet = function() {
        var ret = {lepett_e:0,mennyit:0,mennyi_pontot_oszthat:0};
        
        var jelenlegi_szintje = this.szint;
        var jelenlegi_xp = this.xp;
        
        // megnezzuk hogy a jelenlegi xp melyik sizntnek felel meg
        // ha kevesebb mint a jelenlegi szintje + 1 XP akkor nem lepett szintet
        // ha tobb akkor legalabb 1 szintet lepett
        var melyik_szint_a_kovetkezo = 0;
        for (var j=0;j<this.szintlepes_ertekek.length;j++) {
            if (this.szintlepes_ertekek[j].xp > jelenlegi_xp) {
                melyik_szint_a_kovetkezo = this.szintlepes_ertekek[j].szint;    
                break;
            }
        }
        
        
        if (melyik_szint_a_kovetkezo > this.szint+1) {
            // sizntet lepett!!
            //console.log("szintet lepett!!" + this.id);
            ret.lepett_e = 1;
            
            
            // kirakjuk a DOM ba
            $('#portre_kep_szint_'+this.id).html("Level up!");
            
            var mennyi_szintet_lepett = melyik_szint_a_kovetkezo - (this.szint+1);
            ret.mennyit = mennyi_szintet_lepett;
            
            // 10 pontot rakhat szintlepesenkent
            var mennyi_pontot_oszthat_szet = mennyi_szintet_lepett*10;
            ret.mennyi_pontot_oszthat = mennyi_pontot_oszthat_szet;
            
            
        }
        
        return ret;
    }
    
    this.css_animacio = function(eredmeny,melyik_kez) {
        var div_pozicio = $("#karakter_"+this.id+"_kez_"+melyik_kez).position();

        if (eredmeny.utes_eredmenye == "SIKERES")  {
            hang_lejatszas(4,{pan:0,volume:100});
            var szoveg = "";
            szoveg = this.nev + ' attack: Hit! ' + eredmeny.mennyit_sebez + ' damage';
            if (eredmeny.ellenseg_halott == 1) {
                szoveg += ', Enemy Dead!';
            }
            info_szoveg(szoveg);
            
            if (eredmeny.targy != "") {
                info_szoveg("Loot on the floor!");
            }
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).html("SEBZETT " + eredmeny.mennyit_sebez); 
            
            /*
            $("#portre_kontener").append("<div class='kez_fedo_sikeres' id='karakter_"+this.id+"_kez_"+melyik_kez+"_fedo'>"+eredmeny.mennyit_sebez+"</div>");
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("left",div_pozicio.left) ;
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("top",div_pozicio.top) ;
            */
            
            $("#karakter_"+this.id+"_kez_"+melyik_kez).append("<div class='kez_fedo_sikeres' id='karakter_"+this.id+"_kez_"+melyik_kez+"_fedo'>"+eredmeny.mennyit_sebez+"</div>")
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("left",-3) ;
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("top",-8);            
            
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).children("div.utes_sikeres").html(eredmeny.mennyit_sebez);
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).children("div.utes_sikeres").show();
        }
        if (eredmeny.utes_eredmenye == "SIKERTELEN_NEM_LAT_SENKIT") {
            hang_lejatszas(7,{pan:0,volume:100});
            info_szoveg(this.nev + ' attack: No enemy in line of sight!');
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).html("MISS");
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).addClass("utes_tiltva");
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).children("div.utes_tiltva").show();
            
            //$("#portre_kontener").append("<div class='kez_fedo_miss' id='karakter_"+this.id+"_kez_"+melyik_kez+"_fedo'></div>")
            //$("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("left",div_pozicio.left) ;
            //$("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("top",div_pozicio.top) ;

            $("#karakter_"+this.id+"_kez_"+melyik_kez).append("<div class='kez_fedo_miss' id='karakter_"+this.id+"_kez_"+melyik_kez+"_fedo'></div>")
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("left",-3) ;
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("top",-8);

            
            //$("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo_sikeres").css("left",div_pozicio.left) ;
            //$("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo_sikeres").css("top",div_pozicio.top) ;
            

        }
        if (eredmeny.utes_eredmenye == "SIKERTELEN") {
            hang_lejatszas(7,{pan:0,volume:100});
            info_szoveg(this.nev + ' attack: Miss! :(');
            
            /*
            $("#portre_kontener").append("<div class='kez_fedo_miss' id='karakter_"+this.id+"_kez_"+melyik_kez+"_fedo'>MISS</div>")
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("left",div_pozicio.left) ;
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("top",div_pozicio.top) ;            
            */
            $("#karakter_"+this.id+"_kez_"+melyik_kez).append("<div class='kez_fedo_miss' id='karakter_"+this.id+"_kez_"+melyik_kez+"_fedo'>MISS</div>")
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("left",-3) ;
            $("#karakter_"+this.id+"_kez_"+melyik_kez+"_fedo").css("top",-8);   
            
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).children("div.utes_tiltva").show();
            //$("#karakter_"+this.id+"_kez_"+melyik_kez).children("div.utes_tiltva").html("Miss");
        }
        var that = this;
        
        // lekerdezzuk mi van kezeben
        var targy_id = this.fegyver_van_e_a_kezben(melyik_kez);
        var targyadatok = targyak.targyadatok(targy_id);
        
        //console.log(targyadatok.statok.sebesseg);
        
        if (melyik_kez == 1) {
            this.utesTimeout_balkez = setTimeout(function() {
                $("#karakter_"+that.id+"_kez_1_fedo").remove();
                that.balkez_eppen_ut = false;
                
                //console.log('leszedes normal balkez');
            },targyadatok.statok.sebesseg);        
        }
        
        if (melyik_kez == 2) {
            this.utesTimeout_jobbkez = setTimeout(function() {
                $("#karakter_"+that.id+"_kez_2_fedo").remove();
                that.jobbkez_eppen_ut = false;
                
                //console.log('leszedes normal balkez');
            },targyadatok.statok.sebesseg);        
        }
        
        /*
        var utesInterval = setTimeout(function() {
            //$("#karakter_"+that.id+"_kez_"+melyik_kez).children("div.utes_tiltva").hide();
            //$("#karakter_"+that.id+"_kez_"+melyik_kez).children("div.utes_sikeres").hide();
            
            $("#karakter_"+that.id+"_kez_"+melyik_kez+"_fedo").remove();
            
            console.log('leszedes normal');
            if (melyik_kez == 1) { that.balkez_eppen_ut = false; }
            if (melyik_kez == 2) { that.jobbkez_eppen_ut = false; }
            //clearTimeout(utesInterval);
        },targyadatok.statok.sebesseg);        
        */
    }
    
    // ezt egy skill hasznalja
    this.minden_fegyverrol_cd_leszedes = function() {
        //console.log('leszedes skillel');
        clearTimeout(this.utesTimeout_balkez);
        clearTimeout(this.utesTimeout_jobbkez);
        
        $("#karakter_"+this.id+"_kez_1_fedo").remove();
        $("#karakter_"+this.id+"_kez_2_fedo").remove();
        
        this.balkez_eppen_ut = false;
        this.jobbkez_eppen_ut = false;
    }

    
    this.skillek_feltoltese = function() {
        // feltoltjuk a skillek framet a classnak sizntnek megtanultaknak megfeleloen
        
        for (var i=0;i<this.hasznalhato_skillek.length;i++) {
            this.skill_skillbookba(this.hasznalhato_skillek[i]);
        }

        
        $('.skill').qtip(tooltip_options);
    }
    
    this.skill_skillbookba = function(skill_id) {
        var skill_helyek = $("#skills_" + this.id).children(".skills_elemek").children();
        
        
        
        for (i=0;i<skill_helyek.length;i++) {
            var skill_hely = skill_helyek[i];
            if ($(skill_hely).html() == "") {
                
                var skill_adatok = skillek.skill_adatok(skill_id);
                
                $(skill_hely).append('<img title="'+ skill_adatok.leiras +'" class="skill" data-skill-id="'+ skill_adatok.id +'" src="'+skill_adatok.ikon+'">');
                
                // megnezzuk, hogy megtanulta e mar az adott skillt. ha nem akkor szurke fedot kap.
                
                if (jQuery.inArray(skill_id,this.megtanult_skillek) == -1) {
                    // ha nicns benne jon a fedo
                    // amibe beleirjuk a skill_idt es kap egy listenert a fedo. ha erre katitnt akkor megtunahatja a skillt ha van eleg skillontja es a sizntje is eleg
                    var dom_fedo = '<div title="'+ skill_adatok.leiras +'" class="skillbook_fedo" data-skill-id="'+ skill_adatok.id +'" ></div>';
                    
                    $(skill_hely).append(dom_fedo);
                }
                
                
                $('.skill').qtip(tooltip_options);
                $('.skillbook_fedo').qtip(tooltip_options);
                
                break;
                
            }
        }
        
        
        
        
    }
    
    this.portre_skillre_skill = function(skill_id,hely) {
        var portre_skillek = $("#portre_skill_ikonok_" + this.id).children(".portre_skill_egy_ikon");
        
        var skill_hely = portre_skillek[hely];
        
        var skill_adatok = skillek.skill_adatok(skill_id);
                
        $(skill_hely).append('<img title="'+ skill_adatok.leiras +'" class="skill" data-skill-id="'+ skill_adatok.id +'" src="'+skill_adatok.ikon+'">');
        
        $('.skill').qtip(tooltip_options);
    }
    
    
    // betolteskor pontosan az lemenett helyekre kell rkani a cuccokat
    this.loot_taskaba_pontos_helyre = function(targy_id,hely) {
        var taska_helyek = $("#inventory_" + this.id).children("#inventory_elemek").children();
        
        var taska_hely = taska_helyek[hely];
        
        var targyadatok = targyak.targyadatok(targy_id);
        
        $(taska_hely).append('<img title="'+ targyadatok.targy_leirasa +'" class="item" data-item-id="'+ targyadatok.id +'" src="assets/items/'+targyadatok.kep_fajl+'">');
        $('.item').qtip(tooltip_options);
        $( ".item" ).draggable(inventory_draggable_options);
        $( ".egy_taskahely" ).droppable(inventory_droppable_options);
    }
        
    // ezzel fel tudjuk tolteni a taskat pl jatek betoltesnel az adatbazisbol
    this.loot_taskaba = function(targy_id) {
        
        
        
        if (this.van_e_helye()) {
            
            var taska_helyek = $("#inventory_" + this.id).children("#inventory_elemek").children();
            
            
            for (i=0;i<taska_helyek.length;i++) {
                var taska_hely = taska_helyek[i];
                if ($(taska_hely).html() == "") {
                    // ures a taskahely tehat berakhatjuk a targyat
                    this.loot_taskaba_pontos_helyre(targy_id,i);
                    
                    break;
                }
            };
            
            this.inventory_objektum_frissitese();
            
            //console.log($("#inventory_" + this.id).children("#inventory_elemek"));
            return true;
        } else {
            return false;
        }
    }
    
    this.penz_taskaba = function(mennyit) {
        this.penz += mennyit;
    }
    
    this.van_e_helye = function() {
        var ret = false;
        var taska_helyek = $("#inventory_" + this.id).children("#inventory_elemek").children();
            
        for (i=0;i<taska_helyek.length;i++) {
            var taska_hely = taska_helyek[i];
            
            if ($(taska_hely).html() == "") {
                ret = true;
                break;
            }
        }
        return ret;        
    }
    
    this.sor_beallitas = function(hanyadik_sorban_van,sorban_melyik_oldal) {
        this.hanyadik_sorban_van = hanyadik_sorban_van;
        this.sorban_melyik_oldal = sorban_melyik_oldal;
    }
    
    
    this.hanyadik_a_karakterek_tombben = function() {
        for(i=0;i<karakterek.length;i++) {
            if (this.id = karakterek[i].id) {
                return i;
                break;
            }
        }
    }
    
    // visszadja a hanyadik elem a tombben. ha levesszuk ezt kell atirni 0 ra! es nem torolni!
    this.van_e_nala_targy_id = function(targy_id) {

        var ret = false;
        
        var kodolt_targy_id  = targyak.targy_generalas(targy_id);
        
        for (var i = 0; i< this.inventory.length; i++) {
            if (this.inventory[i] == kodolt_targy_id) {
                ret = true;
                break;
            }
        }
        
        return ret;
        
        //this.inventory_objektum_frissitese();
    }
    
    // ezt hasznalja peldaul a zart ajto kulcslyuk! egy konkret targyat vesz el nem nezi hol van ataskaban
    // ha tobb is van belole akkor az elsot veszi el amit talalt
    this.targy_elvetele = function(targy_id) {
        

        var taska_helyek = $("#inventory_" + this.id).children("#inventory_elemek").children();
        for (i=0;i<taska_helyek.length;i++) {
            var taska_hely = taska_helyek[i];
            if ($(taska_hely).html() != "") {
                if ($(taska_hely).children().attr("data-item-id") == targy_id) {
                    $(taska_hely).html("");
                    break;
                }
                
                
            }
        };
        
        
        this.inventory_objektum_frissitese();
    }
    
    // ez konkret taskahelybol torli! bizotnsag keveedrt a targy idt is egyeztetni
    this.targy_megsemmisitese_taskabol = function(taskahely_id,item_id) {
        if ($("#"+taskahely_id).children().attr("data-item-id") == item_id) {
            $("#"+taskahely_id).html("");
        }
        
        this.inventory_objektum_frissitese();
    }
    
    this.feltamasztas = function() {
        if (this.hp <= 0) {
            // hp 10% val eled fel
            this.hp = parseInt((this.max_hp * 0.1));
            
            $("#portre_kep_" + this.id).html('<img width="40" src="'+this.kep+'">');
            
            var mennyi_hp_maradt_szazalekban = parseInt((this.hp/this.max_hp)*119);
            this.hp_csik_animalas(mennyi_hp_maradt_szazalekban);
            
            info_szoveg(this.nev + ' is resurrected.');
        }
    }
    
    this.szovegbuborek = function(szoveg) {
        $("#bubble_szoveg_" + this.id).html(szoveg);
        var pos = $("#portre_kep_" + this.id).position();
        $("#bubble_" + this.id).css("left",pos.left-110);
        $("#bubble_" + this.id).css("top",pos.top-10);
        $("#bubble_" + this.id).fadeIn(300);
        
        // csak 1 mp ig van kint aztan eltunik
        var that = this;
        setTimeout(function(){
            $("#bubble_" + that.id).hide();
        },2500);
        
    }
}


