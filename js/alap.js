var tutorial_hol_jar = 0;



    var tooltip_options = {
            content: {
                attr: 'title'
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
        
        
        //skillss:
        
        var skills_draggable_options = {  
            helper: 'clone',
            stack: ".skill",
            start: function(event,ui) {
                //console.log(event);
                //console.log(ui);
                
                
                
                var atrakhatja = true;
                
                var amit_at_akar_huzni_skill_id = $(ui.helper).attr("data-skill-id");
                var karakter_id = $(ui.helper).parent().parent().attr("data-karakter-id");
                
                // megnezzuk, hogy a skillbaron kint van e mar:
                var skillek_kirakva = $("#portre_skill_ikonok_" + karakter_id).children();
                
                for (var i=0;i<skillek_kirakva.length;i++) {
                    if ($(skillek_kirakva[i]).children().length != 0) {
                        if ($(skillek_kirakva[i]).children().attr("data-skill-id") == amit_at_akar_huzni_skill_id) {
                            atrakhatja = false;
                            info_szoveg("This skill is already in your the skill bar!");
                            break;
                        }
                    }
                }
                
                // megnezzuk a szintjet:
                var skill_adatok = skillek.skill_adatok(amit_at_akar_huzni_skill_id);
                var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id);
                
                if (skill_adatok.szint > karakterek[karakter_index].szint) {
                    atrakhatja = false;
                    hang_lejatszas(38,{pan:0,volume:40});
                    info_szoveg("Your level is not high enough to use that skill!");
                }
                
                return atrakhatja;
            },
            stop: function(event,ui) {
         
            },
            drag: function(event,ui) {
                //console.log(event);
                //console.log($(event.target).css("z-index"));
            },
            scroll: false,  cursor: "default", revert: "invalid", revertDuration: 100
        }; 
        
        var portre_skill_droppable_options = {
            hoverClass: "karakterlap_egy_taskahely_drop-hover",
            activeClass: "portre_skill_egy_ikon_aktiv",
            tolerance: "intersect",
            accept: function(el) {
                var amit_dobni_akar_karakter_id = $(el).parent().parent().attr("data-karakter-id");
                var ahova_dobni_akarja_karakter_id = $(this).parent().attr("data-karakter-id");
                
                
                //console.log(amit_dobni_akar_karakter_id + " " +ahova_dobni_akarja_karakter_id);
                
                if (el.hasClass('skill') && amit_dobni_akar_karakter_id == ahova_dobni_akarja_karakter_id) {
                    // megnezzuk megvan e a szintje hozza:
                    
                    var skill_adatok = skillek.skill_adatok($(el).attr("data-skill-id"));
                    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(amit_dobni_akar_karakter_id);
                    

                    if (skill_adatok.szint <= karakterek[karakter_index].szint) {
                        return true;    
                    } else {
                        // nem eleg a sizntje hozza!
                        return false;
                        
                    }
                    
                    
                } else {
                    return false;
                }
                       
            },
            drop: function( event, ui ) {
                
                ui.draggable.attr("style","");
                var melyikbe_rakta = $(this).attr("id");
                var melyikbol_jott = ui.draggable.parent().attr("id");
                var melyikbol_jott_tipus = melyikbol_jott.substring(0,11);
                
                //console.log(melyikbe_rakta);
                
                $("#" + melyikbe_rakta).html($(ui.draggable));
                $("#" + melyikbol_jott).html($(ui.draggable).clone());
                
                $( ".skill" ).draggable(skills_draggable_options);
                
                var melyik_karakter = $(this).parent().attr("data-karakter-id");
                
                var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(melyik_karakter)
                karakterek[karakter_index].portre_skillek_objektum_frissitese();
                
                hang_lejatszas(8,{pan:0,volume:17});
                
                mozgas_logolas("SKILLT BERAK skill:" + melyikbe_rakta + " melyik_karakter:" + melyik_karakter + " melyikbol_jott:" +melyikbol_jott);
                
                $('.skill').qtip(tooltip_options);
               
            },
            over: function( event, ui ) {
                
            },
            deactivate: function(event, ui) {

            }
            
        };
        
                      
// invenotry
        var inventory_draggable_options = {  
            stack: ".item",
            start: function(event,ui) {
                $('.item').qtip('destroy');
                //$(this).css({cursor: 'none'});
                //$(event.target).css("z-index","20");
                //console.log(event.target);
                //console.log($(ui.helper));
                //console.log(ui);
            },
            stop: function(event,ui) {
                $('.item').qtip(tooltip_options);
                //$(event.target).css("z-index","11");
                
            },
            drag: function(event,ui) {
                //console.log(event);
                //console.log($(event.target).css("z-index"));
            },
            scroll: false,  cursor: "default", revert: "invalid", revertDuration: 100,  snapMode: "inner" 
        };     
        
        
        var karakterlap_draggable_options = {  
            stack: ".item",
            start: function(event,ui) {
                //console.log("karakterlap_draggable_options START");
                
                $('.item').qtip('destroy');
                //$(event.target).css("z-index","20");
                
                //console.log(ui);
                $(".inventory_hatter").css("z-index","9");
                
                
            },
            stop: function(event,ui) {
                //console.log("karakterlap_draggable_options STOP");
                
                //$(event.target).css("z-index","11");
                $('.item').qtip(tooltip_options);
                //console.log("stopp");
                               
            },
            scroll: false,  cursor: "default", revert: "invalid", revertDuration: 100 , snapMode: "inner" 
        };   
        
        

        
        var inventory_droppable_options = {
            hoverClass: "karakterlap_egy_taskahely_drop-hover",
            accept: function(el) {
                
                
                if ($(this).children().length == 0 && (el.hasClass('item') || el.hasClass('item_karakterrol')  )) {
                    return true;
                } else {
                    // van mar itt item
                    return false;
                }                 
                
            },
            drop: function( event, ui ) {
                
                $(".inventory_hatter").css("z-index","10");
                
                //console.log("inventory_droppable_options------ DROP! -----");
                
                hang_lejatszas(8,{pan:0,volume:20});
                
                ui.draggable.attr("style","");
                var melyikbe_rakta = $(this).attr("id");
                var melyikbol_jott = ui.draggable.parent().attr("id");
                var melyikbol_jott_tipus = melyikbol_jott.substring(0,11);
                //console.log("melyikbe_rakta:" + melyikbe_rakta);
                //console.log("melyikbol_jott:" + melyikbol_jott);
                //console.log("melyikbol_jott_tipus:" + melyikbol_jott_tipus);
                
                
                
                if (melyikbol_jott_tipus == "karakterlap") {
                    // ha karakterlapbol rakott inventoryba
                    var melyik_karakter = ui.draggable.parent().parent().parent().attr("id").substring(12);
                    
                    var melyik_karakterlaprol_van_szo = $("#karekterlap_" + melyik_karakter).children("#karekterlap_felszerelesek").children("#" +melyikbol_jott);

                    $("#" + melyikbe_rakta).html(melyik_karakterlaprol_van_szo.html());
                    $("#" + melyikbe_rakta).children().attr("style","position: relative");
                    $("#" + melyikbe_rakta).children().draggable(inventory_draggable_options);
                    melyik_karakterlaprol_van_szo.html("");
                    // ha levett valamit es attete az inventoryba akkor is ujraszmolunk
                    
                    // minusz 1 kell mert a karakterek tombben 0 tol tarolunk a dom id pedig 1 tol kezdodik
                    karakterek[melyik_karakter-1].statok_ujraszamolas();        

                } else {
                    // ha inventorybol rakott inventoryba
                    var melyik_karakter = $(this).parent().parent().attr("id").substring(10);

                    $("#" + melyikbe_rakta).html($("#" + melyikbol_jott).html());
                    $("#" + melyikbe_rakta).children().attr("style","position: relative");
                    $("#" + melyikbe_rakta).children().draggable(inventory_draggable_options);
                    $("#" + melyikbol_jott).html("");

                }
                
                $('.item').qtip(tooltip_options);
                
                
                //console.log("kezebol > inventorbe");
                //console.log(melyik_karakter);
                
                // ha inventoryba rakja es a kaakterlaprol jott akkor a kezebol kivesszuk:
                if (melyikbol_jott == "karakterlap_bal_kez") {
                    $("#karakter_"+(melyik_karakter)+"_kez_1").html('');    
                }
                if (melyikbol_jott == "karakterlap_jobb_kez") {
                    $("#karakter_"+(melyik_karakter)+"_kez_2").html('');    
                }
                
                var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(melyik_karakter)
                karakterek[karakter_index].inventory_objektum_frissitese();
                karakterek[karakter_index].karakterlap_objektum_frissitese();

                
            },
            over: function( event, ui ) {

            },
            deactivate: function(event, ui) {

            }
            
        };      
        
        // karakterlap:
        var karakterlap_felszereles_droppable_options = {
            hoverClass: "karakterlap_egy_taskahely_drop-hover",
            accept: function(el) {
                
                
                var iderakhatja_e = false;
                
                var targy_id = el.attr("data-item-id");
                var targyadatok = targyak.targyadatok(targy_id);
                var ahova_dobni_akarja = $(this).attr("id");
                
                
                // megnezzuk, hogy az adott targy melytik fokategoriaba tartzik. csak fegyver, pancel, kiegeszito johet ide!
                
                if (targyadatok.fokategoria == "fegyver" || targyadatok.fokategoria == "pancel" || targyadatok.fokategoria == "kiegeszito" ) {
                    // megnezzuk, hogy a targy alkategoriaja megfelel e a helynek:
                    if (targyadatok.fokategoria == "fegyver" && (ahova_dobni_akarja == "karakterlap_bal_kez" || ahova_dobni_akarja == "karakterlap_jobb_kez")) {
                        iderakhatja_e = true;    
                        
                    }
                    if (targyadatok.fokategoria == "pancel") {
                        if (targyadatok.alkategoria == "sapka" && ahova_dobni_akarja == "karakterlap_fej") {
                            iderakhatja_e = true;    
                        }
                        
                        
                        if (targyadatok.alkategoria == "kesztyu" && (ahova_dobni_akarja == "karakterlap_jobb_kez_kesztyu" || ahova_dobni_akarja == "karakterlap_bal_kez_kesztyu")) {
                            iderakhatja_e = true;    
                        }
                        if (targyadatok.alkategoria == "mellvert" && ahova_dobni_akarja == "karakterlap_torzs") {
                            iderakhatja_e = true;    
                        }
                        if (targyadatok.alkategoria == "cipo" && ahova_dobni_akarja == "karakterlap_cipo") {
                            iderakhatja_e = true;    
                        }
                        if (targyadatok.alkategoria == "ov" && ahova_dobni_akarja == "karakterlap_ov") {
                            iderakhatja_e = true;    
                        }
                        if (targyadatok.alkategoria == "nadrag" && ahova_dobni_akarja == "karakterlap_nadrag") {
                            iderakhatja_e = true;    
                        }
                        
                    }
                    if (targyadatok.fokategoria == "kiegeszito") {
                        if (targyadatok.alkategoria == "nyaklanc" && ahova_dobni_akarja == "karakterlap_nyak") {
                            iderakhatja_e = true;    
                        }    
                        if (targyadatok.alkategoria == "gyuru" && (ahova_dobni_akarja == "karakterlap_bal_kez_gyuru" || ahova_dobni_akarja == "karakterlap_jobb_kez_gyuru")) {
                            iderakhatja_e = true;    
                        }
                    }
                    
                    
                    
                }
                
                //console.log("targyadatok.fokategoria:"+targyadatok.fokategoria);
                //console.log("this:"+$(this).attr("id"));
                
                /*
                if ($(this).children().length == 0 && (el.hasClass('item') || el.hasClass('item_karakterrol')) ) {
                    return true;
                } else {
                    // van mar itt item
                    return false;
                } 
                */ 
                
                return iderakhatja_e;               
                
            },
            drop: function( event, ui ) {
                
                //console.log("karakterlap_felszereles_droppable_options------------drop---------");
                
                ui.draggable.attr("style","");
                
                var melyikbe_rakta = $(this).attr("id");
                var melyikbol_jott = ui.draggable.parent().attr("id");
                var melyikbol_jott_tipus = melyikbol_jott.substring(0,11);
                
                //console.log("melyikbe_rakta:" + melyikbe_rakta);
                //console.log("melyikbol_jott:" + melyikbol_jott);
                //console.log("melyikbol_jott_tipus:" + melyikbol_jott_tipus);
                
                var melyik_karakter = $(this).parent().parent().attr("id").substring(12);
                //console.log("melyik_karakter:" + melyik_karakter);        
                //console.log("$(this).parent().parent().attr(id):" + $(this).parent().parent().attr("id"));
                
                
                
                 
                if (melyikbol_jott_tipus == "karakterlap") {
                     // ha karakterlapbol rakott karakterlapba

                    var melyik_karakter_celpont = ui.draggable.parent().parent().parent().attr("id").substring(12);
                    //console.log("melyik_karakter_celpont:" + melyik_karakter_celpont);
                    //console.log(ui.draggable.parent());
                    

                     if (melyik_karakter_celpont == melyik_karakter) {
                         // ha ugyanazon a karakterlapon csinalta
                         var melyik_karakterlaprol_van_szo = $("#karekterlap_" + melyik_karakter).children("#karekterlap_felszerelesek").children("#" +melyikbe_rakta);
                         //console.log(melyik_karakterlaprol_van_szo);
                         
                         var melyikbol_jott_konkretan = $("#karekterlap_" + melyik_karakter).children("#karekterlap_felszerelesek").children("#" +melyikbol_jott);
                         //console.log(melyikbol_jott_konkretan);
                         
                         melyik_karakterlaprol_van_szo.html(melyikbol_jott_konkretan.html());
                         //melyik_karakterlaprol_van_szo.attr("style","position: relative");
                         melyik_karakterlaprol_van_szo.children().draggable(karakterlap_draggable_options);
                         melyikbol_jott_konkretan.html("");
                     } else {
                         // ha ket karakter kozott mozgatta:
                         var melyik_karakterlaprol_van_szo = $("#karekterlap_" + melyik_karakter).children("#karekterlap_felszerelesek").children("#" +melyikbe_rakta);
                         //console.log(melyik_karakterlaprol_van_szo);
                         
                         var melyikbol_jott_konkretan = $("#karekterlap_" + melyik_karakter_celpont).children("#karekterlap_felszerelesek").children("#" +melyikbol_jott);
                         //console.log(melyikbol_jott_konkretan);
                         
                         melyik_karakterlaprol_van_szo.html(melyikbol_jott_konkretan.html());
                         //melyik_karakterlaprol_van_szo.attr("style","position: relative");
                         melyik_karakterlaprol_van_szo.children().draggable(karakterlap_draggable_options);
                         melyikbol_jott_konkretan.html("");
                         
                     }
                     
                     karakterek[melyik_karakter_celpont-1].statok_ujraszamolas();

                     
                } else {
                    // ha inventoribol raktt karakterlapba
                    var melyik_karakterlaprol_van_szo = $("#karekterlap_" + melyik_karakter).children("#karekterlap_felszerelesek").children("#" +melyikbe_rakta);
                    
                    //console.log(melyik_karakterlaprol_van_szo);
                    
                    melyik_karakterlaprol_van_szo.html($("#" + melyikbol_jott).html());
                    melyik_karakterlaprol_van_szo.children().attr("style","position: relative");
                    melyik_karakterlaprol_van_szo.children().draggable(karakterlap_draggable_options);
                    $("#" + melyikbol_jott).html("");
                }
                
               
                
                $('.item').qtip(tooltip_options);

                
                // ha fegyvert rak fel akkro azt atmasoljuk a kezebe is!
                // de nem a konkret itemet mert azzal bebugol a dragand drop hanem csak siman a kepet    
                var targy_id = ui.draggable.attr("data-item-id");
                var targyadatok = targyak.targyadatok(targy_id);
                
                
                
                //console.log("melyikbol_jott" + melyikbol_jott);
                //console.log("#karakter_"+(melyik_karakter-1)+"_kez_1");
                
                // ha egyeik kezbol a masikba rakja akkor amibol kiveszi azt toroljuk
                if (melyik_karakter_celpont == melyik_karakter) {
                    if (melyikbol_jott == "karakterlap_bal_kez") {
                        $("#karakter_"+(melyik_karakter)+"_kez_1").html('');    
                    }
                    if (melyikbol_jott == "karakterlap_jobb_kez") {
                        $("#karakter_"+(melyik_karakter)+"_kez_2").html('');    
                    }


                } else {
                    // ha ket kulon kari kozott mozgatta a karaterlapon akkor a forras kezebol is kivesszuk a portrenal
                    if (melyikbol_jott == "karakterlap_bal_kez") {
                        $("#karakter_"+(melyik_karakter_celpont)+"_kez_1").html('');    
                    }
                    if (melyikbol_jott == "karakterlap_jobb_kez") {
                        $("#karakter_"+(melyik_karakter_celpont)+"_kez_2").html('');    
                    }
  

                }
                
                // dobas utan ujrszamoljuk a statokat:
                // minusz 1 kell mert a karakterek tombben 0 tol tarolunk a dom id pedig 1 tol kezdodik
                karakterek[melyik_karakter-1].statok_ujraszamolas();
                
                if (melyikbe_rakta == "karakterlap_bal_kez") {
                    $("#karakter_"+(melyik_karakter)+"_kez_1").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');  
                      
                }
                if (melyikbe_rakta == "karakterlap_jobb_kez") {
                    $("#karakter_"+(melyik_karakter)+"_kez_2").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');    
                }
                
                
                var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(melyik_karakter)
                karakterek[karakter_index].inventory_objektum_frissitese();
                karakterek[karakter_index].karakterlap_objektum_frissitese();
                
                
                
            },
            over: function( event, ui ) {
                //console.log("karakterlap_felszereles_droppable_options ====== over!");
            },
            deactivate: function(event, ui) {

            }
            
        };
        
          
          
                  
    $(document).ready(function() {
        
        //$('body').disableTextSelect();
        
        
        
        
        $.contextMenu({
            selector: '.item', 
            trigger: 'left',
            build: function($trigger, e) {
                // this callback is executed every time the menu is to be shown
                // its results are destroyed every time the menu is hidden
                // e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
                //console.log($trigger.parent().attr("class"));
                
                var item_id = $trigger.attr("data-item-id");
                var karakter_id = null;
                var karakter = null;
                var giveto_kulcsok = new Array();

                if ($trigger.parent().hasClass("egy_taskahely")) {
                    var taskahely_id = $trigger.parent().attr("id");

                    var karakter_id = $trigger.parent().parent().attr("data-karakter-id");
                    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id)
                    
                    var karakternevek_items=new Object();
                    for (var i = 0; i<karakterek.length; i++) {
                        var almenu_id = "giveto_" + karakterek[i].id;
                        giveto_kulcsok.push(almenu_id);
                        if (karakterek[i].id == karakter_id) {
                            karakternevek_items[almenu_id] = {"name": karakterek[i].nev, disabled: true};
                        } else {
                            karakternevek_items[almenu_id] = {"name": karakterek[i].nev};    
                        }
                        
                        
                    }
                    
                    items_kattintastol_fuggoen = {
                        "use": {"name": "Use"},
                        "equip": {"name": "Equip"},
                        "indentify": {"name": "Indentify", disabled: true},
                        "almenu1": {
                            "name": "Give to ...", 
                            "items": karakternevek_items
                        },
                        "sep1": "---------",
                        "destroy": {"name": "Destroy"},
                    }
                    
                    
                    
                }
                if ($trigger.parent().hasClass("karakterlap_felszereles")) {
                    var felszereles_hely_id = $trigger.parent().attr("id");
                    
                    var karakter_id = $trigger.parent().parent().attr("data-karakter-id");
                    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id)

                    items_kattintastol_fuggoen = {
                        "unequip": {"name": "Move to inventory"}
                    }
                }
                
                return {
                    
                    callback: function(key, options) {
                        if (key == "destroy") {
                            var valasz = confirm('Are you sure?');
                            if (valasz) {
                                karakterek[karakter_index].targy_megsemmisitese_taskabol(taskahely_id,item_id);    
                            }
                            
                        }
                        if (key == "equip") {
                           targy_equip(taskahely_id,item_id,karakter_id);
                        }
                        if (key == "unequip") {
                           targy_unequip(felszereles_hely_id,item_id,karakter_id);
                        }
                        if (key == "use") {
                           targy_use(taskahely_id,item_id,karakter_id);
                        }
                        
                        
                        for (var i = 0; i<giveto_kulcsok.length; i++) {
                            if (key == giveto_kulcsok[i]) {
                                var cel_karakter_id = giveto_kulcsok[i].substr(7,1); 
                                targy_atadas(taskahely_id,item_id,karakter_id,cel_karakter_id);                              
                            }
                        }
                        
                        var m = "clicked: " + key + " iemid:" + item_id;
                        //window.console && console.log(m) || alert(m); 
                    },
                    items: items_kattintastol_fuggoen
                };
            }
        });
        
        
        $(this).bind("contextmenu", function(e) {
            //e.preventDefault();
        });
        
        
        

        /*
        $( ".forge_hatter" ).click(function(e){
           console.log('ffff'); 
           e.stopPropagation();
        });
        */
        
        $( ".skills_hatter" ).draggable({ scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".forge_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".achievements_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".gems_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        
        $( ".kuldi_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".inventory_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".karekterlap_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        $( ".abilities_hatter" ).draggable({  scroll: false,  cursor: "move",  handle: ".lapok_dragndrop" });
        
        
        
        $("#menuk_jatek_menu").click(function(){
           jatek_menu_toogle();
           hang_lejatszas(33,{pan:0,volume:80});
        });
        $("#menuk_terkep").click(function(){
           terkep_toogle();
           hang_lejatszas(33,{pan:0,volume:80});
        });
        
        $("#menuk_forge").click(function(){
           forge_toogle();
           hang_lejatszas(33,{pan:0,volume:80});
        });
        
        $("#menuk_achievements").click(function(){
           achievements_toogle();
           hang_lejatszas(33,{pan:0,volume:80});
        });
        
        $("#menuk_gems").click(function(){
           gems_toogle();
           hang_lejatszas(33,{pan:0,volume:80});
        });
        
        
        
        $("#menuk_artifakt").click(function(){
           artifakt_toogle();
           hang_lejatszas(33,{pan:0,volume:80});
        });
        
        
        
        $("#jatek_menu_exit").click(function(){
            document.location = 'index.php'; 
        });
        $("#jatek_menu_load").click(function(){
            alert('Exit to main menu and load from there. ( this menu is under develpoment )');
        });
        $("#jatek_menu_options").click(function(){
            alert('Under development.');
        });
        $("#jatek_menu_mentes").click(function(){
            //var dataUrl = renderer.domElement.toDataURL("image/png");
            
            var dataUrl = "";
            
            //console.log(ideiglenes_terkepek);
            //console.log(npck);
            
            // azert kell ez mert nem lehet lemeteni a teljes npc objektumot az animok stb miatt. igy csak a valtozo adatokat mentjuk
            var npc_adatok_menteshez = new Array();
            
            for (var i = 0; i< npck.length; i++) {
                npc_adatok_menteshez.push({"npc_id":npck[i].id,"adatok":npck[i].targyak}) ;
            }
            
            
            $.ajax({  
                
                 type: "POST",  
                 url: "ajax_jatek_mentese.php",  
                 data: { screen: dataUrl , karakterek: JSON.stringify(karakterek), terkep: JSON.stringify(ideiglenes_terkepek), npck: JSON.stringify(npc_adatok_menteshez)  },
                 //data: { screen: dataUrl , karakterek: JSON.stringify(karakterek), terkep: JSON.stringify(terkep)  },
                 //data: "screen="+encodeURIComponent(dataUrl)+"&karakterek=" + JSON.stringify(karakterek),  
                 //data: "screen="+encodeURIComponent(dataUrl)+"&karakterek=" + JSON.stringify(karakterek),  
                 success: function(ret){  
                     info_szoveg("Game saved.");
                     jatek_menu_toogle();
                     

                 }  
             }); 
            
        });
        
        
        
        
        
        $('.artifact_runa').qtip(tooltip_options);
       
        
        $('.item').qtip(tooltip_options);
        
        $('.item_chatben').qtip(tooltip_options);
        
        
        $( ".item" ).draggable(inventory_draggable_options);
        $( ".egy_taskahely" ).droppable(inventory_droppable_options);
        
        
         
         
         $(".lapok_bezar").click(function(){
            var id = $(this).attr("data-id");
            $("#" + id).fadeOut(300); 
         });
         
         
         $("#cutscenes").click(function() {
             clearInterval(cutscene);
             
             var hangero = 100;
             intro_hang_fade = setInterval(function() {
                 mySound.setVolume(hangero);
                 hangero -= 1;
                if (hangero <= 1) {
                    mySound.stop();
                    $("#cutscenes").hide();    
                    init();
                    clearInterval(intro_hang_fade);
                }
             },1);
             
             
             
         })
         
         
          info_szoveg('Welcome to Moonshades! Version: 0.1 alpha');
          info_szoveg('Press F11 to go into fullscreen mode!');
          info_szoveg('Please bear in mind its an early alpha version :)');
          
          
         
    });
    

    function karakterlap_kibe(melyik) {
        if ($("#karekterlap_" + melyik).is(":visible")) {
            $("#karekterlap_" + melyik).fadeOut(200);
        } else {
            $("#karekterlap_" + melyik).fadeIn(200);
        }
        
    }
    
    function inventory_kibe(melyik) {
        if ($("#inventory_" + melyik).is(":visible")) {
            $("#inventory_" + melyik).fadeOut(200);
        } else {
            $("#inventory_" + melyik).fadeIn(200);
        }
    }
 
    function skills_kibe(melyik) {
        if ($("#skills_" + melyik).is(":visible")) {
            $("#skills_" + melyik).fadeOut(200);
        } else {
            $("#skills_" + melyik).fadeIn(200);
        }
    }
  
     function abilities_kibe(melyik) {
        if ($("#abilities_" + melyik).is(":visible")) {
            $("#abilities_" + melyik).fadeOut(200);
        } else {
            $("#abilities_" + melyik).fadeIn(200);
        }
        
    }
    
    function inventory_be(melyik) {
        $("#inventory_" + melyik).fadeIn(200);
    }
    
    function karakterlap_be(melyik) {
        $("#karekterlap_" + melyik).fadeIn(200);
    }
    function skills_be(melyik) {
        $("#skills_" + melyik).fadeIn(200);
    }
    function abilities_be(melyik) {
        $("#abilities_" + melyik).fadeIn(200);
    }
    
    function minden_ablak_ki() {
        $("#inventory_1").hide();
        $("#inventory_2").hide();
        $("#inventory_3").hide();
        $("#inventory_4").hide();
        $("#inventory_5").hide();
        $("#inventory_6").hide();
        
        $("#karekterlap_1").hide();
        $("#karekterlap_2").hide();
        $("#karekterlap_3").hide();
        $("#karekterlap_4").hide();
        $("#karekterlap_5").hide();
        $("#karekterlap_6").hide();

        $("#skills_1").hide();
        $("#skills_2").hide();
        $("#skills_3").hide();
        $("#skills_4").hide();
        $("#skills_5").hide();
        $("#skills_6").hide();
        
        $("#abilities_1").hide();
        $("#abilities_2").hide();
        $("#abilities_3").hide();
        $("#abilities_4").hide();
        $("#abilities_5").hide();
        $("#abilities_6").hide();
        
        
        
        $("#terkepek").hide();
        $("#kuldi_hatter").hide();
        $("#jatek_menu_fedo_reteg").hide();
        $("#artifact_hatter").hide();
        $(".achievements_hatter").hide();
        $(".gems_hatter").hide();
        
        $(".forge_hatter").hide();
        
        
        
        
    }
    
    var fade_time = 2500;
    
    var cutscenes_length = 3;
    var elso = 0;
    
    var mySound;
    var sound_ambient1;
    
    var hangok_betoltesre = new Array();
    
    hangok_betoltesre.push(new Array("27","assets/audio/57714__dj-chronos__metal-atmosphere-001.ogg",0));  // atmosphere 2
    
    hangok_betoltesre.push(new Array("0","assets/audio/sword-unsheathe.ogg",0));
    hangok_betoltesre.push(new Array("3","assets/audio/stepstone_1.ogg",0));
    hangok_betoltesre.push(new Array("4","assets/audio/sword-unsheathe.ogg",0)); //kart ut es talal
    
    hangok_betoltesre.push(new Array("5","assets/audio/cloth-heavy.ogg",0));  // ha targy esik
    hangok_betoltesre.push(new Array("6","assets/audio/random5.ogg",0));  // flamingo tamad
    
    hangok_betoltesre.push(new Array("7","assets/audio/swing.ogg",0));  // kard ut es nem talal
    
    hangok_betoltesre.push(new Array("8","assets/audio/armor-light.ogg",0));  // invebtoriban atrak valamit
    
    hangok_betoltesre.push(new Array("9","assets/audio/cloth-heavy.ogg",0));  // interfacet megnyit, pl invebtory
    
    hangok_betoltesre.push(new Array("10","assets/audio/18048__dobroide__20060413-doorlock_2.ogg",0));  // ajtonyitas 1
    hangok_betoltesre.push(new Array("11","assets/audio/pain3.ogg",0));  // player serules hang 1
    hangok_betoltesre.push(new Array("12","assets/audio/3yell1.ogg",0));  // player meghal 1
    hangok_betoltesre.push(new Array("13","assets/audio/2yell4.ogg",0));  // mobpb meghal 1
    hangok_betoltesre.push(new Array("14","assets/audio/monster-17.ogg",0));  // mob serul
    hangok_betoltesre.push(new Array("15","assets/audio/interface1.ogg",0));  // interface click
    hangok_betoltesre.push(new Array("16","assets/audio/skull_hit_2.ogg",0));  // ambient 1 66057__yewbic__ambience07_Internal.ogg colt
    hangok_betoltesre.push(new Array("17","assets/audio/merchant_female1.mp3",0));  // npc szoveg howcanihelpyou
    hangok_betoltesre.push(new Array("18","assets/audio/merchant_female1.mp3",0));  // npc szoveg buysomething.ogg
    hangok_betoltesre.push(new Array("19","assets/audio/merchant_female1.mp3",0));  // npc szoveg letstrade.ogg
    hangok_betoltesre.push(new Array("20","assets/audio/stepdirt_1.ogg",0));  // lepes kovon
    
    /*
    hangok_betoltesre.push(new Array("21","assets/audio/lepes1.mp3",0));  // lepes kovon
    hangok_betoltesre.push(new Array("22","assets/audio/lepes2.mp3",0));  // lepes kovon
    hangok_betoltesre.push(new Array("23","assets/audio/lepes3.mp3",0));  // lepes kovon
    hangok_betoltesre.push(new Array("24","assets/audio/lepes4.mp3",0));  // lepes kovon
    hangok_betoltesre.push(new Array("25","assets/audio/lepes5.mp3",0));  // lepes kovon
    hangok_betoltesre.push(new Array("26","assets/audio/lepes6.mp3",0));  // lepes kovon
    */
    
    hangok_betoltesre.push(new Array("28","assets/audio/skull_hit_2.ogg",0));  // zene harcoos v intro TheLoomingBattle_0.OGG volt

    hangok_betoltesre.push(new Array("29","assets/audio/qubodup-DoorOpen01.ogg",0));  // lada nyitas
    
    hangok_betoltesre.push(new Array("30","assets/audio/Fireball.ogg",0));  // 
    hangok_betoltesre.push(new Array("31","assets/audio/Heal.ogg",0));  // 
    hangok_betoltesre.push(new Array("32","assets/audio/coin.ogg",0));  // 
    
    hangok_betoltesre.push(new Array("33","assets/audio/skull_hit_2.ogg",0));  // interface click 2

    hangok_betoltesre.push(new Array("34","assets/audio/stepdirt_1.ogg",0));  // lepes
    hangok_betoltesre.push(new Array("35","assets/audio/stepdirt_2.ogg",0));  // lepes
    hangok_betoltesre.push(new Array("36","assets/audio/stepdirt_3.ogg",0));  // lepes
    hangok_betoltesre.push(new Array("37","assets/audio/stepdirt_8.ogg",0));  // lepes
    
    hangok_betoltesre.push(new Array("38","assets/audio/negative_2.ogg",0));  // elutasitas!
    hangok_betoltesre.push(new Array("39","assets/audio/99197__robinhood76__01735-falling-great-wall_2.ogg",0));  // titkos nyilik
    hangok_betoltesre.push(new Array("40","assets/audio/55843__sergenious__port.ogg",0));  // teleport
    
    hangok_betoltesre.push(new Array("41","assets/audio/load.mp3",0));  //misc spund ez van pl akkor ha egy storyline beslzgetes beuuszik
    hangok_betoltesre.push(new Array("42","assets/audio/listentome.mp3",0));  //listen to me
    
    hangok_betoltesre.push(new Array("43","assets/audio/146733__fins__energy.ogg",0));  //alap spell cast
    
    
    // skillek:
    hangok_betoltesre.push(new Array("45","assets/audio/skills/fire_blast.ogg",0)); 
    hangok_betoltesre.push(new Array("46","assets/audio/skills/magic_arrow.ogg",0)); 
    hangok_betoltesre.push(new Array("47","assets/audio/skills/blessing.ogg",0)); 
    hangok_betoltesre.push(new Array("48","assets/audio/skills/yourweakness.ogg",0)); 
    hangok_betoltesre.push(new Array("49","assets/audio/skills/protect.ogg",0)); 
    hangok_betoltesre.push(new Array("50","assets/audio/skills/martyr.ogg",0)); 
    hangok_betoltesre.push(new Array("51","assets/audio/skills/flamingagony.ogg",0)); 
    hangok_betoltesre.push(new Array("52","assets/audio/skills/meteorshower.ogg",0)); 
    hangok_betoltesre.push(new Array("53","assets/audio/skills/scorch.ogg",0)); 
    hangok_betoltesre.push(new Array("54","assets/audio/skills/astralshield.ogg",0)); 
    hangok_betoltesre.push(new Array("55","assets/audio/skills/letyourhatred.ogg",0)); 
    hangok_betoltesre.push(new Array("56","assets/audio/skills/resurect.ogg",0)); 
    hangok_betoltesre.push(new Array("57","assets/audio/skills/weakentheir.ogg",0)); 
    hangok_betoltesre.push(new Array("58","assets/audio/skills/punishthem.ogg",0)); 
    hangok_betoltesre.push(new Array("59","assets/audio/skills/judgement.ogg",0)); 
    hangok_betoltesre.push(new Array("60","assets/audio/skills/willingto.ogg",0)); 
    hangok_betoltesre.push(new Array("61","assets/audio/skills/finalcharge.ogg",0)); 
    hangok_betoltesre.push(new Array("62","assets/audio/skills/standunited.ogg",0)); 
    hangok_betoltesre.push(new Array("63","assets/audio/skills/makethembleed.ogg",0)); 
    hangok_betoltesre.push(new Array("64","assets/audio/skills/rallyingshout.ogg",0)); 
    hangok_betoltesre.push(new Array("65","assets/audio/skills/heroespres.ogg",0)); 
    hangok_betoltesre.push(new Array("66","assets/audio/skills/onmymark.ogg",0)); 
    hangok_betoltesre.push(new Array("67","assets/audio/skills/corruption.ogg",0)); 
    hangok_betoltesre.push(new Array("68","assets/audio/skills/suddendeath.ogg",0)); 
    hangok_betoltesre.push(new Array("69","assets/audio/skills/nightmaire.ogg",0)); 
    hangok_betoltesre.push(new Array("70","assets/audio/skills/huricane.ogg",0)); 
    
    hangok_betoltesre.push(new Array("71","assets/audio/skill_learned.ogg",0)); 
    
    hangok_betoltesre.push(new Array("72","assets/audio/skeleton/serul1.ogg",0)); 
    hangok_betoltesre.push(new Array("73","assets/audio/skeleton/serul2.ogg",0)); 
    hangok_betoltesre.push(new Array("74","assets/audio/skeleton/serul3.ogg",0)); 
    
    hangok_betoltesre.push(new Array("75","assets/audio/antlion/serul1.ogg",0)); 
    hangok_betoltesre.push(new Array("76","assets/audio/antlion/serul2.ogg",0)); 
    hangok_betoltesre.push(new Array("77","assets/audio/antlion/serul3.ogg",0)); 
    
    hangok_betoltesre.push(new Array("78","assets/audio/spider/serul1.ogg",0)); 
    hangok_betoltesre.push(new Array("79","assets/audio/spider/serul2.ogg",0)); 
    hangok_betoltesre.push(new Array("80","assets/audio/spider/serul3.ogg",0)); 
    
       
       hangok_betoltesre.push(new Array("1","assets/audio/spider/serul1.ogg",0)); // TheDarkAmulet_0.mp3 volt

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
    function hang_lejatszas(id,options) {
        
        var melyik_a_hang_index;
        for (var k=0; k<hangok_betoltesre.length;k++) {
            if (hangok_betoltesre[k][0] == id) {
                melyik_a_hang_index = k;
                break;
            }
        }
        
        if (hangok_betoltesre[melyik_a_hang_index][2] == 1) {
            clearTimeout(audiotimeout);
            soundManager.play(id,options);
            //console.log(aa);
            //console.log("hang_id:" + id);
        } else {
            // ha meg nem toltotte be akkor varunk es ujrahivjuk:
            var audiotimeout = setTimeout(function(){
                hang_lejatszas(id,options);
            },1000);
        }
    }
    
        
        
       

    function intro() {
        
        hang_lejatszas(2);
        
        $("#cutscenes").show();
        
        
        fade_cutscene(elso,elso+1);
        elso++;
        
        cutscene = setInterval(function() {
            fade_cutscene(elso,elso+1);
                        elso++;

            if (elso >= cutscenes_length) {
                clearInterval(cutscene);
            }
        },fade_time + 6000);
        
        
    }
    
    function fade_cutscene(from,to) {
        if (from != 0) {
            //$("#cutscene_image_" + from).fadeOut(fade_time);    
            $("#cutscene_image_" + from).animate({ width: "-=200", height: "-=200", opacity: "0"}, fade_time);
        }
        $("#cutscene_image_" + to).fadeIn(fade_time);
        
        if (from != 0) {
            $("#cutscene_text_" + from).fadeOut(fade_time);
        }
        $("#cutscene_text_" + to).fadeIn(fade_time);
    }
    
 function info_szoveg(szoveg) {
     var time = new Date(),
     h = time.getHours().pad(2), // 0-24 format
     m = time.getMinutes().pad(2);
     s = time.getSeconds().pad(2);
     
     var elemek_szama = $("#szovegek").index();
     $("#szovegek").prepend('<div class="szovegek_egysor" style="display:none" id="egysor_' +  (elemek_szama+1) + '">'+ h + ':' + m + ':' + s + ': ' + szoveg +'</div>');
     $("#egysor_" + (elemek_szama+1)).fadeIn(300);

 }
 
Number.prototype.pad = function (len) {
    return (new Array(len+1).join("0") + this).slice(-len);
}


function gomb_skill(bill_kod) {
    var melyik_gomb = 0;
    var melyik_kez = 0;
    if (bill_kod == 49) { melyik_gomb = 1; melyik_kez = 1;}
    if (bill_kod == 50) { melyik_gomb = 2; melyik_kez = 2;}
    if (bill_kod == 51) { melyik_gomb = 3; melyik_kez = 1;}
    if (bill_kod == 52) { melyik_gomb = 4; melyik_kez = 2;}
    // ebben lesz a gombert felelos karakter objektum
    var felelos_karakter = false;
    for(i=0;i<karakterek.length;i++) {
        if (melyik_gomb == 1 || melyik_gomb == 2) {
            if (karakterek[i].hanyadik_sorban_van == "1" && karakterek[i].sorban_melyik_oldal == "bal" ) {
                felelos_karakter = karakterek[i];
            }
        }
        if (melyik_gomb == 3 || melyik_gomb == 4) {
            if (karakterek[i].hanyadik_sorban_van == "1" && karakterek[i].sorban_melyik_oldal == "jobb" ) {

                felelos_karakter = karakterek[i];
            }
        }
       
        
    }
    
    
    felelos_karakter.tamadas(melyik_kez);
    
}

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if(arr[i] && arr[i][attr] && (arguments.length > 2 && arr[i][attr] === value )){
           arr.splice(i,1);
       }
    }
    return arr;
}


