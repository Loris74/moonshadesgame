var GraphicsHelper = {};

GraphicsHelper.createCube = function (material, position, size, scale, rotation) {
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

GraphicsHelper.createPadlo = function (image,position,size,repeat) {
    /*
    var texture = THREE.ImageUtils.loadTexture(image);
    if (texture.image.width != texture.image.height) {
        alert('Csak egyezo meretu lehet ismetelt texure');
        return false;
    }
    texture = GraphicsHelper.repeatTexture(texture,repeat);
    var o3d = GraphicsHelper.createCube(new THREE.MeshPhongMaterial({map: texture}), position, size);
    //var o3d = GraphicsHelper.createCube(new THREE.MeshBasicMaterial({color: 0x0000AA}), position, size);
    return o3d;    
    */
    
    var texture = THREE.ImageUtils.loadTexture(image);
    texture = GraphicsHelper.repeatTexture(texture,repeat);
    //var wallMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
    var planegeo = new THREE.PlaneGeometry(size.x, size.z,0,0);
    plane2 = new THREE.Mesh(planegeo, wallMaterial );
    plane2.position.set(position.x, position.y, position.z);
    plane2.rotation.x = rad(270);
    
    return plane2;

}

GraphicsHelper.createPlafon = function (image,position,size,repeat) {
    /*
    var texture = THREE.ImageUtils.loadTexture(image);
    if (texture.image.width != texture.image.height) {
        alert('Csak egyezo meretu lehet ismetelt texure');
        return false;
    }
    texture = GraphicsHelper.repeatTexture(texture,repeat);
    var o3d = GraphicsHelper.createCube(new THREE.MeshPhongMaterial({map: texture}), position, size);
    //var o3d = GraphicsHelper.createCube(new THREE.MeshBasicMaterial({color: 0x0000AA}), position, size);
    return o3d;    
    */
    
    var texture = THREE.ImageUtils.loadTexture(image);
    texture = GraphicsHelper.repeatTexture(texture,repeat);
    
    //var wallMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
    //wallMaterial.transparent = 1;
    var planegeo = new THREE.PlaneGeometry(size.x, size.z,1,1);
    plane2 = new THREE.Mesh(planegeo, wallMaterial );
    plane2.position.set(position.x, position.y, position.z);
    plane2.rotation.x = rad(90);
    
    return plane2;

}

GraphicsHelper.createKulcslyuk = function (image,position, melyik_ajtot_kezeli,parameterek) {
    var texture = THREE.ImageUtils.loadTexture(image);
    // egyelroe fix, de lehet majd a texturabol szmolni
    //var size =  {x:texture.image.width,y:texture.image.height}    
    var size =  {x:15,y:15,z:100}    
    
    //plane geo verzio
    var texture = THREE.ImageUtils.loadTexture(image);
    var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
    wallMaterial.transparent = 1;
    var planegeo = new THREE.PlaneGeometry(size.x, size.y,1,1);
    plane2 = new THREE.Mesh(planegeo, wallMaterial );
    
    
    
    if (parameterek.melyik_oldalon == "DEL") {
        plane2.position.set(position.x, position.y, position.z+51);
    }
    
    if (parameterek.melyik_oldalon == "ESZAK") {
        plane2.position.set(position.x, position.y, position.z-51);
        plane2.rotation.y = rad(180);
    }
        
    plane2.on('click', function(){
        info_szoveg("ellenorizni kell van e nala megfelelo kulcs ha igen akkor elvenni es ajtot kinyitni ha nincs akkor szoveg arrol mi kell. lehetne egy popup ablak is ahol kivalaszthatja mit rak bele. ezt mas esemenyeknel is lehetne");
        GraphicsHelper.toogleDoor2(melyik_ajtot_kezeli);
    });
    return plane2;

    
}


//position: egy fal pontos pozicioja. 
// melyik_ajtot_kezeli: az ajto 3d object id ja
GraphicsHelper.createWallSwitch = function (image,position, melyik_ajtot_kezeli,parameterek) {
    
    console.log("createWallSwitch > melyik ajtot kezeli:"); 
    console.log(melyik_ajtot_kezeli);     
    
    var texture = THREE.ImageUtils.loadTexture(image);
    // egyelroe fix, de lehet majd a texturabol szmolni
    //var size =  {x:texture.image.width,y:texture.image.height}    
    var size =  {x:15,y:15,z:100}    
    
    //plane geo verzio
    var texture = THREE.ImageUtils.loadTexture(image);
    var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
    wallMaterial.transparent = 1;
    var planegeo = new THREE.PlaneGeometry(size.x, size.y,1,1);
    plane2 = new THREE.Mesh(planegeo, wallMaterial );
    
    // ezt majd ugy kell elhelyezni, hogy a hivaskor meg kell adni a fajl melyik oldalara kell
    // ha a fal deli oldalan van a kapcsolo akkor:
    if (parameterek.melyik_oldalon == "DEL") {
        plane2.position.set(position.x, position.y, position.z+51);
    }
    
    // ha a fal eszaki oldalan van akkor:
    if (parameterek.melyik_oldalon == "ESZAK") {
        plane2.position.set(position.x, position.y, position.z-51);
        //plane2.rotation.x = rad(90);
        plane2.rotation.y = rad(180);
    }
    
    // masik ket egtajat is kell majd cisnalni
    
    plane2.off('click');
     
    plane2.on('click', function(){
        console.log("createWallSwitch clcik > melyik ajtot kezeli:"); 
        console.log(melyik_ajtot_kezeli);     
        GraphicsHelper.toogleDoor2(melyik_ajtot_kezeli);
    });
    
    
    return plane2;
    
    
    
    
}


GraphicsHelper.toogleDoor2 = function (o3d) {
    
    console.log("toogledorban melyik a mesh:"); 
    console.log(o3d);
    
    var ajto_eppen_mozog = 0;
    //console.log("toogeldoor:"+o3d);
    if (ajto_eppen_mozog == 0) {
        
        hang_lejatszas(10,{pan:75,volume:50});
        
        ajto_eppen_mozog = 1;
        // megnezzuk nyitva vagy csukva van e:
        if (o3d.position.y == 100) {
            var counter = 0;
            doorInterval = setInterval(function()
            {
                counter++;
                o3d.position.y -= 1;  
                if( counter >= 100) {
                    ajto_eppen_mozog = 0;
                    clearInterval(doorInterval);
                }  
                
            },1);            
            
        } else {
            var counter = 0;
            doorInterval = setInterval(function()
            {
                counter++;
                o3d.position.y += 1;  
                if( counter >= 100) {
                    ajto_eppen_mozog = 0;
                    clearInterval(doorInterval);
                }  
                
            },1);            
        }
    }
            
}


GraphicsHelper.lepcso = function (kiegeszito_ertek,position) {
    var loader = new THREE.JSONLoader();
    loader.load( "assets/models/stairs_up.js", function( geometry ) {
        // { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } 
        // new THREE.MeshNormalMaterial( { overdraw: true } )
        // new THREE.MeshLambertMaterial( { color: 0xFF0000, overdraw: false } 
        
        morphColorsToFaceColors( geometry );
        geometry.computeMorphNormals(); 
        //var wireMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
        //var texture = new THREE.ImageUtils.loadTexture("assets/textures/wall_stone04_c2.png");
        //var wireMaterial = new THREE.MeshBasicMaterial( {map: texture, transparent: false, overdraw: false} );
        var wireMaterial = new THREE.MeshBasicMaterial( { overdraw: false }  );
        var mesh2 = new THREE.Mesh( geometry, wireMaterial );

        mesh2.rotation.x = rad(-90);
        mesh2.rotation.z = rad(90);
        mesh2.position.set(position.x, -40, position.z);
        mesh2.scale.x = 30;
        mesh2.scale.y = 30;
        mesh2.scale.z = 50;
        scene.add(mesh2);
        
        mesh2.on('click', function(){
            info_szoveg('szintvatas');
            szintvaltas(kiegeszito_ertek.szint_id);
        });
        
    });
}

GraphicsHelper.utjelzo_tabla_a_foldre = function (szoveg, position) {
            
    // masik verzio is plane de az mindig a kamera fele nez!
    var texture = new THREE.ImageUtils.loadTexture("assets/images/sign.png");
    var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(40,40,1,1), material );
    plane.position.set(position.x, position.y-20, position.z);
    plane.rotation =  camera.rotation ;
    scene.add(plane);
    
    plane.on('click', function(){
        info_szoveg(szoveg);
    });
}

