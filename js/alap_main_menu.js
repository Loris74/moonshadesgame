    var tooltip_options_main_menu = {
            content: {
                attr: 'title'
            },
            show: {
              delay: 100  
            },
            style: {
                classes: 'ui-tooltip-tipped'
            },
            position: {
            my: 'top left',
            target: 'mouse',
            viewport: $(window), // Keep it on-screen at all times if possible
            adjust: {
                x: 10,  y: 10
            }
        },
    }
    
    var karakterek_szama = 0;
    var karakterek = new Array();
    var targyak = new Targyak();
    var ideiglenes_terkepek = new Array();
    var sor = 1;
    var hely = "bal";

    function panel_be(melyik) {
        console.log(melyik);
        //$(melyik).show('drop'); 
        $('#regisztracio, #uj_jatek, #credits, #betoltes, #screenshots, #felhasznalo_adatok').not(melyik).hide();
        $(melyik).show('drop');        
        
        
    }
    
    function fomenu_ujratoltes() {
        panel_be("#screenshots");
           $.ajax({  
             type: "POST",  
             url: "ajax_fomenu_tartalom.php",  
             data: "",  
             success: function(ret){  
                 $('#chargen_menu').html(ret);
                 fomenu_eventek();
             }  
         });  
    }
    
    function alap_popup(szoveg) {
        if ($("#alap_popup").is(":visible")) {
            $("#alap_popup").hide();
        } else {
            
        }
            $("#alap_popup_szoveg").html(szoveg);
            $("#alap_popup").show('slide', { direction: "up" }, 600);
        
    }
    
    function new_game_withoutreg() {
        //
        $("#new_game_withoutreg_gomb").off('click');
        
        $("#new_game_withoutreg_gomb").html("Loading game...");
        
        // csinalunk egy random reget:
        $.ajax({  
             type: "POST",  
             url: "ajax_regisztracio_random.php",  
             data: "",  
             success: function(ret){  
                 // elinditjuk a premaet
                 premade_party();
             }  
         }); 
    }
    
    function fomenu_eventek() {
        $("#regisztracio_form_elkuldes").click(function(){
            // ellenrozesek stb
            
            //ajax
            $.ajax({  
             type: "POST",  
             url: "ajax_regisztracio.php",  
             data: $("form#regisztracio_form").serialize(),  
             success: function(ret){  
                 if (ret == "1") {
                     alap_popup('Registration successful! You can login now.')
                 }
                 if (ret == "0") {
                     alap_popup('Username already in use, please select another!')
                 }
                 
                 if (ret == "2") {
                     alap_popup('E-mail address is not valid!')
                 }
                 
                 if (ret == "3") {
                     alap_popup('All filed is required!')
                 }
                 

             }  
         }); 
        });
        
        $("#belepes_form_elkuldes").click(function(){
             $("#alap_popup").hide();
             
            // ellenrozesek stb
            
            //ajax
            $.ajax({  
             type: "POST",  
             url: "ajax_belepes.php",  
             data: $("form#belepes_form").serialize(),  
             success: function(ret){  
                 if (ret == 1) {
                     // sikeres
                     document.location.reload();
                     //fomenu_ujratoltes();
                     //panel_be("#felhasznalo_adatok");
                 } else {
                     alap_popup('Wrong email or password!');
                 }
                 

             }  
         }); 
        });
        
        
        
        $(".chargen_menupont").mouseover(function(){
            $(this).css("background-image","url('assets/images/box_lit.png')");
            var pozicio = $(this).offset();
            
            $(".hand_fire").show() ;
            $(".hand_fire").css("left",pozicio.left-150) ;
            $(".hand_fire").css("top",pozicio.top) ; 
            
            if ($(this).attr("data-menu-id") == 0) {
                $("#chargen").stop().animate({backgroundPosition: '-200px -300px'});    
            }
            if ($(this).attr("data-menu-id") == 1) {
                $("#chargen").stop().animate({backgroundPosition: '-400px -500px'});    
            }
            if ($(this).attr("data-menu-id") == 2) {
                $("#chargen").stop().animate({backgroundPosition: '-700px -400px'});    
            }
            if ($(this).attr("data-menu-id") == 3) {
                $("#chargen").stop().animate({backgroundPosition: '-900px -550px'});    
            }
            if ($(this).attr("data-menu-id") == 4) {
                $("#chargen").stop().animate({backgroundPosition: '-0px -650px'});    
            }
                        
            
            
        });
        $(".chargen_menupont").mouseout(function(){
            $(this).css("background-image","url('assets/images/box.png')");
            
            
        });
        
        $("#kilepes_gomb").click(function(){
             $.ajax({  
                 type: "POST",  
                 url: "ajax_kilepes.php",  
                 data: "",  
                 success: function(ret){  
                     if (ret == 1) {
                         fomenu_ujratoltes();
                     }
                     

                 }  
             });
            
        });
        
        
        
        
        $("#belepes_gomb").click(function(){
            if ($("#belepes").is(":visible")) {
                $("#belepes").slideUp(300);    
            } else {
                $("#belepes").slideDown(300);    
            }
            
        });
        
                
        $("#register_gomb").click(function(){
            if ($("#regisztracio").is(":visible")) {
                $("#regisztracio").fadeOut(200);    
            } else {
                panel_be("#regisztracio");
            
            }
            
        });
        
        
        $("#new_game_gomb").click(function(){
            if ($("#uj_jatek").is(":visible")) {
                $("#uj_jatek").fadeOut(200);    
            } else {
                panel_be("#uj_jatek");
                
            }
            
        });
        
         $("#new_game_withoutreg_gomb").click(function(){
            new_game_withoutreg();
        });
        
        $("#new_game_premade_gomb").click(function(){
            premade_party();
        });
        
        
        $("#welcome_gomb").click(function(){
            if ($("#felhasznalo_adatok").is(":visible")) {
                $("#felhasznalo_adatok").fadeOut(200);    
            } else {
                panel_be("#felhasznalo_adatok");
                
            }
            
        });
        
         $("#intro_gomb").click(function(){
            document.location = 'intro.php';
            
        });
        
        $("#load_game_gomb").click(function(){
            if ($("#betoltes").is(":visible")) {
                $("#betoltes").fadeOut(200);    
            } else {
                panel_be("#betoltes");
                
            }
            
        });
        
        
        
        $("#credits_gomb").click(function(){
            if ($("#credits").is(":visible")) {
                $("#credits").fadeOut(200);    
            } else {
                
                panel_be("#credits");
                
                $("#credits_scroll").scrollTop(-1000);
                    
                $("#credits_scroll").animate({scrollTop:1000}, 52000, 'linear');
                
                   
                
            }
            
        });        
    }
    
    
    function mycarousel_initCallback(carousel) {
        jQuery('.jcarousel-control a').bind('click', function() {
            carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
            return false;
        });

        jQuery('.jcarousel-scroll select').bind('change', function() {
            carousel.options.scroll = jQuery.jcarousel.intval(this.options[this.selectedIndex].value);
            return false;
        });

        jQuery('#portre_valaszto_jobb').bind('click', function() {
            carousel.next();
            return false;
        });

        jQuery('#portre_valaszto_bal').bind('click', function() {
            carousel.prev();
            return false;
        });
    };    
    
    function chargen_statok_ujraszamolas(melyik_stat) {
        var uj_ertek = parseInt($("#stat_" + melyik_stat).html());
        if (melyik_stat == "power") {
            $("#stat_leiras_power").html(uj_ertek*10);
        }
        if (melyik_stat == "dexterity") {
            $("#stat_leiras_dexterity").html(parseInt(uj_ertek/4));
        }
        if (melyik_stat == "defense") {
            $("#stat_leiras_defense").html(uj_ertek*10);
        }
        if (melyik_stat == "vitality") {
            $("#stat_leiras_vitality").html(uj_ertek*10);
        }
    }
    
    var elkoltheto_stat_pont = 20;
    var kivalasztott_avatar = "";
    
    var kivalasztott_faj = 0;
    var kivalasztott_osztaly = 0;
    
    
    // csak a demo miatt kerult bele mindeki warrior
    function premade_party() {
        
        karakterek = [];
        
        var premade_osztalyok = [3,4,2,5];
        var premade_avatarok = [1,2,3,4];
        var premade_nevek = ["Taurion","Idhrenion","Godric","Diomedes"];
        
        for (var i=1; i<=4; i++) {
            
            if (i == 3 || i == 5) { sor++; }

            var nev = premade_nevek[i-1];
            var szukseges_adatok = {
                stat_power:30,
                stat_dexterity:10,
                stat_defense: 10,
                stat_vitality: 10,
                faj: 1,
                osztaly: premade_osztalyok[i-1],
                kep: "avatars/"+ premade_avatarok[i-1] +".jpg"
            }
            
            var karakter = new Karakter();
            karakter.letrehozas(i,nev);
            karakter.sor_beallitas(sor,hely);
            karakter.adatok_beolvasasa_chargenbol(szukseges_adatok);
            
            // alap cuccokkal feltoltjuk az inventorykat:
            if (premade_osztalyok[i-1] == "1") {
                var targy_id = targyak.targy_generalas(1);
                karakter.inventory = [targy_id];
            }
            if (premade_osztalyok[i-1] == "2") {
                var targy_id = targyak.targy_generalas(470);
                karakter.inventory = [targy_id];
                karakter.megtanult_skillek = [36];
            }
            if (premade_osztalyok[i-1] == "3") {
                var targy_id = targyak.targy_generalas(370);
                karakter.inventory = [targy_id];
                karakter.megtanult_skillek = [4];
            }
            if (premade_osztalyok[i-1] == "4") {
                var targy_id = targyak.targy_generalas(190);
                karakter.inventory = [targy_id];
            }
            if (premade_osztalyok[i-1] == "5") {
                var targy_id = targyak.targy_generalas(310);
                karakter.inventory = [targy_id];
                karakter.megtanult_skillek = [34];
            }
            
            //console.log(karakter.inventory[0]);
            
            // class 1-Fanatic, 2- Heretic, 3-Paladin, 4-Warrior, 5-Sorcerer, 6- Thief, 7-Pathfinder, 8-Berserker
            
            if (hely == "bal") { hely = "jobb";} else { hely = "bal"; }
    
        }
        
            
        
        $("#gomb_start_adventures").click();
        
    }
    
    $(document).ready(function() { 
        
        fomenu_ujratoltes();
        
        $('.lista_elem').qtip(tooltip_options_main_menu); 
        $('.lista_elem2').qtip(tooltip_options_main_menu); 
        $('.stat_egy').qtip(tooltip_options_main_menu); 
        
        jQuery(document).ready(function() {
            jQuery("#portre_valaszto").jcarousel({
                scroll: 4,
                initCallback: mycarousel_initCallback,
                // This tells jCarousel NOT to autobuild prev/next buttons
                buttonNextHTML: null,
                buttonPrevHTML: null
            });
        });
        
        
        
        $(".stat_egy_nyil_jobbra").click(function(){
            var melyik_stat = $(this).attr("data-stat"); 
            var ertek = parseInt($("#stat_" + melyik_stat).html());
            
            if (elkoltheto_stat_pont > 0) {
                $("#uj_karakter_mentes").attr('disabled','disabled');
                
                $("#stat_"+melyik_stat).html(ertek+1);
                elkoltheto_stat_pont--;
                $("#elkoltheto_pont").html(elkoltheto_stat_pont);
                
                chargen_statok_ujraszamolas(melyik_stat);
            }
            if (elkoltheto_stat_pont == 0) {
                $("#uj_karakter_mentes").removeAttr('disabled');
            }
            
        });
        
        $(".stat_egy_nyil_balra").click(function(){
            var melyik_stat = $(this).attr("data-stat"); 
            var ertek = parseInt($("#stat_" + melyik_stat).html());
            
            if (ertek > 10) {
                $("#stat_"+melyik_stat).html(ertek-1);
                elkoltheto_stat_pont++;
                $("#elkoltheto_pont").html(elkoltheto_stat_pont);
                
                chargen_statok_ujraszamolas(melyik_stat);
            }
            
            if (elkoltheto_stat_pont > 0) {
                $("#uj_karakter_mentes").attr('disabled','disabled');
            }
                
        });
        
        
        $(".mentes_egysor").click(function(){
            var mentes_id = $(this).attr("data-id");
            document.location = "jatek.php?mentes_id=" + mentes_id;   
        });
        
        
        $("#gomb_start_adventures").click(function(){
            // megcisnaljuk az elso mentest
            // a data egy objektum amit a kari generalasnal toltunk fel amikor letrehoz egy egy karkatert
            
            $("#gomb_start_adventures").attr("disabled","disabled");
            
            // ha elso mentes akkor a terkepet az 1. szintbol kepzzuk
            var terkep = new Terkep();
            terkep.init(1);  
            
            
            //console.log(karakterek);          
            //console.log(JSON.stringify(karakterek));
             
            $.ajax({  
                 type: "POST",  
                 url: "ajax_start_adventures.php",  
                 processData: false,
                 data: "karakterek=" + JSON.stringify(karakterek) + "&terkep=" +  JSON.stringify(terkep),  
                 success: function(ret){  
                     if (ret == 1) {
                         // sikeres atrakjuk a webgl re
                         document.location = "jatek.php";
                     }
                     

                 }  
             }); 
        })
        
        
        $("#alap_popup").click(function(){
             $("#alap_popup").hide('slide', { direction: "up" }, 600);
        });
        
        
        $(".portre_valaszto_egy").click(function(){
            $('.portre_valaszto_egy').each(function() {
                $(this).removeClass("portre_valaszto_egy_aktiv");
            });
            
            $(this).addClass("portre_valaszto_egy_aktiv");
            kivalasztott_avatar = $(this).attr("data-id");
            
            $("#uj_jatek_jobb_also").fadeIn(300);
        })
        
        $(".lista_elem").click(function(){
            kivalasztott_faj = $(this).attr("data-faj");
            
            var pozicio = $(this).offset();
            
            $(".hand_fire_kicsi1").show() ;
            $(".hand_fire_kicsi1").css("left",pozicio.left+$(this).width()) ;
            $(".hand_fire_kicsi1").css("top",pozicio.top) ; 
            
            $("#uj_jatek_jobb_felo").fadeIn(300);
            
        });
        
        
        $(".lista_elem2").click(function(){
            
            if (!$(this).hasClass("elem_disabled")) {
                kivalasztott_osztaly = $(this).attr("data-osztaly");
            
                var pozicio = $(this).offset();
                
                $(".hand_fire_kicsi2").show() ;
                $(".hand_fire_kicsi2").css("left",pozicio.left+$(this).width()) ;
                $(".hand_fire_kicsi2").css("top",pozicio.top) ; 
                
                $("#uj_jatek_bal_also").fadeIn(300);
            }
            
            
        });
        
        
        $("#uj_karakter_mentes").click(function(){
            karakterek_szama++; 
            
            if (karakterek_szama <= 4) {
                var nev = $("#karakter_neve").val();
                
                if (karakterek_szama == 3 || karakterek_szama == 5) { sor++; }
                // itt lere kell hoznunk a karakter objetumot!
                
                var szukseges_adatok = {
                    stat_power:parseInt($("#stat_power").html()),
                    stat_dexterity: parseInt($("#stat_dexterity").html()),
                    stat_defense: parseInt($("#stat_defense").html()),
                    stat_vitality: parseInt($("#stat_vitality").html()),
                    faj: kivalasztott_faj,
                    osztaly: kivalasztott_osztaly,
                    kep: "avatars/"+kivalasztott_avatar+".jpg"
                }
                
                var karakter = new Karakter();
                karakter.letrehozas(karakterek_szama,nev);
                karakter.sor_beallitas(sor,hely);
                karakter.adatok_beolvasasa_chargenbol(szukseges_adatok);
                //karakter.loot_taskaba(1);  
                
                if (kivalasztott_osztaly == "1") {
                    var targy_id = targyak.targy_generalas(1);
                    karakter.inventory = [targy_id];
                }
                if (kivalasztott_osztaly == "2") {
                    var targy_id = targyak.targy_generalas(470);
                    karakter.inventory = [targy_id];
                    karakter.megtanult_skillek = [36];
                }
                if (kivalasztott_osztaly == "3") {
                    var targy_id = targyak.targy_generalas(370);
                    karakter.inventory = [targy_id];
                    karakter.megtanult_skillek = [4];
                }
                if (kivalasztott_osztaly == "4") {
                    var targy_id = targyak.targy_generalas(190);
                    karakter.inventory = [targy_id];
                }
                if (kivalasztott_osztaly == "5") {
                    var targy_id = targyak.targy_generalas(310);
                    karakter.inventory = [targy_id];
                    karakter.megtanult_skillek = [34];
                }                
                
                // ha elmentettuk akkor nullazuk a statokat:
                elkoltheto_stat_pont = 20;
                $("#stat_power").html("10");
                $("#stat_dexterity").html("10");
                $("#stat_defense").html("10");
                $("#stat_vitality").html("10");
                chargen_statok_ujraszamolas("power");
                chargen_statok_ujraszamolas("dexterity");
                chargen_statok_ujraszamolas("defense");
                chargen_statok_ujraszamolas("vitality");
                $("#uj_karakter_mentes").attr('disabled','disabled');

                if (hely == "bal") { hely = "jobb";} else { hely = "bal"; }
                          
                $("#portre_kontener").fadeIn(300);
                
                var tartalom = "";
                tartalom += '<div class="portre" data-id="'+karakterek_szama+'">';
                tartalom += '<div class="portre_kep">';
                tartalom += '<div class="portre_kep_kep"><img width="40" src="avatars/'+kivalasztott_avatar+'.jpg"></div>';
                tartalom += '<div class="portre_kep_szint">1</div>';
                tartalom += '</div>';
                tartalom += '<div class="portre_nev">'+nev+'</div>';
                tartalom += '<div class="hp_es_mana">';
                tartalom += '<div class="hp_bar"></div>';
                tartalom += '<div class="mana_bar"></div>';
                tartalom += '</div>';
                tartalom += '</div>';
                
                $("#portre_kontener").append(tartalom);
                
                if (karakterek_szama == 4) {
                    $("#gomb_start_adventures").show();
                }
                
                // eltuntetjuk a kivalszotka,t hogy urja tudjon valasztani
                $("#karakter_neve").val("");
                $(".hand_fire_kicsi1").hide();
                $(".hand_fire_kicsi2").hide();
                
                
                
                $("#uj_jatek_jobb_felo").hide();
                $("#uj_jatek_bal_also").hide();
                $("#uj_jatek_jobb_also").hide();
                
            }
            
        });
        
    });
    
    function randint(min,max){ 
    var min = parseInt(min);
    var max = parseInt(max);
    return parseInt(Math.floor(Math.random()*(max-min+1))+min);
}

function base64_encode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Rafał Kukawski (http://kukawski.pl)
  // *     example 1: base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['btoa'] == 'function') {
  //    return btoa(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}


function base64_decode (data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Thunder.m
  // +      input by: Aman Gupta
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  // *     returns 1: 'Kevin van Zonneveld'
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['atob'] == 'function') {
  //    return atob(data);
  //}
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = "",
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec;
}

    
    
    
                    
                        
                        
                    
                    
                    
                    
                        
                        
                    
                    
                