function jatek_betoltese(id) {
    // lekerjuk ajaxxal az adatokat:
    
    var betoltes_terkep = function() {
        var aret = $.ajax({  
         type: "POST",  
         async: false,
         url: "ajax_jatek_betoltese.php",  
         data: "id=" + id + "&mit=terkepek",  
         success: function(ret){  
             //console.log(ret);
             var kikodolva = JSON.parse(ret);
             
             //console.log("kikodolva:");
             //console.log(kikodolva);
             //console.log(kikodolva.length);
             
             // kezdesnel meg csak 1 terep van benne es nincs length
             if (typeof kikodolva.length === "undefined") {
                 ideiglenes_terkepek.push(kikodolva);    
             } else {
                 for (var i=0; i<kikodolva.length; i++) {
                     
                    ideiglenes_terkepek.push(kikodolva[i]);    
                 }
                 
             }
             
             
             
             
             var terkep_id = 0;
             // ez a kezdo szint
             // ezt majd a terkep mezobol kell kolvasni  aktiv_terkep:terkep_id
             if (id == 0) {
                 // h amost kezdte a jatekot akkor az 1. szintrol indul
                 terkep_id = 1;
             } else {
                 //console.log("ideigelnes terkepek:");
                 //console.log(ideiglenes_terkepek);
                 // egyebeknt meg vegignezzuk a terkepeket es kikeressuk melyik az eppen aktiv
                 for (var i=0;i<ideiglenes_terkepek.length;i++) {
                         //console.log(ideiglenes_terkepek[i]);
                     if (ideiglenes_terkepek[i].ezen_van == 1) {
                         terkep_id = ideiglenes_terkepek[i].id;
                         break;
                     }
                 }
             }
             
             //var terkep_id = 1;
             terkep.init(terkep_id);
             
             //console.log(terkep.getTerkepMatrix());
             //console.log(terkep.getTerkepMatrix_pathfindinghez());
             
             
             terkep.dungeon_felepitese();
             
             
             
             
             // elmentjuk az ideiglenesbe, de elotte kitoroljuk ha mar benne van
             ideiglenes_terkepek_frissitese(terkep_id);
             
             
             
         }  
     }); 
     return aret;
    };
    
    var betoltes_karaterek = function(){
        var aret = $.ajax({  
         type: "POST",  
         async: false,
         url: "ajax_jatek_betoltese.php",  
         data: "id=" + id + "&mit=karakterek",  
         success: function(ret){  
             //console.log(ret);
             var kikodolva = JSON.parse(ret);
             //console.log("karik kikodolva:");
             //console.log(kikodolva);
             
             // hozzadjuk oket a domhoz!
             for(var i=0;i<kikodolva.length;i++) {
                 //console.log(kikodolva[i].id);
                var karakter = new Karakter();
                karakter.letrehozas(kikodolva[i].id,kikodolva[i].nev);
                karakter.sor_beallitas(kikodolva[i].hanyadik_sorban_van,kikodolva[i].sorban_melyik_oldal);
                karakter.adatok_beolvasasa_mentesbol(kikodolva[i]);
                karakter.hozzadas_a_domhoz();
                
                //console.log(kikodolva[i].inventory);
                // feltoltjuk az inventoryt
                for (var j=0;j<kikodolva[i].inventory.length;j++) {
                    //karakter.loot_taskaba(kikodolva[i].inventory[j]); 
                    if (kikodolva[i].inventory[j] != 0) {
                        karakter.loot_taskaba_pontos_helyre(kikodolva[i].inventory[j],j);    
                    }
                    
                    
                }
                
                // feltoltjuk a karilapot:
                for (var j=0;j<kikodolva[i].karakterlap.length;j++) {
                    //karakter.loot_taskaba(kikodolva[i].inventory[j]); 
                    if (kikodolva[i].karakterlap[j] != 0) {
                        karakter.karakterlapra_item(kikodolva[i].karakterlap[j],j);    
                    }
                }
                
                // feltoltjjuk a portre skilleket
                
                for (var j=0;j<kikodolva[i].portre_skillek.length;j++) {
                    //karakter.loot_taskaba(kikodolva[i].inventory[j]); 
                    if (kikodolva[i].portre_skillek[j] != 0) {
                        karakter.portre_skillre_skill(kikodolva[i].portre_skillek[j],j);    
                    }
                    
                    
                }
                
                karakter.portre_skillek_objektum_frissitese();
                karakter.inventory_objektum_frissitese();         
                karakter.karakterlap_objektum_frissitese();         
                karakter.hp_es_mana_beallitasa();
                
                
             }
             
             
             // listenreket allitjuk be
             var karakter = new Karakter();
             karakter.listenerek_bekapcsolasa();
             
         }  
     }); 
     
     return aret;
    }
    
    
    
    var betoltes_npck = function() {
        var aret = $.ajax({  
         type: "POST",  
         async: false,
         url: "ajax_jatek_betoltese.php",  
         data: "id=" + id + "&mit=npck",  
         success: function(ret){  
             //console.log(ret);
             
             if (ret != "") {
                 var kikodolva = JSON.parse(ret);
                 
                 // frissitjuk az npckhez tartozo targyadatokat. pl odaadta e mar akulcsot stb
                 
                 
                 ideiglenes_npc_adatok = kikodolva;
                 
             }
             
             

             
             
             
         }  
     }); 
     return aret;
    };
    
    $.when(
        betoltes_npck(),
        betoltes_karaterek(),
        betoltes_terkep()
    ).done(function(a1,  a2 , a3){
        init();
    });


     
     
}


