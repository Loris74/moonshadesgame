<?php 
    require("application.php"); 
?>
<?php if ($_SESSION["belepve"] == 0) {header("Location: http://www.moonshadesgame.com/index.php"); exit;} ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
<head>
    <title>Moonshades</title>
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <link rel="stylesheet" type="text/css" href="css/design.css?v=13" />
    <link rel="stylesheet" type="text/css" href="css/jquery.qtip.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.contextMenu.css" />
    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>

    <script type='text/javascript' src='js/jquery.contextMenu.js'></script>
    
    <script type='text/javascript' src='js/jQueryRotateCompressed.2.2.js'></script>
     
    <script type='text/javascript' src='js/jquery.disable.text.select.js'></script>
    
    <script type='text/javascript' src='js/three.js'></script>
    
    <!--<script type='text/javascript' src='http://mrdoob.github.com/three.js/build/three.min.js'></script>-->
    
    <script type='text/javascript' src='js/stats.min.js'></script>
    <script type='text/javascript' src='js/Detector.js'></script>
    
    <script type='text/javascript' src='js/THREEx.FullScreen.js'></script>
    <script type='text/javascript' src="js/THREEx.WindowResize.js"></script>
    
    <script src='js/threex.domevent.js'></script>
    <script src='js/threex.domevent.object3d.js'></script>
    
    <script type="text/javascript" src="SpriteParticleSystem.js"></script>
    
    
    <script type='text/javascript' src='js/soundmanager2-jsmin.js'></script>
    
    
    
    <script src="js/pathfinding-browser.min.js"></script>
    <script src="js/jquery.qtip.min.js"></script>
    <script type='text/javascript' src='js/egybe.js'></script>
    <!--<script src="js/alap.js"></script>
    <script src="js/jquery.qtip.min.js"></script>
    <script src="js/Elemek.js"></script>
    <script src="js/Targyak.js"></script>
    <script src="js/Enemy.js"></script>
    <script src="js/Npc.js"></script>
    <script src="js/Karakter.js"></script>
    <script src="js/Skillek.js"></script>
    <script src="js/Terkep.js"></script>
    <script src="js/pathfinding-browser.min.js"></script>
    <script src="js/json2.js"></script>-->
</head>
<body>

<div id="toltes_jelzes">Loading <span class="toltes_kicsi"><br>(this is a temporary and slow server, if it takes<br> more than a half minute, try to refresh the page)</span><br>
    <span id="toltes_jelzes_models">Models...</span><br>
    <span id="toltes_jelzes_textures">Textures...</span><br>
    <span id="toltes_jelzes_sounds">Sounds...</span>
</div>


<div id="kerdoiv">
    <div class="kerdoiv_bevezeto">Please help us make the game better by answering these questions.</div>
    <div class="kerdoiv_kerdes">How hard was the fight?</div>
    <div class="kerdoiv_valasz_fej">
        <div class="kerdoiv_valasz1">Too easy</div>
        <div class="kerdoiv_valasz1">Easy</div>
        <div class="kerdoiv_valasz1">Just right</div>
        <div class="kerdoiv_valasz1">Hard</div>
        <div class="kerdoiv_valasz1">Too hard</div>
    </div>
    <br class="clear">
    <div class="kerdoiv_valasz_test">
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz1" value="1"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz1" value="2"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz1" value="3"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz1" value="4"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz1" value="5"></div>
        
    </div>
    <br class="clear">
    <div class="kerdoiv_kerdes">What do you think, how many skill slots each character needs?</div>
    <div class="kerdoiv_valasz_fej">
        <div class="kerdoiv_valasz1">5 for everyone</div>
        <div class="kerdoiv_valasz1">3 for everyone</div>
        <div class="kerdoiv_valasz1">Its ok now</div>
        <div class="kerdoiv_valasz1">2 for everyone</div>
        <div class="kerdoiv_valasz1">1 is enough</div>
    </div>
    <br class="clear">
    <div class="kerdoiv_valasz_test">
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz2" value="1"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz2" value="2"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz2" value="3"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz2" value="4"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz2" value="5"></div>
        
    </div>
    <br class="clear">
    <div class="kerdoiv_kerdes">What do you think about the graphics? (considering it's only a browser game)</div>
    <div class="kerdoiv_valasz_fej">
        <div class="kerdoiv_valasz1">Really bad</div>
        <div class="kerdoiv_valasz1">Can be better</div>
        <div class="kerdoiv_valasz1">Just right</div>
        <div class="kerdoiv_valasz1">I like it</div>
        <div class="kerdoiv_valasz1">Awesome :)</div>
    </div>
    <br class="clear">
    <div class="kerdoiv_valasz_test">
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz3" value="1"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz3" value="2"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz3" value="3"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz3" value="4"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz3" value="5"></div>
        
    </div>
    <br class="clear">
    <div class="kerdoiv_kerdes">Fighting or puzzles? Which one these two, would you like to encounter more?</div>
    <div class="kerdoiv_valasz_fej">
        <div class="kerdoiv_valasz1">Tons of puzzles</div>
        <div class="kerdoiv_valasz1">Lot of puzzles</div>
        <div class="kerdoiv_valasz1">The same amount</div>
        <div class="kerdoiv_valasz1">Lot of fighting</div>
        <div class="kerdoiv_valasz1">Fight in every corner</div>
    </div>
    <br class="clear">
    <div class="kerdoiv_valasz_test">
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz4" value="1"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz4" value="2"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz4" value="3"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz4" value="4"></div>
        <div class="kerdoiv_valasz1"><input type="radio" name="valasz4" value="5"></div>
        
    </div>
    <br class="clear">
    Any suggestions about skills, fight, ui or anything else?
    <br class="clear">
    <textarea cols="70" rows="4" id="valasz_egyeb"></textarea>
    <br class="clear">
    <input type="button" value="Send the answers" id="kerdoiv_gomb_elkuld" onclick="kerdoiv_elkuld();">
    <input style="margin-left: 300px;" type="Button" value="No thanks" id="kerdoiv_gomb_nem" onclick="kerdoiv_bezar();">
    
</div>


<div id="jatek_menu_fedo_reteg"></div>
<div id="jatek_menu">
    <div id="jatek_menu_cim">Game Paused</div>
    <div id="jatek_menu_belso">
        <div class="jatek_menu_menupont" id="jatek_menu_mentes">Save game</div>
        <div class="jatek_menu_menupont" id="jatek_menu_load">Load game</div>
        <div class="jatek_menu_menupont" id="jatek_menu_options">Options</div>
        <div class="jatek_menu_menupont" id="jatek_menu_exit">Exit to main menu</div>

    </div>
</div>


<div id="artifact_hatter">
    <div id="artifact_cim">Artifacts</div>
    <div id="artifact_darabok">
        <div class="artifact_darab">1</div>
        <div class="artifact_darab">2</div>
        <div class="artifact_darab">3</div>
        <div class="artifact_darab">4</div>
        <div class="artifact_darab">5</div>
    </div>
    <div class="artifact_sor">
        <div class="artifact_sor_darab_van">1/5</div>
        <div class="artifact_sor_o1"><img class="artifact_runa" title="Grants +10% HP for every character!" style="margin-top: 10px;" src="assets/images/runa1.png"></div>
    </div>
    <div class="artifact_sor">
        <div class="artifact_sor_darab_van">0/5</div>
    </div>
    <div class="artifact_sor">
        <div class="artifact_sor_darab_van">0/5</div>
    </div>
    <div class="artifact_sor">
        <div class="artifact_sor_darab_van">0/5</div>
    </div>
    <div class="artifact_sor">
        <div class="artifact_sor_darab_van">0/5</div>
    </div>
