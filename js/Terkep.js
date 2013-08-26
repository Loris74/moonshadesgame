function Terkep () {
    this.id = 0;
    
    //matrix:
    
    
    // matrix kiegeszitesekben az X es az Y nullvala kezdodik!
    
    // a sizntvaltasok mar a dungeon kulso fala utan vannak!!
    
    // felfele van eszak a terkepmatrixon
    
    // 1-fal, 0-jarhato
    // ezt hasznalja a pathfinder is!

    // kiegszitesek:
    // tomb felepitese: ID ( ez mindig egyedi, ha ossze kell kotni ket objetumot. pl ajtot kapcosloval ),x,y,OBJEKTUM TIPUSA, OBJETUM TIPUS parameterek
    // lehetseges ertekek: KEZDO_POZICIO, AJTO1-ajtora klikkelve nyilik, AJTO2-kapcsolora klikkleve nyilik, AJTO3 kulcs kell hozza
    // TARGY-foldre rakja, UTJELZO_TABLA-megjelnik clickre
    
    // szint valtoknak mindig a terkep legszelen kell lennnie valamelyik egtaj fele ezt meg is kell adni 
    
    // kulcslyuknak mindig az ajot letrehozasa UTAN! kell jonnie a kiegesiztesekben.
    /*
    
    
[
{"id":1,"x":5,"y":20,"tipus":"KEZDO_POZICIO_temp","merre_nez":"180"},
{"id":1,"x":27,"y":15,"tipus":"KEZDO_POZICIO","merre_nez":"270"},
{"id":2,"x":1,"y":11,"tipus":"AJTO1"},
{"id":3,"x":3,"y":11,"tipus":"AJTO1"},
{"id":4,"x":3,"y":17,"tipus":"AJTO2"},
{"id":5,"x":4,"y":17,"tipus":"AJTO_KAPCSOLO1","ajto_id":4,"melyik_oldalon":"DEL"},
{"id":6,"x":1,"y":16,"tipus":"TARGY","targy_id":2},
{"id":7,"x":3,"y":18,"tipus":"TARGY","targy_id":2},
{"id":8,"x":2,"y":18,"tipus":"UTJELZO_TABLA","szoveg":"The Sign says: Beware!"},
{"id":9,"x":3,"y":19,"tipus":"AJTO_KAPCSOLO1","ajto_id":4,"melyik_oldalon":"ESZAK"},
{"id":10,"x":4,"y":19,"tipus":"KULCSLYUK","ajto_id":4,"melyik_oldalon":"ESZAK"},
{"id":11,"x":5,"y":20,"tipus":"SZINTVALTAS_LE","szint_id":2,"melyik_oldalon":"ESZAK"},
{"id":12,"x":1,"y":10,"tipus":"ELLENSEG","ellenseg_tipusa":"flamingo2"},
{"id":13,"x":9,"y":20,"tipus":"SZINTVALTAS_FEL","szint_id":0,"melyik_oldalon":"DEL"},
{"id":11,"x":29,"y":15,"tipus":"SZINTVALTAS_LE","szint_id":2,"melyik_oldalon":"KELET"}
]
    
    */
    
    
    
    
    // majd itt lesz a szint neve
    this.nev = "";
    
    this.KONYVTAR = "assets/levels/";
    // egy terkep tobb ajlban lesz tarolva. jaratok, ellensegek, kiekesito adatok, pl ajtok stb
    // szintek konyvtarban van es a fajl neveben van az ID szintek/1_dungeon.js, 1_ellensegek.js, stb 
    // esetleg lehetnenek kodolt formaban
    
    // ha egy ellenseg elmozdul vagy meghal akkor ebben frissitjuk az adatokat, hogy el lehessen menteni
    this.ellensegek = new Array();    
    
    this.terkep_matrix;
    
    this.terkep_szelesseg;
    this.terkep_magassag;
    
    this.terkep_matrix_pathfindinghez;
    
    
    this.terkep_matrix_kiegeszitesek = new Array();
    
    
    
    this.ezen_van = 0;
    
    this.texturak = {};
    
    this.meta = {};
    
    this.storyline = [];
        
    // foldon levo targyakat ha felvette pl kulcsot vagy zart ajtot kinyitott ezeket ide mentjuk a savehoz
    // kozveltenul a terkep_matrix_kiegeszitesek bol vesszuk el!
    //this.terkep_matrix_kiegeszitesek_valtozasok = new Array();

    this.init = function(id) {
        this.id = id;
        
        this.ezen_van = 1;
        
        that = this;
        // terkep adatok betoltese es feldolgozasa:
        $.ajax({
            cache: false,
            async: false,
            url : this.KONYVTAR + this.id  + '_dungeon.moon',
            dataType: "json",
            success : function (data) {
                //console.log(data);
                that.terkep_matrix = data;

                that.terkep_szelesseg = that.terkep_matrix[0].length;
                that.terkep_magassag =  that.terkep_matrix.length ;

                //that.terkep_matrix_pathfindinghez = that.getTerkepMatrix_pathfindinghez();

            }
            
            
        });
        
        // terkep kiegeszitesek:
        $.ajax({
            cache: false,
            async: false,
            url : this.KONYVTAR + this.id  + '_dungeon_extras.moon',
            dataType: "json",
            success : function (data) {
                //console.log(data);
                that.terkep_matrix_kiegeszitesek = data;
            }
            
            
        });
        
        // terkep meta: pl nev meg texturak
        $.ajax({
            cache: false,
            async: false,
            url : this.KONYVTAR + this.id  + '_dungeon_meta.moon',
            dataType: "json",
            success : function (data) {
                that.meta = data;
                $('#terkep_neve').html(data.TERKEP_NEVE);
                
            }
            
            
        });
        
        
        // megnezzuk, hogy az ideiglenes terkepek valtozban van e mar ehhez a siznthez elem ha van akkor onnen vesszuk az ertekeket!
        for (var i=0;i<ideiglenes_terkepek.length;i++) {
             if (ideiglenes_terkepek[i].id == this.id) {
                 // teszt alatt kikapcoslva!!!
                 //this.terkep_matrix_kiegeszitesek = ideiglenes_terkepek[i].terkep_matrix_kiegeszitesek;
                 
                 //console.log("ideiglenes_terkepek[i].terkep_matrix_kiegeszitesek");
                 //console.log(ideiglenes_terkepek[i].terkep_matrix_kiegeszitesek);
                 break;
             }
         }
         
         
         // terkep storyline
        $.ajax({
            cache: false,
            async: false,
            url : this.KONYVTAR + this.id  + '_dungeon_storyline.moon',
            dataType: "json",
            success : function (data) {
                that.storyline = data;
            }
            
            
        });
         
         // a terkep framet is feltoltjuk
         // egyelore a teljes terkeppel!
         this.terkep_dom_felepitese();
         
        
    }
    
    this.van_e_beszelgetes_a_pozicioban = function(x,y) {
        // ha van akkor el is inditja
        var id = 0;
        
        for (var i=0;i< this.storyline.length; i++) {
            if (this.storyline[i].tipus == "pozicio") {
                if (this.storyline[i].x == x && this.storyline[i].y == y ) {
                    id = this.storyline[i].id;
                }
            }
        }
        
        if (id != 0) {
            // megnezzuk, hogy lezajlott e korabban. ha igen akkor nem indul el
            
            if (jQuery.inArray(id, storyline_megtortent) == -1) {
                this.beszelgetes_felepitese(id);
                return true;    
            } else {
                return false;
            }
            
        } else {
            return false;
        }
        
    }
    
    this.beszelgetes_felepitese = function(id) {
        var dom = '';
        
        
        
        var beszelgetes = [];
        
        for (var i=0;i< this.storyline.length; i++) {
            if (this.storyline[i].id == id) {
                beszelgetes = this.storyline[i];
            }
        }
        
        var elso_sor = 1;
        for (var i=0;i< beszelgetes.sorok.length; i++) {
            var latszik = "";
            if (elso_sor == 1) {
                latszik = 'style="display:block"';   
            }
            
            var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(beszelgetes.sorok[i].karakter_id);
            var karakter_nev =  karakterek[karakter_index].nev;
            var karakter_kep =  karakterek[karakter_index].kep;
            
            dom += '<div class="sl_b_egysor" '+latszik+'><div class="sl_b_egysor_kep"  ><img src="'+ karakter_kep +'"></div><div class="sl_b_egysor_szoveg"><span>'+ karakter_nev +'</span>: '+ beszelgetes.sorok[i].szoveg +'</div></div>';
            elso_sor = 0;
        }
        dom += '<div class="sl_b_egysor_utolso">Click to continue</div>';
        
        $("#storyline_beszelhetesek").html(dom);
        
        var sorok = $("#storyline_beszelhetesek").children(".sl_b_egysor");
        var kezdosor = 0;
        
        $("#storyline_beszelhetesek").off('click');
        $("#storyline_beszelhetesek").click(function(){
            hang_lejatszas(33,{pan:0,volume:60});
            
            var mennyi_sor_latszik = 0;
            
            for (var i=kezdosor; i < sorok.length; i++ ) {
                if ($(sorok[i]).is(":visible")) {
                    mennyi_sor_latszik++;    
                } else {
                    if (mennyi_sor_latszik >= 4) {
                        // ha 4 sor kint vanmar akkro az elsot eltiuntetjuk
                        //$(sorok[kezdosor]).slideUp(300);
                        
                        $(sorok[kezdosor]).hide('slide',{direction: "left"},300,function(){
                            $(sorok[i]).slideDown(300);
                            kezdosor++;    
                        });
                        
                    } else {
                        $(sorok[i]).slideDown(300);    
                    }
                    
                    break;
                }
            } 
            
            //console.log(sorok.length);
            //console.log(kezdosor);
            
            if ((kezdosor + mennyi_sor_latszik +1) == sorok.length) {
                // utolso szoveg
                $(".sl_b_egysor_utolso").html("Click to close");
            }
            
            if ((kezdosor + mennyi_sor_latszik) >= sorok.length) {
                // vege
                $("#storyline_beszelhetesek").hide();
            }
               
        });
        
        hang_lejatszas(41,{pan:0,volume:60});
        $("#storyline_beszelhetesek").show('slide',{direction:"left"},300);
        
        storyline_megtortent.push(id);
        
    }
    
    this.terkep_dom_felepitese = function() {
        //$("#terkepek_terkep");

        var terkep_matrix = this.getTerkepMatrix();
        var terkep_matrix_kiegeszitesek = this.getTerkepMatrixKiegeszitesek();

        
        var terkep_szelesseg = terkep_matrix[0].length;
        var terkep_magassag =  terkep_matrix.length ;
        var elem_meret = 8;
        
        terkep_canvas = document.createElement("canvas");
        ctx = terkep_canvas.getContext("2d");
        
        terkep_canvas.setAttribute("width", terkep_szelesseg * elem_meret);
        terkep_canvas.setAttribute("height", terkep_magassag * elem_meret);
        terkep_canvas.setAttribute("id", "terkep_tartalom_" + this.id);
        
        for (var x = 0; x < terkep_szelesseg; x++) {
            for (var y = 0; y < terkep_magassag; y++) {
                
                if (terkep_matrix[y][x] == 1) {
                    ctx.fillStyle = "black";
                    ctx.fillStyle = "rgba(0, 0, 0, .5)"
                    ctx.fillRect(x * elem_meret, y * elem_meret, elem_meret, elem_meret);
                } else {
                    ctx.fillStyle = "white";
                    ctx.fillRect(x * elem_meret, y * elem_meret, elem_meret, elem_meret);
                }
                
            }
        }
        
        for (var k=0;k<terkep_matrix_kiegeszitesek.length;k++) {
            var kiegeszito_ertek = terkep_matrix_kiegeszitesek[k];
            
            
            if (kiegeszito_ertek.tipus == "AJTO1" || kiegeszito_ertek.tipus == "AJTO2" ) {
                ctx.fillStyle = "red";
                ctx.fillRect(kiegeszito_ertek.x * elem_meret, kiegeszito_ertek.y * elem_meret, elem_meret, elem_meret);
            }
            if (kiegeszito_ertek.tipus == "NPC" ) {
                ctx.fillStyle = "blue";
                ctx.fillRect(kiegeszito_ertek.x * elem_meret, kiegeszito_ertek.y * elem_meret, elem_meret, elem_meret);
            }
            if (kiegeszito_ertek.tipus == "TELEPORT" ) {
                ctx.fillStyle = "brown";
                ctx.fillRect(kiegeszito_ertek.x * elem_meret, kiegeszito_ertek.y * elem_meret, elem_meret, elem_meret);
            }
            
            if (kiegeszito_ertek.tipus == "SZINTVALTAS_LE" || kiegeszito_ertek.tipus == "SZINTVALTAS_FEL") {
                var pozicio_mod_x = 0;
                var pozicio_mod_y = 0;
                if (kiegeszito_ertek.melyik_oldalon == "ESZAK") {
                    pozicio_mod_y = 1;
                }
                ctx.fillStyle = "green";
                ctx.fillRect((kiegeszito_ertek.x+pozicio_mod_x) * elem_meret, (kiegeszito_ertek.y+pozicio_mod_y) * elem_meret, elem_meret, elem_meret);
            }
        }
        
        $("#terkepek_terkep").append(terkep_canvas);
        
        $('#terkepek_szovegek_nev').html(this.meta.TERKEP_NEVE);
        
    }
    
    this.kiegeszitesek_pozicio_alapjan = function(x,y) {
        var ret = new Array(); 
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++) {
            if (this.terkep_matrix_kiegeszitesek[i].x == x && this.terkep_matrix_kiegeszitesek[i].y == y) {
                ret.push(this.terkep_matrix_kiegeszitesek[i]);
            }
         }    
         return ret;
     }

    
    this.getTerkepKiegeszitesek = function() {
        return {ezen_van:this.ezen_van,id:this.id,terkep_matrix_kiegeszitesek:this.terkep_matrix_kiegeszitesek};
    }
    

    
    this.dungeon_felepitese = function() {
        
        
        /*
        terkep_matrix = this.getTerkepMatrix();
        terkep_matrix_kiegeszitesek = this.getTerkepMatrixKiegeszitesek();

        
        terkep_szelesseg = terkep_matrix[0].length;
        terkep_magassag =  terkep_matrix.length ;
        */
        
        var terkep_matrix = this.terkep_matrix;
        var terkep_matrix_kiegeszitesek = this.terkep_matrix_kiegeszitesek;
        
        var terkep_szelesseg = this.terkep_szelesseg;
        var terkep_magassag =  this.terkep_magassag ;
        
        var elemek = new Elemek();
        
        
        // lerakjuk a falakat stb stb
        //padlo
        var o3d = elemek.createPadlo( {x:((cubesize*terkep_szelesseg)/2)-(cubesize/2),y:-38,z:((cubesize*terkep_magassag)/2)-(cubesize/2)}, { x:(cubesize*terkep_szelesseg), y:0, z:(cubesize*terkep_magassag)}, {x:terkep_szelesseg,y:terkep_magassag});
        scene.add(o3d);
        

        
        // plafon
        var o3d = elemek.createPlafon("assets/textures/" + this.meta.ALAP_PLAFON_TEXTURA, {x:((cubesize*terkep_szelesseg)/2)-(cubesize/2),y:38,z:((cubesize*terkep_magassag)/2)-(cubesize/2)}, { x:(cubesize*terkep_szelesseg), y:0, z:(cubesize*terkep_magassag)}, {x:terkep_szelesseg,y:terkep_magassag});
        scene.add(o3d);  
        
              
        // csak egyszer hozzuk letre a materialt! igy alig hasznal memoriat
        if (this.meta.ALAP_FAL_TEXTURA_NORMAL != "" && this.meta.ALAP_FAL_TEXTURA_SPECULAR != "") {
            // ha van normal es specular map is
            
            
            
            //toltes_jelzo_bekapcsol();
            //var texture = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_NORMAL,undefined,toltes_jelzo_kikapcsol);
            
            //console.log("texturebb ezlesz");
            var texture = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_NORMAL);
            
            //console.log("texturebb:");
            //console.log(texture);
            
            texture.anisotropy = anisotropy;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            //texture.repeat.x = 2;
            //texture.repeat.y = 2;
            
            
            //toltes_jelzo_bekapcsol();
            //var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_SPECULAR,undefined,toltes_jelzo_kikapcsol);
            var texture2 = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_SPECULAR);
            texture2.anisotropy = anisotropy;
            
            texture2.wrapS = THREE.RepeatWrapping;
            texture2.wrapT = THREE.RepeatWrapping;
            //texture2.repeat.x = 2;
            //texture2.repeat.y = 2;
            
            //toltes_jelzo_bekapcsol();
            //var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            var texture3 = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA);

            texture3.anisotropy = anisotropy;
            
            texture3.wrapS = THREE.RepeatWrapping;
            texture3.wrapT = THREE.RepeatWrapping;
            //texture3.repeat.x = 2;
            //texture3.repeat.y = 2;

            //var texture4 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/height.png");
            var v2 = new THREE.Vector2(1,1);
            //var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture, normalScale:v2 ,specularMap: texture2, specular: 0xffab7a, shininess: 40} );
            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture, normalScale:v2 ,specularMap: texture2, specular: 0xffab7a, shininess: 180} ); 
            
            
        } else {
            
            /*
            var texture = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
            */
            var texture = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA);
            //var texture = textura_konytarbol("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,new THREE.Vector2(1,1));
            var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
            

            
        }
        
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: texture, specular: 0xffab7a, shininess: 50 } );
        
        
        /*
        var texture = new THREE.ImageUtils.loadTexture("assets/textures/wall_stone01_cnormal.png");
        var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/wall_stone01_c.png");
        var v2 = new THREE.Vector2(1,1);
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture, normalScale:v2} );
        */
        /*
        var texture = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/normal.png");
        var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/specular.png");
        var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/diffuse.png");
        //var texture4 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/height.png");
        var v2 = new THREE.Vector2(1,1);
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture, normalScale:v2 ,specularMap: texture2, specular: 0xffab7a, shininess: 80} );
        */
        
        /*
        
        // igy lehet normal vagy bump mappot csinalni!
        
        var texture = new THREE.ImageUtils.loadTexture("assets/textures/pattern_177/normal.png");
        var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_177/specular.png");
        var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_177/diffuse.png");
        var texture4 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_177/height.png");
        var v2 = new THREE.Vector2(0,0);
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture, normalScale:v2 specularMap: texture2} );
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, bumpMap: texture, specularMap: texture2} );
        //var wallMaterial = new THREE.MeshPhongMaterial( {map: texture3, specularMap: texture2,bumpMap: texture4,bumpScale:0.4} );

        */
        
        // oszlopok
        

        
        /*
        toltes_jelzo_bekapcsol();
        var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,undefined,toltes_jelzo_kikapcsol);
        texture2.repeat.x = 0.3;
        texture2.repeat.y = 1;
        var wallMaterial2 = new THREE.MeshPhongMaterial( {map: texture2} );
        */
        
        
        
        if (this.meta.ALAP_FAL_TEXTURA_NORMAL != "" && this.meta.ALAP_FAL_TEXTURA_SPECULAR != "") {
            // ha van normal es specular map is
            //toltes_jelzo_bekapcsol();
            //var texture = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_NORMAL,undefined,toltes_jelzo_kikapcsol);
            var texture = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_NORMAL,new THREE.Vector2(0.3,1));
            
            //console.log("atexture:");
            //console.log(texture);
            
            texture.anisotropy = anisotropy;
            texture.repeat.x = 0.3;
            texture.repeat.y = 1;
            
            //toltes_jelzo_bekapcsol();
            //var texture2 = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_SPECULAR,undefined,toltes_jelzo_kikapcsol);
            var texture2 = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA_SPECULAR,new THREE.Vector2(0.3,1));
            
            texture2.anisotropy = anisotropy;
            texture2.repeat.x = 0.3;
            texture2.repeat.y = 1;
            
            //toltes_jelzo_bekapcsol();
            //var texture3 = new THREE.ImageUtils.loadTexture("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,undefined,toltes_jelzo_kikapcsol);
            var texture3 = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,new THREE.Vector2(0.3,1));
            texture3.anisotropy = anisotropy;
            texture3.repeat.x = 0.3;
            texture3.repeat.y = 1;
            
            var v2 = new THREE.Vector2(1,1);
            var wallMaterial2 = new THREE.MeshPhongMaterial( {map: texture3, normalMap: texture, normalScale:v2 ,specularMap: texture2, specular: 0xffab7a, shininess: 180} );
            
        } else {
        
        //var texture2 = textura_konytarbol("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,new THREE.Vector2(0.3,1));
            var texture2 = getTextureFromCache("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA,new THREE.Vector2(0.3,1));
           texture2.anisotropy = anisotropy;
           var wallMaterial2 = new THREE.MeshPhongMaterial( {map: texture2} );
            
        }               

        
        
        
        /*
        var otexture = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/normal.png");
        otexture.repeat.x = 0.3;
        otexture.repeat.y = 1;
        var otexture2 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/specular.png");
        otexture2.repeat.x = 0.3;
        otexture2.repeat.y = 1;
        var otexture3 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/diffuse.png");
        otexture3.repeat.x = 0.3;
        otexture3.repeat.y = 1;
        var otexture4 = new THREE.ImageUtils.loadTexture("assets/textures/pattern_125/height.png");
        otexture4.repeat.x = 0.3;
        otexture4.repeat.y = 1;
        var v2 = new THREE.Vector2(1,1);
        var wallMaterial2 = new THREE.MeshPhongMaterial({map: otexture3, normalMap: otexture, normalScale:v2 ,specularMap: otexture2, specular: 0xffab7a, shininess: 80}  );
        //var wallMaterial2 = new THREE.MeshPhongMaterial( {map: otexture3, specularMap: otexture2 ,bumpMap: otexture4,bumpScale:0.4} );
        */
        
        
        var combined = new THREE.Geometry();
        var combined2 = new THREE.Geometry();
        
        for (var x = 0; x < terkep_szelesseg; x++) {
            for (var y = 0; y < terkep_magassag; y++) {
                
                //var kiegeszito_ertekek = terkep_matrix_kiegeszitesek_pozicio_alapjan(x,y);
                
                var size = { x: cubesize, y: cubesize, z: cubesize };
                var position = {
                    x: size.x * x,
                    y: 0,
                    z: size.z * y
                };
                
                if (terkep_matrix[y][x] == 1) {
                    var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y, cubesize, 1, 1, 1 );
                    
                    var wall = new THREE.Mesh(wallGeometry, wallMaterial);
                    wall.position.set(position.x, position.y, position.z);
                    //scene.add(wall);


                    collidableMeshList.push(wall);
                    THREE.GeometryUtils.merge( combined, wall );

                    
                    
                    
                    
                    if (this.meta.FAL_OSZLOPOK == 1) {
                        // csak teszt fal kiugrok
                        // ezt jobb lenne egy custom geometryvel megcsinalni!
                        // vagy lehetnek oszlopokkent minden fal elem 4 oldalan
                        var wallGeometry = new THREE.CubeGeometry( cubesize-85, cubesize_y, cubesize-85, 1, 1, 1 );
                        var wall = new THREE.Mesh(wallGeometry, wallMaterial2);
                        wall.position.set(position.x+50, position.y, position.z-50);
                        //scene.add(wall);
                        
                        THREE.GeometryUtils.merge( combined2, wall );

                        
                        
                        var wallGeometry = new THREE.CubeGeometry( cubesize-85, cubesize_y, cubesize-85, 1, 1, 1 );
                        var wall = new THREE.Mesh(wallGeometry, wallMaterial2);
                        wall.position.set(position.x-50, position.y, position.z+50);
                        //scene.add(wall);
                        
                        THREE.GeometryUtils.merge( combined2, wall );
                        

                        
                    }
                   
                    
                    
                }   
                

                
                
            }
        }
        
        var wall = new THREE.Mesh(combined, wallMaterial);
        scene.add(wall);
        collidableMeshList.push(wall);

        var wall2 = new THREE.Mesh(combined2, wallMaterial2);
        scene.add(wall2);

        
        // kieg eszito ertekeken is vegigmegyunk:
        for (var k=0;k<terkep_matrix_kiegeszitesek.length;k++) {
            

            
            var kiegeszito_ertek = terkep_matrix_kiegeszitesek[k];
            
            var position = {
                    x: kiegeszito_ertek.x * cubesize,
                    y: 0,
                    z: kiegeszito_ertek.y * cubesize
                };
            
            //console.log(kiegeszito_ertek);
            
            if (kiegeszito_ertek.tipus == "KEZDO_POZICIO") {
                MovingCube.position.set((kiegeszito_ertek.x*cubesize), 0, (kiegeszito_ertek.y*cubesize));    
                
                
                // beallitjuk a frogast is!:
                MovingCube.rotation.y = rad(kiegeszito_ertek.merre_nez);
                      
            }
            
            
            if (kiegeszito_ertek.tipus == "AJTO_TITKOS1") {
                var o3d_ajto_1 = elemek.createDoorTitkos("assets/textures/"+ this.meta.ALAP_FAL_TEXTURA, position, { x:cubesize, y:cubesize_y, z:cubesize },kiegeszito_ertek.tipus,kiegeszito_ertek);
                
                scene.add(o3d_ajto_1);
                aktiv_objektumok.push(new Array(kiegeszito_ertek.id,o3d_ajto_1));
            }
            
            if (kiegeszito_ertek.tipus == "AJTO1" || kiegeszito_ertek.tipus == "AJTO2" ) {
                //console.log(kiegeszito_ertek);
                
                var o3d_ajto_1 = elemek.createDoor("assets/textures/celldoor1.png", position, { x:cubesize-40, y:cubesize_y, z:20 },kiegeszito_ertek.tipus,kiegeszito_ertek);
           
                scene.add(o3d_ajto_1);
                aktiv_objektumok.push(new Array(kiegeszito_ertek.id,o3d_ajto_1));
            }
            
            if (kiegeszito_ertek.tipus == "AJTO_KAPCSOLO1") {
                var melyik_objektumhoz_kapcsolodik = kiegeszito_ertek.ajto_id;
                //console.log("melyik_objektumhoz_kapcsolodik:" + melyik_objektumhoz_kapcsolodik);
                var melyik_a_mesh = 0; 
                
                for (var i=0;i<aktiv_objektumok.length;i++) {
                    if (aktiv_objektumok[i][0] == melyik_objektumhoz_kapcsolodik) {
                        melyik_a_mesh = aktiv_objektumok[i][1];
                        break;
                    }
                }
                //console.log("melyik_a_mesh:");
                //console.log(melyik_a_mesh);
                
                var o3d = elemek.createWallSwitch(position, melyik_a_mesh,kiegeszito_ertek);
                
            }
            
            if (kiegeszito_ertek.tipus == "AJTO_TITKOS1_KAPCSOLO1") {
                var melyik_objektumhoz_kapcsolodik = kiegeszito_ertek.ajto_id;
                var melyik_a_mesh = 0; 
                
                //console.log("melyik_objektumhoz_kapcsolodik:" + melyik_objektumhoz_kapcsolodik);
                //console.log(aktiv_objektumok);
                for (var i=0;i<aktiv_objektumok.length;i++) {
                    if (aktiv_objektumok[i][0] == melyik_objektumhoz_kapcsolodik) {
                        melyik_a_mesh = aktiv_objektumok[i][1];
                        break;
                    }
                }
                //console.log("melyik_a_mesh:");
                //console.log(melyik_a_mesh);
                
                var o3d = elemek.createTitkosKapcsolo(position, melyik_a_mesh,kiegeszito_ertek);
                
            }
            
            
            
            if (kiegeszito_ertek.tipus == "KULCSLYUK") {
                var melyik_objektumhoz_kapcsolodik = kiegeszito_ertek.ajto_id;
                var melyik_a_mesh = 0;
                
                for (var i=0;i<aktiv_objektumok.length;i++) {
                    if (aktiv_objektumok[i][0] == melyik_objektumhoz_kapcsolodik) {
                        melyik_a_mesh = aktiv_objektumok[i][1];
                        break;
                    }
                }
                
                
                //console.log(aktiv_objektumok);
                
                var o3d = elemek.createKulcslyuk( position, melyik_a_mesh,kiegeszito_ertek);
                scene.add(o3d); 
            }
            if (kiegeszito_ertek.tipus == "KULCSLYUK_AKTIV") {
                var melyik_objektumhoz_kapcsolodik = kiegeszito_ertek.ajto_id;
                var melyik_a_mesh = 0;
                
                for (var i=0;i<aktiv_objektumok.length;i++) {
                    if (aktiv_objektumok[i][0] == melyik_objektumhoz_kapcsolodik) {
                        melyik_a_mesh = aktiv_objektumok[i][1];
                        break;
                    }
                }
                
                //console.log(aktiv_objektumok);
                
                var o3d = elemek.createKulcslyukAktiv( position, melyik_a_mesh,kiegeszito_ertek);
                
            }
            
            
            
            if (kiegeszito_ertek.tipus == "UTJELZO_TABLA") {
                elemek.utjelzo_tabla_a_foldre(kiegeszito_ertek.szoveg, position);
            }
            if (kiegeszito_ertek.tipus == "TARGY") {
                elemek.targy_a_foldre(kiegeszito_ertek, position);
            }
            
            if (kiegeszito_ertek.tipus == "SZINTVALTAS_LE") {
                elemek.lepcso_le(kiegeszito_ertek, position);
            }
            if (kiegeszito_ertek.tipus == "SZINTVALTAS_FEL") {
                elemek.lepcso_fel(kiegeszito_ertek, position);
            }
            
            if (kiegeszito_ertek.tipus == "ELLENSEG") {
                
                var enemy = new Enemy(kiegeszito_ertek,position);
                enemy.create();
            }
            if (kiegeszito_ertek.tipus == "TABLA_FALRA") {
                elemek.tabla_falra(kiegeszito_ertek, position);
            }
            if (kiegeszito_ertek.tipus == "NPC") {
                
                var npc = new Npc(kiegeszito_ertek,position);
                npc.create();
            }
            if (kiegeszito_ertek.tipus == "LADA") {
                elemek.laba_foldre(kiegeszito_ertek, position);
            }
            if (kiegeszito_ertek.tipus == "TELEPORT") {
                elemek.teleport(kiegeszito_ertek, position);
            }
            if (kiegeszito_ertek.tipus == "FAKLYA") {
                elemek.faklya(kiegeszito_ertek, position);
            }
            if (kiegeszito_ertek.tipus == "FELTAMASZTAS") {
                elemek.feltamasztas(kiegeszito_ertek, position);
            }
            
            
            
            
            
            
            
            
        
        }   
        
        
        fenyek_bekapcsolasa3();
        
         // kiirjuk a terkep nevet:
                   

    }
    
    this.van_e_ajto_a_pozicioban = function(x,y) {
        var ret = false;
        
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].tipus == "AJTO1" || this.terkep_matrix_kiegeszitesek[i].tipus == "AJTO2" || this.terkep_matrix_kiegeszitesek[i].tipus == "AJTO3" || this.terkep_matrix_kiegeszitesek[i].tipus == "AJTO4" || this.terkep_matrix_kiegeszitesek[i].tipus == "AJTO5") {
                if (this.terkep_matrix_kiegeszitesek[i].x == x && this.terkep_matrix_kiegeszitesek[i].y == y) {
                    ret = true;
                }
            }
        }
        return ret;
    }
    
    this.hol_a_legkozelebbi_ures_hely = function (x,y) {
        var ret = {x:0, y:0};
        
        var uj_x = x;
        var uj_y = y-1;
        
        console.log(uj_x);
        console.log(uj_y);
        
        console.log("TERKEP hol_a_legkozelebbi_ures_hely TODO! tobbet is vizsgalni kell")
        
        console.log(this.terkep_matrix);
        console.log(this.terkep_matrix[uj_x][uj_y]);
        
        if (this.terkep_matrix[uj_y][uj_x] == 0) {
            ret.x = uj_x;
            ret.y = uj_y;
        }
        
        return ret;
        
    }
    
    // azt is elmetnuk merre nez
    this.kezdo_pozicio_frissitese_forgas = function(forgas){
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].tipus == "KEZDO_POZICIO") {
                this.terkep_matrix_kiegeszitesek[i].merre_nez = deg(forgas);
                break;
            }
        }
    }
    
    // minden lepes utan frissitjuk, igy menteskor ott fog kezdeni ahol kilepett!
    this.kezdo_pozicio_frissitese = function(x,y) {
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].tipus == "KEZDO_POZICIO") {
                this.terkep_matrix_kiegeszitesek[i].x = x;
                this.terkep_matrix_kiegeszitesek[i].y = y;
                break;
            }
        }
    }
    
    // ha felvette akkor kikeressuk a kiegeszitesekben es toroljuk a sort
    // az id a kiegeszietsek objetum id ja
    this.targy_felveve = function(id) {
        //console.log("terkep targy felevve:" +id);

        //console.log(terkep);
        
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == id) {
                this.terkep_matrix_kiegeszitesek.splice(i,1);
                //this.terkep_matrix_kiegeszitesek = item_kiveve;
                break;
            }
        }
        
        //console.log(this.terkep_matrix_kiegeszitesek);
        
        //console.log(this.terkep_matrix_kiegeszitesek_valtozasok);
        /*
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek_valtozasok.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek_valtozasok[i].id == id) {
                this.terkep_matrix_kiegeszitesek_valtozasok.splice(i,1);
            }
        }
        */
        //console.log(this.terkep_matrix_kiegeszitesek_valtozasok);
        
        
    }
    
    this.ellenseg_meghalt = function(id) {
        //console.log("ellenseg meghalt:" +id);

        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == id) {
                this.terkep_matrix_kiegeszitesek.splice(i,1);
                break;
            }
        }
        
        //console.log(this.terkep_matrix_kiegeszitesek);
        
    }
    
    
    // feltamasztas hasznalta
    this.feltamasztas = function(statue_id) {
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == statue_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                this.terkep_matrix_kiegeszitesek[i].hanyszor_hasznalta = 1;
                break;
            }
        }
    }
    
    //lada_id az extras.moon ID ja
    this.lada_kinyitva= function(lada_id) {
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == lada_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                this.terkep_matrix_kiegeszitesek[i].kinyitva = "IGEN";
                break;
            }
        }
    }
    
    // ajto_id az extras.moon ID ja
    this.sima_ajto_kinyitva = function(ajto_id) {
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == ajto_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                //console.log(i);
                //console.log(this.terkep_matrix_kiegeszitesek[i]);
                this.terkep_matrix_kiegeszitesek[i].kinyitva = "IGEN";
                //console.log(this.terkep_matrix_kiegeszitesek[i]);
                break;
            }
        }

    }
    
    this.titkos_ajto_kinyitva= function(ajto_id,kapcsolo_id) {
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == ajto_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                this.terkep_matrix_kiegeszitesek[i].kinyitva = "IGEN";
                break;
            }
        }
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == kapcsolo_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                this.terkep_matrix_kiegeszitesek[i].kinyitva = "IGEN";
                break;
            }
        }
    }
    
    // ajto_id az extras.moon ID ja
    this.zart_ajto_kinyitva = function(ajto_id,kulcslyuk_id) {
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == ajto_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                this.terkep_matrix_kiegeszitesek[i].kinyitva = "IGEN";
                //console.log(this.terkep_matrix_kiegeszitesek[i]);
                break;
            }
        }
        for (var i = 0; i < this.terkep_matrix_kiegeszitesek.length; i++ ) {
            if (this.terkep_matrix_kiegeszitesek[i].id == kulcslyuk_id) {
                // ezt nem kivesszuk mint pl az enemyt hanem csak felvesszuk a kinyitva erteket
                this.terkep_matrix_kiegeszitesek[i].kinyitva = "IGEN";
                //console.log(this.terkep_matrix_kiegeszitesek[i]);
                break;
            }
        }
    }
    

    
    this.getTerkepMatrix = function() {
        var ret;
        
        ret = this.terkep_matrix;
        
        return ret;
    }
    
    // itt olyan matrixot kell visszadni amiben az ajtok titkosajtok stb is benne van, hogy a pathifninding ne jusson collisionra!
    
    // ez egylore megsem kell, mert az ajtokon atmehet tehat azoknak jarhato utnak kel lenniuk es majd a collision detectel nezzzuk hogy nyitva van e
    // ez valamiert bebugol ha a ret nek erteket adok a nromal matrix is atveszi?!
    this.getTerkepMatrix_pathfindinghez = function() {
        var ret = this.getTerkepMatrix();
        
        for (var x = 0; x < this.terkep_szelesseg; x++) {
            for (var y = 0; y < this.terkep_magassag; y++) {
                
                var kiegeszito_ertekek = this.kiegeszitesek_pozicio_alapjan(x,y);
                for (var k=0; k<kiegeszito_ertekek.length;k++) {
                    if (kiegeszito_ertekek[k].tipus == "AJTO1" || kiegeszito_ertekek[k].tipus == "AJTO_TITKOS1" || kiegeszito_ertekek[k].tipus == "AJTO2"  ) {
                        // akkor a matrixban ezek is 1 esek lesznek tehat nem jarhato ut
                        //console.log("atirva x:" +x + " y:" + y);
                        //ret[y][x] = 1;
                    }
                }
            }
        }
            
        
        return ret;
    }
    
        
    this.getTerkepMatrixKiegeszitesek = function() {
        return this.terkep_matrix_kiegeszitesek;
    }
    
}