function artifakt_toogle() {
    if ($("#artifact_hatter").is(":visible")) {
        $("#jatek_menu_fedo_reteg").hide();
        
        $("#artifact_hatter").fadeOut(100);
        
    } else {
        $("#artifact_hatter").center();
        
        var pageHeight = $(document).height();
        $("#jatek_menu_fedo_reteg").height(pageHeight);
        $("#jatek_menu_fedo_reteg").show();
        
        $("#artifact_hatter").fadeIn(100,function(){
            
        });
        
    }
}




function gems_toogle() {
    if ($(".gems_hatter").is(":visible")) {
        $(".gems_hatter").fadeOut(100);
    } else {
        //$(".gems_hatter").center();
        
        $(".gems_hatter").fadeIn(100,function(){
            
        });
        
    }
}


function achievements_toogle() {
    if ($(".achievements_hatter").is(":visible")) {
        $(".achievements_hatter").fadeOut(100);
    } else {
        //$(".achievements_hatter").center();
        
        $(".achievements_hatter").fadeIn(100,function(){
            
        });
        
    }
}
function forge_toogle() {
    if ($(".forge_hatter").is(":visible")) {
        $(".forge_hatter").fadeOut(100);
    } else {
        //$(".forge_hatter").center();
        
        $(".forge_hatter").fadeIn(100,function(){
            
        });
        
    }
}

