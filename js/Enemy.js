function Enemy (parameterek,pozicio) {
    // flamingo, zombi , stb
    this.tipus = parameterek.ellenseg_tipusa;
    
    //id kell a removehoz
    this.id = 0;
    
    this.nev = "";
    
    this.egyeb_infok = "";
    
    // ez a terkep kieg adaokban levo idja
    this.terkep_kieg_id = parameterek.id;
        
    // egyelore mindnek 100
    this.hp = 100;
    
    this.max_hp = 100;
    
    
    
    // mennyi xpt ad
    this.xp = 10;
    
    this.animacio_sebessege = 2000;
    this.animaciok = null;
    
    this.model_texturak = new Array();
    
    // milisecben. minel kisebb annal surubben tamad!
    this.tamadasi_sebesseg = 3000;
    
    // ettol fugg hogy csak az elso sorban levoket uti vagy tobbet. ha pl 4 akkor 8 embert is tamad egyszerre.
    this.hany_sort_tud_tamadni = 1;
    this.statok = {power:4,dexterity:10,defense:10,vitality:10,szint:1};
        
    this.eppen_tamad = false;
    
    this.eppen_meghal = false;
    
    
    this.mit_dobott = null;
    this.ledobott_targy_o3d  = null;
    this.ledobott_targy_id = null;
    
    this.mennyi_penzt_dobott = 0;
    
    //{"karakter_id":0,"dot_damage":0,"dot_ido":0,"skill_id":0,"elozo_tick":0}
    this.dotok = [];
    
    this.debuffok = [];
    
    this.hangok_serul = [72,73,74];
    this.hangok_meghal = [13];
    
        
    //mit dob ez egy tomb a trgyak ID ja val amibol majd veletleszeruen valasztunk
    // eselymegadas: minel nagyobb a kisebb annal rikabban eshet tehat szazalekos megadas 1-100 ig
    
    // basic:75, fine: 50, masterwork: 30, rare: 10
    /*
    this.kategoria_eselyek = {kategoria_neve:"basic", kategoria_sulya: 75 },
        {kategoria_neve:"fine", kategoria_sulya: 50 },
        {kategoria_neve:"masterwork", kategoria_sulya: 30 },
        {kategoria_neve:"rare", kategoria_sulya: 10 }
    */
    
    // elemek sorrendja fontos! 0.elem: basic re az eselye, 1.: fine ra az esleye, 2: masterworkra, 3: rarera
    this.kategoria_eselyek = new Array(75,50,30,10);
    
    // az egyes kategoriakban az item ID -k
    // ezt mobonkent allitjuk be    
    this.targyak_basic = new Array(1,2,3);
    this.targyak_fine = new Array(4,5,6);
    this.targyak_masterwork = new Array(7,8,9);
    this.targyak_rare = new Array(10,11,12);

    
    this.penz = 100;
    
    //meghivasnal a spawn
    this.pozicio = pozicio;
    
    // ide spawnolt ez nem valtozik elete soran
    this.kezdo_pozicio = pozicio;
    
    // max ennyit johet el a kezdo helyetol. ezt lehet hasznalni arra, hogy csak bizonyos teruleten mozog 
    // es arra, hogy ha a jatekost tul messze kovetne akkro visszaspawnoljon vagy szaladjon
    // egyelore fixen 5 lepes ami a cubesize*5 el jon ki
    this.max_elmozgas = 500;
    
    // ha meglatta akkor elkezdi kovetni
    this.latja_a_jatekost = false;
    
    this.koveti_a_jatekost = false;
    
    // hanyadik lepesnel jar a path iteracio
    this.hol_jar_a_pathfindingben = 1;
    
    // ha apathifinding nem tud vegigfutni mert utkozes van akkor ott valszeg egy zart ajto van. nem kalkulaljuk ujra a pathot amig a jatekos nem mozdul el! igy nem fog minden ticknel ujra es ujra probalkozni atmenni az ajton.
    // ezt egyelroe nem tessuzk be MERT:
    // - jobb ha folyamatosan kalkulal igy ha egy ajto kinyilik es megsuznik a colision akkor keresztul tus menni rajata!
    //this.utkozes_van = 0;
    
    // ez a kulso kocka
    this.mesh = false;
    // ez a belso animacio
    this.meshAnim = false;
    
    /*
    // ha vege a betoltesnek akkor ez lesz a msh, amig nem toltodott be a tick nem is futhat!
    this.mesh = false;
    
    // ebben van belul maga az anim mesh ehhez merjuk hol van eppen az elleseg, de a kulso kockann belul mozoghat pl kozelebb a kamerahoz
    this.kulso_mesh = false;
    */
    
    this.eppen_mozog = 0;
    
    this.movement = { dx:0, dz:0 };
    
    // ebben taroljuk a ppathfinding eremenyet ha az nem valtozott meg!
    this.path;
    
    
    
    // pathifiundingnel elmentjuk oket es cska akkro kalkulalunk ujra ha megvaltoztak
    this.Tx = false;
    this.Ty = false
    this.Tx_jatekos = false;
    this.Ty_jatekos = false;
       
    // radinat atszmolva deg be.
    this.merre_nez = 0;
    
    // kiszmaoljuk mennyit sebez nettoban, ezt majd a karakternel csokkentjuk az o statjai szerint!
    this.mennyit_sebez = function() {
        var mennyit_sebez = 0;
        
        // ez egy alap sebzes a strengthbol es a szintjebol szamolva
        
        // egyelroe a szintjet nem kalkulaljuk bele hame e szerint szmaolunk: 
        // Assuming that the code-base has not been fiddled with, we know by looking at the Help file that the standard damage calculation is:
        // 4 * Attacker_STR - 2 * Defender_DEF
        
        // a statjaibol levesszuk a debuff szaalkeot ha van!
        
        
        var power = this.statok.power;
        
        for (var i=0; i< this.debuffok.length; i++) {
            // ha van damagera vontkozo debuff
            if (typeof this.debuffok[i].parameterek.enemy_power !== "undefined") {
                power = power - (power*this.debuffok[i].parameterek.enemy_power);
            }
        }
        
        
        
        mennyit_sebez = (power*4);
        
        // megnezzuk vannak e rajta debuffok amik a vegso damaget csokkentik
        for (var i=0; i< this.debuffok.length; i++) {
            // ha van damagera vontkozo debuff
            if (typeof this.debuffok[i].parameterek.enemy_damage !== "undefined") {
                mennyit_sebez = mennyit_sebez - (mennyit_sebez*this.debuffok[i].parameterek.enemy_damage);
            }
        }
        
        
        
        return mennyit_sebez;
    }
    
    this.drop_kivalasztasa = function() {
        var ret = 0; 
        var sulyok_osszesen = 0;
        
        for (i=0; i < this.kategoria_eselyek.length; i++) {
            sulyok_osszesen += this.kategoria_eselyek[i];
        }
        
        var veletlen_szam = randint(0,sulyok_osszesen-1);
        //console.log(veletlen_szam);
        
        var osszesen = 0;
        for (i=0; i< this.kategoria_eselyek.length; i++) {
            osszesen += this.kategoria_eselyek[i];
            if (osszesen > veletlen_szam) {
                break;
            }
        }
        
        // az i lesz a kategoria amibol a drop esik!
        var mennyi_item_van_a_kategoriaba = 0;
        if (i == 0) { mennyi_item_van_a_kategoriaba = this.targyak_basic.length; }
        if (i == 1) { mennyi_item_van_a_kategoriaba = this.targyak_fine.length; }
        if (i == 2) { mennyi_item_van_a_kategoriaba = this.targyak_masterwork.length; }
        if (i == 3) { mennyi_item_van_a_kategoriaba = this.targyak_rare.length; }
        
        var veletlen_szam = randint(0,mennyi_item_van_a_kategoriaba-1);
        
        if (i == 0) { return this.targyak_basic[veletlen_szam]; }
        if (i == 1) { return this.targyak_fine[veletlen_szam]; }
        if (i == 2) { return this.targyak_masterwork[veletlen_szam]; }
        if (i == 3) { return this.targyak_rare[veletlen_szam]; }

    }
    
    this.drop_a_foldre = function(targy_id) {
        
        this.ledobott_targy_id = targy_id;
        
        
        
        var that = this;
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/bagofmarbles/bagofmarbles.js", function( geometry ) {
            // { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } 
            // new THREE.MeshNormalMaterial( { overdraw: true } )
            // new THREE.MeshLambertMaterial( { color: 0xFF0000, overdraw: false } 
            
            //morphColorsToFaceColors( geometry );
            //geometry.computeMorphNormals(); 
            //var wireMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );

            var texture = new THREE.ImageUtils.loadTexture("assets/models/bagofmarbles/textil1.png");
            var wireMaterial = new THREE.MeshPhongMaterial( { map: texture} ); 
            wireMaterial.transparent = false;   


            //var wireMaterial = new THREE.MeshPhongMaterial( { color: 0xFF0000, overdraw: false, transparent: false }  );
            var mesh2 = new THREE.Mesh( geometry, wireMaterial );
            
            // poziciot random allitjuk be abban a kockaban ahol meghalt az ellenseg
            var random_pozicio_x = randint(-30,30);
            var random_pozicio_z = randint(-30,30);
            
            
            mesh2.position.set((that.mesh.position.x+random_pozicio_x), -40, (that.mesh.position.z)+random_pozicio_z);
            mesh2.scale.x = 3;
            mesh2.scale.y = 3;
            mesh2.scale.z = 3;
            scene.add(mesh2);
            
            hang_lejatszas(5,{pan:0,volume:70});
            
            
            
            //console.log("----- bag betoltve ------");
            
            that.ledobott_targy_o3d  = mesh2;
            
            var dropfelvetelkezelo_over = mesh2.on('mouseover', function(drop2){
                that.ledobott_targy_o3d.material.emissive.setHex( 0xff0000 ); 
            
            });
            
            var dropfelvetelkezelo_out = mesh2.on('mouseout', function(drop2){
                if (that.ledobott_targy_o3d != null)  {
                    that.ledobott_targy_o3d.material.emissive.setHex( 0x000000 ); 
                }
            
            });
            
            var dropfelvetelkezelo = mesh2.on('click', function(drop2){

                // ez egyelore nem mukodik ezert hibat fog dobni a konzolon mert overt erzekel a targy eltunese utan is!
                
                that.ledobott_targy_o3d.off('mouseover');
                that.ledobott_targy_o3d.off('mouseout');
                
                that.ledobott_targy_o3d.off('click');

                that.drop_felveve(that.ledobott_targy_id,that.ledobott_targy_o3d);
                
            
            });
            
        });


    }
    
    this.drop_felveve = function(targy_id,o3d) {
        //console.log("-------------------------------------");
        //console.log("karakterek:" + karakterek);
        //console.log("karakterek.length:" + karakterek.length);
        //console.log("karaterek[0]:" + karakterek[0]);
        // meg kell hivni a karaktereket es akinel van hely berakni!
        var melyik_karakter_kapja_a_lootot = false;
        for(var i=0;i<karakterek.length;i++) {
            var kari = karakterek[i];
            if (kari.loot_taskaba(targy_id)) {
                // ha be tudtuk rakni akkor eltaroljuk ki kapta
                melyik_karakter_kapja_a_lootot = kari;        
                
                // es a penzt is hozzadjuk 
                if (this.mennyi_penzt_dobott > 0) {
                    kari.penz_taskaba(this.mennyi_penzt_dobott);
                }
                
                break;
            }
        }
        //console.log("melyik_karakter_kapja_a_lootot:" + melyik_karakter_kapja_a_lootot);
        if (melyik_karakter_kapja_a_lootot === false) {
            // senkinel nincs hely!
            info_szoveg("Not enough space in inventory!");
        } else {
            //console.log("amire nyomott es le kell szedni:" + o3d.id);
            //console.log("targy_id:" + targy_id);
            scene.remove(o3d);
            
            //console.log(o3d);
            
            o3d.material.map.dispose();
            o3d.material.dispose();
            o3d.geometry.dispose();
            
            //o3d.deallocate();
            //o3d.geometry.deallocate();
            //o3d.material.deallocate();

            
            var targyadatok = targyak.targyadatok(targy_id);
            //info_szoveg("You got a <span class='item_chatben' title='" + targyadatok.targy_leirasa + "' style='color:#"+ targyadatok.kategoria_szine +"'>" + targyadatok.targy_neve + "</span>");
            
            info_szoveg(melyik_karakter_kapja_a_lootot.nev + ' got a <span class="item_chatben" title="' + targyadatok.targy_leirasa + '" style="color:#'+ targyadatok.kategoria_szine +'">' + targyadatok.targy_neve + '</span>');
            
            $('.item_chatben').qtip(tooltip_options);
            
            // ha dobott penzt azt is kiirjuk:
            if (this.mennyi_penzt_dobott > 0) {
                info_szoveg("Your party got " + this.mennyi_penzt_dobott + " gold.");    
            }
            
            hang_lejatszas(32,{pan:0,volume:70});
            
            
            this.ledobott_targy_o3d = null;
            this.ledobott_targy_id = null;
        }
        
        
        
    
    }
    
    //this.drop_a_foldre(2);
    
    // 380-390 mega ha egyesvel load
    
    this.create_altalanos = function(model_js,y_pozicio,scale) {
        var that = this;
        
        var geo = getGeomertyFromCache(model_js);
        
        for (var i=0; i<geo.materials.length; i++) {
            geo.materials[i].morphTargets = true;
            if (typeof that.model_texturak[i] !== "undefined")  {
                // van hozza textura
                var textura = new THREE.ImageUtils.loadTexture(that.model_texturak[i]);
                geo.materials[i].map = textura;
                
            }
        }
        
        //var meshAnim = new THREE.MorphAnimMesh( geometry, wireMaterial );
        var meshAnim = new THREE.MorphAnimMesh( geo.geometry, new THREE.MeshFaceMaterial( geo.materials ) );

        meshAnim.position.set(0, y_pozicio, 0);
        meshAnim.scale.x = scale;
        meshAnim.scale.y = scale;
        meshAnim.scale.z = scale;
        
        meshAnim.setAnimationLabel("jar",that.animaciok.jar.eleje,that.animaciok.jar.vege);
        meshAnim.setAnimationLabel("tamad",that.animaciok.tamad.eleje,that.animaciok.tamad.vege);
        meshAnim.setAnimationLabel("all",that.animaciok.all.eleje,that.animaciok.all.vege);
        meshAnim.setAnimationLabel("serul",that.animaciok.serul.eleje,that.animaciok.serul.vege);
        meshAnim.setAnimationLabel("meghal",that.animaciok.meghal.eleje,that.animaciok.meghal.vege);
        
        meshAnim.playAnimation("jar",that.animaciok.jar.fps);                
        
        
        // ezzel egy kulso kocka geot kap es ehhez merjuk a kozel van e stb dolgokat mikozben maga az ellenseg a kockan belul kerulhet mas pozicioba pl kozelebb a szelehez vagyis hozzank!
        var cubeGeometry_kulso = new THREE.CubeGeometry(cubesize,cubesize_y,cubesize,1,1,1);
        var kulso = new THREE.Mesh( cubeGeometry_kulso );
        kulso.visible = false;
        
        var group = new THREE.Object3D();//create an empty container
        group.add( kulso );
        group.add( meshAnim );//add a mesh with geometry to it
        scene.add( group );//when done, add the group to the scene    

        group.position.set(that.pozicio.x, that.pozicio.y, that.pozicio.z);  

        collidableMeshList.push(group);
        scene.add( group );
        morphs.push( meshAnim );
        
        
        that.mesh = group;
        that.meshAnim = meshAnim;
        
        that.id = group.id;

        ellensegek.push(that);
        
        /*
        var loader = new THREE.JSONLoader();
        loader.load( model_js, function( geometry ,materials  ) {
            
            //geometry_cache.push({"url":model_js,"geometry":geometry});
            
            
            //console.log(materials);
            // animaciohoz kell:

            
            for (var i=0; i<materials.length; i++) {
                materials[i].morphTargets = true;
                if (typeof that.model_texturak[i] !== "undefined")  {
                    // van hozza textura
                    var textura = new THREE.ImageUtils.loadTexture(that.model_texturak[i]);
                    materials[i].map = textura;
                    
                }
            }
            
            //var meshAnim = new THREE.MorphAnimMesh( geometry, wireMaterial );
            var meshAnim = new THREE.MorphAnimMesh( geometry, new THREE.MeshFaceMaterial( materials ) );

            meshAnim.position.set(0, y_pozicio, 0);
            meshAnim.scale.x = scale;
            meshAnim.scale.y = scale;
            meshAnim.scale.z = scale;
            
            meshAnim.setAnimationLabel("jar",that.animaciok.jar.eleje,that.animaciok.jar.vege);
            meshAnim.setAnimationLabel("tamad",that.animaciok.tamad.eleje,that.animaciok.tamad.vege);
            meshAnim.setAnimationLabel("all",that.animaciok.all.eleje,that.animaciok.all.vege);
            meshAnim.setAnimationLabel("serul",that.animaciok.serul.eleje,that.animaciok.serul.vege);
            meshAnim.setAnimationLabel("meghal",that.animaciok.meghal.eleje,that.animaciok.meghal.vege);
            
            meshAnim.playAnimation("jar",that.animaciok.jar.fps);                
            
            
            // ezzel egy kulso kocka geot kap es ehhez merjuk a kozel van e stb dolgokat mikozben maga az ellenseg a kockan belul kerulhet mas pozicioba pl kozelebb a szelehez vagyis hozzank!
            var cubeGeometry_kulso = new THREE.CubeGeometry(cubesize,cubesize_y,cubesize,1,1,1);
            var kulso = new THREE.Mesh( cubeGeometry_kulso );
            kulso.visible = false;
            
            var group = new THREE.Object3D();//create an empty container
            group.add( kulso );
            group.add( meshAnim );//add a mesh with geometry to it
            scene.add( group );//when done, add the group to the scene    

            group.position.set(that.pozicio.x, that.pozicio.y, that.pozicio.z);  

            collidableMeshList.push(group);
            scene.add( group );
            morphs.push( meshAnim );
            
            
            that.mesh = group;
            that.meshAnim = meshAnim;
            
            that.id = group.id;

            ellensegek.push(that);
            
          
            
        });   
        
        */
        
        
    }
    
    this.create = function() {
        
        var that = this;
        var ts = new Date().getTime();
        
        if (this.tipus == "antlion") {
            
            this.statok = {power:8,dexterity:10,defense:50,vitality:10,szint:1};
            this.max_hp = this.hp = 700;
            this.tamadasi_sebesseg = 2500;
            this.nev = "Fire ant";
            this.egyeb_infok = "High resistance to fire";
            this.hangok_serul = [75,76,77];
            
            this.targyak_basic = new Array(1,2,3,130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470);
            this.targyak_fine = new Array(4,5,6,2005,2006,2008,2009,1001,1002,1003);
            this.targyak_masterwork = new Array(7,8,9,2015,2016,2017,2018);
            this.targyak_rare = new Array(10,11,12,2025,2026,2027);

            
            this.animaciok = {
                "jar":{"eleje":5,"vege":11,"fps":4},
                "tamad":{"eleje":13,"vege":16,"fps":2.5   },
                "all":{"eleje":1,"vege":4,"fps":0.5},
                "serul":{"eleje":17,"vege":18,"fps":2},
                "meghal":{"eleje":19,"vege":31,"fps":2}
            };
            
            this.model_texturak = new Array(
                "assets/models/antlion/fire.jpg",
                "assets/models/antlion/fire.jpg"
            );
            
            this.create_altalanos("assets/models/antlion/antlion.js",-30,21);
        }
        
        
        if (this.tipus == "spider") {
            
            this.statok = {power:5,dexterity:10,defense:60,vitality:10,szint:1};
            this.max_hp = this.hp = 400;
            this.tamadasi_sebesseg = 3000;
            this.nev = "Spider";
            this.hangok_serul = [78,79,80];
            
            this.targyak_basic = new Array(1,2,3,130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470);
            this.targyak_fine = new Array(4,5,6,2005,2006,2008,2009,1001,1002,1003);
            this.targyak_masterwork = new Array(7,8,9,2015,2016,2017,2018);
            this.targyak_rare = new Array(10,11,12,2025,2026,2027);
            
        
            this.animaciok = {
                    "jar":{"eleje":5,"vege":12,"fps":3.9},
                    "tamad":{"eleje":13,"vege":16,"fps":2},
                    "all":{"eleje":1,"vege":4,"fps":1},
                    "serul":{"eleje":18,"vege":20,"fps":2.1},
                    "meghal":{"eleje":18,"vege":24,"fps":1.6}
                };

                
            this.model_texturak = new Array();
            
            this.create_altalanos("assets/models/spider/spider_flare.js",-36,35);
            
        }   
        
        if (this.tipus == "skeleton") {
            
            this.statok = {power:7,dexterity:10,defense:55,vitality:10,szint:1};
            this.max_hp = this.hp = 500;
            //this.max_hp = this.hp = 4;
            this.xp = 10;
            
            this.tamadasi_sebesseg = 4000;
            this.nev = "Skeleton";
            this.egyeb_infok = "Slow but hits hard";
            this.hangok_serul = [72,73,74];
            
            this.targyak_basic = new Array(8000,1,2,3,130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470);
            this.targyak_fine = new Array(4,5,6,2005,2006,2008,2009,1001,1002,1003);
            this.targyak_masterwork = new Array(7,8,9,2015,2016,2017,2018);
            this.targyak_rare = new Array(10,11,12,2025,2026,2027);


            
            this.animaciok = {
                    "jar":{"eleje":4,"vege":11,"fps":4},
                    "tamad":{"eleje":12,"vege":15,"fps":3},
                    "all":{"eleje":1,"vege":3,"fps":0.5},
                    "serul":{"eleje":22,"vege":23,"fps":1},
                    "meghal":{"eleje":23,"vege":27,"fps":1}
                };
                
            this.model_texturak = new Array();
            
            this.create_altalanos("assets/models/skeleton/skeleton_texturaval.js",-38,21);
            
        }        
        
        
    };
    
    this.detectCollision = function(movement) {
        
        var utkozes = false;
        
        var originPoint = this.mesh.clone();
        

        originPoint.position.x += movement.dx;
        originPoint.position.z += movement.dz;
        
        for(var i in collidableMeshList)
        {
            if (originPoint.position.distanceTo(collidableMeshList[i].position) <= 99) {
                //console.log("utkozes mivel:");
                //console.log(collidableMeshList[i]);
                utkozes = true;
                
            }
        }
        
        return utkozes;
        
    }
    
    this.jatekos_kovetes = function() {
        // az ellenseg pozicioja
        var Tx = Math.abs(Math.floor(((this.mesh.position.x ) / cubesize)));
        var Ty = Math.abs(Math.floor(((this.mesh.position.z ) / cubesize)));

        // a jatekos pozicioja:
        var Tx_jatekos = Math.abs(Math.floor(((MovingCube.position.x ) / cubesize)));
        var Ty_jatekos = Math.abs(Math.floor(((MovingCube.position.z ) / cubesize)));    

        
        //console.log("nev:" + this.nev+"id: "+this.id+" Tx:"+Tx+" Ty:"+Ty+ " Tx_jatekos:"+Tx_jatekos+" Ty_jatekos:"+Ty_jatekos);
        //console.log("Tx_jatekos:" + Tx_jatekos + " this.Tx_jatekos:" + this.Tx_jatekos + " Ty_jatekos:" + Ty_jatekos + " this.Ty_jatekos:" + this.Ty_jatekos);
        
        // ha megvaltozott a jaetkos pozicioja akkor ujrakalkulaljuk az utat!
        
        //if (this.Tx_jatekos != Tx_jatekos || this.Ty_jatekos != Ty_jatekos || this.koveti_a_jatekost == false) {
        if (this.Tx_jatekos != Tx_jatekos || this.Ty_jatekos != Ty_jatekos) {
            //console.log("path ujrakalkulalas");
            
            this.koveti_a_jatekost = true;

                        
            this.hol_jar_a_pathfindingben = 1;
            
            this.Tx_jatekos = Tx_jatekos;
            this.Ty_jatekos = Ty_jatekos;

            //console.log("nev:" + this.nev+"id: "+this.id+" Tx:"+Tx+" Ty:"+Ty+ " Tx_jatekos:"+Tx_jatekos+" Ty_jatekos:"+Ty_jatekos);
            var grid = new PF.Grid(terkep.terkep_szelesseg, terkep.terkep_magassag, terkep.getTerkepMatrix());
            var finder = new PF.AStarFinder();

            this.path = finder.findPath(Tx, Ty, Tx_jatekos, Ty_jatekos, grid);
            
            //console.log("this.path.length:" + this.path.length);
            
            for(k=0;k<this.path.length;k++) {
                //console.log(this.path[k]);
            }
            
            // ha 0 akkor nem talalt utat
            if (this.path.length == 0) {
                this.koveti_a_jatekost = false;
                return;
            }
            
            // ha csak 2 elemu akkor nicns benne semmi mas csak a kezdo es a vegpont, tehat nem kell kovetnie!
            if (this.path.length <= 2) {
                this.koveti_a_jatekost = false;
                return;
            }
            
            //console.log("this.path:" + this.path);
            //console.log("this.path[this.hol_jar_a_pathfindingben]);" + this.path[this.hol_jar_a_pathfindingben]);
            
            var hova_kell_mozdulnia = this.path[this.hol_jar_a_pathfindingben];
            //console.log("hova_kell_mozdulnia[0]:" + hova_kell_mozdulnia[0]);
            //console.log("hova_kell_mozdulnia[1]:" + hova_kell_mozdulnia[1]);
            
            //console.log("Tx:" + Tx); 
            //console.log("Ty:" + Ty); 
            
        }
        
        // ha van path akkor mozog
        if (this.path.length > 0) {
            var hova_kell_mozdulnia = this.path[this.hol_jar_a_pathfindingben];
            //console.log("hova_kell_mozdulnia[0]:" + hova_kell_mozdulnia[0]);
            //console.log("hova_kell_mozdulnia[1]:" + hova_kell_mozdulnia[1]);
            
            
            // itt meg azt is meg kell nezni, hogy melyik iranyba all a feje es csak abba mogatjuk el!
            // vagy a pathfindinges rutunnak kell ugy visszadnia hogy egyserre cska egy iranyba menjen!
            
        
            
            if (Tx < hova_kell_mozdulnia[0]) {
                this.movement.dx += cubesize;
                this.mesh.rotation.y = rad(90);
            }
            if (Tx > hova_kell_mozdulnia[0]) {
                this.movement.dx -= cubesize;
                this.mesh.rotation.y = rad(270);
            }
            
            if (this.movement.dx == 0) {
                if (Ty < hova_kell_mozdulnia[1]) {
                    this.movement.dz += cubesize;
                    this.mesh.rotation.y = rad(0);
                } 
                if (Ty > hova_kell_mozdulnia[1]) {
                    this.movement.dz -= cubesize;
                    this.mesh.rotation.y = rad(180);
                }
            }
            
            /*
            console.log("movementx:" + this.movement.dx);   
            console.log("movementz:" + this.movement.dz);   
            console.log("hol_jar_a_pathfindingben:" + this.hol_jar_a_pathfindingben);
        */
            
            //console.log("hol_jar_a_pathfindingben:" + this.hol_jar_a_pathfindingben);
            
            
            // egy kicsit varunk mielott mozdulna, igy van ido kerulgetni
            this.mozgas();
        }
        
    
       
        
        
        
    }
    
    this.mozgas = function() {
        

        
        //console.log(this.mesh.position);
        
        if ( !this.detectCollision(this.movement) ) {
            
            // tamadasko rkicis tkozelebb tesszuk a kamerahoz. mozgaskor pedig visszarakjuk eredeti pozicioba
            this.meshAnim.position.z = 0;

            
            if (this.meshAnim && this.animaciok) {
                this.meshAnim.playAnimation("jar",this.animaciok.jar.fps);
            }
            
            
            this.eppen_mozog = 1;
            this.aaa = 0;
            var that = this;
            //console.log(this.aaa);
            
            //console.log("this.mozgas meghivva!");
            
            this.goEnemy = setInterval(function()
            {
                //console.log("bent");
                //console.log(that.aaa);
                that.aaa++;
                if (that.movement.dx == cubesize) {
                    that.mesh.position.x += 1;    
                }
                if (that.movement.dx == -cubesize) {
                    
                    that.mesh.position.x -= 1;    
                }
                if (that.movement.dz == cubesize) {
                    that.mesh.position.z += 1;  
                     
                }
                if (that.movement.dz == -cubesize) {
                    that.mesh.position.z -= 1;    
                }
                
                //console.log(that.movement.dz + "=" + cubesize);
                //console.log(that.mesh.position); 
               
               
               // ha mozog akkor igazitjuk a zinfo divet:
               
                
                
                if( that.aaa >= 100)
                {
                    that.eppen_mozog = 0;
                    

                    //console.log("koveti_a_jatekost"+that.koveti_a_jatekost);
                    if (that.koveti_a_jatekost) {
                        that.hol_jar_a_pathfindingben += 1;    
                        //console.log("that.hol_jar_a_pathfindingben:" + that.hol_jar_a_pathfindingben);
                        //console.log("that.path.length:" +  that.path.length);
                        if (that.hol_jar_a_pathfindingben < that.path.length-1) {
                            //console.log("that.hol_jar_a_pathfindingben2:" + that.hol_jar_a_pathfindingben);
                        } else {
                            
                            //console.log("kovetes vege!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                            that.koveti_a_jatekost = false;
                            that.hol_jar_a_pathfindingben = 1;
                        }
                        
                    }
                    

                    
                    clearInterval(that.goEnemy);
                }
                
                
                
            },10);  
            
            
                          
        } else {
            //console.log("COLLISOON VAN:" + this.movement);
        }
    }
    
    this.tamadas = function() {
        // ez csak akkor hivodik ha nem mozog a mob!

        
        //console.log(pozicio_2d);
        
        // csak akkor tamadhat ha eppen nem tamad
        
        //console.log("this.tamadas");
        
        // ha vege a tamadas animacionak akrko atall idlere az anim
        // plusz ha vege a jarasnak es meg nem tamadhat akor is idlebe megy 
        // plusz ha a serules animnak vege
        if (this.meshAnim.currentKeyframe == this.animaciok.tamad.vege || this.meshAnim.currentKeyframe == this.animaciok.jar.vege || this.meshAnim.currentKeyframe == this.animaciok.serul.vege ) {
            this.meshAnim.playAnimation("all",this.animaciok.all.fps);
        }
        

        
        if (this.eppen_tamad === false && this.hp > 0) {
            this.eppen_tamad = true;    
            
            // tamadaskor kicsit kozelebb rakjuk a kamerahoz. ezt majd mozgas elott visszallitjuk!
            this.meshAnim.position.z = 30;
            
            //console.log("anim tamadra allit");
            
            //console.log(this.meshAnim);
            this.meshAnim.playAnimation("tamad",this.animaciok.tamad.fps);
            
            
            hang_lejatszas(6,{pan:0,volume:50});

            utes_3do.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
            utes_3do.visible = true;  
            
            var uteskep = setInterval(function() {
                utes_3do.visible = false;  
                clearInterval(uteskep);
            },100);          
            

            // kiszmaljuk menyit sebzett es kire
            var sebzes = this.mennyit_sebez();
            
            var kiket_tamadhat = new Array();
            // meghivjuk a karaktereket!
            for(i=0;i<karakterek.length;++i) {
                var kari = karakterek[i];
                
                if (kari.hanyadik_sorban_van <= this.hany_sort_tud_tamadni && kari.hp > 0) {
                    kiket_tamadhat.push(kari);
                }
            }
            
            // ha snekit nem tud tamadni az azt jelenti, hogy mindeki halott abban a sorban amit eler tehat egyel hatrebb levo sort is tamadhat mar!
            if (kiket_tamadhat.length == 0) {
                for(i=0;i<karakterek.length;++i) {
                    var kari = karakterek[i];
                    
                    if (kari.hanyadik_sorban_van <= this.hany_sort_tud_tamadni+1 && kari.hp > 0) {
                        kiket_tamadhat.push(kari);
                    }
                }   
            }
            
            // ha ezutan is 0 akkor mar a 3. sort is eleri!
            if (kiket_tamadhat.length == 0) {
                for(i=0;i<karakterek.length;++i) {
                    var kari = karakterek[i];
                    
                    if (kari.hanyadik_sorban_van <= this.hany_sort_tud_tamadni+1 && kari.hp > 0) {
                        kiket_tamadhat.push(kari);
                    }
                }   
            }
            
            // megnezzuk van e egyaltalan valaki akit tamadhat. pl nem e halott mind!
            // ha meg itt isncs sneki akkro mind a 3sor halott!
            if (kiket_tamadhat.length > 0) {
                // megvan kikeet tamadhat, ezek kozul veletlenszeruen valasztunk egyetes azt tamadja!

                var random_kit_tamad = randint(0,kiket_tamadhat.length-1);
                                    
                if (kiket_tamadhat[random_kit_tamad].sebzodes(sebzes)) {
                    // itt visszakjuk majd, hogy sieres ovlt e a tamadas. ha nem akkor MISS hangkot jatsuzn
                } else {
                    // h igen akkor sikers tamadas hang
                }
                
            } else {
                // mindeki meghalt jatek vege!!
                //info_szoveg("EVERYONE IS DEAD, GAME OVER! ");
                this.eppen_tamad = false;
            }            
            
            var that = this;    
            
            // timeout a tamadasi sebessegre
            var ellensegutesInterval = setTimeout(function() {
                that.eppen_tamad = false;
                
                
            },this.tamadasi_sebesseg);
            
        }
        
    
        
    }
    
    this.milyen_messze_van_a_jatekostol = function() {
        // a modelleknel van amit lejebb ell huzni hogy a foldon legyen
        // a tavolsag szamitas elott felemeljuk az y-t 0 ra igy pontosan 100 lesz a tavaolsag ha elotte all
        var ellenseg_pozicio = this.mesh.position.clone();
        
        ellenseg_pozicio.y = 0;
        return MovingCube.position.distanceTo(ellenseg_pozicio)
        
    }
    
    
    this.debuffot_kap = function(debuff) {
        //console.log("debuffot kap");
        //console.log(debuff);
        var van_e_mar = 0;
        for (var i=0;i<this.debuffok.length;i++) {
            if (this.debuffok[i].karakter_id == debuff.karakter_id && this.debuffok[i].skill_id == debuff.skill_id) {
                van_e_mar = 1;
                //console.log("van mar!");
                break;
            }
        }
        
        if (van_e_mar == 0) {
            this.debuffok.push(debuff);
            //console.log(this.dotok);    
        }
    }
    
    this.dotot_kap = function(dot) {
        // ha van DOT akkor beallitjuk!
        if (dot != null) {
            //console.log("---dot---");
            //console.log(dot);
            // csak akkro rakjuk bele ha meg nincs benne ugyanettol a karaktertol es skilltol
            var van_e_mar = 0;
            for (var i=0;i<this.dotok.length;i++) {
                if (this.dotok[i].karakter_id == dot.karakter_id && this.dotok[i].skill_id == dot.skill_id) {
                    van_e_mar = 1;
                    //console.log("van mar!");
                    break;
                }
            }
            
            if (van_e_mar == 0) {
                this.dotok.push(dot);
                //console.log(this.dotok);    
            }
            
        }
        
    }
    
    this.tick = function() {
        
        //egyelore folyamatosan fut. ezt eleg lesz majd 100 ms enkent hivni
        this.toScreenXY();    
        
        
        // ha van rajta dot akkor lefuttatjuk! 
        //{"karakter_id":0,"dot_damage":0,"dot_ido":0,"skill_id":0,"elozo_tick":0}
        
        // de csak akkor ha nincs eppen halalan
        if (this.hp > 0) {
            
            

            
            
            
            // debuffok kezelese:
            
            var timestamp = Math.round(Date.now() / 1000);
            for (var i=0;i<this.debuffok.length;i++) {
                
                var skill_adatok = skillek.skill_adatok(this.debuffok[i].skill_id);
                
                if (this.debuffok[i].elozo_tick == 0) {
                    // meg nem futott:
                    this.debuffok[i].elozo_tick = timestamp;
                    this.debuffok[i].debuff_ido -= 1;
                    
                    // a debuffban levo minuszokat a sebzes szmaitasnal hasznaljuk!
                    
                    
                } else {
                    // ha mar futott akkor megnezzuk eltelt e 1 mp
                    if (this.debuffok[i].debuff_ido > 0 && this.debuffok[i].elozo_tick < timestamp) {
                        this.debuffok[i].elozo_tick = timestamp;
                        this.debuffok[i].dot_ido -= 1;
                        
                        // itt mar nem alltiunk semmit
                    }
                    
                    if (typeof this.debuffok[i].debuff_ido !== "undefined")  {
                        if (this.debuffok[i].debuff_ido <= 0 ) {
                            // ha lejart akkor kivesszuk a debuffok kozul
                            this.debuffok.splice(i,1);
                            
                            
                            
                        }
                    }
                }
            }
            
            
            
            
            // dotok kezelese:
            var timestamp = Math.round(Date.now() / 1000);
            for (var i=0;i<this.dotok.length;i++) {
                
                var skill_adatok = skillek.skill_adatok(this.dotok[i].skill_id);
                
                if (this.dotok[i].elozo_tick == 0) {
                    // meg nem futott:
                    this.dotok[i].elozo_tick = timestamp;
                    this.dotok[i].dot_ido -= 1;
                    
                    // a sebzes kap egy ksi ranodmot:
                    var rand_valtozas = parseInt(this.dotok[i].dot_damage*0.2);
                    var mennyit = randint((this.dotok[i].dot_damage-rand_valtozas)-1,(this.dotok[i].dot_damage+rand_valtozas));
                    
                    var ret_ellensegtol = this.sebzodes(mennyit);
                    info_szoveg(this.nev + " got " + mennyit + " damage from " + skill_adatok.nev);
                    
                    // ha dot oli meg akkor kiirjuk hogy halott
                    if (ret_ellensegtol.halott == 1) {
                        info_szoveg(this.nev + " is dead."); 
                    }
                    
                    
                } else {
                    // ha mar volt sebzes akkor megnezzuk eltelt e 1 mp
                    if (this.dotok[i].dot_ido > 0 && this.dotok[i].elozo_tick < timestamp) {
                        this.dotok[i].elozo_tick = timestamp;
                        this.dotok[i].dot_ido -= 1;
                        
                        // a sebzes kap egy ksi ranodmot:
                        var rand_valtozas = parseInt(this.dotok[i].dot_damage*0.2);
                        var mennyit = randint((this.dotok[i].dot_damage-rand_valtozas),(this.dotok[i].dot_damage+rand_valtozas));
                        
                        var ret_ellensegtol = this.sebzodes(mennyit);
                        info_szoveg(this.nev + " got " + mennyit + " damage from " + skill_adatok.nev);
                        
                        // ha dot oli meg akkor kiirjuk hogy halott
                        if (ret_ellensegtol.halott == 1) {
                            info_szoveg(this.nev + " is dead.");
                        }
                    }
                    
                    if (typeof this.dotok[i] !== "undefined")  {
                        if (this.dotok[i].dot_ido <= 0 ) {
                            // ha lejart akkor kivesszuk a dotok kozul. akkor is ha mar nem fog futni az ido miatt. igy kesobb ujra tudja rakni
                            //this.dotok[i] = null;
                            
                            //console.log(this.dotok);
                            this.dotok.splice(i,1);
                            //break;
                            //console.log(this.dotok);
                            // miutan kivettuk elore leptetjuk a az iteraciot, hogy ne lepjen ures elemre
                            
                        }
                    }
                }
            }
        }        
    

        
        
        if (this.hp <= 0 && this.eppen_meghal === true) {
            // ha meghalt a sebzestol akrko kov ticknel atallitjuk
            //meshAnim.playAnimation("meghal",that.animaciok.meghal.fps);
            
            
            
            
            $('#ellenseg_info_' + this.id).hide();
            
            removeByAttr(collidableMeshList, 'id', this.mesh.id);
            
            // megnezzuk hogy a meghalas anim elerte e a veget ha igen akkor dropot generalunk:
            // es kiszeduj a scenebol a mobot, plusz trekept frissitunk
            // es leallitjuk a meghalas animot
            if (this.meshAnim.currentKeyframe == this.animaciok.meghal.vege) {
                this.meshAnim.currentKeyframe = this.animaciok.meghal.vege;
                this.meshAnim.setFrameRange(this.animaciok.meghal.vege,this.animaciok.meghal.vege-1); 
                
                
                // csinalunk egy dropot a foldre:
                this.drop_a_foldre(this.mit_dobott);
                
                
                
                var that = this;
                
                // a scenebol nem szedjuk le egybol. marad a hulla par masodpercig
                var meghalTimeout = setTimeout(function() {
                    
                    
                    mozgas_logolas("ELLENSEG MEGHALT NEV:" + that.nev);
                    
                    
                    
                    
                    // kiszedjuk a scenebol es minden vonatkozo tombbol.
                   
                    
                    // kivesszuk a morphok kozul!
                    for ( var i = 0; i < morphs.length; i ++ ) {
                        if (morphs[i] == that.meshAnim) {
                            morphs.splice(i,1);
                            //console.log('kiveve');
                        }
                    }
                    removeByAttr(ellensegek, 'id', that.mesh.id); 
                                       
                    //console.log(that.mesh);
                    //console.log(that.meshAnim);
                    
                    scene.remove(that.mesh);
                    
                    scene.remove(that.meshAnim);
                    //o3d.material.map.dispose();
                    scene.remove(that.meshAnim);
                    
                    for (var i=0;i<that.meshAnim.material.length;i++) {
                        //console.log(that.meshAnim.material[i]);
                        that.meshAnim.material[i].dispose();   
                    }
                    
                    that.meshAnim.geometry.dispose();

                         
                    //removeReferences(that.mesh);
                    
                    //that.mesh.deallocate();
                    //that.mesh.geometry.deallocate();
                    //that.mesh.material.deallocate();

                    //scene.remove(that.meshAnim);
                    
                    //that.meshAnim.deallocate();
                    //that.meshAnim.geometry.deallocate();
                    //that.meshAnim.material.deallocate();

                    
                    
                
                },5000);
                
                
                
            }

            
        }
        
        
        
        if(this.eppen_mozog == 0 && this.mesh && this.hp > 0) {
            
            // megnezzuk kozl van e playerhez es szembe van e vele ha igen akkor tamad!
        
            // elso sorban levoket tamadja
            
            // de lehet olyan mob aki mindekit vagy a hatso sorban allokat
            // ezeket majd az enemy osztalyba kell rogziteni
            // szmaoalsok stb
            
            // de csak akkor ha van meg eletben ember!
            var van_meg_valaki_eletben = 0;
            for(i=0;i<karakterek.length;++i) {
                var kari = karakterek[i];
                
                if (kari.hp > 0) {
                    van_meg_valaki_eletben  = 1;
                    break;
                }
            }            

            // mivel a modellek nem ponrosan 100 ra vannak ezeert ezt az erteket meg at ell gondolni, egyelore felemelem 105 re a skeleton miatt
            // es nem pontos egyenloseg kell hanem kisebb vagy egyenlo
            
            if (this.milyen_messze_van_a_jatekostol() == 100 && van_meg_valaki_eletben == 1) {
                // tehat itt all mellettem igy utni is tud
                //console.log('playernel all!');
                
                

                
                // eloszor is elforditjuk hogy szembe alljon velem
                var merre_kell_fordulnia = 0;
                
                // az ellenseg pozicioja
                var Tx = Math.abs(Math.floor(((this.mesh.position.x ) / cubesize)));
                var Ty = Math.abs(Math.floor(((this.mesh.position.z ) / cubesize)));

                // a jatekos pozicioja:
                var Tx_jatekos = Math.abs(Math.floor(((MovingCube.position.x ) / cubesize)));
                var Ty_jatekos = Math.abs(Math.floor(((MovingCube.position.z ) / cubesize))); 
                
                //this.Tx_jatekos = Tx_jatekos;
                //this.Ty_jatekos = Ty_jatekos;
                
                var forgott_mar = 0;
                if (Tx < Tx_jatekos) {
                    this.mesh.rotation.y = rad(90);
                    forgott_mar = 1;
                }
                if (Tx > Tx_jatekos) {
                    this.mesh.rotation.y = rad(270);
                    forgott_mar = 1;
                }
                
                if (forgott_mar == 0) {
                    if (Ty < Ty_jatekos) {
                        this.mesh.rotation.y = rad(0);
                    } 
                    if (Ty > Ty_jatekos) {
                        this.mesh.rotation.y = rad(180);
                    }
                }   
                
                
                // elforgattuk, most elkezdhet tamadni!
                this.tamadas();             
                  
            }
            
            this.movement = { dx:0, dz:0 };

            
            // megnezzuk, hogy milyen messze van a jatekostol
            // ha x egysegnel kozelebb van akkor megkeressuk a legrovidebb utat a jatekosik es oda fog menni!
            
            // ha kisebb mint 4 egyseg ES!! nem ksiebb mint 1! mert akkor mar mellettem elottem all
            // ezt majd kesobb vekotrral meg rayyel kell vizsgalni hogy tenyleg latja e
            // egyelore csak egyseg kozelseget nezunk
            //console.log(this.mesh.position.distanceTo(MovingCube.position));
            
            if (this.mesh.position.distanceTo(MovingCube.position) <= 400 && this.mesh.position.distanceTo(MovingCube.position) > 100 && van_meg_valaki_eletben == 1) {
                //console.log(this.mesh.position.distanceTo(MovingCube.position));
                this.jatekos_kovetes();
                return;
            } else {
                // ha nincs kovetes akkor magatol mzoog randomba:
                this.koveti_a_jatekost = false;
                                 
                
                
            }       
            
            // ha messzebb van mint 500 akkor magatol mozog randomba
            
            // egyelore a rnadom mozgast kivesszuk mert neha bugol
            /*
            if (this.mesh.position.distanceTo(MovingCube.position) > 400 || van_meg_valaki_eletben == 0) {
                //console.log('ide nem jut el!!');
                
                var merre_fog_menni = randint(0,3);
                
                // megnezzuk hogy abba az iroanyba all e a feje amerre menni akar, ha nem akkor elforgatjuk
                    
                // eszak
                if (merre_fog_menni == 0) {
                    this.mesh.rotation.y = rad(180);
                }
                //delre
                if (merre_fog_menni == 1) {
                    this.mesh.rotation.y = rad(0);
                }
                // nyugat
                if (merre_fog_menni == 2) {
                    this.mesh.rotation.y = rad(270);
                }
                // kelet
                if (merre_fog_menni == 3) {
                    this.mesh.rotation.y = rad(90);
                }
            
                switch(merre_fog_menni) {
                    // fel
                    case 0:
                        this.movement.dz -= cubesize;    
                        break;
                    // le
                    case 1:
                        this.movement.dz += cubesize;    
                        break;
                    //bal
                    case 2:
                        this.movement.dx -= cubesize;    
                        break;
                    //jobb
                    case 3:
                        this.movement.dx += cubesize;
                        break;
                }    
                
                //console.log("movement:" + this.movement.dz);
                
                this.mozgas();
            }
            */
    
            
            

        }                            
        
    }
    
    this.penz_kivalasztasa = function() {
        var ret = 0;
        
        var dob_e = randint(0,1);
        if (dob_e) {
            var mennyit = randint(1,this.penz);
            ret = mennyit;
        }
        
        return ret;
    }
    
    // DOT egy objektum. karkater_id - kitol kapta. skill_id - melyik skilltol, damage- kiszmaolt sebzes
    this.sebzodes = function(mennyit) {
        var ret = {halott:0, targy:"", penz:0};
        
        // csak akkor vizsgaldunk ha meg nem halott
        if (this.hp <= 0) {
            return ret;
        }
        
        
        this.hp -= mennyit;
        
        if (this.hp<0) {
            this.hp = 0;
        }
        
        this.meshAnim.playAnimation("serul",this.animaciok.serul.fps);
        
        
        
        /*
        var eredeti_szin = this.mesh.material.color.getHex();
        this.mesh.material.color.setHex( 0xff0000 );
        
        var that = this;        
        var sebzodes_szin_Interval = setInterval(function() {
            that.mesh.material.color.setHex( eredeti_szin );
            clearInterval(sebzodes_szin_Interval);
        },200);   
        */
        
        
        //this.mesh.playAnimation("serul",this.animaciok.serul.fps);
        
        //this.mesh.face.color.setHex(0xFF0000 );
        //geometry.__dirtyColors = true;        
        // a mesh szinet allitjuk
        
        if (this.hp <= 0) {
            //console.log(" ------ HALOTT! ----- id:"  + this.id);
            
            hang_lejatszas(this.hangok_meghal[0],{pan:0,volume:70});
            
            // hogy ne tamadhasson mar!
            this.eppen_tamad = true;
            
            // dotokat levesszuk
            this.dotok = [];

            this.eppen_meghal = true;
            this.meshAnim.playAnimation("meghal",this.animaciok.meghal.fps);
            
            terkep.ellenseg_meghalt(this.terkep_kieg_id);
            
            var mit_dobott_alap_targy_id = this.drop_kivalasztasa();
            var mit_dobott = targyak.targy_generalas(mit_dobott_alap_targy_id);
            this.mit_dobott = mit_dobott;
            this.mennyi_penzt_dobott = this.penz_kivalasztasa();
            
            // visszadjuk a karakter osztalynak is.
            ret.targy = mit_dobott;
            
            ret.halott = 1;
            
            // itt kezeljuk az xp adast igy ha egy dot oli meg akkor is emgkapja az xpt
            var karakter_temp = new Karakter();
            karakter_temp.mindenki_xpt_kap(this.xp);
            
            
            
            
        } else {
            // csak serul
            
            var rand = randint(0,this.hangok_serul.length-1);
            hang_lejatszas(this.hangok_serul[rand],{pan:0,volume:100});
        }
        
        return ret;       
    }
    
    
    this.toScreenXY = function (  ) {
        
        var dom = '<div class="ellenseg_infok" id="ellenseg_info_'+ this.id +'"><div class="ellenseg_infok_nev">Level '+this.statok.szint+' '+this.nev+'</div><div class="ellenseg_infok_hp"><div class="ellenseg_hp_bar" id="ellenseg_info_hp_'+ this.id +'"></div></div><div class="ellenseg_infok_egyeb">'+this.egyeb_infok+'</div></div>';
        
        if ($('#ellenseg_info_' + this.id).length == 0) {
            $('body').append(dom);
            
        }
        
        // ha a jatekos melett all akkor mgejlenik a neve meg hp ja fix helyen
        if (this.milyen_messze_van_a_jatekostol() <= 100 && this.hp > 0) {
            $('#ellenseg_info_' + this.id).show();
            
            var info_div = $('#ellenseg_info_' + this.id);
            
            $('#ellenseg_info_' + this.id).css("left", $(window).width()/2 - (info_div.width()/2));
            $('#ellenseg_info_' + this.id).css("top","50px");
            
            
            
                   
             var mennyi_hp_maradt_szazalekban = parseInt((this.hp/this.max_hp)*119);
             $("#ellenseg_info_hp_" + this.id).css("width",mennyi_hp_maradt_szazalekban);

             
             
             
                
        } else {
            $('#ellenseg_info_' + this.id).hide();
        }
            
        
        

    }        
}