</div>



<div id="terkepek">
    <div id="terkepek_terkep"></div>
    <div id="terkepek_szovegek">
        <div id="terkepek_szovegek_nev">Upper dungeon level 1</div>
    </div>
</div>



<div class="gems_hatter" id="gems_0">
    <div class="lapok_dragndrop"></div>
    <div class="lapok_bezar" data-id="gems_0"></div>
    <div id="gems_tartalom">
        (Work in progress)<br><br>
        If you find soul gems from monsters you can use its power to summon it as a pet who will fight on your side!
    </div>
</div>

<div class="achievements_hatter" id="achievements_0">
    <div class="lapok_dragndrop"></div>
    <div class="lapok_bezar" data-id="achievements_0"></div>
    <div id="achievements_tartalom">
        (Work in progress)<br><br>
        <div class="archi_sor">
            <div class="archi_nev">Kill 5 skeleton</div>
            <div class="archi_jutalom">500 gold, 300 XP, 2 rare item</div>
        </div>
        <div class="archi_sor">
            <div class="archi_nev">Reach level 10 with every character</div>
            <div class="archi_jutalom">500 gold, 300 XP, 2 rare item</div>
        </div>
        <div class="archi_sor">
            <div class="archi_nev">Collect 15 bone from skeletons</div>
            <div class="archi_jutalom">500 gold, 300 XP, 2 rare item</div>
        </div>
        <div class="archi_sor">
            <div class="archi_nev">Deal more than 100 damage with a single hit</div>
            <div class="archi_jutalom">500 gold, 300 XP, 2 rare item</div>
        </div>
        <div class="archi_sor">
            <div class="archi_nev">Deal more than 500 damage with a single hit</div>
            <div class="archi_jutalom">500 gold, 300 XP, 2 rare item</div>
        </div>
        <div class="archi_sor">
            <div class="archi_nev">Found the first artifact</div>
            <div class="archi_jutalom">500 gold, 300 XP, 2 rare item</div>
        </div>
    </div>
</div>

<div class="forge_hatter" id="forge_0">
    <div class="lapok_dragndrop"></div>
    <div class="lapok_bezar" data-id="forge_0"></div>
    <div id="forge_tartalom">
        <div id="forge_tartalom_targy1"></div>
        <div id="forge_tartalom_targy2"></div>
        <div id="forge_tartalom_targy3"></div>
        <div id="forge_tartalom_targy4"></div>
        
        <div id="forge_tartalom_szoveg">If you find the first Artifact you can use its power to transmute runes,weapons or items from enemies.</div>
        
        
        <div id="forge_tartalom_gombok">
            
            <input type="button" value="Open discovered recipes">
        </div>
    </div>
</div>

<div class="kuldi_hatter" id="kuldi_0">
    <div class="lapok_dragndrop"></div>
    <div class="lapok_bezar" data-id="kuldi_0"></div>
    <div id="kuldi_tartalom"></div>
</div>


<div id="szinpad"></div>



<div id="site">
    <div id="site_baloldal">
        <!--<div id="minimap"></div>
        <br class="clear">-->
        <div id="terkep_neve">Upper dungeon level 1</div>
        <br class="clear">
        <div id="kuldetes_cuccok_baloldal">
            <div class="egy_kuldetes_baloldal">Search for the first Artifact</div>
            <div class="egy_kuldetes_leiras_baloldal">You need to find the first artifact. Try to get some clue from The Dark Cyst of Terror</div>
        </div>
        
        <br class="clear">
        <div id="storyline_beszelhetesek"></div>
        
    </div>

   
    <div id="portre_kontener"></div>    
    
    <div id="site_also">
        <div id="npc_interakcio_elinditva_div">
            <div id="npc_interakcio_elinditva_div_belso">
                <div id="npc_int_kep"><img width="100" src="assets/images/npc1.png"></div>
                <div id="npc_int_szovegek"></div>
            </div>
        </div>
        <br class="clear">
        
        <div id="npc_interakcio_div">
            <div class="jatek_menu_menupont" id="jatek_menu_mentes">Click here to talk</div>
        </div>
    
        <div class="iranyitas">
            <div id="iranyitas_kanyar_bal"><img width="70" src="assets/images/009463-silver-inlay-square-metal-icon-arrows-arrow-styled-left.png"></div>
            <div id="iranyitas_fel"><img width="70" src="assets/images/009468-silver-inlay-square-metal-icon-arrows-arrow-thick-up.png"></div>
            <div id="iranyitas_kanyar_jobb"><img width="70" src="assets/images/009464-silver-inlay-square-metal-icon-arrows-arrow-styled-right.png"></div>
            <div id="iranyitas_bal"><img width="70" src="assets/images/009466-silver-inlay-square-metal-icon-arrows-arrow-thick-left.png"></div>
            <div id="iranyitas_le"><img width="70" src="assets/images/009465-silver-inlay-square-metal-icon-arrows-arrow-thick-down.png"></div>
            <div id="iranyitas_jobb"><img width="70" src="assets/images/009467-silver-inlay-square-metal-icon-arrows-arrow-thick-right.png"></div>
        </div>
        <div class="iranytu"><img width="150" id="iranytu_kep" src="assets/images/iranytu3.png"></div>
        
        
        
        
        <div id="szovegek_kulso" >
            <div id="szovegek"></div>
        </div>
        
        <div class="menuk_hatter">
            
            <div class="menuk_egymenu" id="menuk_gems"><img src="assets/images/ikon_gem.png"></div>
            <div class="menuk_egymenu" id="menuk_forge"><img src="assets/images/ikon_kard.png"></div>
            <div class="menuk_egymenu" id="menuk_achievements"><img src="assets/images/ikon_papir.png"></div>
            <div class="menuk_egymenu" id="menuk_terkep"><img src="assets/images/ikon_terkep.png"></div>
            <div class="menuk_egymenu" id="menuk_artifakt"><img src="assets/images/ikon_konyv.png"></div>
            <div class="menuk_egymenu" id="menuk_jatek_menu"><img src="assets/images/ikon_beallitas.png"></div>
            
            
        </div>
    </div>
    
</div>