function terkep_toogle() {
    if ($("#terkepek").is(":visible")) {
        $("#jatek_menu_fedo_reteg").hide();
        
        $("#terkepek").fadeOut(100);
        
    } else {
        $("#terkepek").center();
        
        var pageHeight = $(document).height();
        $("#jatek_menu_fedo_reteg").height(pageHeight);
        $("#jatek_menu_fedo_reteg").show();
        
        $("#terkepek").fadeIn(100,function(){
            
        });
        
    }
    
}

function jatek_menu_toogle() {
    if ($("#jatek_menu").is(":visible")) {
        $("#jatek_menu_fedo_reteg").hide();
        $("#jatek_menu").fadeOut(100);
        start();
    } else {
        // megjelenik, de csak akkor ha nincs mas ablak nyitva
        stop();
        $("#jatek_menu").center();
        
        var pageHeight = $(document).height();
        $("#jatek_menu_fedo_reteg").height(pageHeight);
        $("#jatek_menu_fedo_reteg").show();

        
        $("#jatek_menu").fadeIn(100,function(){
            
        });
        
    }
    
    
    
}


jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - this.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}



function terkep_matrix_kiegeszitesek_pozicio_alapjan(x,y) {
    var terkep_matrix_kiegeszitesek = terkep.getTerkepMatrixKiegeszitesek();
    var ret = new Array(); 
    for (var i = 0; i < terkep_matrix_kiegeszitesek.length; i++) {
        //console.log(terkep_matrix_kiegeszitesek[i]);
        if (terkep_matrix_kiegeszitesek[i].x == x && terkep_matrix_kiegeszitesek[i].y == y) {
            ret.push(terkep_matrix_kiegeszitesek[i]);
        }
     }    
     //console.log("hivva x:" + x + " y:" + y);
     //console.log(ret);
     return ret;
}

