function Npc (parameterek,pozicio) {
    //id kell a removehoz
    this.id = parameterek.id;
    
    
    // itt a tipus konkret npcket jelol pl a falmingo az mindig ugyaznaokat tudja cisnalni ugyanaozkat mondja es arulja stb.
    this.tipus = parameterek.npc_tipusa;
    this.pozicio = pozicio;
    
    this.nev = "";
    
    this.automatikusan_elkezd_beszelni = 0;
    
    this.Tx = false;
    this.Ty = false;
    
    this.beszelgetesek = new Array();
    
    this.mesh = false;
    this.meshAnim = false;
    
    
    this.targyak  = false;
    
    this.adatok_beolvasasa_mentesbol = function(adatok) {
        this.targyak = adatok;
        console.log("this.targyak===============================:");
        console.log(this.targyak);
    }
    
    this.interakcio_inditasa = function() {
        console.log('interakcio_inditasa');
        // felepitjuk a domban a beslzgetest:
        
        //meshAnim.currentKeyframe = 1;
        //meshAnim.setFrameRange(4,5);
        
        //console.log(this.beszelgetesek);
        
        $("#kuldi_tartalom").empty();
        
        // tobbfele hang van renado valasztunk
        // egyelore 17,18,19
        var melyik_hang = randint(17,19);
        hang_lejatszas(melyik_hang,{pan:0,volume:100});
        
        var lathato = 1;
        
        var dom_tart = '';
        
        
        for (var i=0; i<this.beszelgetesek.length; i++) {
            var css_display = "";
            if (lathato == 1) {
                var css_display = "";    
            } else {
                var css_display = 'style="display:none"';    
            }
            dom_tart += '<div '+css_display+' id="beszed_id_'+this.beszelgetesek[i].beszed_id+'">';
            dom_tart += '<div class="npc_int_szoveg_npc"><span>'+this.nev+'</span>: '+ this.beszelgetesek[i].szoveg +'</div>';
            
            for (var j=0; j<this.beszelgetesek[i].valaszok.length; j++) {
                var valaszok = this.beszelgetesek[i].valaszok[j];
                
                var onclick_hivas = "";
                if (this.beszelgetesek[i].valaszok[j].melyik_beszed_idt_hivja == 999) {
                    // boltot nyit
                    onclick_hivas = 'npc_boltot_nyit('+this.id+')';
                } else {
                    onclick_hivas = 'npc_interakcio_valaszadas('+ this.beszelgetesek[i].valaszok[j].melyik_beszed_idt_hivja +')';
                }
                
                
                if (typeof this.beszelgetesek[i].valaszok[j].kuldetes_elfogadva_id !== "undefined") {
                    // elfogad egy kuldetest
                    onclick_hivas += ';npc_kuldit_elfogad('+this.id+','+this.beszelgetesek[i].valaszok[j].kuldetes_elfogadva_id+')';
                }
                if (typeof this.beszelgetesek[i].valaszok[j].targyat_kap_id !== "undefined") {
                    // targyat ad
                    // generaljuk a targy b64 targy idt:
                    var alap_targy_id = this.beszelgetesek[i].valaszok[j].targyat_kap_id;
                    var targy_id = targyak.targy_generalas(alap_targy_id);
                    
                    
                    onclick_hivas += ';npc_targyat_ad('+this.id+',\''+targy_id+'\')';
                }
                
                
                
                dom_tart += '<div onclick="'+onclick_hivas+'" class="npc_int_szoveg_valasz">- '+ this.beszelgetesek[i].valaszok[j].valasz +'</div>';
                
            }
            lathato = 0;
            dom_tart += '</div>';
        }
        
        //$("#npc_int_szovegek").append(dom_tart);
        $("#kuldi_tartalom").append(dom_tart);
        $("#kuldi_0").fadeIn(300);
        
        //$("#npc_interakcio_elinditva_div").show();
        //$("#npc_interakcio_elinditva_div").show("slide", { direction: "left" }, 300);
        
    }
    
    this.boltot_nyit = function() {
        //alert('not implemented yet');
    }
    
    this.targy_odaadva = function(targy_id) {
        for (var i=0; i<this.targyak.length;i++) {
            if (this.targyak[i].targy_id = targy_id) {
                this.targyak[i].odaadva = "IGEN";
                break;
            }
        }
    }
    
    this.odaadta_e_mar_a_targyat = function(targy_id) {
        var ret = false;
        for (var i=0; i<this.targyak.length;i++) {
            if (this.targyak[i].targy_id = targy_id) {
                if (this.targyak[i].odaadva == "IGEN") {
                    ret = true;
                }
                break;
            }
        }
        
        return ret;
    }
    
    this.create = function() {
        
        
        
        this.Tx = Math.abs(Math.floor(((pozicio.x ) / cubesize)));
        this.Ty = Math.abs(Math.floor(((pozicio.z ) / cubesize)));

        
        var ts = new Date().getTime();
        
        if (this.tipus == "npc1") {
            
            // letrehozzuk a beszelgetos objetumokat:
            // josnbol toltjuk majd be
            
            // minden beszedek van egy id ja egy szovege ami kerdes is lehet es tartozhatnak hozza valaszok.
            // ha a melyik_beszed_idt_hivja = 0 akkor elkoszon es lezarul minden ablak
            // ha a 999 akkor megnyilik a boltos interface, de akkor is bezarjuk a beszelo ablakot
            
            
            this.nev = "Tuwen";
            this.automatikusan_elkezd_beszelni = 1;
            
            this.targyak = [
                {targy_id:12,odaadva:"NEM"}
            ];
            
            /*
            this.beszelgetesek = [
                {"beszed_id":1,"szoveg":"Greetings adventurers! What do you seek?",
                    "valaszok":
                    [
                        {"valasz":"Not your business!","melyik_beszed_idt_hivja":2},
                        {"valasz":"We try to find the Great Artifacts to save our land.","melyik_beszed_idt_hivja":3},
                        {"valasz":"Looking for some goods.","melyik_beszed_idt_hivja":4},
                        {"valasz":"Do you have a key for the door behind you?","melyik_beszed_idt_hivja":8},
                        {"valasz":"Can we do somthing for you?","melyik_beszed_idt_hivja":6}
                    ]
                },
                {"beszed_id":2,"szoveg":"Okay I understand it, bye.",
                    "valaszok":
                    [
                        {"valasz":"Bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":3,"szoveg":"Great Artifact? That will be a dangerous journey. If you want I can tell you what i know about the Artifacts.",
                    "valaszok":
                    [
                        {"valasz":"Sure, tell us what you know!","melyik_beszed_idt_hivja":5},
                        {"valasz":"Not interested, let me ask something else.","melyik_beszed_idt_hivja":1}
                    ]
                },
                {"beszed_id":4,"szoveg":"I have some, wanna see?",
                    "valaszok":
                    [
                        {"valasz":"Changed my mind. Bye","melyik_beszed_idt_hivja":0},
                        {"valasz":"Sure, let me see. (not implemented yet)","melyik_beszed_idt_hivja":999}
                    ]
                },
                {"beszed_id":5,"szoveg":"So, the Great Artifacts TODO",
                    "valaszok":
                    [
                        {"valasz":"Thank You for the information. Bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":6,"szoveg":"Yes, if you can kill me the skeletons deep inside the dungeon and bring me my lost ring that would be fine.",
                    "valaszok":
                    [
                        {"valasz":"No thanks","melyik_beszed_idt_hivja":0},
                        {"valasz":"Okay, we try to do it.","melyik_beszed_idt_hivja":7,"kuldetes_elfogadva_id":1},
                    ]
                },
                {"beszed_id":7,"szoveg":"Thanks, come back to me when you found it.",
                    "valaszok":
                    [
                        {"valasz":"Okay, bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":8,"szoveg":"Yes i have, I can give it to you, want it?.",
                    "valaszok":
                    [
                        {"valasz":"Yep!","melyik_beszed_idt_hivja":9,"targyat_kap_id":6000}
                    ]
                },
                {"beszed_id":9,"szoveg":"Here it is.",
                    "valaszok":
                    [
                        {"valasz":"Thank you, bye!","melyik_beszed_idt_hivja":0}
                    ]
                }
            ];
           */ 

            this.beszelgetesek = [
                {"beszed_id":1,"szoveg":"Greetings adventurers! What do you seek?",
                    "valaszok":
                    [
                        {"valasz":"Mind your own business, we've been walking for hours without anything to cut down.","melyik_beszed_idt_hivja":4},
                        {"valasz":"Good day, we are on a journey to the heart of the dungeons. We seek vengeance and justice for all of us.","melyik_beszed_idt_hivja":2,"targyat_kap_id":6000},
                        {"valasz":"Hey, we are just passing trough here, any good advice woud really help us out.","melyik_beszed_idt_hivja":3}
                    ]
                },
                {"beszed_id":2,"szoveg":"Thank the gods, it's always relieving to see such heroism. It would be my heart's pleasure to help you out. Next to me, there is a portal which you can use to get to crucial parts of the dungeon. Not far from here is a locked door. Here, take this key, and good luck.",
                    "valaszok":
                    [
                        {"valasz":"Thank You. Bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":3,"szoveg":"Oh, I was hoping that you would... Excuse me. There is a portal, you can use it to get to crucial parts of the dungeon. Be safe.",
                    "valaszok":
                    [
                        {"valasz":"Thank You. Bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":4,"szoveg":"...(she looks frightened...I think I scared her.)",
                    "valaszok":
                    [
                        {"valasz":"Is there a way to get by that door?","melyik_beszed_idt_hivja":5},
                        {"valasz":"Any way, we can bust down that door? Wait.. are those keys in your hands, pretty? Give it to us, and we will kill everything in no time.","melyik_beszed_idt_hivja":7,"targyat_kap_id":6000},
                        {"valasz":"Bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":5,"szoveg":"I have the key, but I was hoping that I can give it to heroes, who are willing to face the evil.",
                    "valaszok":
                    [
                        {"valasz":"We are going to do just that, Ma'am. You can trust us.","melyik_beszed_idt_hivja":6,"targyat_kap_id":6000}
                    ]
                },
                {"beszed_id":6,"szoveg":"Good. Here, take it. Good luck.",
                    "valaszok":
                    [
                        {"valasz":"Thank You. Bye","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":7,"szoveg":"Take it and just go.",
                    "valaszok":
                    [
                        {"valasz":"Bye","melyik_beszed_idt_hivja":0}
                    ]
                }
            ];
            
            
            //this.create_altalanos("assets/models/Igrac_glavni_ver_7_splastom_anim.js","assets/textures/Igrac_glavni_ver_7_splastom.js.png");
            this.create_altalanos("assets/models/npc_lany/fleurOptonl6.js","assets/models/npc_lany/textura.png");
            
            
        }
        
        if (this.tipus == "npc2") {
            
            this.nev = "Viki";
            this.automatikusan_elkezd_beszelni = 0;

            this.beszelgetesek = [
                {"beszed_id":1,"szoveg":"En egy masik noc vagyok nem kezdek el automatikusan rizsazni?",
                    "valaszok":
                    [
                        {"valasz":"Semmit haggya beken","melyik_beszed_idt_hivja":2},
                        {"valasz":"Jotttem keresni a kincset","melyik_beszed_idt_hivja":3},
                        {"valasz":"Csak a szemuvegem keresem","melyik_beszed_idt_hivja":4}
                    ]
                },
                {"beszed_id":2,"szoveg":"Jovan akkor bekenhagylak szia es nincs is csak egy ebucsuzas valaszod",
                    "valaszok":
                    [
                        {"valasz":"Csa","melyik_beszed_idt_hivja":0}
                    ]
                },
                {"beszed_id":3,"szoveg":"kincset? akkor meg fogsz halni az tuti. es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg es valami hosszu szoveg",
                    "valaszok":
                    [
                        {"valasz":"mondd tovabb a rizsat","melyik_beszed_idt_hivja":5},
                        {"valasz":"mast akarok kerdezni visszavisz az elejere","melyik_beszed_idt_hivja":1}
                    ]
                },
                {"beszed_id":4,"szoveg":"en adok el neked szemuveget ha akarod",
                    "valaszok":
                    [
                        {"valasz":"Nemkell csa","melyik_beszed_idt_hivja":0},
                        {"valasz":"megnezem milynek vannak, boltot nyit","melyik_beszed_idt_hivja":999}
                    ]
                },
                {"beszed_id":5,"szoveg":"megtobb rizsa es elksooznes",
                    "valaszok":
                    [
                        {"valasz":"jovan koszi csa","melyik_beszed_idt_hivja":0}
                    ]
                }
            ];
            

            this.create_altalanos("assets/models/Igrac_glavni_ver_7_splastom_anim.js","assets/textures/Igrac_glavni_ver_7_splastom.js.png");
           
                   
        }
        
    }
    
    this.create_altalanos = function(model_js,textura_fajl) {
        
        // megnezzuk a mentesbol jott e at hozza adat:
        for (var i=0; i< ideiglenes_npc_adatok.length; i++) {
            //console.log(this.id);
            if (ideiglenes_npc_adatok[i].npc_id == this.id) {
                //console.log("egyenlo");
                this.targyak = ideiglenes_npc_adatok[i].adatok;
                //console.log( this.targyak);
            }
        }
    
        var that = this;
        
        var geo = getGeomertyFromCache(model_js);
        
        geo.geometry.computeMorphNormals();
        
        var texture = THREE.ImageUtils.loadTexture(textura_fajl);
        var material = new THREE.MeshPhongMaterial( { morphTargets: true,map: texture } );
        //var material = new THREE.MeshPhongMaterial( { morphTargets: false} );
        
        var meshAnim = new THREE.MorphAnimMesh( geo.geometry,material );                        

        
                    
        meshAnim.duration = 15000;
        //meshAnim.setFrameRange(0,2);
        
        meshAnim.scale.set( 1.0, 1.0, 1.0 );
        meshAnim.position.x = -40;
        meshAnim.position.y = -5;
        meshAnim.position.z = 0;
        meshAnim.rotation.y = rad(-90);
        
        meshAnim.rotation =  MovingCube.rotation ;
        
        // ezzel egy kulso kocka geot kap es ehhez merjuk a kozel van e stb dolgokat mikozben maga az npc a kockan belul kerulhet mas pozicioba pl kozelebb a szelehez!
        var cubeGeometry_kulso = new THREE.CubeGeometry(cubesize,cubesize_y,cubesize,1,1,1);
        var kulso = new THREE.Mesh( cubeGeometry_kulso );
        kulso.visible = false;
        
        var group = new THREE.Object3D();//create an empty container
        group.add( kulso );
        group.add( meshAnim );//add a mesh with geometry to it
        scene.add( group );//when done, add the group to the scene    

        group.position.set(that.pozicio.x, that.pozicio.y, that.pozicio.z); 
        
        
        
        //scene.add( mesh );
        //collidableMeshList.push(group);
        
        morphs.push( meshAnim );
        
        npck.push(that);
        
        that.meshAnim = meshAnim;
        that.mesh = group;
        
        
        meshAnim.on('click', function(){
            console.log('click on npc1');
            
            var tavolsag = group.position.distanceTo(MovingCube.position);
            if (tavolsag > 130) {
                return;
            }
            
            mozgas_logolas("NPCRE KATTINT id:" + that.id);
            
            that.interakcio_inditasa();
            hang_lejatszas(15,{pan:0,volume:20});           
        });
        
            
       

        
        /*
        var loader = new THREE.JSONLoader();
        loader.load( model_js, function( geometry ) {
            
            
            
            geometry.computeMorphNormals();
            
            var texture = THREE.ImageUtils.loadTexture(textura_fajl);
            var material = new THREE.MeshPhongMaterial( { morphTargets: true,map: texture } );
            //var material = new THREE.MeshPhongMaterial( { morphTargets: false} );
            
            meshAnim = new THREE.MorphAnimMesh( geometry,material );                        

            
                        
            meshAnim.duration = 15000;
            //meshAnim.setFrameRange(0,2);
            
            meshAnim.scale.set( 1.0, 1.0, 1.0 );
            meshAnim.position.x = -40;
            meshAnim.position.y = -5;
            meshAnim.position.z = 0;
            meshAnim.rotation.y = rad(-90);
            
            meshAnim.rotation =  camera.rotation ;
            
            // ezzel egy kulso kocka geot kap es ehhez merjuk a kozel van e stb dolgokat mikozben maga az npc a kockan belul kerulhet mas pozicioba pl kozelebb a szelehez!
            var cubeGeometry_kulso = new THREE.CubeGeometry(cubesize,cubesize_y,cubesize,1,1,1);
            var kulso = new THREE.Mesh( cubeGeometry_kulso );
            kulso.visible = false;
            
            var group = new THREE.Object3D();//create an empty container
            group.add( kulso );
            group.add( meshAnim );//add a mesh with geometry to it
            scene.add( group );//when done, add the group to the scene    

            group.position.set(that.pozicio.x, that.pozicio.y, that.pozicio.z); 
            
            //scene.add( mesh );
            //collidableMeshList.push(group);
            
            morphs.push( meshAnim );
            
            npck.push(that);
            
            that.meshAnim = meshAnim;
            that.mesh = group;
            
            
            meshAnim.on('click', function(){
                console.log('click on npc1');
                
                var tavolsag = group.position.distanceTo(MovingCube.position);
                if (tavolsag > 130) {
                    return;
                }
                
                mozgas_logolas("NPCRE KATTINT id:" + that.id);
                
                that.interakcio_inditasa();
                hang_lejatszas(15,{pan:0,volume:20});           
            });
            
            
       
        } ); 
        
        */
    }
    
}