<script type="text/javascript">
    
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage(); 
    
    // ide kerul minden textura es model
    // {textura_fajl:"",textura_obj:texture,repeat:THREE.Vector2}
    // elotte 53.17Mb
    var textura_konyvtar = [];
    
    function textura_konytarbol(url,repeat_vector) {
        // megnezzuk szerepel e mar benne
        var benne_van_mar = 0;
        var ret = null;
        
        for (var i=0;i<textura_konyvtar.length;i++) {
            if (textura_konyvtar[i].textura_fajl == url && textura_konyvtar[i].repeat == repeat_vector) {
                ret = textura_konyvtar[i].textura_obj;
                benne_van_mar = 1;
                break;
            }
        }
        
        if (benne_van_mar == 0) {
            // ha nincs benne akkor felvesszuk es visszadjuk
            toltes_jelzo_bekapcsol();
            var textura = new THREE.ImageUtils.loadTexture(url,undefined,toltes_jelzo_kikapcsol);
            if (repeat_vector != "") {
                textura.repeat = repeat_vector;    
            }
            
            textura_konyvtar.push({"textura_fajl":url,"textura_obj":textura,repeat:repeat_vector});
            
            ret = textura;
        }
        
        return ret;
    }

    
    /*
    var t1 = textura_konytarbol("assets/textures/wall_stone01_c.png","");
    console.log(t1);
    
    var t2 = textura_konytarbol("assets/textures/wall_stone01_c.png",new THREE.Vector2(0.9,0.8));
    console.log(t2);
    
    var t3 = textura_konytarbol("assets/textures/wall_stone01_c.png","");
    console.log(t3);
    */
    
    var modellek_betolteshez = [];
    
    // set the scene size
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        

    // set some camera attributes
    var VIEW_ANGLE = 75,
        ASPECT = WIDTH / HEIGHT,
        //ASPECT = 1.3333,
        NEAR = 0.1,
        FAR = 600;

    // get the DOM element to attach to
    var container = $('#szinpad');
    var renderer;
    var camera;
    var scene;
    
    var stats;
    
    // ez megy a kameraval egyutt
    var MovingCube;
    var collidableMeshList = [];
    
    // ide kerulnek pl az ajtok amiket kapcsolokkal lehet vezerelni
    var aktiv_objektumok = [];
    
    // ha a jatekos eppen mozgasban van
    var eppen_mozog = 0;
    
    var mindeki_halott = 0;
    
    var miniMap;
    
    // minden fal elem ekkora es a jatekos, enemy stb is is!
    var cubesize = 100;
    // a falak stb kicsit alacosnyabbak mint a szelsseguk igy mozgasnal jobban raltni a padlora
    var cubesize_y = cubesize-24;
    
    var terkep = new Terkep();
    //var terkep_matrix;
    
    //var terkep_matrix_pathfindinghez;
    
    //var terkep_matrix_kiegeszitesek;
    
    // ide mentjuk a terkepekt amig  a sizntek kozott maszkal aztan mentekor ebbol mentunk!
    // az elemek teljes terkep objektumok
    var ideiglenes_terkepek = new Array();
    
    // ide mentjuk ha a beszlegtees mar megtortent egyszeruen csak egy tomb a beszlgetes ID val, ha szerelep akkor mar lezajlott
    var storyline_megtortent = [];
    
    // jatek betoltesekor ide mentjuk az npc valtozo adatait es ha npct hozunk letre akkor megnezzuk van e it thozza adat ha igen akkor atvesszuk
    var ideiglenes_npc_adatok = false;

    var terkep_szelesseg;
    var terkep_magassag;

    //var grid = new PF.Grid(terkep_szelesseg, terkep_magassag, terkep_matrix);
    //var finder = new PF.AStarFinder();

    var grid;
    var finder;
    
    var clock = new THREE.Clock();
    
    // ide kerul minden ellenseg , npc akit mozgatni kell
    var npck = new Array();
    var ellensegek = new Array();
    var karakterek = new Array();
    
    var dropok = new Array();

    var morphs = [];
    var clock = new THREE.Clock();            

    
    var targyak = new Targyak();

    var texture_skill_anim_magic_006;
    var texture_skill_anim_fire_002;
    var texture_skill_anim_cast_001;
    
    
    var texture_skill_anim_thunder_002;
    var texture_skill_anim_cast_008;
    var texture_skill_anim_darkness_002;
    var texture_skill_anim_fire_001;
    var texture_skill_anim_light_004;
    var texture_skill_anim_fire_002;
    var texture_skill_anim_wind_003;
    var texture_skill_anim_magic_007;
    var texture_skill_anim_cast_009;
    
    var texture_skill_anim_effect_002;
    texturak_preload();
    
    
    
    
    var skillek = new Skillek();
    
    var pointLightF;
    
    var requestId;
    
    var pointLight;
    var pointLight2;
    
    var utes_3do;
    
    var materials = [];
    
    
    var group;
    
    var particles = false;
    
    var sparksEmitter;
    
    // ebbe kerulnek a particlesystemes tuzek
    var psys_tomb = new Array();
    // ide pedig a tuzhez tartozo fenyforrasok
    var psys_tomb_fenyek = new Array();
    
    var skill_animaciok = [];
    
    var anisotropy;
    
    
    // kari cserhez kell. 0 ha nincs sneki kijelolve egyebkent a karakter id
    var karakter_cserere_kijelolve = 0;
    
    var geometry_cache = [
        {url:"assets/models/torch/torch.js",betoltve:0,geometry:null,materials:null},
        {url:"assets/models/teleport/teleporter3.js",betoltve:0,geometry:null,materials:null},
        {url:"assets/models/antlion/antlion.js",betoltve:0,geometry:null,materials:null},
        {url:"assets/models/spider/spider_flare.js",betoltve:0,geometry:null,materials:null},
        {url:"assets/models/npc_lany/fleurOptonl6.js",betoltve:0,geometry:null,materials:null},
        {url:"assets/models/treasurechestidle.js",betoltve:0,geometry:null,materials:null},
        
        
        
    ];
    
    var texture_cache = [
        {"url":"assets/textures/pattern_133/diffuse.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/textures/pattern_133/normal.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/textures/pattern_133/specular.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/textures/pattern_133/diffuse.png","textura_obj":null,"repeat":new THREE.Vector2(0.3,1),betoltve:0},
        {"url":"assets/textures/pattern_133/normal.png","textura_obj":null,"repeat":new THREE.Vector2(0.3,1),betoltve:0},
        {"url":"assets/textures/pattern_133/specular.png","textura_obj":null,"repeat":new THREE.Vector2(0.3,1),betoltve:0},
        {"url":"assets/textures/pattern_34/diffuse.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/textures/pattern_34/normal.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/textures/pattern_34/specular.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/textures/particles/sajatfire1.png","textura_obj":null,"repeat":null,betoltve:0},
        {"url":"assets/images/sign2.png","textura_obj":null,"repeat":null,betoltve:0}
        
        
    ];
    
    
    function texturak_betoltes() {
        for (var i=0; i<texture_cache.length;i++) {
            var textura = new THREE.ImageUtils.loadTexture(texture_cache[i].url,undefined,textura_load_callback(texture_cache[i].url,i),textura_load_callback_hiba(texture_cache[i].url,i));

            
        }
    }

    function textura_load_callback(url,i) {
        return function(textura){
            if (texture_cache[i].repeat != null) {
                textura.repeat = texture_cache[i].repeat;    
            }
            texture_cache[i].textura_obj = textura;
            texture_cache[i].betoltve = 1;
        }
    }
    
    function textura_load_callback_hiba(url,i) {
        return function(textura){
            
            $("#toltes_jelzes_textures").html("Textures... Error loading textures. Please try to reload the site.");
            
            console.log("HIBA!: texturat nem lehet betolteni:" + url);
            
            mozgas_logolas("toltes HIBA! texturat nem lehet betolteni:" + url);
        }
    }
    
    
    function getTextureFromCache(url,repeat_vector) {
        var ret = null
        for (var i=0;i<texture_cache.length;i++) {
            

            if (typeof repeat_vector !== "undefined")  {
                if (texture_cache[i].url == url && texture_cache[i].textura_obj.repeat.x == repeat_vector.x && texture_cache[i].textura_obj.repeat.y == repeat_vector.y) {
                    ret = texture_cache[i].textura_obj;
                    break;
                }
            } else {
                if (texture_cache[i].url == url) {
                    ret = texture_cache[i].textura_obj;
                    break;
                }
                
            }
            
        }
        
        
        
        return ret;
    }
    
    
    function geometryk_betoltes() {
        var ts = Date.now();
        var loader = new THREE.JSONLoader();
        for (var i=0; i<geometry_cache.length;i++) {
            //var load = loader.load( geometry_cache[i].url + '?ts=' + ts, geo_load_callback(geometry_cache[i].url,i) );
            var load = loader.load( geometry_cache[i].url, geo_load_callback(geometry_cache[i].url,i) );
            
        }
    }
    
    function geo_load_callback(url,i) {
        return function(geometry,material){
            geometry_cache[i].betoltve = 1;
            geometry_cache[i].geometry = geometry;
            geometry_cache[i].materials = material;
            
            
        
        }
    }
    
    function getGeomertyFromCache(url) {
        var ret = null;
        for (var i=0; i<geometry_cache.length;i++) {
            if (geometry_cache[i].url == url) {
                ret = geometry_cache[i];
                break;
            }
            
        }
        return ret;
    }
    
  
    
    
    var skeleton_geo = null;
    
    var mouseX,mouseY;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    
    var sprite_mapA;
    var mapC;

            var group;
            var time = 0; 
            
    function scene_init_zene_lejatszas() {
        sound_ambient1.play();
    }
    
    $(document).ready(function() {
        
        mozgas_logolas("toltes elkezdodik");
        
        $("#toltes_jelzes").show();
        
        var geometryk_betoltve = 0;
        var texturak_betoltve = 0;
        
        // eloszor betoltjuk a geometryket
        geometryk_betoltes();
        texturak_betoltes();
        
        // ha minde betoltodott akkor inditjuk a tobbit
        var geo_toltes = setInterval(function(){
            var mind_betoltve = 1;
            var mennyi_lett_betoltve = 0;
            for (var i=0; i<geometry_cache.length;i++) {
                if (geometry_cache[i].betoltve == 0) {
                    mind_betoltve = 0;
                } else {
                    mennyi_lett_betoltve++;
                }
            }  
            
            if (mind_betoltve == 1) {
                clearInterval(geo_toltes);
                // elindul a tobbi
                
                $("#toltes_jelzes_models").html("Models... done");
                
                geometryk_betoltve = 1;
                
                mozgas_logolas("toltes geometryk_betoltve");
            } else {
                $("#toltes_jelzes_models").html("Models... "+ mennyi_lett_betoltve +"/" + (geometry_cache.length) + " loaded");
            }
        },200);
        
        var textura_toltes = setInterval(function(){
            var mind_betoltve = 1;
            var mennyi_lett_betoltve = 0;
            for (var i=0; i<texture_cache.length;i++) {
                if (texture_cache[i].betoltve == 0) {
                    mind_betoltve = 0;
                } else {
                    mennyi_lett_betoltve++;
                }
            }  
            
            if (mind_betoltve == 1) {
                clearInterval(textura_toltes);
                // elindul a tobbi
                
                $("#toltes_jelzes_textures").html("Textures... done");
                
                texturak_betoltve = 1;
                mozgas_logolas("toltes texturak_betoltve");
                
           } else {
                $("#toltes_jelzes_textures").html("Textures... "+ mennyi_lett_betoltve +"/" + (texture_cache.length) + " loaded");
            }
        },200);
        
        var minden_toltes = setInterval(function(){
            
            //console.log(geometryk_betoltve);
            //console.log(texturak_betoltve);
            
            if (geometryk_betoltve == 1 && texturak_betoltve == 1) {
                clearInterval(minden_toltes);
                // elindul a tobbi
                
                
                //$("#toltes_jelzes").hide();
                
                
                init_load_utan();
                
                
                
                
            }
        },200);
        
        
        var hangok_toltes = setInterval(function(){
            var mind_betoltve = 1;
            var mennyi_lett_betoltve = 0;
            for (var i=0; i<hangok_betoltesre.length;i++) {
                //console.log(hangok_betoltesre[i][2]);
                if (hangok_betoltesre[i][2] == 0) {
                    mind_betoltve = 0;
                } else {
                    mennyi_lett_betoltve++;
                }
            }  
            
            if (mind_betoltve == 1) {
                
                mozgas_logolas("toltes hangok_betoltve");
                
                clearInterval(hangok_toltes);
                $("#toltes_jelzes_sounds").html("Sounds... done");
                $("#toltes_jelzes").hide();
                
           } else {
                $("#toltes_jelzes_sounds").html("Sounds... "+ mennyi_lett_betoltve +"/" + (hangok_betoltesre.length) + " loaded");
            }
        },500);
        // hangok beteolteset is figyeljuk
        
                        
                

        
        
        
    });
    
    function init_load_utan() {
        
        mozgas_logolas("toltes init_load_utan");
        
        //hang_lejatszas(22,{pan:0,volume:80});
        hang_lejatszas(27,{pan:0,volume:14,loops:100});
        //hang_lejatszas(1,{pan:0,volume:30});
        
        renderer = new THREE.WebGLRenderer({'antialias':true, maxLights: 5 });
        renderer.setSize(WIDTH, HEIGHT);
        //renderer.shadowMapEnabled = true;
        //renderer.autoClear = true;
        
        var maxAnisotropy = renderer.getMaxAnisotropy();
        anisotropy = maxAnisotropy;
        
        container.append(renderer.domElement);

        
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        $("#site").append( stats.domElement ); 
        
                
        scene = new THREE.Scene();
        //scene.fog = new THREE.FogExp2( 0x000000, 0.0055 );
        //scene.fog = new THREE.FogExp2( 0x000000, 0.0045 );
        scene.fog = new THREE.FogExp2( 0x000000, 0.0035 );

        camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,ASPECT,NEAR,FAR  );
        scene.add(camera);
        
        // transparently support window resize
        var windowResize = THREEx.WindowResize(renderer, camera)
        
        
        if( THREEx.FullScreen.available() ){
                //THREEx.FullScreen.bindKey();        
                //document.getElementById('inlineDoc').innerHTML    += "- <i>f</i> for fullscreen";
        }
        
        THREE.Object3D._threexDomEvent.camera(camera);
        
        

        
        // fenyek
        pointLight3 = new THREE.PointLight( 0xffffff ,0.2,100 );
        pointLight3.position.x = 500;
        pointLight3.position.y = 0;
        pointLight3.position.z = 1800;
        //scene.add(pointLight3);    
        
        
        var directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
        directionalLight.position.set(1400, 30, 200);
        directionalLight.target = camera;
        //scene.add(directionalLight);
        

        var ambientLight = new THREE.AmbientLight(0x444444);
        //var ambientLight = new THREE.AmbientLight(0x555555);
        //var ambientLight = new THREE.AmbientLight(0xffffff);
        //var ambientLight = new THREE.AmbientLight(0x111111);
        scene.add(ambientLight);
    
        
        
        var loader = new THREE.JSONLoader();
        loader.load( "assets/models/roca.js", function( geometry ) {
            //var wireMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
            var texture = new THREE.ImageUtils.loadTexture("assets/textures/wall_stone01_c.png");
        //var texture = new THREE.ImageUtils.loadTexture("assets/textures/pattern_07/diffus.png");
        
        var wallMaterial = new THREE.MeshPhongMaterial( {map: texture} );
            
            var wireMaterial = new THREE.MeshPhongMaterial(  );
            var mesh2 = new THREE.Mesh( geometry, wallMaterial );
            

                
            
            //mesh2.rotation.y = rad(10);
            mesh2.position.set(60, -39, 420);
            mesh2.scale.x = 5;
            mesh2.scale.y = 5;
            mesh2.scale.z = 5;
            scene.add(mesh2);
            
          
            
        });
        
        
        
        
           
           
           
           
           
           