// ezt hasznlja az npc is ha itemet ad!
function foldrol_targy_felvetele(targy_id) {
    var melyik_karakter_kapja_a_lootot = false;
    for(var i=0;i<karakterek.length;i++) {
        var kari = karakterek[i];
        //console.log("kari:");
        //console.log(kari);
        
        if (kari.loot_taskaba(targy_id)) {
            // ha be tudtuk rakni akkor eltaroljuk ki kapta
            melyik_karakter_kapja_a_lootot = kari;        
            break;
        }
    }
    
    if (melyik_karakter_kapja_a_lootot === false) {
        // senkinel nincs hely!
        info_szoveg("Not enough space in inventory!");
        return false;
    } else {
        
        hang_lejatszas(5,{pan:0,volume:90});
        
        var targyadatok = targyak.targyadatok(targy_id);
        
        info_szoveg(melyik_karakter_kapja_a_lootot.nev + ' got a <span class="item_chatben" title="' + targyadatok.targy_leirasa + '" style="color:#'+ targyadatok.kategoria_szine +'">' + targyadatok.targy_neve + '</span>');
        
        $('.item_chatben').qtip(tooltip_options);
        return true;
    }

}

function karakter_hanyadik_a_tombben_id_alapjan(karakter_id) {
    var ret = 0;
    for(i=0;i<karakterek.length;i++) {
        if (karakterek[i].id == karakter_id) {
            ret = i;
            break;
        }
    }
    
    return ret;
    
}

