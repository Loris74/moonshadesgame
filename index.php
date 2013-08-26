<?php require("application.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
<head>
    <title>Moonshades: an old-school dungeon crawler role playing game</title>
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <meta name="robots" content="INDEX,FOLLOW" />

    <meta name="keywords" content="moonshades, rpg, game, webgl, rola playing game, dungeon, dungeon crawler, rpg game " />
    <meta name="subject" content="Moonshades is an old-school dungeon crawler rpg ( role playing game ). Runs in the browser no need to download or install." />

    <meta name="description" content="Moonshades is an old-school dungeon crawler rpg ( role playing game ). Runs in the browser no need to download or install." />
    
    <link rel="stylesheet" type="text/css" href="css/main_menu.css?v=10" />
    <link rel="stylesheet" type="text/css" href="css/jquery.qtip.css" />

    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>

    
    <script type='text/javascript' src='js/Detector.js'></script>
    

    <script src="js/Targyak.js"></script>
    <script src="js/Enemy.js"></script>
    <script src="js/Karakter.js"></script>
    <script src="js/Terkep.js"></script>
    <script src="js/alap_main_menu.js"></script>
    <script src="js/jquery.qtip.js"></script>
    <script src="js/GraphicsHelper.js"></script>
    
    <script src="js/jquery.backgroundpos.min.js"></script>
    
    <script src="js/jquery.jcarousel.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/skin.css" />

    
    
    
</head>
<body >

<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/hu_HU/all.js#xfbml=1&appId=123251441170399";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<script>


$(document).ready(function () {
    //$("body").queryLoader2({percentage:true});
    
    if (  !Detector.webgl ) {
        alap_popup('Your browser does not seem to support WebGL. Please use Google Chrome to play.')
    }
    
    alap_popup('Moonshades goes open-source! If you want to contribute or use the code <a style="color: yellow" href="https://github.com/moonshades/moonshadesgame">here is the github repo</a>.')
    
});
</script>

<div id="alap_popup">
    <div id="alap_popup_szoveg"></div>
</div>


<div id="chargen">
    <div id="jatekneve">Moonshades <span>an Old-School RPG  (alpha version 4)</span> </div>
    
    
    
    <div class="hand_fire"></div>
    <div id="chargen_menu"></div>
    
    <div id="fblike">
        <div class="fb-like" data-href="http://www.facebook.com/moonshadesgame" data-send="true" data-width="290" data-show-faces="true" data-font="arial" data-colorscheme="dark"></div>
    </div>
    
    
    <div id="regisztracio">
        <div class="panel_cim">Registration</div>
        <form id="regisztracio_form">
            Username: <input type="text" name="email"><br>
            Password: <input type="password" name="jelszo"><br>
            Password again: <input type="password" name="jelszo2"><br>
            <input type="button" id="regisztracio_form_elkuldes" value="Registration">
        </form>
        
    </div>
        
    <div id="felhasznalo_adatok">
        Accound Info<br>
        <br>
        stats, achievements, etc
    </div>
    
    
    <div id="screenshots">
        <div class="screenshots_egy"><img width="260" src="assets/images/game5.jpg"></div>
        <div class="screenshots_egy">
            <span>Features</span><br>
            - run in the browser no download or install<br>
            - 3 playable race<br>
            - 8 playable class<br>
            - thousands of upgradable items<br>
            - crafting<br>
            - achievements<br>
            - pet system
            
        </div>
        <div class="screenshots_egy"><span>Upcoming Features</span><br>
            - multiplayer<br>
            - social media integration<br>
            - more levels<br>
            - who knows...
        </div>
        <div class="screenshots_egy">
            <iframe width="260" height="195" src="http://www.youtube.com/embed/r7IwZz2tI6Y" frameborder="0" allowfullscreen="true"></iframe>
        </div>
        
    </div>

    
    <div id="betoltes">
        <div class="panel_cim">Load game</div>
        
        <?php 
            $mentesek = $db->f("SELECT * FROM mentesek WHERE felhasznalo_id = ? ORDER BY mentes_datuma DESC" , array($_SESSION["felhasznalo_id"])); 
            foreach ($mentesek["sorok"] as $mentes) {
        ?>
            <div class="mentes_egysor" data-id="<?php echo $mentes["mentes_id"]; ?>">
                <?php echo $mentes["mentes_datuma"]; ?>
            </div>
        <?php } ?>
        
        <?php if ($mentesek["sorok_szama"] == 0) { ?>
            No saved games atm.
        <?php } ?>
    </div>
    
    
    <div id="credits">
        <div id="credits_scroll">
            <br><br><br><br><br><br><br><br>
            
            <div class="credits_sor"><span>Moonshades</span></div>
            <br>
            <div class="credits_sor"><span>Special thanks to</span></div>
            <div class="credits_sor">Mr.doob for the awesome Three js</div>
            <div class="credits_sor"><a href="http://opengameart.org">opengameart.org</a></div>
            <div class="credits_sor">Jorge Avila for the gui</div>
            <div class="credits_sor">Ákos Domonyi for the story</div>
            <br>
        
            <div class="credits_sor"><span>Thanks for textures and 2d art</span></div>
            <div class="credits_sor">Lamoot</div>
            <div class="credits_sor">Blarumyrran</div>
            <div class="credits_sor">Yughues</div>
            <div class="credits_sor">Clint Bellanger</div>
            <div class="credits_sor">dogchicken</div>
            <div class="credits_sor"><a href="http://mrbubblewand.wordpress.com/">Mr. Bubble</a></div>
            
            
            
            
            
            <br>
            <div class="credits_sor"><span>Thanks for models</span></div>
            
            <div class="credits_sor">Clint Bellanger</div>
            <div class="credits_sor">johndh</div>
            <div class="credits_sor">Daniel F. R Gordillo</div>
            <div class="credits_sor">Nemanja Ivanovic</div>
            <div class="credits_sor">Blender_player</div>
            <div class="credits_sor">Joseph Columbe</div>
            <div class="credits_sor">Brandon Farley</div>
            <div class="credits_sor">Irvine from Blender Artists</div>
            <div class="credits_sor">James Clugston</div>
            <div class="credits_sor">Aquila Ferreira</div>
            <div class="credits_sor">Dennis Haupt</div>
            <div class="credits_sor">Claudiohenry</div>
            <div class="credits_sor">Ilias Morscher</div>
            <div class="credits_sor">Bruno Matheus</div>
            <div class="credits_sor">Allen Ramsey</div>
            <div class="credits_sor">gavlig</div>
            <div class="credits_sor">Wopr2012</div>
            <div class="credits_sor">Luis Carlos Lara</div>
            <div class="credits_sor">Veta Antares</div>
            <div class="credits_sor">Redcorestudios</div>
            <div class="credits_sor">Bernhard Haeusler</div>
            
             
            
            <br>
            <div class="credits_sor"><span>Thanks for sound and music</span></div>
            <div class="credits_sor">matthew.pablo</div>
            <div class="credits_sor">Zefz</div>
            <br>            
            
            <div class="credits_sor">Part of the graphic tiles used in this program is the public domain roguelike tileset "RLTiles".</div>
            
        </div>
        
    </div>
    
    <div id="uj_jatek">
        <div class="hand_fire_kicsi1"><img src="assets/images/hand2.png" height="18"></div>
        <div class="hand_fire_kicsi2"><img src="assets/images/hand2.png" height="18"></div>
        
        <div id="uj_jatek_generalo_resz">
            <div id="uj_jatek_bal_felo">
                <div class="csoport_szoveg">SELECT RACE:</div>
                <div class="lista">
                    <div class="lista_elem" data-faj="1" title="<strong>Humans</strong><br><br>Men and women fighting for their homeland against the curse. they are balanced fighters and magic users, each of them dreaming about the relieving freedom.">Human (Male)</div><br class="clear">
                    <div class="lista_elem" data-faj="2" title="<strong>Humans</strong><br><br>Men and women fighting for their homeland against the curse. they are balanced fighters and magic users, each of them dreaming about the relieving freedom.">Human (Female)</div><br class="clear">
                    <div class="lista_elem" data-faj="3" title="<strong>Dwarves</strong><br><br>The dwarves were once full of pride, but now they are banished too, to gather up their forces deep beneath the earth in their mines, and tunnels. they are experts of the dark paths, curves and rooms left by them, and their ancestors, long ago.">Dwarf (Male)</div><br class="clear">
                    <div class="lista_elem" data-faj="4" title="<strong>Dwarves</strong><br><br>The dwarves were once full of pride, but now they are banished too, to gather up their forces deep beneath the earth in their mines, and tunnels. they are experts of the dark paths, curves and rooms left by them, and their ancestors, long ago.">Dwarf (Female)</div><br class="clear">
                    <div class="lista_elem" data-faj="5" title="<strong>Fallens</strong><br><br>Once honored and powerful knights and mages, now struck by the curse, despretaly fighting against the burning urge to destroy everything around them.">Fallen (Male)</div><br class="clear">             <div class="lista_elem" data-faj="6" title="<strong>Fallens</strong><br><br>Once honored and powerful knights and mages, now struck by the curse, despretaly fighting against the burning urge to destroy everything around them.">Fallen (Female)</div><br class="clear">
                </div>
            </div>
            <div id="uj_jatek_jobb_felo">
                <div class="csoport_szoveg">SELECT ClASS:</div>
                <div class="lista">
                    <div class="lista_elem2" data-osztaly="1" title="<strong>Fanatic</strong><br><br>Melee class, can wield all of the weapons. The fanatic empowers attacks with undying hatred or uses that to burn the flesh of any foe.  ">Fanatic</div><br class="clear">
                    <div class="lista_elem2" data-osztaly="2" title="<strong>Heretic</strong><br><br>Spellcaster, using wands, staffs, daggers and slingshots. Unspeakable darkness lies in the heretic's mind, takes advantage of the inner evil and uses that to burn or weaken anyone or anything that stands in the way.">Heretic</div><br class="clear">
                    <div class="lista_elem2" data-osztaly="3" title="<strong>Paladin</strong><br><br>Melee class, can wield all of the weapons. his holy presence shall strike fear in to the enemy's hearts, and encourage teammates, protecting or healing them.">Paladin</div><br class="clear">
                    <div class="lista_elem2" data-osztaly="4" title="<strong>Warrior</strong><br><br>Melee class, can wield all of the weapons. love to be in the front row, taking blows, and hitting back even harder.">Warrior</div><br class="clear">
                    <div class="lista_elem2" data-osztaly="5" title="<strong>Sorcerer</strong><br><br>Spellcaster, wielding staffs, wands, daggers and slingshots. Using arcane magic and healing to aid friends or obliterate foes.">Sorcerer</div><br class="clear">
                    <div class="lista_elem2 elem_disabled" data-osztaly="6" title="<strong>Thief</strong><br><br>Melee or ranged class. using short swords, daggers or long ranged weapons. The thief is a nimble warrior, either focusing on precise shots or tricking the enemy and cutting vital parts.">Thief</div><br class="clear">
                    <div class="lista_elem2 elem_disabled" data-osztaly="7" title="<strong>Pathfinder</strong><br><br>melee, ranged">Pathfinder</div><br class="clear">
                    <div class="lista_elem2 elem_disabled" data-osztaly="8" title="<strong>Berserker</strong><br><br>melee">Berserker</div><br class="clear">
                </div>
            </div>
            <br class="clear">
            <div id="uj_jatek_bal_also">
                <div class="csoport_szoveg">Select Avatar:</div>
                <div id="portre_valaszto_bal"><img width="10" src="assets/images/nyil_balra.png"></div>
                <div id="portre_valaszto">
                    <ul>
                        <?php for ($i=1;$i<=10;$i++) { ?>
                        <li class="portre_valaszto_egy" data-id="<?php echo $i; ?>"><img width="50" src="avatars/<?php echo $i; ?>.jpg"></li>
                        <?php } ?>
                        
                    </ul> 
                    
                </div>
                <div id="portre_valaszto_jobb"><img width="10" src="assets/images/nyil_jobbra.png"></div>
                <div id="portre_valaszto_sajat">
                    <br>
                    Or upload your own image!
                    <br>(this feature will be available later)
                </div>
            </div>
            
            <div id="uj_jatek_jobb_also">
                <div class="csoport_szoveg">Distribute stat points: <span><span id="elkoltheto_pont">20</span> points</span></div>
                <div class="stat_egy" title="<strong>Power</strong><br><br>Increases physical attack or magic power">
                    <div class="stat_egy_neve">Power:</div>
                    <div class="stat_egy_nyil_balra" data-stat="power"><img width="10" src="assets/images/nyil_balra.png"></div>
                    <div class="stat_egy_ertek" id="stat_power">10</div>
                    <div class="stat_egy_nyil_jobbra" data-stat="power"><img width="10"  src="assets/images/nyil_jobbra.png"></div>
                    <div class="stat_egy_leiras"><!--Attack: <span id="stat_leiras_power">100</span>--></div>
                </div>
                <br class="clear">
                <div class="stat_egy" title="<strong>Dexterity</strong><br><br>Increases critical hit chance , chance to hit and avoid attacks">
                    <div class="stat_egy_neve">Dexterity:</div>
                    <div class="stat_egy_nyil_balra" data-stat="dexterity"><img width="10" src="assets/images/nyil_balra.png"></div>
                    <div class="stat_egy_ertek" id="stat_dexterity">10</div>
                    <div class="stat_egy_nyil_jobbra" data-stat="dexterity"><img width="10"  src="assets/images/nyil_jobbra.png"></div>
                    <div class="stat_egy_leiras"><!--Critical chance: <span id="stat_leiras_dexterity">1</span>%--></div>
                </div>
                <br class="clear">
                <div class="stat_egy" title="<strong>Defense</strong><br><br>Increases armor">
                    <div class="stat_egy_neve">Defense:</div>
                    <div class="stat_egy_nyil_balra" data-stat="defense"><img width="10" src="assets/images/nyil_balra.png"></div>
                    <div class="stat_egy_ertek" id="stat_defense">10</div>
                    <div class="stat_egy_nyil_jobbra" data-stat="defense"><img width="10"  src="assets/images/nyil_jobbra.png"></div>
                    <div class="stat_egy_leiras"><!--Armor: <span id="stat_leiras_defense">100</span>--></div>
                </div>
                <br class="clear">
                <div class="stat_egy" title="<strong>Vitality</strong><br><br>Increases maximum health">
                    <div class="stat_egy_neve">Vitality:</div>
                    <div class="stat_egy_nyil_balra" data-stat="vitality"><img width="10" src="assets/images/nyil_balra.png"></div>
                    <div class="stat_egy_ertek" id="stat_vitality">10</div>
                    <div class="stat_egy_nyil_jobbra" data-stat="vitality"><img width="10"  src="assets/images/nyil_jobbra.png"></div>
                    <div class="stat_egy_leiras"><!--Hit Points: <span id="stat_leiras_vitality">100</span>--></div>
                </div>
                <br class="clear">
                <div class="csoport_szoveg">Enter character name:</div>
                <div id="uj_jatek_nev"><input type="text"  id="karakter_neve" maxlength="20" value=""></div>
                <input id="uj_karakter_mentes" type="button" disabled="true" value="Add character">
            </div>
        </div>
        <div id="uj_jatek_mentett_karakterek">
            <input id="gomb_start_adventures" style="display: none;" type="button" value="START YOUR ADVENTURES IN MOONSHADES!">
            <div id="portre_kontener">
                
            
            </div>    
            
        </div>
        
    </div>
    
</div>

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