// create sprites

    /*
                var mapC = THREE.ImageUtils.loadTexture( "assets/textures/particles/firesajat1.png" );
                
                mapC.needsUpdate=true;
                
                //var boomer = new TextureAnimator( mapC, 5, 6, 30, 40 ); // texture, #horiz, #vert, #total, duration.
                var boomer = new TextureAnimator( mapC, 5, 6, 30, 40 ); // texture, #horiz, #vert, #total, duration.
                skill_animaciok.push(boomer);
                
                var sprite = new THREE.Sprite( { map: mapC, useScreenCoordinates: false, color: 0xffffff, fog: true } );
                //sprite.uvScale.set( 2, 2 );
                //sprite.uvOffset.set( -0.5, -0.5 );
                sprite.scale.set( 50, 50, 1.0 );
                    
                scene.add( sprite );
                sprite.position.set( 100,0,100 );
      */
      
       
        
   
        
        
        
        // minimap
        //miniMap = new Demonixis.Gui.MiniMap(terkep_szelesseg, terkep_magassag, "minimap");
        //miniMap.create();
   

        // a jatekos!!
        var cubeGeometry = new THREE.CubeGeometry(cubesize,cubesize_y,cubesize,1,1,1);
        var wireMaterial = new THREE.MeshBasicMaterial( { wireframe:false } );
        MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
        MovingCube.position.set(100, 0, 200);
        MovingCube.visible = false;
        
        
        
        //pointLightF = new THREE.PointLight( 0xffab7a ,1.7,210 ); 
        //scene.add(pointLightF);
        //pointLightF.position = MovingCube.position;
        
        
        //pointLightF.position.x = MovingCube.position.x;
        //pointLightF.position.z = MovingCube.position.z;
        //pointLightF.position.y = 90;
        //pointLightF.position.set(1900,0,1000);
        

        
        /*
        
        //var light = new THREE.SpotLight( 0xffab7a, 1, 0, Math.PI, 1 );
        var light = new THREE.SpotLight( 0xffab7a, 2.2, 190 , Math.PI,0.4);
        light.position.set( 145, 0, 100 );
        light.target.position.set(120, 0, 100 );
        //light.target.position = MovingCube.position;
        light.target.position.set( 70, 0, 140 );
        //light.color.setHSV( 0.6, 0.05, 1 ); 
        light.castShadow = false;

        //light.shadowCameraNear = 700;
        //light.shadowCameraFar = camera.far;
        //light.shadowCameraFov = 50;

        //light.shadowCameraVisible = true;

        //light.shadowBias = 0.0001;
        //light.shadowDarkness = 0.5;


        scene.add( light );
        
        
        var mennyit_mozdul_a_feny = 3;
        
        
        
        setInterval(function(){
            
            var rand = randint(-mennyit_mozdul_a_feny,mennyit_mozdul_a_feny);
            light.position.z += rand;
            if (light.position.z > 100+mennyit_mozdul_a_feny) {
                light.position.z = 100;
            }
            if (light.position.z < 100-mennyit_mozdul_a_feny) {
                light.position.z = 100;
            }
            
            
            var rand = randint(-mennyit_mozdul_a_feny,mennyit_mozdul_a_feny);
            light.position.y += rand;
            if (light.position.y > 0+mennyit_mozdul_a_feny) {
                light.position.y = 0;
            }
            if (light.position.y < 0-mennyit_mozdul_a_feny) {
                light.position.y = 0;
            }
            
           
            
        },70);
        
        
         
        var aaa = new THREE.CubeGeometry(10,10,10,1,1,1);
        var aaam = new THREE.MeshBasicMaterial( { wireframe:true } );
        aaam.transparent = true;
        var bbb = new THREE.Mesh( aaa, aaam );
        bbb.position.set(140, 0, 100);
        scene.add(bbb);
         
        */
        
        

        
        // eszak
        MovingCube.rotation.y = 0;
        scene.add( MovingCube );    
        
        collidableMeshList.push(MovingCube);
        
        
        
        
        
  
        
        
        
        
        
        texturak_preload();
        
        // jatek betoltese!
        // ez bellitja a karaktereket terkepet stb is.!
        // ha most kezdte a jatekot akkor a mentes_id = 0;
        jatek_betoltese(<?php if (isset($_GET["mentes_id"])) { echo $_GET["mentes_id"]; } else { echo "0"; } ?>);
        
        
        init_hangok_load_utan();
    }
    

    
    
    
    
    function texturak_preload() {
        
        toltes_jelzo_bekapcsol();
        texture_skill_anim_magic_006 = new THREE.ImageUtils.loadTexture( 'assets/sprites/magic_006.png',undefined,toltes_jelzo_kikapcsol ); 
        
        toltes_jelzo_bekapcsol();
        texture_skill_anim_fire_002 = new THREE.ImageUtils.loadTexture( 'assets/sprites/fire_002.png',undefined,toltes_jelzo_kikapcsol ); 

        texture_skill_anim_cast_001 = new THREE.ImageUtils.loadTexture( 'assets/sprites/cast_001.png' ); 
        
        texture_skill_anim_cast_008 = new THREE.ImageUtils.loadTexture( 'assets/sprites/cast_008.png' ); 
        
        texture_skill_anim_thunder_002 = new THREE.ImageUtils.loadTexture( 'assets/sprites/thunder_002.png' ); 
        
        
        
        texture_skill_anim_darkness_002 = new THREE.ImageUtils.loadTexture( 'assets/sprites/darkness_002.png' ); 
        texture_skill_anim_fire_001 = new THREE.ImageUtils.loadTexture( 'assets/sprites/fire_001.png' ); 
        texture_skill_anim_light_004 = new THREE.ImageUtils.loadTexture( 'assets/sprites/light_004.png' ); 
        texture_skill_anim_darkness_001 = new THREE.ImageUtils.loadTexture( 'assets/sprites/darkness_001.png' ); 
        texture_skill_anim_fire_002 = new THREE.ImageUtils.loadTexture( 'assets/sprites/fire_002.png' ); 
        texture_skill_anim_wind_003 = new THREE.ImageUtils.loadTexture( 'assets/sprites/wind_003.png' ); 
        texture_skill_anim_fire_003 = new THREE.ImageUtils.loadTexture( 'assets/sprites/fire_003.png' ); 
        texture_skill_anim_magic_007 = new THREE.ImageUtils.loadTexture( 'assets/sprites/magic_007.png' ); 
        texture_skill_anim_cast_009 = new THREE.ImageUtils.loadTexture( 'assets/sprites/cast_009.png' ); 
        
        // buffok
        texture_skill_anim_effect_002 = new THREE.ImageUtils.loadTexture( 'assets/sprites/magic_003.png' ); 
        

        
    }
    
    
    function createScene( geometry, scale, material ) {

                geometry.computeTangents();

                mesh1 = new THREE.Mesh( geometry, material );

                mesh1.position.y = - 30;
                mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = scale;

                scene.add( mesh1 );

                

            }

   
    
    function init() {
        //window.addEventListener( 'resize', onWindowResize, false );

        

        
        // tesztek

        

        
        // utes mesh csak temp
        var wallGeometry = new THREE.PlaneGeometry(cubesize, cubesize_y,1,1);
        
        //var wallGeometry = new THREE.CubeGeometry( cubesize, cubesize_y, cubesize, 1, 1, 1 );
        var wallMaterial = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture("assets/images/utes_sprite_atlatszo.png")} );
        wallMaterial.transparent = 1;
        utes_3do = new THREE.Mesh(wallGeometry, wallMaterial);
        utes_3do.rotation = camera.rotation;
        utes_3do.visible = false;
        scene.add(utes_3do);        

        
        
        
   
                    
            
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
        
        
        
        $("#iranyitas_fel").click(function(){mozgas('fel'); });
        $("#iranyitas_le").click(function(){mozgas('le'); });
        $("#iranyitas_jobb").click(function(){mozgas('jobb'); });
        $("#iranyitas_bal").click(function(){mozgas('bal'); });
        $("#iranyitas_kanyar_jobb").click(function(){fordulas('jobb'); });
        $("#iranyitas_kanyar_bal").click(function(){fordulas('bal'); });
    
        animate();
    }
    
    function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration, vegtelen) {    
        // note: texture passed by reference, will be updated by the update function.
            
        this.tilesHorizontal = tilesHoriz;
        this.tilesVertical = tilesVert;
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet. 
        this.numberOfTiles = numTiles;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
        texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

        // how long should each image be displayed?
        this.tileDisplayDuration = tileDispDuration;

        // how long has the current image been displayed?
        this.currentDisplayTime = 0;

        // which image is currently being displayed?
        //this.currentTile = (this.tilesHorizontal-1);
        this.currentTile = 0;
        
        var currentColumn = 0;
        texture.offset.x = currentColumn / this.tilesHorizontal;
        //var currentRow = (this.tilesHorizontal-2) - Math.floor( this.currentTile / this.tilesHorizontal );
        var currentRow = (this.tilesHorizontal);
        texture.offset.y = currentRow / this.tilesVertical;
        
        this.currentTile = 0;
        
        this.update = function( milliSec )
        {
                
            this.currentDisplayTime += milliSec;
            while (this.currentDisplayTime > this.tileDisplayDuration)
            {
                this.currentDisplayTime -= this.tileDisplayDuration;
                this.currentTile++;
                
                    
                var currentColumn = this.currentTile % this.tilesHorizontal;
                texture.offset.x = currentColumn / this.tilesHorizontal;
                //var currentRow = (this.tilesHorizontal-1) - Math.floor( this.currentTile / this.tilesHorizontal );
                //var currentRow = (this.tilesHorizontal-2) - Math.floor( this.currentTile / this.tilesHorizontal );
                //var currentRow = this.tilesHorizontal - Math.floor( this.currentTile / this.tilesHorizontal );
                var currentRow = (this.tilesVertical-1) - Math.floor( this.currentTile / this.tilesHorizontal );
                texture.offset.y = currentRow / this.tilesVertical;
                //console.log("tilesHorizontal:" + this.tilesHorizontal + " tilesVertical:" + this.tilesVertical + " currentColumn:" + currentColumn + " currentRow:" + currentRow + " this.currentTile:" + this.currentTile);
                if (this.currentTile == this.numberOfTiles) {
                    //console.log("vege");
                    if (vegtelen == 1) {
                        this.currentTile = 0;    
                    } else {
                        for (var i=0; i<skill_animaciok.length; i++) {
                            if (skill_animaciok[i] == this) {
                                skill_animaciok.splice(i,1);   
                                //console.log("kiveve");     
                                //console.log(skill_animaciok);
                            }
                            
                        }
                        
                    }
                    
                    
                    
                    
                }
                
            }
        };
    }    
    
    function fordulas(merre) {
        if (mindeki_halott == 1) {
            // nem lehet mozogni
            return;   
        }

        if (eppen_mozog == 0) {
            eppen_mozog =1;
            var rotation = 0;
            
            //hang_lejatszas(20,{pan:0,volume:80,from:0,to:300});
            var rand = randint(34,37);
            hang_lejatszas(rand,{pan:0,volume:40});
            
            
            if (merre == "bal") {
                rotation = MovingCube.rotation.y + rad(90);
                
                    var aaa = 0;
                    goInt = setInterval(function()
                    {
                        aaa++;
                        MovingCube.rotation.y += rad(3);  
                        if( aaa >= 30)
                        {
                            clearInterval(goInt);
                            eppen_mozog =0;
                            if (MovingCube.rotation.y >= rad(359)) {
                                MovingCube.rotation.y = 0;
                            }
                            
                            terkep.kezdo_pozicio_frissitese_forgas(MovingCube.rotation.y);
                            
                            // fordulas utan van e npc
                            var vane_npc = pozicioban_van_e_npc();
                            if (vane_npc) {
                                //npc_interakcio_be(vane_npc);
                            } else {
                                npc_interakcio_ki();
                            }

                            
                            $("#iranytu_kep").rotate({animateTo:deg(MovingCube.rotation.y)})

                        }  
                        
                    },1);
                
            }
            if (merre == "jobb") {
                if (MovingCube.rotation.y == 0) {
                    MovingCube.rotation.y = rad(360);
                }
                rotation = MovingCube.rotation.y - rad(90);
                //if (rotation < rad(0)) { rotation = rad(270); }
                
                            
                     var aaa = 0;
                    goInt = setInterval(function()
                    {
                        aaa++;
                        MovingCube.rotation.y -= rad(3);  
                        if( aaa >= 30)
                        {
                            
                            clearInterval(goInt);
                            eppen_mozog =0;
                            if (MovingCube.rotation.y <= rad(1)) { MovingCube.rotation.y = 0 }
                            //$(".iranyitas").html( "camera.rotation.y:"+deg(camera.rotation.y)+"<br>" + $(".iranyitas").html()  );
                            
                            // elmentjuk a terkepre is, h betolteskor ugyanarra nezzen mint menteskor
                            terkep.kezdo_pozicio_frissitese_forgas(MovingCube.rotation.y);
                            
                            // fordulas utan van e npc
                            var vane_npc = pozicioban_van_e_npc();
                            if (vane_npc) {
                                //npc_interakcio_be(vane_npc);
                            } else {
                                npc_interakcio_ki();
                            }
                            
                            $("#iranytu_kep").rotate({animateTo:deg(MovingCube.rotation.y)})
                        }  
                        
                    },1);       
            }
            
        
        }
        
        
        
    }
    
    function mozgas(merre) {
        if (mindeki_halott == 1) {
            // nem lehet mozogni
            return;   
        }
        
        var merre_nez = deg(camera.rotation.y);
        if (eppen_mozog == 0) {

            var movement = { dx:0, dz:0 };
            

            if (merre == "le") {
                if (merre_nez == 0) {
                    movement.dz += cubesize;    
                }
                if (merre_nez == 90) {
                    movement.dx += cubesize;    
                }
                if (merre_nez == 180) {
                    movement.dz -= cubesize;    
                }
                if (merre_nez == 270) {
                    movement.dx -= cubesize;    
                }
                
            }
            if (merre == "fel") {
                if (merre_nez == 0) {
                    movement.dz -= cubesize;    
                }
                if (merre_nez == 90) {
                    movement.dx -= cubesize;    
                }
                if (merre_nez == 180) {
                    movement.dz += cubesize;    
                }
                if (merre_nez == 270) {
                    movement.dx += cubesize;    
                }
            }
            if (merre == "bal") {
                //alert(merre_nez);
                if (merre_nez == 0) {
                    movement.dx -= cubesize;
                }
                if (merre_nez == 90) {
                    movement.dz += cubesize;    
                }
                if (merre_nez == 180) {
                    movement.dx += cubesize;
                }
                if (merre_nez == 270) {
                    movement.dz -= cubesize;    
                }
                
            }
            if (merre == "jobb") {
                if (merre_nez == 0) {
                    movement.dx += cubesize;
                }
                if (merre_nez == 90) {
                    movement.dz -= cubesize;    
                }
                if (merre_nez == 180) {
                    movement.dx -= cubesize;
                }
                if (merre_nez == 270) {
                    movement.dz += cubesize;    
                }
                
            }
            
            var van_e_utkozes = detectCollision(merre,merre_nez,movement);
            
            if ( van_e_utkozes == "nincs" ) {
                    
                    eppen_mozog = 1;
                    
                    var rand = randint(34,37);
                    
                    hang_lejatszas(rand,{pan:0,volume:40,multiShot:true});
                    
                    // deltaval 
                    var indulo_pozicio = MovingCube.position.clone();
                    var mennyit_mozgott = 0;
                    var goInt = setInterval(function() {
                        
                        var delta = clock.getDelta();
                        
                        var mennyit_megy_elore = parseInt(delta * 600);
                        
                        if (mennyit_megy_elore > 100) {
                            mennyit_megy_elore = 100;
                        }
                        
                        mennyit_mozgott += mennyit_megy_elore;
                        if (movement.dx == cubesize) {
                            if (MovingCube.position.x + mennyit_megy_elore < indulo_pozicio.x + 100) {
                                MovingCube.position.x += mennyit_megy_elore;        
                            } else {
                                MovingCube.position.x = indulo_pozicio.x + 100;    
                            }
                        }
                        if (movement.dx == -cubesize) {
                            if (MovingCube.position.x - mennyit_megy_elore > indulo_pozicio.x - 100) {
                                MovingCube.position.x -= mennyit_megy_elore;    
                            } else {
                                MovingCube.position.x = indulo_pozicio.x - 100;    
                            }
                        }
                        if (movement.dz == cubesize) {
                            if (MovingCube.position.z + mennyit_megy_elore < indulo_pozicio.z + 100) {
                                MovingCube.position.z += mennyit_megy_elore;    
                            } else {
                                MovingCube.position.z = indulo_pozicio.z + 100;    
                            }
                        }
                        if (movement.dz == -cubesize) {
                            if (MovingCube.position.z - mennyit_megy_elore > indulo_pozicio.z - 100) {
                                MovingCube.position.z -= mennyit_megy_elore;    
                            } else {
                                MovingCube.position.z = indulo_pozicio.z - 100;    
                            }
                        }
                        
                        
                        
                        
                        if( mennyit_mozgott >= 100) {
                            clearInterval(goInt);
                            eppen_mozog = 0;
                            
                            var newTx = Math.abs(Math.floor(((MovingCube.position.x ) / cubesize)));
                            var newTy = Math.abs(Math.floor(((MovingCube.position.z ) / cubesize)));
                   
                            //miniMap.update({x: newTx, y: newTy});
                            
                            // frissitjuk a poziciot a terkep objektumban
                            // azert itt, hogy ne lehessen trukkozni pl lepes kozben menteni
                            terkep.kezdo_pozicio_frissitese(newTx,newTy);
                            
                            //info_szoveg('DEBUG: Mozgas vege. x:' + newTx + ' y:' + newTy);
                            
                            //mozgas_logolas("MOZGAS x:" + newTx + " y:" + newTy);
                            
                            // kerdoiv a masodik mob utan:
                            if (newTx == 27 && newTy ==7) {
                                kerdoiv_megjelenites();    
                            }
                            
                            
                            
                            // mozgas utan megnezzuk van e akozelben npc akivel beszlehet stb
                            var vane_npc = pozicioban_van_e_npc();
                            if (vane_npc) {
          
                                
                            } else {
                                npc_interakcio_ki();
                            }
                            
                            // mozgas utan megnezzuk teleportra lepett e!
                            var vane_teleport = pozicioban_van_e_teleport();
     
                            
                            terkep.van_e_beszelgetes_a_pozicioban(newTx,newTy);
                            

                            // mozgas utan ellenorizzuk a fenyeket. a 3 legkozelebbit kapcsoljuk be!
                            fenyek_bekapcsolasa3();
                        }
                    },1);
                    
                    /*
                    
                    siman timeouttal
                                        
                    var aaa = 0;
                    goInt = setInterval(function()
                    {
                        aaa++;
                        if (movement.dx == cubesize) {
                            MovingCube.position.x += 2;    
                        }
                        if (movement.dx == -cubesize) {
                            
                            MovingCube.position.x -= 2;    
                        }
                        if (movement.dz == cubesize) {
                            MovingCube.position.z += 2;    
                        }
                        if (movement.dz == -cubesize) {
                            MovingCube.position.z -= 2;    
                        }
                        
                        
                        var delta = clock.getDelta();
                        //console.log(4000 * delta);
                        
                        $(".egy_kuldetes_baloldal").html(delta);
                        
                        if( aaa >= 50)
                        {
                            clearInterval(goInt);
                            eppen_mozog = 0;
                            
                            var newTx = Math.abs(Math.floor(((MovingCube.position.x ) / cubesize)));
                            var newTy = Math.abs(Math.floor(((MovingCube.position.z ) / cubesize)));
                   
                            //miniMap.update({x: newTx, y: newTy});
                            
                            // frissitjuk a poziciot a terkep objektumban
                            // azert itt, hogy ne lehessen trukkozni pl lepes kozben menteni
                            terkep.kezdo_pozicio_frissitese(newTx,newTy);
                            
                            
                            //info_szoveg('DEBUG: Mozgas vege. x:' + newTx + ' y:' + newTy);
                            
                            // mozgas utan megnezzuk van e akozelben npc akivel beszlehet stb
                            var vane_npc = pozicioban_van_e_npc();
                            if (vane_npc) {
                                // megnezzuk automatiusan elkezd e beszelni
                  
                                
                            } else {
                                npc_interakcio_ki();
                            }
                            
                            // mozgas utan megnezzuk teleportra lepett e!
                            var vane_teleport = pozicioban_van_e_teleport();
                            
                            //camera.position.x = MovingCube.position.x - 20;
                            //camera.position = MovingCube.position;
                            //console.log(MovingCube.position);
                            
                            terkep.van_e_beszelgetes_a_pozicioban(newTx,newTy);
                            

                            // mozgas utan ellenorizzuk a fenyeket. a 3 legkozelebbit kapcsoljuk be!
                            fenyek_bekapcsolasa3();
                        }
                    },1);
                    
                    */
                } else if (van_e_utkozes == "van") {
                    hang_lejatszas(38,{pan:0,volume:50}); 
                    info_szoveg('You cant go that way! ');
                } else if (van_e_utkozes == "szoveg") {
                    // utkozes van, de az hogy miert nem mehet oda mar a detectnel kiirodik
                }
                
                 
        }        
    }
    
    function mozgas_logolas(mit) {
        $.ajax({  
                
                 type: "POST",  
                 url: "ajax_mozgaslogolas.php",  
                 data: "mit="+mit,
                 success: function(){  
                     

                 }  
             });
    }
    
    // van e teleport
    function pozicioban_van_e_teleport() {
        
        var ret = false;
        
        var newTx = Math.abs(Math.floor(((MovingCube.position.x ) / cubesize)));
        var newTy = Math.abs(Math.floor(((MovingCube.position.z ) / cubesize)));        
        
        var kiegeszito_ertekek = terkep_matrix_kiegeszitesek_pozicio_alapjan(newTx,newTy);
        
        for (var k=0;k<kiegeszito_ertekek.length;k++) {
            var kiegeszito_ertek = kiegeszito_ertekek[k];
            if (kiegeszito_ertek.tipus == "TELEPORT") {
                hang_lejatszas(40,{pan:0,volume:90});
                
                // at is rakjuk oda
                MovingCube.position.x = kiegeszito_ertek.hova_x*cubesize;
                MovingCube.position.z = kiegeszito_ertek.hova_y*cubesize;
                break;
            }
        }
        
        return ret;

    }
    
    // van e npc elotte?
    // ha van akkor isszater az NPC objektummal! ezt az npck otmbbol keressu majd ki egyelore fix 1;
    function pozicioban_van_e_npc() {
        var ret = false;

        var kamera_erre_nez = deg(camera.rotation.y);

        for(var i=0;i<npck.length;++i) {
            var fele_nezunk = 0;    
            
            var Tx = Math.abs(Math.floor(((npck[i].mesh.position.x ) / cubesize)));
            var Ty = Math.abs(Math.floor(((npck[i].mesh.position.z ) / cubesize)));     
            
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
            var npc_pozicio = npck[i].mesh.position.clone();
            npc_pozicio.y = 0;
        
            
            if (MovingCube.position.distanceTo(npc_pozicio) <= 100 && fele_nezunk) {
                ret = npck[i];
                break;    
            }
        }
        
        return ret;        
        
        
    }
    
    // ha van akkro visszater az id val!
    function pozicioban_van_e_szintvaltas(x,y) {
        
        
        
        //return false;
        
        var ret = false;
        var kiegeszito_ertekek = terkep_matrix_kiegeszitesek_pozicio_alapjan(x,y);
        
        for (var k=0;k<kiegeszito_ertekek.length;k++) {
            var kiegeszito_ertek = kiegeszito_ertekek[k];
            if (kiegeszito_ertek.tipus == "SZINTVALTAS_LE" || kiegeszito_ertek.tipus == "SZINTVALTAS_FEL") {
                ret = kiegeszito_ertek.szint_id;
                break;
            }
        }
        
        return ret;
    }
    
    function detectCollision(merre,merre_nez,movement) {
        var ret = "nincs";
        
        var originPoint = MovingCube.clone();

        originPoint.position.x += movement.dx;
        originPoint.position.z += movement.dz;
        
        // hova akar lepni, itt nem abszoluertekezunk mert a szintvaltas lehet -1 ben is
        var newTx = Math.floor(((originPoint.position.x  ) / cubesize));
        var newTy = Math.floor(((originPoint.position.z ) / cubesize));
        
        // ha ez egy szintvaltasi terulet akkor szintet valtunk!
        var vane_szintvaltas = pozicioban_van_e_szintvaltas(newTx,newTy);
        if (vane_szintvaltas !== false) {
            szintvaltas(vane_szintvaltas);
            ret = "szoveg";
        }
        
        
        
        
        
        for(var i in collidableMeshList) {
            if (collidableMeshList[i] == MovingCube) {
                // a jatwekos is benne van a  collidablek kozott, de mivel magatol midnig 100 pixelre van ezert azzal nem kollidal
                
                // kesobbre ezt azert meghaoggyom hatha kell
            }
            
            
            //if (originPoint.position.distanceTo(collidableMeshList[i].position) == 0) {
            // ez azert kell 99 re, hogy a mozgo ellensegeken ne tudjon keresztul menni ha nem pontosan elotte van!
            if (originPoint.position.distanceTo(collidableMeshList[i].position) <= 99) {
                ret = "van";
                
            }
        }
        
        return ret;
    }
    
       
    function render() {
         
        //particles.rotation.y += 0.01;
        

 
        
        // ellensegek animalasa
        var delta = clock.getDelta();
        //console.log(4000 * delta);
        
        //$(".egy_kuldetes_baloldal").html(delta);
        
        for ( var i = 0; i < skill_animaciok.length; i ++ ) {

            skill_animaciok[i].update(1000 * delta);
            

        }        
        
        
        
        for ( var i = 0; i < morphs.length; i ++ ) {

            morph = morphs[ i ];
            morph.updateAnimation( 4000 * delta );

        }        
        
        
        
        //boomer.update(1000 * delta);
        
        for(var i=0;i<ellensegek.length;i++) {
            ellensegek[i].tick();
        }
        
        // buffok skillek stb miatt kell!
        // ez atkerul egy setIntervalba a karkater init utan!
        for(var i=0;i<karakterek.length;i++) {
            //karakterek[i].tick();
        }

        // karakterek. ha indenki halott akkor game over!
        if (mindeki_halott == 0) {
            var van_meg_valaki_eletben = 0;
            for(i=0;i<karakterek.length;i++) {
                if (karakterek[i].hp > 0) {van_meg_valaki_eletben = 1; break;}
            }
            if (van_meg_valaki_eletben == 0) {
                mindeki_meghalt();
            }
            
        }
        
        
        // kamera koveti a jatekost    
        camera.position = MovingCube.position;
        camera.rotation = MovingCube.rotation;
        
        
        
        // pointlight is kovet:
        //pointLight3.position.x = MovingCube.position.x;
        //pointLight3.position.z = MovingCube.position.z;
        
        //renderer.clear();
        //renderer.setViewport( 0, 0, SCREEN_WIDTH/2, SCREEN_HEIGHT );
        
        for (var i=0;i<psys_tomb.length;i++) {
            //psys_tomb[i].psUpdate();
            //console.log(psys_tomb[5].cloud.position.distanceTo(MovingCube.position));
            //var tavolsag = psys_tomb[i].cloud.position.distanceTo(MovingCube.position);
            var tavolsag = MovingCube.position.distanceTo(psys_tomb[i].cloud.position);
            
            if (tavolsag <= 500) {
            //if (i < 1) {
                psys_tomb[i].psUpdate();
            }
            
        }
        //psys.psUpdate();
        
        renderer.render( scene, camera );  
        //var delta = clock.getDelta();
        //renderer.clear();
        //composer.render( delta );
        
    }
    
    
    function mindeki_meghalt() {
        mindeki_halott = 1;
        jatek_menu_toogle();
    }
    
    function animate() {
        
            requestId = requestAnimationFrame( animate );

            render();
            stats.update(); 

        
            
    }    
    

    
    function start() {
        if (!requestId) {
           animate();
        }
    }

    function stop() {
        if (requestId) {
           window.cancelAnimationFrame(requestId);
           requestId = undefined;
        }
    }
    
    function init_hangok_load_utan() {
        
        
        
        soundManager.setup({
              url: 'js/swf/',
              debugMode: false,
              flashVersion: 9, // optional: shiny features (default = 8)
              useFlashBlock: false, // optionally, enable when you're ready to dive in
              waitForWindowLoad: true,
              useHTML5Audio: true,
              noSWFCache: true,
              flashLoadTimeout: 30000,

              /**
               * read up on HTML5 audio support, if you're feeling adventurous.
               * iPad/iPhone and devices without flash installed will always attempt to use it.
               */
              onready: function() {
                // Ready to use; soundManager.createSound() etc. can now be called.
                console.log("SM ready");
                
                for (var i=0;i<hangok_betoltesre.length;i++) {
                    //console.log(hangok_betoltesre[i]);
                    
                    var akarmi = soundManager.createSound({
                      id: hangok_betoltesre[i][0],
                      url: hangok_betoltesre[i][1],
                      autoLoad: true,
                      stream: false,
                      onload: function(j,i) {
                          for (var k=0; k<hangok_betoltesre.length;k++) {
                              if (hangok_betoltesre[k][0] == this.id) {
                                  hangok_betoltesre[k][2] = 1;
                                  //console.log('loaded');
                                  //console.log(hangok_betoltesre[k][2]);
                                  break;
                              }
                          }
                      },
                      volume: 100
                    });
                  }
              }
        });
        
        soundManager.beginDelayedInit(); 
        
    }
    

</script>


<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-37088209-1']);
  _gaq.push(['_setDomainName', 'moonshadesgame.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>