function rad(n) {
    return n*(Math.PI/180);
}

        
function deg(n) {
    return Math.round(n*(180/Math.PI));
}


function randint(min,max){ 
    var min = parseInt(min);
    var max = parseInt(max);
    return parseInt(Math.floor(Math.random()*(max-min+1))+min);
}


function morphColorsToFaceColors( geometry ) {

    if ( geometry.morphColors && geometry.morphColors.length ) {

        var colorMap = geometry.morphColors[ 0 ];

        for ( var i = 0; i < colorMap.colors.length; i ++ ) {

            geometry.faces[ i ].color = colorMap.colors[ i ];
            THREE.ColorUtils.adjustHSV( geometry.faces[ i ].color, 0, 0.125, 0 );

        }

    }

}

function removeReferences(removeme){
  try{
    removeme.traverse(function(ob){
        
        //console.log(ob);
        
      try{
        //renderer.deallocateObject(ob);
      }catch(e){  } 
      try{
        ob.geometry.dispose();
        ob.geometry.morphTargets = [];
        //ob.geometry.deallocate();
      }catch(e){}
      try{
          for (var i=0;i<ob.material.length;i++) {
            //console.log(that.meshAnim.material[i]);
            ob.material[i].dispose();   
            ob.material[i].map.dispose();   
        }
        ob.material.map.dispose();
        ob.material.dispose();
        //ob.material.deallocate();
      }catch(e){} 
      try{
          //mesh.material.map.dispose();
          //mesh.material.dispose();
          //mesh.geometry.dispose();

        //ob.deallocate()
      }catch(e){}
      
      //console.log(ob);
      
    });
  }catch(e){}
}

function szintvaltas(szint_id) {
    //console.log("szint_id" + szint_id);
    
    // mielott szintet valtunk elmentjuk a jelenlegi terkepet egy ideiglenes taroloba adott felhasznalohoz
    // igy  ha sizntek kozott maszkal akkor ha felvett mar egy tarhuat stb ezket az adatokat az ideiglenes terkeptarolobol toltjuk be
    // es cska akkor mentjuk el ha mentest nyom
    // akkor visoznt minden terkepet elmetnunk ami a taroloba van
    // betolteskor pedig megnezzuk van e az adott id ju terkeprol mentese es ha igen azt huzzzuk be
    // tehat a terkepek mezo
    
    if (szint_id == 0) {
        // kezdo hely nem mehet feljebb!
        
        hang_lejatszas(38,{pan:0,volume:40});
        
        info_szoveg('You cant go back to the surface while the demons are there!');
        return;
    }
    
    if (szint_id == 2) {
        
        
        hang_lejatszas(38,{pan:0,volume:40});
        info_szoveg('You cant go down yet!');
        return;
    }
    
    stop();
    
    terkep.ezen_van = 0;
    ideiglenes_terkepek_frissitese(terkep.id);
    
    npck = [];
    
    morphs = [];
    
    
    
    ellensegek = [];

    aktiv_objektumok = [];
    collidableMeshList = [];
    
    psys_tomb_fenyek = [];
    psys_tomb = [];
    
     // torlunk mindent a scenebol
    var obj, i;
    for ( var i = scene.children.length - 1; i >= 0 ; i -- ) {
        
        var obj = scene.children[i];
        
        //console.log(obj);
        
        //if (obj instanceof THREE.PerspectiveCamera || obj instanceof THREE.AmbientLight || obj instanceof THREE.PointLight) {
        if (obj instanceof THREE.PerspectiveCamera || obj instanceof THREE.AmbientLight) {
            //console.log("NEM SZEDJUK LE EZT:");
            //console.log(obj);
        } else {
            obj.off('click');
            
            //console.log(obj);
            scene.remove(obj);
            

            
            //if (obj instanceof THREE.MorphAnimMesh) {
                removeReferences(obj);    
            //}
            
            
            
            continue;
            
            
            if (typeof obj !== "undefined") {
                // ha vannak gyerekei. az animos mdollkenek vannak
                for (var k=0; k<obj.children.length; k++) {
                    if (typeof obj.children[k].geometry !== "undefined") {
                        obj.children[k].geometry.deallocate();    
                    }
                    obj.children[k] = null;
                    
                }
                
                obj.deallocate();
                if (typeof obj.geometry !== "undefined") {
                    
                    
                    if (typeof obj.geometry.materials !== "undefined") {
                        for (var k=0; k<obj.geometry.materials.length;k++) {
                            obj.geometry.materials[k].deallocate();
                        }
                    }
                    
                    obj.geometry.deallocate();
                    
                }
                
                //console.log("obj.material:");
                //console.log(obj.material);
                
                if (typeof obj.material !== "undefined") {
                    if (obj.material instanceof THREE.MeshFaceMaterial) {
                        // ennek mashogy kell
                        renderer.deallocateMaterial( obj.material );
                    } else {
                        if (obj.material.map instanceof THREE.Texture) {
                            obj.material.map.deallocate();
                            renderer.deallocateTexture( obj.material.map );
                        }
                        if (obj.material.normalMap instanceof THREE.Texture) {
                            obj.material.normalMap.deallocate();
                            renderer.deallocateTexture( obj.material.normalMap );
                        }
                        if (obj.material.specularMap instanceof THREE.Texture) {
                            obj.material.specularMap.deallocate();
                            renderer.deallocateTexture( obj.material.specularMap );
                        }
                        
                        obj.material.deallocate();
                        renderer.deallocateMaterial( obj.material );
                        
                    }
                }
                
                renderer.deallocateObject( obj );
                
            }
            
            
            //renderer.deallocateObject( obj );
            
            
            //console.log(renderer.info);
            //renderer.deallocateObject( obj );
            //renderer.deallocateTexture( texture );            
            
            //renderer.deallocateObject(obj)
            //renderer.deallocateTexture( texture );

            //obj = null;
        }
    
        
    }
    
    
    
    
    
    start();
    
    
    
    // betoltjuk a terkepet:
    terkep.init(szint_id);
    
    
             
    terkep_matrix = terkep.getTerkepMatrix();
    terkep_matrix_kiegeszitesek = terkep.getTerkepMatrixKiegeszitesek();

    terkep_szelesseg = terkep_matrix[0].length;
    terkep_magassag =  terkep_matrix.length ;
    
    /// bekapcsoljuk a pathifindert az uj terkephez:
    grid = new PF.Grid(terkep_szelesseg, terkep_magassag, terkep_matrix);
    finder = new PF.AStarFinder();    
    
    
    terkep.dungeon_felepitese();
    
    
    
    terkep.ezen_van = 1;
    // frissitjuk az uj terkeppel
    ideiglenes_terkepek_frissitese(szint_id);
    
    
    
    
    // minimap
    //miniMap = new Demonixis.Gui.MiniMap(terkep_szelesseg, terkep_magassag, "minimap");
    //miniMap.create();
}


function ideiglenes_terkepek_frissitese(terkep_id) {
     
    // ha mar bennevan akro kiszedjuk
    for (var i=0;i<ideiglenes_terkepek.length;i++) {
         if (ideiglenes_terkepek[i].id == terkep_id) {
             ideiglenes_terkepek.splice(i,1);
         }
     }
     
     // berakjuk az aktualis verziot
     ideiglenes_terkepek.push(terkep.getTerkepKiegeszitesek());
     
     //console.log("ideiglenes_terkepek");
     //console.log(ideiglenes_terkepek);
 }

function npc_interakcio_be(npc_obj) {
    $("#npc_interakcio_div").show();
    $("#npc_interakcio_div").click(function() {
        $("#npc_interakcio_div").hide();
        //$("#npc_int_szovegek").empty();
        $("#kuldi_tartalom").empty();
        npc_obj.interakcio_inditasa();
        hang_lejatszas(15,{pan:0,volume:20});
    })
}

function npc_interakcio_ki() {
    //$("#npc_interakcio_elinditva_div").hide("slide", { direction: "left" }, 200);
    $("#kuldi_0").fadeOut(300);
    $("#npc_interakcio_div").hide();
    $('#npc_interakcio_div').unbind('click');
}

