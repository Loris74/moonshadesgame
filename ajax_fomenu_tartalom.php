<?php 
    require("application.php");
?>

<?php if ($_SESSION["belepve"] == 0) {  ?>
    <div class="chargen_menupont" id="new_game_withoutreg_gomb" data-menu-id="0">Play without registration</div>
    <div class="chargen_menupont" id="belepes_gomb" data-menu-id="0">Login</div>
    <div id="belepes">
        <div id="belepes_belso">
            <form id="belepes_form">
            <div class="belepes_form_szoveg">Username:</div>
            <div class="belepes_form_input"><input type="text" name="email" value=""></div>
             <br class="clear">
            <div class="belepes_form_szoveg">Password:</div>
            <div class="belepes_form_input"><input type="password" name="jelszo" value=""></div>
            <br>
            
            <input type="button" id="belepes_form_elkuldes" value="Login">
            </form>
            <br>
            <!--Login with Facebook account<br>
            Forgot your password?-->
        </div>
    </div>
    <div class="chargen_menupont" id="register_gomb" data-menu-id="3">Registration</div>
<?php } else { ?>

    <div class="chargen_menupont" id="welcome_gomb">Welcome Username!</div>

<?php } ?>
<div class="chargen_menupont" <?php if ($_SESSION["belepve"]) { ?>id="new_game_premade_gomb"<?php } else { ?> onclick="alap_popup('You need to Login to start a new game!');" <?php } ?> data-menu-id="1">Start with a premade party</div>
<div class="chargen_menupont" <?php if ($_SESSION["belepve"]) { ?>id="new_game_gomb"<?php } else { ?> onclick="alap_popup('You need to Login to start a new game!');" <?php } ?> data-menu-id="1">Character creation</div>
<div class="chargen_menupont"  <?php if ($_SESSION["belepve"]) { ?>id="load_game_gomb"<?php } else { ?> onclick="alap_popup('You need to Login to Load a game!');" <?php } ?> data-menu-id="2">Load Game</div>
<div class="chargen_menupont" id="intro_gomb" data-menu-id="5">Replay Intro</div>
<div class="chargen_menupont" id="tutorial_gomb" onclick="document.location='http://facebook.com/moonshadesgame'" data-menu-id="5">Contact & Feedback</div>
<div class="chargen_menupont" id="credits_gomb" data-menu-id="4">Credits</div>
<?php if ($_SESSION["belepve"] == 1) {  ?>
    <div class="chargen_menupont" id="kilepes_gomb" data-menu-id="0">Logout</div>
<?php } ?>