GraphicsHelper.targy_a_foldre = function (kiegeszito_ertek, position) {
    var targyadatok = targyak.targyadatok(kiegeszito_ertek.targy_id);

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
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10,1,1), material );
    plane.position.set(position.x, position.y-30, position.z);
    plane.rotation =  camera.rotation ;
    
    scene.add(plane);
    
    
    plane.on('click', function(){
        console.log('click');
        var ret = foldrol_targy_felvetele(kiegeszito_ertek.targy_id);
        if (ret) {
            scene.remove(plane);
            terkep.targy_felveve(kiegeszito_ertek.id);
            plane.off('click');
        }
    });
}

GraphicsHelper.createDoor = function (image, position, size, tipus) {
    
    var texture = THREE.ImageUtils.loadTexture("assets/textures/wall_stone04_c2.png");
    texture.repeat.x = 0.2;
    var wallGeometry = new THREE.CubeGeometry( 20, cubesize_y, 20, 1, 1, 1 );
    //var wallMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/wall_stone04_c2.png")} );
    var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(position.x-40, position.y, position.z);
    scene.add(wall);
    
    
    var wallGeometry = new THREE.CubeGeometry( 20, cubesize_y, 20, 1, 1, 1 );
    //var wallMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/wall_stone04_c2.png")} );
    var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(position.x+40, position.y, position.z);
    scene.add(wall);
    
    
    var texture = THREE.ImageUtils.loadTexture(image);
    var o3d = GraphicsHelper.createCube(new THREE.MeshPhongMaterial({map: texture}), position, size);
    
    collidableMeshList.push(o3d);
    
    /*
    var texture = THREE.ImageUtils.loadTexture(image);
    var o3d = GraphicsHelper.createCube(new THREE.MeshPhongMaterial({map: texture}), position, size);
    
    collidableMeshList.push(o3d);
    */
    
    if (tipus == "AJTO1") {
        o3d.on('click', function(){
            GraphicsHelper.toogleDoor2(o3d);
        });
        
    }
    
    return o3d;
}

GraphicsHelper.repeatTexture = function (texture, size)
{
    texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = size.x;
  texture.repeat.y = size.y;
  return texture;
}