function npc_interakcio_valaszadas(id) {
    $('[id^="beszed_id_"]').hide();
    // bekapcsoljuk azt a divet amelyiet meghivja a valasz
    $("#beszed_id_" + id).show();
    
    mozgas_logolas("NPC BESZELGETES id:" + id);
    
    if (id == 0) {
        // elkoszon mindent bezar
        //$("#npc_interakcio_elinditva_div").hide();
        //$("#npc_interakcio_elinditva_div").hide("slide", { direction: "left" }, 200);
        $("#kuldi_0").fadeOut(300);
    }
    
    hang_lejatszas(15,{pan:0,volume:20});
}

function npc_boltot_nyit(npc_id) {
    console.log(npc_id);
    $('[id^="beszed_id_"]').hide();
    $("#npc_interakcio_elinditva_div").hide();
    for (var i=0;i<npck.length;i++) {
         if (npck[i].id == npc_id) {
             npck[i].boltot_nyit();
         }
     }
    
    
}

function npc_kuldit_elfogad(npc_id,kuldi_id) {
    alert('kuldi_id' + kuldi_id);
}

function npc_targyat_ad(npc_id,targy_id) {
    // csak akkor adja oda ha meg nem adta:
    var npc_obj = false;
    for (var i=0;i<npck.length;i++) {
         if (npck[i].id == npc_id) {
             npc_obj = npck[i];
             break;
         }
    }
    
    mozgas_logolas("NPC TARGYAT AD id:" + targy_id);
    
    if (npc_obj.odaadta_e_mar_a_targyat(targy_id)) {
        info_szoveg('You already got this item.');
        return;
    }
    
    var melyik_karakter_kapja_a_lootot = false;
    for(i=0;i<karakterek.length;++i) {
        var kari = karakterek[i];
        if (kari.loot_taskaba(targy_id)) {
            // ha be tudtuk rakni akkor eltaroljuk ki kapta
            melyik_karakter_kapja_a_lootot = kari;      
            npc_obj.targy_odaadva(targy_id);  
            break;
        }
    }
    //console.log("melyik_karakter_kapja_a_lootot:" + melyik_karakter_kapja_a_lootot);
    if (melyik_karakter_kapja_a_lootot === false) {
        // senkinel nincs hely!
        info_szoveg("Not enough space in inventory!");
    } else {
        var targyadatok = targyak.targyadatok(targy_id);
        info_szoveg(kari.nev + " got a " + targyadatok.targy_neve );
        
        hang_lejatszas(5,{pan:0,volume:90});
        
    }
}


var lada_kinyitva_timeout;
function lada_kinyitas(mesh,targy_idk) {
    
    hang_lejatszas(29,{pan:0,volume:100});
    
    mesh.off('click');
    
    // fontos ha allitjuk a ranget!
    mesh.time = 0;
    mesh.setFrameRange(3,5);
    
        
    lada_kinyitva_timeout = setInterval(function() {
        lada_kinyitva(mesh,targy_idk);
                
    },0);
    
}



function lada_kinyitva(mesh,targy_idk) {
    
    if (mesh.currentKeyframe == 5) {
        // leallitjuk az animot
        
        clearInterval(lada_kinyitva_timeout);
        
        mesh.lastKeyframe = 5;
        mesh.currentKeyframe = 5;
        mesh.setFrameRange(5,5); 
        
        // es kiadjuk a targyakat!
        for (var i=0;i<targy_idk.length;i++) {
            var ret = foldrol_targy_felvetele(targy_idk[i]);    
        }
        
        hang_lejatszas(5,{pan:0,volume:90});
        
        // aztan levesszuk a scenebol
        //console.log(mesh);
        
        scene.remove(mesh);
        
        mesh.material.map.dispose();
        mesh.material.dispose();
        mesh.geometry.dispose();
        
        
    } else {
        
    }
    
    

}

function van_e_megfelelo_targy_a_nyitashoz(melyik_item_id_kell_a_nyitashoz) {
    var ret = false;
    
    for(i=0;i<karakterek.length;i++) {
        var van_e_nala = karakterek[i].van_e_nala_targy_id(melyik_item_id_kell_a_nyitashoz);
        if ( van_e_nala !== false ) {
            // ha van akkor elvesszuk tole es vissztaerunk TRUE val
            
            karakterek[i].targy_elvetele(melyik_item_id_kell_a_nyitashoz);
            ret = true;
            break;
        }
        
    }
    
    return ret;
}

function fenyek_bekapcsolasa4() {
    console.log("scene.children.length: " + scene.children.length);
    for (var i=0; i<psys_tomb_fenyek.length; i++) {
        scene.remove(psys_tomb_fenyek[i]);   
    }
    
  
    
}

function compare(a,b) {
  if (a.tavolsag < b.tavolsag)
     return -1;
  if (a.tavolsag > b.tavolsag)
    return 1;
  return 0;
}

function fenyek_bekapcsolasa3() {
    // eloszor sorbarakjuk oket tavolsag szerint!
    var kiszamolt_tavolsaggal = new Array();
    for (var i=0; i<psys_tomb_fenyek.length; i++) {
        var feny_pozi = psys_tomb_fenyek[i].position;
        //var tavolsag = feny_pozi.distanceTo(MovingCube.position);
        var tavolsag = MovingCube.position.distanceTo(psys_tomb_fenyek[i].position);
        kiszamolt_tavolsaggal.push({"tavolsag":tavolsag,"obj":psys_tomb_fenyek[i]});
    }
    
    kiszamolt_tavolsaggal.sort(compare);
    
    
    
    //console.log(kiszamolt_tavolsaggal);
    
    
    // ha megvan akkor a legkozelebbitol kezdjuk bekapcoslgatni oket
    
    var mennyi_feny_van_a_scenen = 0;
    for (var i=0; i<kiszamolt_tavolsaggal.length; i++) {
        var feny_pozi = kiszamolt_tavolsaggal[i].obj.position;
        if (parseInt(kiszamolt_tavolsaggal[i].tavolsag) <= 400) {
            if (mennyi_feny_van_a_scenen < 4) {
                //scene.remove(kiszamolt_tavolsaggal[i].obj); 
                
                scene.add(kiszamolt_tavolsaggal[i].obj);       
                //kiszamolt_tavolsaggal[i].obj.visible = true;
                
                mennyi_feny_van_a_scenen++;
                
                /*
                var cg = new THREE.CubeGeometry(cubesize/2,cubesize_y/2,cubesize/2,11,11,11);
                var wm = new THREE.MeshBasicMaterial( { wireframe:true } );
                aa = new THREE.Mesh( cg, wm );
                aa.position = kiszamolt_tavolsaggal[i].obj.position;
                aa.visible = true;
                scene.add(aa);
                */
                //console.log(kiszamolt_tavolsaggal[i].obj.position);
                //console.log(kiszamolt_tavolsaggal[i].tavolsag);
                
                //console.log("bekapcsol:"+kiszamolt_tavolsaggal[i].obj.id);
                
            } else {
                //scene.remove(kiszamolt_tavolsaggal[i].obj);       
                //console.log("KIkapcsol1:"+kiszamolt_tavolsaggal[i].obj.id);
            }
        } else {
            // ha tavolabb van mint 600 akkor is bekapcsoljuk ha meg belefer a 4 be:
            // mert runtime mar nem lehet tobbe darabot kirakni csak ami alapbol volt
            if (mennyi_feny_van_a_scenen < 4) {
                //console.log(mennyi_feny_van_a_scenen);
                scene.add(kiszamolt_tavolsaggal[i].obj);    
                //kiszamolt_tavolsaggal[i].obj.visible = true;
                mennyi_feny_van_a_scenen++;
            } else {
                //kiszamolt_tavolsaggal[i].obj.visible = false;
                scene.remove(kiszamolt_tavolsaggal[i].obj);           
            }
            
            //console.log("KIkapcsol2:"+kiszamolt_tavolsaggal[i].obj.id);
        }
        
    }

        
        
    
}

function targy_use(taskahely_id,targy_id,karakter_id) {
    var targyadatok = targyak.targyadatok(targy_id);
    if (targyadatok.fokategoria == "ital") {
        if (targyadatok.alkategoria == "mana") {
            
            var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id)
            karakterek[karakter_index].manat_kap(targyadatok.mennyi_manat_ad);
            
            if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
                $("#"+taskahely_id).html("");
            }
        }
    } else {
        info_szoveg("You cant use that.");
    }
}


function targy_unequip(felszereles_hely_id,targy_id,karakter_id) {
    var targyadatok = targyak.targyadatok(targy_id);
    var targy_dom = '<img title="'+ targyadatok.targy_leirasa +'" class="item" data-item-id="'+ targyadatok.id +'" src="assets/items/'+targyadatok.kep_fajl+'">';
    
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id)
    karakterek[karakter_index].loot_taskaba(targy_id);

    $('.item').qtip(tooltip_options);
    
    console.log(felszereles_hely_id);
    $('#karekterlap_' + karakter_id).children("#karekterlap_felszerelesek").children("#" + felszereles_hely_id).html("");
    
    if (felszereles_hely_id == "karakterlap_bal_kez") {
        $("#karakter_"+(karakter_id)+"_kez_1").html('');
    }
    if (felszereles_hely_id == "karakterlap_jobb_kez") {
        $("#karakter_"+(karakter_id)+"_kez_2").html('');
    }
    
    hang_lejatszas(8,{pan:0,volume:20});
}

