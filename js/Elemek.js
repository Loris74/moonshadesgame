function Elemek () {
    
    this.id = 0;
    
    this.ajto_eppen_mozog = 0;
    
    this.createCube = function (material, position, size, scale, rotation) {
        var object3D;
        var oMaterial = material || new THREE.MeshBasicMaterial({color: 0x0000AA});
        oMaterial.transparent = 1;

        var oPosition = position || { x: 1, y: 1, z: 1 };
        var oSize = size || { x: 50, y: 50, z: 50 };
        var oScale = scale || { x: 1, y: 1, z: 1 };
        var oRotation = rotation || { x: 0, y: 0, z: 0 };

        object3D = new THREE.Mesh(new THREE.CubeGeometry(oSize.x, oSize.y, oSize.z), oMaterial);
          object3D.scale.set(oScale.x, oScale.y,oScale.z);
          object3D.position.set(oPosition.x, oPosition.y, oPosition.z);
          object3D.rotation.set(oRotation.x, oRotation.y, oRotation.z);
          //object3D.overdraw = true;

      return object3D;
    }
    
    this.createPadlo = function (position,size,repeat) {
        
        if (terkep.meta.ALAP_PADLO_TEXTURA_NORMAL != "" && terkep.meta.ALAP_PADLO_TEXTURA_SPECULAR != "" ) {
            
            //repeat.x = repeat.x*2;
            //repeat.y = repeat.y*2;
            
            //toltes_jelzo_bekapcsol();
            var texture = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PADLO_TEXTURA_NORMAL,undefined,toltes_jelzo_kikapcsol);
            texture.anisotropy = anisotropy;
            texture = this.repeatTexture(texture,repeat);
            
            toltes_jelzo_bekapcsol();
            var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PADLO_TEXTURA_SPECULAR,undefined,toltes_jelzo_kikapcsol);
            texture2.anisotropy = anisotropy;
            texture2 = this.repeatTexture(texture2,repeat);

            toltes_jelzo_bekapcsol();
            var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PADLO_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            texture3.anisotropy = anisotropy;
            texture3 = this.repeatTexture(texture3,repeat);
            
            var v2 = new THREE.Vector2(1,1);

            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture,normalScale:v2, specularMap: texture2,specular: 0xffab7a, shininess: 10} ); 
            
            //console.log(wallMaterial);
        } else {
            toltes_jelzo_bekapcsol();
            var texture = THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PADLO_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            
            //repeat.x = repeat.x*2;
            //repeat.y = repeat.y*2;
            
            
            texture.anisotropy = anisotropy;
            
            
            texture = this.repeatTexture(texture,repeat);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        }
        
       
       
       /*
       
       // kockakkal
       var terkep_matrix = terkep.getTerkepMatrix();
        
       var terkep_szelesseg = terkep.terkep_szelesseg;
       var terkep_magassag =  terkep.terkep_magassag ;
       
       for (var x = 0; x < terkep_szelesseg; x++) {
            for (var y = 0; y < terkep_magassag; y++) {
                
                //var kiegeszito_ertekek = terkep_matrix_kiegeszitesek_pozicio_alapjan(x,y);
                
                var size = { x: cubesize, y: cubesize, z: cubesize };
                var position = {
                    x: size.x * x,
                    y: -80,
                    z: size.z * y
                };
                
                var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y, cubesize, 1, 1, 1 );
                var wall = new THREE.Mesh(wallGeometry, wallMaterial);
                wall.position.set(position.x, position.y, position.z);
                
                scene.add(wall);
            }
       }
       */
        
        
        var planegeo = new THREE.PlaneGeometry(size.x, size.z,(size.x/cubesize),(size.z/cubesize));
        plane2 = new THREE.Mesh(planegeo, wallMaterial );
        plane2.position.set(position.x, position.y, position.z);
        plane2.rotation.x = rad(270);
        
        return plane2;
        
       

    }
    
    this.createPlafon = function (image,position,size,repeat) {
       

        /*
        
        var texture = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/normal.png");
        texture = this.repeatTexture(texture,repeat);
        var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/specular.png");
        texture2 = this.repeatTexture(texture2,repeat);
        var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/diffuse.png");
        texture3 = this.repeatTexture(texture3,repeat);
        //var texture4 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/height.png");
        //texture4 = this.repeatTexture(texture4,repeat);
        var v2 = new THREE.Vector2(1,1);
        var wallMaterial = new THREE.MeshPhongMaterial(  {map: texture3, normalMap: texture, normalScale:v2 ,specularMap: texture2, specular: 0xffab7a, shininess: 80} ); 
        
        var planegeo = new THREE.PlaneGeometry(size.x, size.z,size.x/cubesize,size.z/cubesize);
        plane2 = new THREE.Mesh(planegeo, wallMaterial );
        plane2.position.set(position.x, position.y, position.z);
        plane2.rotation.x = rad(90);         
        //plane2.rotation.z = rad(270);         
        */
        
        if (terkep.meta.ALAP_PLAFON_TEXTURA_NORMAL != "" && terkep.meta.ALAP_PLAFON_TEXTURA_SPECULAR != "" ) {
            toltes_jelzo_bekapcsol();
            var texture = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PLAFON_TEXTURA_NORMAL,undefined,toltes_jelzo_kikapcsol);
            texture.anisotropy = anisotropy;
            texture = this.repeatTexture(texture,repeat);
            
            toltes_jelzo_bekapcsol();
            var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PLAFON_TEXTURA_SPECULAR,undefined,toltes_jelzo_kikapcsol);
            texture2.anisotropy = anisotropy;
            texture2 = this.repeatTexture(texture2,repeat);

            toltes_jelzo_bekapcsol();
            var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PLAFON_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            texture3.anisotropy = anisotropy;
            texture3 = this.repeatTexture(texture3,repeat);
            
            var v2 = new THREE.Vector2(1,1);

            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture,normalScale:v2, specularMap: texture2,specular: 0xffab7a, shininess: 180} ); 
        } else {
            toltes_jelzo_bekapcsol();
            var texture = THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_PLAFON_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            texture.anisotropy = anisotropy;
            texture = this.repeatTexture(texture,repeat);
            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        }
        
        
        //toltes_jelzo_bekapcsol();
        //var texture = THREE.ImageUtils.loadTexture(image,undefined,toltes_jelzo_kikapcsol);
        //texture = this.repeatTexture(texture,repeat);
        
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        
        var planegeo = new THREE.PlaneGeometry(size.x, size.z,size.x/cubesize,size.z/cubesize);
        plane2 = new THREE.Mesh(planegeo, wallMaterial );
        plane2.position.set(position.x, position.y, position.z);
        plane2.rotation.x = rad(90);        
        
       
        
        return plane2;

    }
    
    // ez lehet sima tabla vagy ha van megadva texura akkor az, pl festmeny!
    this.tabla_falra = function (kiegeszito_ertek,position) {
        
        var meret_x = 40;
        var meret_y = 20;
        
        if (typeof kiegeszito_ertek.textura === "undefined")  {
            var textura_kep_fal = "assets/textures/tabla_falra/alap_tabla.jpg";    
        } else {
            // ha van tetura akkor megnezzuk van e hozza egyedi meret ha van azt ahsznalkjuk
            var textura_kep_fal = "assets/textures/" + kiegeszito_ertek.textura;    
            if (typeof kiegeszito_ertek.meret_x !== "undefined")  {
                meret_x = kiegeszito_ertek.meret_x;
            }
            if (typeof kiegeszito_ertek.meret_y !== "undefined")  {
                meret_y = kiegeszito_ertek.meret_y;
            }
        }
        
        var texture = THREE.ImageUtils.loadTexture(textura_kep_fal);
        
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        wallMaterial.transparent = 1;
        var planegeo = new THREE.PlaneGeometry(meret_x, meret_y,1,1);
        
        
        
        var plane2 = new THREE.Mesh(planegeo, wallMaterial );
        
        ;
        
        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            plane2.position.set(position.x, position.y, position.z+51);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            plane2.position.set(position.x, position.y, position.z-51);
            plane2.rotation.y = rad(180);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            plane2.position.set(position.x+51, position.y, position.z);
            plane2.rotation.y = rad(90);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            plane2.position.set(position.x-51, position.y, position.z);
            plane2.rotation.y = rad(270);
        }
        
        
        scene.add(plane2);
        
        plane2.on('click', function(){
            console.log('click');
            
            var tavolsag = plane2.position.distanceTo(MovingCube.position);
            if (tavolsag > 200) {
                return;
            }
            
            hang_lejatszas(33,{pan:0,volume:90});
            
            info_szoveg(kiegeszito_ertek.szoveg);
        });
    }
    
    this.createKulcslyukAktiv = function (position, melyik_ajtot_kezeli,parameterek) {
        
        
        
        var that = this;
        
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/female_head/head.js", function( geometry ) {
            // { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } 
            // new THREE.MeshNormalMaterial( { overdraw: true } )
            // new THREE.MeshLambertMaterial( { color: 0xFF0000, overdraw: false } 
            //geometry.computeMorphNormals();
            //var wireMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
            var texture = new THREE.ImageUtils.loadTexture("assets/models/Bone2-conde-nasenbein.png");
             //texture.wrapS = THREE.RepeatWrapping;
              //texture.wrapT = THREE.RepeatWrapping;
              //texture.repeat.x = 5;
              //texture.repeat.y = 5;
            var wireMaterial = new THREE.MeshPhongMaterial( {map: texture} );
            //var wireMaterial = new THREE.MeshPhongMaterial( {  wireframe: false}  );
            //wireMaterial.transparent = false;
            var mesh2 = new THREE.Mesh( geometry, wireMaterial );
            
            //mesh2.rotation.x = rad(90);
            //mesh2.rotation.z = rad(180);
            //mesh2.rotation.y = rad(10);
            mesh2.scale.x = 3;
            mesh2.scale.y = 3;
            mesh2.scale.z = 3;
            
            
            if (parameterek.melyik_oldalon == "DEL") {
                mesh2.position.set(position.x, -10, position.z+47);
            }
            
            if (parameterek.melyik_oldalon == "ESZAK") {
                mesh2.position.set(position.x, -10, position.z-47);
                mesh2.rotation.y = rad(180);
            }
            if (parameterek.melyik_oldalon == "KELET") {
                mesh2.position.set(position.x+47, -10, position.z);
                mesh2.rotation.y = rad(90);
            }
            if (parameterek.melyik_oldalon == "NYUGAT") {
                mesh2.position.set(position.x-47, -10, position.z);
                mesh2.rotation.y = rad(270);
            }
                
            scene.add(mesh2);
            
            mesh2.on('click', function(){
                var tavolsag = mesh2.position.distanceTo(MovingCube.position);
                if (tavolsag > 200) {
                    return;
                }
                
                
                
                // megnezzuk ki volt e mar nyitva a kapcoslodo ajto korabban:
                // mentes utan lehet ez
                if (parameterek.kinyitva == "NEM") {
                    
                    hang_lejatszas(42,{pan:0,volume:70});
                    var valasz = prompt("The head says: Tell me the password and I will open the door for you.");
                    
                    
                    mozgas_logolas("FEJRE KATTINT valasz:" + valasz);
                    
                    var van_e_megfelelo = false;
                    if (valasz.toLowerCase() == parameterek.mi_a_jelszo.toLowerCase()) {
                        van_e_megfelelo = true;
                    }
                    
                    
                    if (van_e_megfelelo) {
                        mesh2.off('click');
                        
                        // eltaroljuk a terkepadatokba, hogy melyik zart ajto volt amit kinyitott
                        terkep.zart_ajto_kinyitva(parameterek.ajto_id,parameterek.id);
                        
                        info_szoveg("Correct password, door opened.");
                        
                        that.toogleDoor2(melyik_ajtot_kezeli);
                    } else {
                        info_szoveg("Wrong password.");    
                    }
                } else {
                    info_szoveg("You already unlocked this door.");
                }
                
                
               
                
            });
           
            
        });        
        
        
       
        
        
    }
    
    this.createKulcslyuk = function (position, melyik_ajtot_kezeli,parameterek) {
        //var texture = THREE.ImageUtils.loadTexture("assets/textures/keyhole.jpg");
        // egyelroe fix, de lehet majd a texturabol szmolni
        //var size =  {x:texture.image.width,y:texture.image.height}    
        
        
        //plane geo verzio
        if (typeof parameterek.textura === "undefined")  {
            var texture = THREE.ImageUtils.loadTexture("assets/textures/keyhole2.png");
            var size =  {x:10,y:10,z:100}    
        } else {
            var texture = THREE.ImageUtils.loadTexture("assets/textures/" + parameterek.textura);
            var size =  {x:6,y:6,z:100}    
        }
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        wallMaterial.transparent = 1;
        var planegeo = new THREE.PlaneGeometry(size.x, size.y,1,1);
        var plane2 = new THREE.Mesh(planegeo, wallMaterial );
        
        
        
        if (parameterek.melyik_oldalon == "DEL") {
            plane2.position.set(position.x, position.y-15, position.z+51);
        }
        
        if (parameterek.melyik_oldalon == "ESZAK") {
            plane2.position.set(position.x, position.y-15, position.z-51);
            plane2.rotation.y = rad(180);
        }
        if (parameterek.melyik_oldalon == "KELET") {
            plane2.position.set(position.x+41, position.y-15, position.z);
            plane2.rotation.y = rad(90);
        }
        if (parameterek.melyik_oldalon == "NYUGAT") {
            plane2.position.set(position.x-51, position.y-15, position.z);
            plane2.rotation.y = rad(270);
        }
        
        var that = this;
        
        plane2.on('click', function(){
            
            var tavolsag = plane2.position.distanceTo(MovingCube.position);
            if (tavolsag > 200) {
                return;
            }
            
            // megnezzuk ki volt e mar nyitva a kapcoslodo ajto korabban:
            // mentes utan lehet ez
            if (parameterek.kinyitva == "NEM") {
                var van_e_megfelelo = van_e_megfelelo_targy_a_nyitashoz(parameterek.melyik_item_id_kell_a_nyitashoz);
                
                // ezt hasznaljuk arra is, hogy ha pl egy kulcsot kell megnezni megvan e a taskaban. hiszen a kulcs tipusu itemek ugyanazt a base64 et eredmenyezik mert nincs rajtuk valtozo stat!;
                var kodolt_targy_id = targyak.targy_generalas(parameterek.melyik_item_id_kell_a_nyitashoz);
                
                var targyadatok = targyak.targyadatok(kodolt_targy_id);
                
                mozgas_logolas("KULCSLYKRA KATTINT vanemeglelelo:" + van_e_megfelelo);
                
                
                if (van_e_megfelelo) {
                    plane2.off('click');
                    
                    
                    // eltaroljuk a terkepadatokba, hogy melyik zart ajto volt amit kinyitott
                    terkep.zart_ajto_kinyitva(parameterek.ajto_id,parameterek.id);
                    
                    info_szoveg(targyadatok.targy_neve + " used to open the door");
                    
                    that.toogleDoor2(melyik_ajtot_kezeli);
                } else {
                    info_szoveg("You need a " + targyadatok.targy_neve + "  to open the door.");    
                }
            } else {
                info_szoveg("You already unlocked this.");
            }
            
            
           
            
        });
        return plane2;

        
    }
    
    this.createTitkosKapcsolo = function (position, melyik_ajtot_kezeli,parameterek) {
        // egyelroe fix, de lehet majd a texturabol szmolni
        //var size =  {x:texture.image.width,y:texture.image.height}    
        var size =  {x:5,y:5}    
        
        //plane geo verzio
        var texture = THREE.ImageUtils.loadTexture("assets/textures/titkos_gomb2.png");
        var texture_be = THREE.ImageUtils.loadTexture("assets/textures/titkos_gomb_be.png");

        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        var planegeo = new THREE.PlaneGeometry(size.x, size.y,1,1);
        var plane2 = new THREE.Mesh(planegeo, wallMaterial );
        
        if (parameterek.melyik_oldalon == "DEL") {
            plane2.position.set(position.x, position.y-17.3, position.z+51);
        }
        if (parameterek.melyik_oldalon == "ESZAK") {
            plane2.position.set(position.x-15.6, position.y-14, position.z-51);
            plane2.rotation.y = rad(180);
        }
        if (parameterek.melyik_oldalon == "KELET") {
            plane2.position.set(position.x+51, position.y-17.3, position.z);
            plane2.rotation.y = rad(90);
        }
        if (parameterek.melyik_oldalon == "NYUGAT") {
            plane2.position.set(position.x-51, position.y-17.3, position.z);
            plane2.rotation.y = rad(270);
        }
                

        scene.add(plane2);                            
        
        var that = this;
        
        if (parameterek.kinyitva == "NEM") {
            plane2.on('click', function(){
                var tavolsag = plane2.position.distanceTo(MovingCube.position);
                if (tavolsag > 200) {
                    return;
                }
                
                mozgas_logolas("TITKOST KINYIT id:" + parameterek.id);
                
                info_szoveg("A secret door is moving somewhere.");
                
                wallMaterial.map = texture_be;    
                
                terkep.titkos_ajto_kinyitva(parameterek.ajto_id,parameterek.id);
                
                
                if (that.ajto_eppen_mozog == 0) {
                    
                    hang_lejatszas(39,{pan:0,volume:70});
                    
                    that.ajto_eppen_mozog = 1;
                    
                    
                    plane2.off('click');
                    
                    doorInterval = setInterval(function()
                    {
                        melyik_ajtot_kezeli.position.y += 1;  
                        if( melyik_ajtot_kezeli.position.y >= 100) {
                            that.ajto_eppen_mozog = 0;
                            clearInterval(doorInterval);
                        }  
                        
                    },3);            
                
                }
                
                
                
            });
        } else {
            //ha mar ki van nyitva akkor masik texturat kap:
            wallMaterial.map = texture_be;
        }
        
        
        

        
    }
    
    //position: egy fal pontos pozicioja. 
    // melyik_ajtot_kezeli: az ajto 3d object id ja
    this.createWallSwitch = function (position, melyik_ajtot_kezeli,parameterek) {
        // egyelroe fix, de lehet majd a texturabol szmolni
        //var size =  {x:texture.image.width,y:texture.image.height}    
        var size =  {x:5,y:5,z:100}    
        
        //plane geo verzio
        var texture = THREE.ImageUtils.loadTexture("assets/textures/gomb3.png");
        var texture_be = THREE.ImageUtils.loadTexture("assets/textures/gomb3_be.png");
        
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        wallMaterial.transparent = 1;
        var planegeo = new THREE.PlaneGeometry(size.x, size.y,1,1);
        var plane2 = new THREE.Mesh(planegeo, wallMaterial );
        
        // ezt majd ugy kell elhelyezni, hogy a hivaskor meg kell adni a fajl melyik oldalara kell
        // ha a fal deli oldalan van a kapcsolo akkor:
        
        if (parameterek.melyik_oldalon == "DEL") {
            plane2.position.set(position.x, position.y, position.z+51);
        }
        
        if (parameterek.melyik_oldalon == "ESZAK") {
            plane2.position.set(position.x, position.y, position.z-51);
            plane2.rotation.y = rad(180);
        }
        if (parameterek.melyik_oldalon == "KELET") {
            plane2.position.set(position.x+51, position.y, position.z);
            plane2.rotation.y = rad(90);
        }
        if (parameterek.melyik_oldalon == "NYUGAT") {
            plane2.position.set(position.x-51, position.y, position.z);
            plane2.rotation.y = rad(270);
        }
                

        scene.add(plane2);                            
        
        var that = this;
        
        if (parameterek.kinyitva == "NEM") {
            plane2.on('click', function(){
                var tavolsag = plane2.position.distanceTo(MovingCube.position);
                if (tavolsag > 200) {
                    return;
                }
                
                mozgas_logolas("AJTOKAPCSOLORA KATT ID:" + parameterek.id);
                
                //wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
                if (wallMaterial.map == texture) {
                    wallMaterial.map = texture_be;    
                } else {
                    wallMaterial.map = texture;    
                }
                
                
                terkep.zart_ajto_kinyitva(parameterek.ajto_id,parameterek.id);
                plane2.off('click');
                
                info_szoveg("A door is moving somewhere.");
                
                
                // megnezzuk kapcoslodik e hozza esemeny
                if (typeof parameterek.kapcsolodo_esemeny !== "undefined")  {
                    if (parameterek.kapcsolodo_esemeny == "hang_lejatszas") {
                        hang_lejatszas(parameterek.hang_id,{pan:0,volume:20,multiShot:false});
                    }
                    if (parameterek.kapcsolodo_esemeny == "ellenseg_megjelenik") {
                        var esemeny_kieg = {"ellenseg_tipusa":parameterek.ellenseg_tipusa,"id":parameterek.ellenseg_id};
                        var esemeny_position = {
                            x: parameterek.ellenseg_x * cubesize,
                            y: 0,
                            z: parameterek.ellenseg_y * cubesize
                        };
                        var enemy = new Enemy(esemeny_kieg,esemeny_position);
                        enemy.create();
                    }
                    
                    
                }
                
                
                that.toogleDoor2(melyik_ajtot_kezeli);
            });
        } else {
             wallMaterial.map = texture_be;
        }
        
    }
    
    
    this.toogleDoor2 = function (o3d) {
        
        //console.log("toogeldoor o3d:");
        //console.log(o3d);
        
        //console.log("this.ajto_eppen_mozog:");
        //console.log(this.ajto_eppen_mozog);
        
        //console.log("toogeldoor:"+o3d);
        if (this.ajto_eppen_mozog == 0) {
            
            hang_lejatszas(10,{pan:75,volume:50});
            
            var that = this;
            this.ajto_eppen_mozog = 1;
            // megnezzuk nyitva vagy csukva van e:
            if (o3d.position.y == 100) {
                doorInterval = setInterval(function()
                {
                    o3d.position.y -= 1;  
                    if( o3d.position.y <= 0) {
                        that.ajto_eppen_mozog = 0;
                        clearInterval(doorInterval);
                    }  
                    
                },1);            
                
            } else {
                doorInterval = setInterval(function()
                {
                    o3d.position.y += 1;  
                    if( o3d.position.y >= 100) {
                        that.ajto_eppen_mozog = 0;
                        clearInterval(doorInterval);
                    }  
                    
                },1);            
            }
        }
                
    }
    
    
    this.lepcso_le = function (kiegeszito_ertek,position) {
        var alap_x = kiegeszito_ertek.x*100;
        var alap_y = kiegeszito_ertek.y*100;
        
        var textura_kep_padlo = "assets/textures/" + terkep.meta.ALAP_PADLO_TEXTURA;
        var textura_kep_fal = "assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA;
        
        var texture = new THREE.ImageUtils.loadTexture(textura_kep_padlo);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            var ertekek_lepcso_meret = { x:cubesize,y:20,z:20 };
            var cubesize_1 = -cubesize;
            var cubesize_2 = cubesize;
            var cubesize_3 = 0;
            var cubesize_4 = 0;
            
            texture.repeat.x = 1;
            texture.repeat.y = 0.5;
        }
        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            var ertekek_lepcso_meret = { x:cubesize,y:20,z:20 };
            var cubesize_1 = cubesize;
            var cubesize_2 = -cubesize;
            var cubesize_3 = 0;
            var cubesize_4 = 0;
            
            texture.repeat.x = 1;
            texture.repeat.y = 0.5;
        }
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            var ertekek_lepcso_meret = { x:20,y:20,z:cubesize };
            var cubesize_1 = 0;
            var cubesize_2 = 0;
            var cubesize_3 = cubesize;
            var cubesize_4 = -cubesize;
            
            texture.repeat.x = 0.5;
            texture.repeat.y = 1;
        }
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            var ertekek_lepcso_meret = { x:20,y:20,z:cubesize };
            var cubesize_1 = 0;
            var cubesize_2 = 0;
            var cubesize_3 = -cubesize;
            var cubesize_4 = cubesize;
            
            texture.repeat.x = 0.5;
            texture.repeat.y = 1;
        }
        

        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );


        
        var wallGeometry = new THREE.CubeGeometry( ertekek_lepcso_meret.x, ertekek_lepcso_meret.y, ertekek_lepcso_meret.z, 1, 1, 1 );
        
        // lepcsofokok
        var j = -50;
        for (var i = -50; i>=-120; i=i-10) {
            //console.log(i + ' ' + j);
            var wall = new THREE.Mesh(wallGeometry, wallMaterial);
            if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
                //console.log((j*-1));
                wall.position.set(alap_x, i, alap_y+(j*-1));
            }
            if (kiegeszito_ertek.melyik_oldalon == "DEL") {
                wall.position.set(alap_x, i, alap_y+j);
            }
            if (kiegeszito_ertek.melyik_oldalon == "KELET") {
                wall.position.set(alap_x+j, i, alap_y);
            }
            if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
                wall.position.set(alap_x+(j*-1), i, alap_y);
            }
            scene.add(wall);
            j = j + 20;
        }
        
        // lepcso koruli elemek
        var texture = textura_konytarbol(textura_kep_fal,new THREE.Vector2(1,1));
        //var texture = new THREE.ImageUtils.loadTexture(textura_kep_fal);
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y, cubesize, 1, 1, 1 );
        
        // felette kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x, cubesize_y, alap_y);
        scene.add(wall);
        
        // felette tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_3, cubesize_y, alap_y+cubesize_1);
        scene.add(wall);
        
        // jobbra kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2, 0, alap_y+cubesize_3);
        scene.add(wall);
        
        // balra kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1, 0, alap_y+cubesize_4);
        scene.add(wall);
        
        //jobbra tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2+cubesize_3, 0, alap_y+cubesize_1+cubesize_3);
        scene.add(wall);
       
        // balra tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1+cubesize_3, 0, alap_y+cubesize_1+cubesize_4);
        scene.add(wall);
       
       // jobbra lent kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2, -cubesize_y, alap_y+cubesize_3);
        scene.add(wall);
 
        // balra lent kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1, -cubesize_y, alap_y+cubesize_4);
        scene.add(wall);
       
        // jobbra lent tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2+cubesize_3, -cubesize_y, alap_y+cubesize_1+cubesize_3);
        scene.add(wall);

        // balra lent tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1+cubesize_3, -cubesize_y, alap_y+cubesize_1+cubesize_4);
        scene.add(wall);
         
        // jobbra meglentebb tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2+cubesize_3, -cubesize_y*2, alap_y+cubesize_1+cubesize_3);
        scene.add(wall);
       
        // balra meglentebb tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1+cubesize_3, -cubesize_y*2, alap_y+cubesize_1+cubesize_4);
        scene.add(wall);
         
        // szemben tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+(cubesize_3*2), 0, alap_y+(cubesize_1*2));
        scene.add(wall);

        // lepcso legaljan szmeben
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+(cubesize_3*2), -cubesize_y*2-30, alap_y+(cubesize_1*2));
        scene.add(wall);

        // lepcso legaljan szmeben megtavolabb
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+(cubesize_3*3), -cubesize_y*2-30, alap_y+(cubesize_1*3));
        scene.add(wall);

        // lepcso legaljan jobbra
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1+(cubesize_3*2), -cubesize_y-30, alap_y+(cubesize_1*2)+cubesize_3);
        scene.add(wall);
        
        // lepcso legaljan balra
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2+(cubesize_3*2), -cubesize_y-30, alap_y+(cubesize_1*2)+cubesize_4);
        scene.add(wall);

        
        // szemben lent tavol
        var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y-40, cubesize, 1, 1, 1 );
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+(cubesize_3*2), -cubesize_y+20, alap_y+(cubesize_1*2));
        scene.add(wall);
        
        
    }
    
    this.lepcso_fel = function (kiegeszito_ertek,position) {
        
        var combined = new THREE.Geometry();

        
        var alap_x = kiegeszito_ertek.x*100;
        var alap_y = kiegeszito_ertek.y*100;
        
        var textura_kep_padlo = "assets/textures/" + terkep.meta.ALAP_PADLO_TEXTURA;
        var textura_kep_fal = "assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA;
        
        
        var texture_fokok = new THREE.ImageUtils.loadTexture(textura_kep_padlo);
        texture_fokok.wrapS = THREE.RepeatWrapping;
        texture_fokok.wrapT = THREE.RepeatWrapping;

        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            var ertekek_lepcso_meret = { x:cubesize,y:20,z:20 };
            var cubesize_1 = -cubesize;
            var cubesize_2 = cubesize;
            var cubesize_3 = 0;
            var cubesize_4 = 0;
            
            texture_fokok.repeat.x = 1;
            texture_fokok.repeat.y = 0.2;
        }
        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            var ertekek_lepcso_meret = { x:cubesize,y:20,z:20 };
            var cubesize_1 = cubesize;
            var cubesize_2 = -cubesize;
            var cubesize_3 = 0;
            var cubesize_4 = 0;
            
            texture_fokok.repeat.x = 1;
            texture_fokok.repeat.y = 0.5;
        }
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            var ertekek_lepcso_meret = { x:20,y:20,z:cubesize };
            var cubesize_1 = 0;
            var cubesize_2 = 0;
            var cubesize_3 = cubesize;
            var cubesize_4 = -cubesize;
            
            texture_fokok.repeat.x = 0.5;
            texture_fokok.repeat.y = 1;
        }
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            var ertekek_lepcso_meret = { x:20,y:20,z:cubesize };
            var cubesize_1 = 0;
            var cubesize_2 = 0;
            var cubesize_3 = -cubesize;
            var cubesize_4 = cubesize;
            
            texture_fokok.repeat.x = 0.5;
            texture_fokok.repeat.y = 1;
        }
        

        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture_fokok} );
        var wallGeometry = new THREE.CubeGeometry( ertekek_lepcso_meret.x, ertekek_lepcso_meret.y, ertekek_lepcso_meret.z, 1, 1, 1 );
        
        // lepcsofokok
        var j = -50;
        for (var i = -40; i<=20; i=i+6) {
            //console.log(i + ' ' + j);
            var wall = new THREE.Mesh(wallGeometry, wallMaterial);
            if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
                //console.log((j*-1));
                wall.position.set(alap_x, i, alap_y+(j*-1));
            }
            if (kiegeszito_ertek.melyik_oldalon == "DEL") {
                wall.position.set(alap_x, i, alap_y+j);
            }
            if (kiegeszito_ertek.melyik_oldalon == "KELET") {
                wall.position.set(alap_x+j, i, alap_y);
            }
            if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
                wall.position.set(alap_x+(j*-1), i, alap_y);
            }
            //scene.add(wall);
            
            THREE.GeometryUtils.merge( combined, wall );
            
            j = j + 20;
        }
        
        var wall = new THREE.Mesh(combined, wallMaterial);
        scene.add(wall);
        
        
        var combined = new THREE.Geometry();

        
        // lepcso koruli elemek
        var texture = textura_konytarbol(textura_kep_fal,new THREE.Vector2(1,1));
        //var texture = new THREE.ImageUtils.loadTexture(textura_kep_fal);
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y, cubesize, 1, 1, 1 );
        
        // felette kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x, cubesize_y*2, alap_y);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
        
        // felette tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_3, cubesize_y*2, alap_y+cubesize_1);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
        
        // jobbra kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2, 0, alap_y+cubesize_3);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
        
        // jobbra kozel fent
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2, cubesize_y, alap_y+cubesize_3);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
        
        // balra kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1, 0, alap_y+cubesize_4);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
        
        // balra kozel fent
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1, cubesize_y, alap_y+cubesize_4);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
        
        //jobbra tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2+cubesize_3, 0, alap_y+cubesize_1+cubesize_3);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
       
        // balra tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1+cubesize_3, 0, alap_y+cubesize_1+cubesize_4);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
       
       // jobbra lent kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2, -cubesize_y, alap_y+cubesize_3);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
 
        // balra lent kozel
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1, -cubesize_y, alap_y+cubesize_4);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
       
        // jobbra fent tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_2+cubesize_3, cubesize_y, alap_y+cubesize_1+cubesize_3);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );

        // balra fent tavol
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(alap_x+cubesize_1+cubesize_3, cubesize_y, alap_y+cubesize_1+cubesize_4);
        //scene.add(wall);
        THREE.GeometryUtils.merge( combined, wall );
         
        var wall = new THREE.Mesh(combined, wallMaterial);
        scene.add(wall);
        
        return;
    }
    
    

    this.utjelzo_tabla_a_foldre = function (szoveg, position) {
        // masik verzio is plane de az mindig a kamera fele nez!
        
        var texture = getTextureFromCache("assets/images/sign2.png");
        //var texture = new THREE.ImageUtils.loadTexture("assets/images/sign2.png");
        var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(30,30,1,1), material );
        plane.position.set(position.x, position.y-28, position.z-40);
        plane.rotation =  MovingCube.rotation ;
        scene.add(plane);
        
        plane.on('click', function(){
            
            var tavolsag = plane.position.distanceTo(MovingCube.position);
            if (tavolsag > 200) {
                return;
            }
            
            mozgas_logolas("UTJELZO TABLARA KATT ID:" + szoveg);
            
            hang_lejatszas(33,{pan:0,volume:90});
            
            info_szoveg(szoveg);
        });
    }
    
    this.feltamasztas = function(kiegeszito_ertek, position) {
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/knight_statue.js", function( geometry ) {
            //var wireMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
            //var texture = new THREE.ImageUtils.loadTexture("assets/textures/100_1184_seamless.JPG");
            
            var wireMaterial = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x111111, specular: 0xffaa00, shininess: 10 } );
            var mesh2 = new THREE.Mesh( geometry, wireMaterial );
            
            
            if (kiegeszito_ertek.merre_nez == "DEL") {
                //mesh2.rotation.y = rad(180);
            }
            
            if (kiegeszito_ertek.merre_nez == "ESZAK") {
                mesh2.rotation.y = rad(180);
            }
            if (kiegeszito_ertek.merre_nez == "KELET") {
                mesh2.rotation.y = rad(90);
            }
            if (kiegeszito_ertek.merre_nez == "NYUGAT") {
                mesh2.rotation.y = rad(270);
            }
                
            
            //mesh2.rotation.y = rad(10);
            mesh2.position.set(position.x, -40, position.z);
            mesh2.scale.x = 21;
            mesh2.scale.y = 21;
            mesh2.scale.z = 21;
            scene.add(mesh2);
            
            mesh2.on('click', function(){
                
                var tavolsag = mesh2.position.distanceTo(MovingCube.position);
                if (tavolsag > 110) {
                    return;
                }
                
                console.log(kiegeszito_ertek.hanyszor_hasznalta);
                
                if (kiegeszito_ertek.hanyszor_hasznalta == 0) {
                    
                    terkep.feltamasztas(kiegeszito_ertek.id);
                    
                    info_szoveg("Resurrection statue used.")
                    
                    for (var k=0;k<karakterek.length;k++) {
                        karakterek[k].feltamasztas();
                        karakterek[k].manat_kap(karakterek[k].max_mana);
                    }
                } else {
                    info_szoveg("You already used this resurrection statue.");
                }
            });
            
        });
    }
    
    this.laba_foldre = function(kiegeszito_ertek, position) {
        // csak akkor rakjuk le ha meg nem nyitotta ki:
        
        if (kiegeszito_ertek.kinyitva == "NEM") {
            
            var geo = getGeomertyFromCache("assets/models/treasurechestidle.js");
            
            var texture = new THREE.ImageUtils.loadTexture("assets/models/SawBlade1.jpg");
            var wireMaterial = new THREE.MeshPhongMaterial( {morphTargets: true, map: texture} );
            var mesh2 = new THREE.MorphAnimMesh( geo.geometry, wireMaterial );
            mesh2.position.set(position.x, -38, position.z);
            mesh2.scale.x = 5.6;
            mesh2.scale.y = 5.6;
            mesh2.scale.z = 5.6;
            mesh2.rotation =  MovingCube.rotation;
            
            
            mesh2.duration = 4000;
            
            //nincs anim
            mesh2.setFrameRange(0,1);
            
            morphs.push( mesh2 );
            
            scene.add(mesh2);
            
            
            // a kieg ertekekbol csak az alap targy_id-k vannak, hogy pontosan milyen statokkal kapja a targyat azt a targyak osztalytol kerjuk le!
           
            var tenyleges_targy_idk = new Array();
            for (var i=0; i<kiegeszito_ertek.targy_idk.length; i++) {
                var random_statos_targy_id = targyak.targy_generalas(kiegeszito_ertek.targy_idk[i]);
                tenyleges_targy_idk.push(random_statos_targy_id);
            }
            
            mesh2.on('click', function(){
                
                var tavolsag = mesh2.position.distanceTo(MovingCube.position);
                if (tavolsag > 200) {
                    return;
                }
                
                mozgas_logolas("LADAT KINYIT id:" + kiegeszito_ertek.id);

                terkep.lada_kinyitva(kiegeszito_ertek.id);
                
                lada_kinyitas(mesh2,tenyleges_targy_idk);
            });
            
           
            
            
        }        
    }
    
    this.faklya = function (kiegeszito_ertek, position) {
        
        
        // animmal megoldva
        
        //var mapC = THREE.ImageUtils.loadTexture( "assets/textures/particles/sajatfire1.png" );
        
        var mapC = getTextureFromCache("assets/textures/particles/sajatfire1.png");
        
        
        
        
        var boomer = new TextureAnimator( mapC, 5, 6, 12, 80 ,1); // texture, #horiz, #vert, #total, duration.
        skill_animaciok.push(boomer);
        var wallGeometry = new THREE.PlaneGeometry(15, 15,1,1);
        var wallMaterial = new THREE.MeshBasicMaterial( {map: mapC , fog: false} );
        //var wallMaterial = new THREE.MeshBasicMaterial( {map: mapC , fog: false, blending: THREE.AdditiveBlending} );
        wallMaterial.transparent = true;
        var spell_mesh = new THREE.Mesh(wallGeometry, wallMaterial);
        spell_mesh.rotation =  MovingCube.rotation ;          
        scene.add( spell_mesh );
        
        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            spell_mesh.position.set(position.x, 3.6, position.z+43.2);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            spell_mesh.position.set(position.x, 3.6, position.z-43.2);
        }
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            spell_mesh.position.set(position.x+43.2, 3.6, position.z);
        }
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            spell_mesh.position.set(position.x-43.2, 3.6, position.z);
        }     
        
        
        
        // particleval:
        
        /*
        var mapA = THREE.ImageUtils.loadTexture( "assets/textures/particles/Particle_ex1.png" );
        //var mapA = THREE.ImageUtils.loadTexture( "assets/textures/particles/misc_fire_element_png_by_dbszabo1-d54l64j.png" );
        
        
        //var mapA = THREE.ImageUtils.loadTexture( "smoke.png" );
        //var mapA = THREE.ImageUtils.loadTexture( "firecloud.png" );
        //var mapA = THREE.ImageUtils.loadTexture( "fire1_ 01.png" );
        //var mapA = THREE.ImageUtils.loadTexture( "assets/textures/diffuse.jpg" );
        
        
        var cloud = new THREE.Object3D();
        
        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            cloud.position.set(position.x, position.y, position.z+43);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            cloud.position.set(position.x, position.y, position.z-43);
        }
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            cloud.position.set(position.x+43, position.y, position.z);
        }
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            cloud.position.set(position.x-43, position.y, position.z);
        }        
        
        //scene.add(cloud);
        
        var psys = new SpriteParticleSystem({
            particlesMoveWithEmitter:false,
            cloud:cloud,
            rate:20,
            num:20,
            texture:mapA,
            scaleR:[10,12],
            speedR:[0,2],
            rspeedR:[-0.8,0.8],
            lifespan:[0.1,0.2],
            terminalSpeed:null
          });
        psys.addForce(new THREE.Vector3(0,5,0));
        psys.start();
        
        psys_tomb.push(psys);
        */
        position.y = 5;
        
        var pointLightF = new THREE.PointLight( 0xffab7a ,2.2,190 );
        //var pointLightF = new THREE.PointLight( 0xffcb9a ,1.9,250 );
        //var pointLightF = new THREE.PointLight( 0xffffff ,1.1,290 );
        //var pointLightF = new THREE.PointLight( 0xffffff ,1.1,300 );

        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            pointLightF.position.set(position.x, position.y, position.z+43);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            pointLightF.position.set(position.x, position.y, position.z-43);
        }
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            pointLightF.position.set(position.x+43, position.y, position.z);
        }
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            pointLightF.position.set(position.x-43, position.y, position.z);
        }        
        
        
        
        
        
        psys_tomb_fenyek.push(pointLightF);  
        
        
        var mennyit_mozdul_a_feny = 3;
        
        
        
        setInterval(function(){
            
            var rand = randint(-mennyit_mozdul_a_feny,mennyit_mozdul_a_feny);
            pointLightF.position.z += rand;
            if (pointLightF.position.z > position.z+mennyit_mozdul_a_feny) {
                pointLightF.position.z = position.z;
            }
            if (pointLightF.position.z < position.z-mennyit_mozdul_a_feny) {
                pointLightF.position.z = position.z;
            }
            
            
            var rand = randint(-mennyit_mozdul_a_feny,mennyit_mozdul_a_feny);
            pointLightF.position.y += rand;
            if (pointLightF.position.y > position.y+mennyit_mozdul_a_feny) {
                pointLightF.position.y = position.y;
            }
            if (pointLightF.position.y < position.y-mennyit_mozdul_a_feny) {
                pointLightF.position.y = position.y;
            }
            
            /*
            var rand = randint(-mennyit_mozdul_a_feny,mennyit_mozdul_a_feny);
            pointLightF.position.x += rand;
            if (pointLightF.position.x > position.x+mennyit_mozdul_a_feny) {
                pointLightF.position.x = position.x;
            }
            if (pointLightF.position.x < position.x-mennyit_mozdul_a_feny) {
                pointLightF.position.x = position.x;
            }
            */
            
            
        },70);
        
        
        
        // intensity
        /*
        var alap_intensity = pointLightF.intensity;
        setInterval(function(){
            //var rand = Math.random();
            var rand = randint(-10,10)/100;
            pointLightF.intensity += rand;
            
            if (pointLightF.intensity > 1.2) {
                pointLightF.intensity = alap_intensity;
            }
            if (pointLightF.intensity < 0.7) {
                pointLightF.intensity = alap_intensity;
            }
            
        },110);
        */
        
        
        /*
        
        //distance
        var alap_distance = pointLightF.distance;
        setInterval(function(){
            //var rand = Math.random();
            var rand = randint(-30,30);
            pointLightF.distance += rand;
            
            if (pointLightF.distance > 600) {
                pointLightF.distance = alap_distance;
            }
            if (pointLightF.distance < 300) {
                pointLightF.distance = alap_distance;
            }
            
        },120);
          */  
        
        
        var geo = getGeomertyFromCache("assets/models/torch/torch.js");

        var texture = new THREE.ImageUtils.loadTexture("assets/models/torch/untitled.jpg");
        //var texture = textura_konytarbol("assets/models/torch/untitled.jpg");
        
        
        var wireMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        //var wireMaterial = new THREE.MeshFaceMaterial();
        var mesh2 = new THREE.Mesh( geo.geometry,wireMaterial  );
        //mesh2.rotation.y = rad(270);
        //mesh2.position.set(146, -9, 300);
        mesh2.scale.x = 1.5;
        mesh2.scale.y = 1.5;
        mesh2.scale.z = 1.5;
        scene.add(mesh2);
        
        if (kiegeszito_ertek.melyik_oldalon == "DEL") {
            mesh2.position.set(position.x, -9, position.z+46);
            mesh2.rotation.y = rad(180);
        }
        
        if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
            mesh2.position.set(position.x, -9, position.z-46);
            mesh2.rotation.y = rad(0);
        }
        if (kiegeszito_ertek.melyik_oldalon == "KELET") {
            mesh2.position.set(position.x+46, -9, position.z);
            mesh2.rotation.y = rad(270);
        }
        if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
            mesh2.position.set(position.x-46, -9, position.z);
            mesh2.rotation.y = rad(90);
        }     

        /*
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/torch/torch.js", function( geometry ) {
            
            var texture = new THREE.ImageUtils.loadTexture("assets/models/torch/untitled.jpg");
            var wireMaterial = new THREE.MeshPhongMaterial( {map: texture} );
            //var wireMaterial = new THREE.MeshFaceMaterial();
            var mesh2 = new THREE.Mesh( geometry,wireMaterial  );
            //mesh2.rotation.y = rad(270);
            //mesh2.position.set(146, -9, 300);
            mesh2.scale.x = 1.5;
            mesh2.scale.y = 1.5;
            mesh2.scale.z = 1.5;
            scene.add(mesh2);
            
            if (kiegeszito_ertek.melyik_oldalon == "DEL") {
                mesh2.position.set(position.x, -9, position.z+46);
                mesh2.rotation.y = rad(180);
            }
            
            if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
                mesh2.position.set(position.x, -9, position.z-46);
                mesh2.rotation.y = rad(0);
            }
            if (kiegeszito_ertek.melyik_oldalon == "KELET") {
                mesh2.position.set(position.x+46, -9, position.z);
                mesh2.rotation.y = rad(270);
            }
            if (kiegeszito_ertek.melyik_oldalon == "NYUGAT") {
                mesh2.position.set(position.x-46, -9, position.z);
                mesh2.rotation.y = rad(90);
            }     
            
            
        });
        */
        
        
    }
    
    
    this.teleport = function (kiegeszito_ertek, position) {
        
        var geo = getGeomertyFromCache("assets/models/teleport/teleporter3.js");
        
        var mesh2 = new THREE.Mesh( geo.geometry,new THREE.MeshFaceMaterial(geo.materials)  );
        mesh2.position.set(position.x, position.y-38, position.z);
        mesh2.scale.x = 22;
        mesh2.scale.y = 22;
        mesh2.scale.z = 22;
        scene.add(mesh2);
        
        /*
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/teleport/teleporter3.js", function( geometry,materials ) {
            //geometry.materials[0].morphTargets = true;
            //geometry.materials[0].morphNormals = true;
            //var mesh2 = new THREE.MorphAnimMesh( geometry,  new THREE.MeshFaceMaterial() );
            var mesh2 = new THREE.Mesh( geometry,new THREE.MeshFaceMaterial(materials)  );
            //console.log(geometry.materials[0]);
            
            mesh2.position.set(position.x, position.y-38, position.z);
            mesh2.scale.x = 22;
            mesh2.scale.y = 22;
            mesh2.scale.z = 22;
            
            //mesh2.duration = 12000;
                
            //morphs.push( mesh2 );
            

            
            scene.add(mesh2);
        });
        
        */
        
        
        var geometry = new THREE.Geometry();

        
        var sprite = THREE.ImageUtils.loadTexture( "assets/images/particle.png" );
        var colors = [];
        
        for ( i = 0; i < 250; i ++ ) {

            var vertex = new THREE.Vector3();

            vertex.x = randint(-10,10);
            vertex.y = randint(-30,20);
            vertex.z = randint(-10,10);
            
            geometry.vertices.push( vertex );
            
            colors[ i ] = new THREE.Color( 0xff0000 );
            var szin_rand = randint(1,10);
            
            //colors[ i ].setHSV( (0.5+(szin_rand/100)), 1, 1 );

        }
        geometry.colors = colors;
        
        geometry.dynamic = false;
        geometry.verticesNeedUpdate = false;

        //var material = new THREE.ParticleBasicMaterial( { size: 11, sizeAttenuation: false, map: sprite,transparent: true, vertexColors: true  } );
        var material = new THREE.ParticleBasicMaterial( { size: 13,transparent: true,map: sprite, sizeAttenuation: false, vertexColors: true,blending: THREE.AdditiveBlending} );
        
        
        var particles = new THREE.ParticleSystem( geometry, material );
        particles.position.set(position.x,-5,position.z);
        particles.sortParticles = true;
        
        
        scene.add( particles );
        
        //console.log(sprite);
        //console.log(geometry);
        //console.log(particles);
        
        var particleInterval = setInterval(function(){
            particles.rotation.y += 0.1;
           
            
        },50);
        
        
    }
    
    this.targy_a_foldre = function (kiegeszito_ertek, position) {
        
        
        var targy_id = targyak.targy_generalas(kiegeszito_ertek.targy_id);

        var targyadatok = targyak.targyadatok(targy_id);

        // plane geoval rakjuk le:
        // elfektetve a foldre!
        /*
        var texture = new THREE.ImageUtils.loadTexture("assets/items/" + targyadatok.kep_fajl);
        var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(15,15,1,1), material );
        plane.overdraw = false;
        plane.position.set(position.x, position.y-37, position.z);
        plane.rotation.x = rad(270);
        scene.add(plane);
        */
        
        // masik verzio is plane de az mindig a kamera fele nez!
        var texture = new THREE.ImageUtils.loadTexture("assets/items/" + targyadatok.kep_fajl);
        var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(6,6,1,1), material );
        plane.position.set(position.x, position.y-35, position.z);
        plane.rotation =  MovingCube.rotation ;
        
        scene.add(plane);
        
        
        plane.on('click', function(){
            
            var tavolsag = plane.position.distanceTo(MovingCube.position);
            if (tavolsag > 200) {
                return;
            }
            
            mozgas_logolas("TARGYAT FOLDROL targy_id:" + kiegeszito_ertek.targy_id);
            
            var ret = foldrol_targy_felvetele(targy_id);
            if (ret) {
                plane.off('click');
                scene.remove(plane);
                terkep.targy_felveve(kiegeszito_ertek.id);
            }
        });
    }
    

    this.createDoorTitkos = function (image, position, size, tipus, kiegeszito_ertek) {
        // ez egy fal elem!
        
        if (terkep.meta.ALAP_FAL_TEXTURA_NORMAL != "" && terkep.meta.ALAP_FAL_TEXTURA_SPECULAR != "" ) {
            
            //repeat.x = repeat.x*4;
            //repeat.y = repeat.y*4;
            
            toltes_jelzo_bekapcsol();
            var texture = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA_NORMAL,undefined,toltes_jelzo_kikapcsol);
            texture.anisotropy = anisotropy;
            
            
            toltes_jelzo_bekapcsol();
            var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA_SPECULAR,undefined,toltes_jelzo_kikapcsol);
            texture2.anisotropy = anisotropy;
            

            toltes_jelzo_bekapcsol();
            var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            texture3.anisotropy = anisotropy;
            
            
            var v2 = new THREE.Vector2(1,1);

            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture,normalScale:v2, specularMap: texture2,specular: 0xffab7a, shininess: 180} ); 
            
            //console.log(wallMaterial);
        } else {
            toltes_jelzo_bekapcsol();
            var texture = THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            
            //repeat.x = repeat.x*2;
            //repeat.y = repeat.y*2;
            texture.anisotropy = anisotropy;
            texture = this.repeatTexture(texture,repeat);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        }        
        
        
        
        //var texture = new THREE.ImageUtils.loadTexture("assets/textures/"+ terkep.meta.ALAP_FAL_TEXTURA);
        //var texture = textura_konytarbol("assets/textures/"+ terkep.meta.ALAP_FAL_TEXTURA,new THREE.Vector2(1,1));
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y, cubesize, 1, 1, 1 );
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(position.x, position.y, position.z);
        scene.add(wall);
        collidableMeshList.push(wall);
        
        //collidableMeshList.push(o3d);
        
        //console.log(kiegeszito_ertek);
        
        if (kiegeszito_ertek.kinyitva == "IGEN") {
            // kinyitjuk az ajtot!
            wall.position.y = 100;
        }
        
        return wall;
        
        var that = this;
        
        /*
        wall.on('click', function(){
            
            var tavolsag = wall.position.distanceTo(MovingCube.position);
            if (tavolsag > 200) {
                return;
            }

            terkep.titkos_ajto_kinyitva(kiegeszito_ertek.id);
            
            
            //that.toogleDoor2(wall);
            if (that.ajto_eppen_mozog == 0) {
                
                hang_lejatszas(39,{pan:0,volume:70});
                
                that.ajto_eppen_mozog = 1;
                // megnezzuk nyitva vagy csukva van e:
                
                doorInterval = setInterval(function()
                {
                    wall.position.y += 1;  
                    if( wall.position.y >= 100) {
                        that.ajto_eppen_mozog = 0;
                        clearInterval(doorInterval);
                    }  
                    
                },3);            
            
            }
            
            
        });
        */
    }
    
    this.createDoor = function (image, position, size, tipus, kiegeszito_ertek) {
        
        var tengely = "x";
        if (typeof kiegeszito_ertek.tengely !== "undefined")  {
            tengely = kiegeszito_ertek.tengely;
        }
        
        var rotation = { x: 0, y: 0, z: 0 };
        
        if (tengely == "x") {
            rotation.y = rad(90);
        }
        
        
        var texture = textura_konytarbol("assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA,new THREE.Vector2(1,1));
        //var texture = THREE.ImageUtils.loadTexture("assets/textures/" + terkep.meta.ALAP_FAL_TEXTURA);
        
        
        texture.repeat.x = 0.2;
        var wallGeometry = new THREE.CubeGeometry( 20, cubesize_y, 20, 1, 1, 1 );
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/wall_stone04_c2.png")} );
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        if (tengely == "x") {
            wall.position.set(position.x, position.y, position.z-40);
        } else {
            wall.position.set(position.x-40, position.y, position.z);
        }
        //wall.rotation.set(rotation);
        scene.add(wall);
        
        
        var wallGeometry = new THREE.CubeGeometry( 20, cubesize_y, 20, 1, 1, 1 );
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/wall_stone04_c2.png")} );
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        if (tengely == "x") {
            wall.position.set(position.x, position.y, position.z+40);
        } else {
            wall.position.set(position.x+40, position.y, position.z);
        }
        //wall.rotation.set(rotation);
        scene.add(wall);
        
        
        var texture = THREE.ImageUtils.loadTexture(image);
        var o3d = this.createCube(new THREE.MeshPhongMaterial({map: texture}), position, size,{ x: 1, y: 1, z: 1 },rotation);
        
        collidableMeshList.push(o3d);
        //scene.add(o3d);


        // ZART AJTO
        if (tipus == "AJTO2") {
            // megnezzuk, hogy nem e nyitotta mar ki korabban:
            
            if (typeof kiegeszito_ertek.kinyitva !== "undefined")  {
                if (kiegeszito_ertek.kinyitva == "IGEN") {
                    // kinyitjuk az ajtot!
                    o3d.position.y = 100;
                }
            }
            
            // csak kiirjuk hogy zarva
            o3d.on('click', function(){
                var tavolsag = o3d.position.distanceTo(MovingCube.position);
                if (tavolsag > 200) {
                    return;
                }

                hang_lejatszas(38,{pan:0,volume:40});
                
                info_szoveg('The door is Locked.');                
            });
        }
        
        var that = this;
        
        if (tipus == "AJTO1") {
            //console.log(kiegeszito_ertek.kinyitva);
            if (typeof kiegeszito_ertek.kinyitva !== "undefined")  {
                if (kiegeszito_ertek.kinyitva == "IGEN") {
                    // kinyitjuk az ajtot!
                    o3d.position.y = 100;
                }
            }
            
            o3d.on('click', function(){
                //console.log('clickerre:');
                //console.log(o3d);
                
                var tavolsag = o3d.position.distanceTo(MovingCube.position);
                if (tavolsag > 200) {
                    return;
                }
                
                mozgas_logolas("AJTORA KATTINT ID:" + kiegeszito_ertek.id);
                
                
                // megnezzuk kapcoslodik e hozza esemeny
                if (typeof kiegeszito_ertek.kapcsolodo_esemeny !== "undefined")  {
                    if (kiegeszito_ertek.kapcsolodo_esemeny == "hang_lejatszas") {
                        hang_lejatszas(kiegeszito_ertek.hang_id,{pan:0,volume:20,multiShot:false});
                    }
                    if (kiegeszito_ertek.kapcsolodo_esemeny == "ellenseg_megjelenik") {
                        var esemeny_kieg = {"ellenseg_tipusa":kiegeszito_ertek.ellenseg_tipusa,"id":kiegeszito_ertek.ellenseg_id};
                        var esemeny_position = {
                            x: kiegeszito_ertek.ellenseg_x * cubesize,
                            y: 0,
                            z: kiegeszito_ertek.ellenseg_y * cubesize
                        };
                        var enemy = new Enemy(esemeny_kieg,esemeny_position);
                        enemy.create();
                    }
                    
                    
                }
                
                terkep.sima_ajto_kinyitva(kiegeszito_ertek.id);
                
                that.toogleDoor2(o3d);
            });
            
        }
        
        
        
        return o3d;
    }

    this.repeatTexture = function (texture, size)
    {
        texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.x = size.x;
      texture.repeat.y = size.y;
      return texture;
    }

}