function targy_atadas(taskahely_id,targy_id,karakter_id,cel_karakter_id) {
    //console.log(karakter_id);
    //console.log(cel_karakter_id);
    var targyadatok = targyak.targyadatok(targy_id);
    var targy_dom = '<img title="'+ targyadatok.targy_leirasa +'" class="item" data-item-id="'+ targyadatok.id +'" src="assets/items/'+targyadatok.kep_fajl+'">';
    
    var karakter_index_cel = karakter_hanyadik_a_tombben_id_alapjan(cel_karakter_id);
    var ret = karakterek[karakter_index_cel].loot_taskaba(targy_id);
    
    if (ret) {
        // ha volt eleg helye
        if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
            $("#"+taskahely_id).html("");
        }
        
        var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id);
        karakterek[karakter_index].inventory_objektum_frissitese();
        
    }    
    
}

function targy_equip(taskahely_id,targy_id,karakter_id) {
    // lekerdezzuk a targy tipusat:
    var targyadatok = targyak.targyadatok(targy_id);
    var targy_dom = '<img title="'+ targyadatok.targy_leirasa +'" class="item" data-item-id="'+ targyadatok.id +'" src="assets/items/'+targyadatok.kep_fajl+'">';
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id)
    
    // megnezzuk tudja e hasznalni
    if (!karakterek[karakter_index].tudja_e_hasznalni(targy_id)) {
        info_szoveg("You cant equip this type of item.");
        return false;
    }
    
    
    mozgas_logolas("TARGY EQUIP targy_id:" + targy_id + " targyadatok.fokategoria:" + targyadatok.fokategoria + " targyadatok.alkategoria:" + targyadatok.alkategoria + " karakter_id:" + karakter_id);
    
    if (targyadatok.fokategoria == "fegyver" || targyadatok.fokategoria == "pancel") {
        if (targyadatok.fokategoria == "pancel") {
            var hova_rakjuk = "";
            if (targyadatok.alkategoria == "mellvert") {hova_rakjuk = "karakterlap_"+karakter_id+"_torzs";}
            if (targyadatok.alkategoria == "sapka") {hova_rakjuk = "karakterlap_"+karakter_id+"_fej";}
            if (targyadatok.alkategoria == "nyaklanc") {hova_rakjuk = "karakterlap_"+karakter_id+"_nyak";}
            if (targyadatok.alkategoria == "gyuru") {hova_rakjuk = "karakterlap_"+karakter_id+"_gyuru1";}
            //if (targyadatok.alkategoria == "gyuru") {hova_rakjuk = "karakterlap_"+karakter_id+"_gyuru2";}
            if (targyadatok.alkategoria == "cipo") {hova_rakjuk = "karakterlap_"+karakter_id+"_cipo";}
            if (targyadatok.alkategoria == "kesztyu") {hova_rakjuk = "karakterlap_"+karakter_id+"_kesztyu";}
            
            var helye = $('#karekterlap_' + karakter_id).children("#karekterlap_felszerelesek").children("#" + hova_rakjuk);
            
            if (helye.html() == "") {
                helye.html(targy_dom);
                
                if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
                    $("#"+taskahely_id).html("");
                }
                
                hang_lejatszas(8,{pan:0,volume:30});
            } else {
                var mi_volt_ott = helye.children().attr("data-item-id");
                helye.html(targy_dom);
                
                if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
                    $("#"+taskahely_id).html("");
                }
                
                karakterek[karakter_index].loot_taskaba(mi_volt_ott);

                $('.item').qtip(tooltip_options);
                hang_lejatszas(8,{pan:0,volume:30});
            }
            
        }
        if (targyadatok.fokategoria == "fegyver") {
            
            // megnezzuk van e mar a fegyver slotban valami
            // ha van akkor miutan beraktuk az uj targyat a regit a taskaba rakjuk
            // a sorrend fontos mert lehet hogy nincs hely kivenni a regit amig a zuj nincs ahelyen
            var bal_kez = $('#karekterlap_' + karakter_id).children("#karekterlap_felszerelesek").children("#karakterlap_"+karakter_id+"_bal_kez");
            var jobb_kez = $('#karekterlap_' + karakter_id).children("#karekterlap_felszerelesek").children("#karakterlap_"+karakter_id+"_jobb_kez");
            if (bal_kez.html() == "") {
                //ures. egyszeruen berakjuk es a regit torolju a taskabol berakjuk:
                bal_kez.html(targy_dom);
                $('.item').qtip(tooltip_options);
                
                //a portrera is kirakjuk:
                $("#karakter_"+(karakter_id)+"_kez_1").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');  
                
                // a taskabol meg toroljuk
                if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
                    $("#"+taskahely_id).html("");
                }
                hang_lejatszas(8,{pan:0,volume:30});
            } else if (jobb_kez.html() == "") {
                //ures. egyszeruen berakjuk es a regit torolju a taskabol berakjuk:
                jobb_kez.html(targy_dom);
                $('.item').qtip(tooltip_options);
                
                //a portrera is kirakjuk:
                $("#karakter_"+(karakter_id)+"_kez_2").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');  
                
                // a taskabol meg toroljuk
                if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
                    $("#"+taskahely_id).html("");
                }
                hang_lejatszas(8,{pan:0,volume:30});
            } else {
                // egyik kez sem ures cserelni kell
                // egyelore a bal kezzel cserelem
                var mi_volt_a_balkezben = bal_kez.children().attr("data-item-id");
                
                bal_kez.html(targy_dom);
                
                //a portrera is kirakjuk:
                $("#karakter_"+(karakter_id)+"_kez_1").html('<img src="assets/items/'+targyadatok.kep_fajl+'">');  
                
                // a taskabol meg toroljuk
                if ($("#"+taskahely_id).children().attr("data-item-id") == targy_id) {
                    $("#"+taskahely_id).html("");
                }
                
                // ami korabban volt a kezeben az megy a taskaba
                var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_id)
                karakterek[karakter_index].loot_taskaba(mi_volt_a_balkezben);

                $('.item').qtip(tooltip_options);
                hang_lejatszas(8,{pan:0,volume:30});
            }
            
        }
        
        karakterek[karakter_index].inventory_objektum_frissitese();
        karakterek[karakter_index].karakterlap_objektum_frissitese();

        
        $('.item').qtip(tooltip_options);
        
    } else {
        info_szoveg("You cant equip that.");
    }
    
}


var toltes_hanyszor_kapcsolt_be = 0;
function toltes_jelzo_bekapcsol() {
    toltes_hanyszor_kapcsolt_be++;
    //$("#toltes_jelzes").show();
}
function toltes_jelzo_kikapcsol() {
    toltes_hanyszor_kapcsolt_be--;
    if (toltes_hanyszor_kapcsolt_be == 0) {
        //$("#toltes_jelzes").hide();    
    }
    
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


function kerdoiv_megjelenites() {
    // levesszuk a billantyukrol a bondet:
     $(document).unbind("keydown");
    
    $("#kerdoiv").show();
}

function kerdoiv_bezar() {
    
    $.ajax({  
                
     type: "POST",  
     url: "ajax_kerdoiv.php",  
     data: "valaszolt=0",
     success: function(){  
        $("#kerdoiv").hide();
     }  
 });
 
 
    $(document).bind("keydown", function(event) {
            var keycode = event.which;
            
            if (keycode == 83) {
                mozgas('le');
            }
            if (keycode == 87) {
                mozgas('fel');
            }
            if (keycode == 65) {
                mozgas('bal');
            }
            if (keycode == 68) {
                mozgas('jobb');
            }
            if (keycode == 81) {
                fordulas('bal');
            }
            if (keycode == 69) {
                fordulas('jobb');
            }
            
            
            if (keycode == 27) {
                if ($(".karekterlap_hatter").is(":visible") || $(".inventory_hatter").is(":visible") || $(".skills_hatter").is(":visible") || $(".abilities_hatter").is(":visible") || $("#kuldi_hatter").is(":visible") || $("#terkepek").is(":visible") ||  $("#artifact_hatter").is(":visible") || $(".forge_hatter").is(":visible") || $(".achievements_hatter").is(":visible") || $(".gems_hatter").is(":visible")   ) {
                    minden_ablak_ki();
                } else {
                    jatek_menu_toogle();    
                }
                
                
            }
            
            if (keycode == 49 || keycode == 50  || keycode == 51  || keycode == 52  ) {
                gomb_skill(keycode);
            }
            
            
        });
  
}

function kerdoiv_elkuld() {
    
    $.ajax({  
                
     type: "POST",  
     url: "ajax_kerdoiv.php",  
     data: "valaszolt=1&valasz1="+$("input:radio[name='valasz1']:checked").val()+"&valasz2="+$("input:radio[name='valasz2']:checked").val()+"&valasz3="+$("input:radio[name='valasz3']:checked").val()+"&valasz4="+$("input:radio[name='valasz4']:checked").val()+"&valasz_egyeb="+$("#valasz_egyeb").val(),
     success: function(){  
        $("#kerdoiv").hide();
     }  
 }); 
 
 $(document).bind("keydown", function(event) {
            var keycode = event.which;
            
            if (keycode == 83) {
                mozgas('le');
            }
            if (keycode == 87) {
                mozgas('fel');
            }
            if (keycode == 65) {
                mozgas('bal');
            }
            if (keycode == 68) {
                mozgas('jobb');
            }
            if (keycode == 81) {
                fordulas('bal');
            }
            if (keycode == 69) {
                fordulas('jobb');
            }
            
            
            if (keycode == 27) {
                if ($(".karekterlap_hatter").is(":visible") || $(".inventory_hatter").is(":visible") || $(".skills_hatter").is(":visible") || $(".abilities_hatter").is(":visible") || $("#kuldi_hatter").is(":visible") || $("#terkepek").is(":visible") ||  $("#artifact_hatter").is(":visible") || $(".forge_hatter").is(":visible") || $(".achievements_hatter").is(":visible") || $(".gems_hatter").is(":visible")   ) {
                    minden_ablak_ki();
                } else {
                    jatek_menu_toogle();    
                }
                
                
            }
            
            if (keycode == 49 || keycode == 50  || keycode == 51  || keycode == 52  ) {
                gomb_skill(keycode);
            }
            
            
        });
}

