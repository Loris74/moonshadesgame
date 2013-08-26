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

    
    <script type='text/javascript' src='js/jquery-1.8.2.js'></script>
    <script type='text/javascript' src='js/jquery-ui-1.9.1.custom.min.js'></script>

    
    
    
</head>
<body >

<script>


$(document).ready(function () {
    $("#export_map_gomb").click(function(){
        $.ajax({  
             type: "POST",  
             async: false, 
             url: "ajax_editor_map_mentese.php",  
             data: "terkep=" + JSON.stringify(terkep_matrix) + "&id=" + $("#load_melyik_terkep").val(),
             success: function(ret){  
                 alert('saved');
             }  
         });  
    })
    
    $("#load_map_gomb").click(function(){
       $.ajax({
          url: "assets/editor/"+ $("#load_melyik_terkep").val() +"_dungeon.moon",
          dataType: 'json',
          async: false, 
          success: function(data) { 
              terkep_matrix = data;
              console.log(data);
              console.log(data[0].length);
              console.log(data.length);
              
              var terkep_szelesseg = data[0].length;
              var terkep_magassag =  data.length ;
              $("#map_width").val(terkep_szelesseg);
              $("#map_height").val(terkep_magassag);
              terkep_meret_beallitas(terkep_szelesseg,terkep_magassag);
              
              //terkep_feltoltese_mentesbol();
          }
        }); 
        
        $.ajax({
          url: "assets/editor/"+ $("#load_melyik_terkep").val() +"_dungeon_extras.moon",
          dataType: 'json',
          success: function(data) { 
              terkep_matrix_kiegeszitesek = data;

              terkep_feltoltese_mentesbol_kieg();
          }
        }); 
    });
    
    
   $("#change_dimensions_gomb").click(function() {
       terkep_meret_valtoztatas();
   });   
   
   $("#kocka_adatok_mentes").click(function() {
       $(".editor_kocka").mouseenter(editor_kocka_over);
       $(".editor_kocka").mouseleave(editor_kocka_out);
       
       var tipus = $("#tipus").val();
       var xy = $("#xy").val();
       var kocka_elem = $('.editor_kocka[data-x-y="'+xy+'"]');
       
       if (tipus == 0) {
            kocka_elem.css("background-color","white"); 
            kocka_elem.attr("data-tipus",0);   
       } else {
           kocka_elem.css("background-color","gray");
           kocka_elem.attr("data-tipus",1);
       }
       
       terkep_matrix_frissitese();
       
   });
   
   
   
});

var terkep_matrix = [];
var terkep_matrix_kiegeszitesek = [];

function editor_kocka_over() {
    $(this).attr("data-eredeti-szin",$(this).css("background-color"));
    $(this).css("background-color","red");
    $("#xy").val($(this).attr("data-x-y"));
}
function editor_kocka_out() {
    var eredeti_szin = $(this).attr("data-eredeti-szin");
    $(this).css("background-color",eredeti_szin);
}

function editor_kocka_click() {
    $(".editor_kocka").off('mouseenter');
    $(".editor_kocka").off('mouseleave');
    
    
    $(this).css("background-color","red");
    $("#kocka_adatok").show();
    
    // feltoltjuk az adatokat
    
    $("#xy").val($(this).attr("data-x-y"));
}

var kocka_meret = 20;

function terkep_meret_valtoztatas() {
    var temp_matrix = [];
    var szelesseg = $('#map_width').val();
    var magassag = $('#map_height').val();
    for (var i=0;i<magassag;i++) {
        
        temp_matrix[i] = [];
        for (var j=0;j<szelesseg;j++) {
            temp_matrix[i][j] = 1;    
            
        }
    }
    
    //console.log(terkep_matrix[1]);
    //console.log(temp_matrix[1]);
    
    for (var i=0;i<szelesseg;i++) {
        
        for (var j=0;j<magassag;j++) {
            if (typeof terkep_matrix[j] !== "undefined")  {
                if (typeof terkep_matrix[j][i] !== "undefined")  {
                    temp_matrix[j][i] = terkep_matrix[j][i];    
                }
            }
            
        }
    }
    
    //console.log(temp_matrix[1])
    
    //console.log(temp_matrix);
    
    terkep_matrix = temp_matrix;
    
    terkep_meret_beallitas(szelesseg,magassag);
    
}


function terkep_meret_beallitas(x,y) {
    
    $("#editor_kulso").empty();
    
    $("#editor_kulso").css("width",kocka_meret*x);
    $("#editor_kulso").css("height",kocka_meret*y);
    for (var i=0;i<y;i++) {

        for (var j=0;j<x;j++) {
            var dom = '<div class="editor_kocka" data-tipus="1" data-x-y="'+i+'|'+j+'"></div>';
            $("#editor_kulso").append(dom);
        }
    }
    
    $(".editor_kocka").mouseenter(editor_kocka_over);
    $(".editor_kocka").mouseleave(editor_kocka_out);
    $(".editor_kocka").click(editor_kocka_click);
    
    
    terkep_feltoltese_mentesbol();
    //terkep_feltoltese_mentesbol_kieg();
}

function terkep_feltoltese_mentesbol() {
    var terkep_szelesseg = $('#map_width').val();
    var terkep_magassag = $('#map_height').val();
    
    
    
    for (var x = 0; x < terkep_szelesseg; x++) {
        for (var y = 0; y < terkep_magassag; y++) {
            var kocka_elem = $('.editor_kocka[data-x-y="'+y+'|'+x+'"]');
            
            if (terkep_matrix[y][x] == 0) {
                kocka_elem.css("background-color","white");    
                kocka_elem.attr("data-tipus",0);
            } else {
                kocka_elem.css("background-color","gray");
                kocka_elem.attr("data-tipus",1);
            }
            
            
            
        }
    }
}

function terkep_feltoltese_mentesbol_kieg() {
    for (var k=0;k<terkep_matrix_kiegeszitesek.length;k++) {
        var kiegeszito_ertek = terkep_matrix_kiegeszitesek[k];
        
        var kocka_elem = $('.editor_kocka[data-x-y="'+kiegeszito_ertek.y+'|'+kiegeszito_ertek.x+'"]');
        
        var elem_ertekek = kocka_elem.html();
        
        
        if (kiegeszito_ertek.tipus == "AJTO1" || kiegeszito_ertek.tipus == "AJTO2" ) {
            elem_ertekek += "D";
        }
        if (kiegeszito_ertek.tipus == "AJTO_KAPCSOLO1") {
            elem_ertekek += "DSw";
        }
        
        if (kiegeszito_ertek.tipus == "KEZDO_POZICIO") {
            elem_ertekek += "Sp";
        }
        if (kiegeszito_ertek.tipus == "KULCSLYUK") {
            elem_ertekek += "Kh";
        }
        if (kiegeszito_ertek.tipus == "KULCSLYUK_AKTIV") {
            elem_ertekek += "KhA";
        }
        if (kiegeszito_ertek.tipus == "TARGY") {
            elem_ertekek += "Itm";
        }
        if (kiegeszito_ertek.tipus == "ELLENSEG") {
            elem_ertekek += "Enm";
        }
        if (kiegeszito_ertek.tipus == "LADA") {
            elem_ertekek += "Cht";
        }
        if (kiegeszito_ertek.tipus == "FAKLYA") {
            elem_ertekek += "Trc";
        }
        if (kiegeszito_ertek.tipus == "FELTAMASZTAS") {
            elem_ertekek += "Rsr";
        }
        
        
        if (kiegeszito_ertek.tipus == "AJTO_TITKOS1") {
            elem_ertekek += "Ds";
        }
        if (kiegeszito_ertek.tipus == "AJTO_TITKOS1_KAPCSOLO1") {
            elem_ertekek += "DsS";
        }
        
        if (kiegeszito_ertek.tipus == "NPC" ) {
            elem_ertekek += "N";
        }
        if (kiegeszito_ertek.tipus == "TELEPORT" ) {
            elem_ertekek += "T";
        }
        
        if (kiegeszito_ertek.tipus == "SZINTVALTAS_LE" || kiegeszito_ertek.tipus == "SZINTVALTAS_FEL") {
            elem_ertekek += "Lc";
        }
        
        
        kocka_elem.html(elem_ertekek);
    }
}

function terkep_matrix_frissitese() {
    var terkep_szelesseg = $('#map_width').val();
    var terkep_magassag = $('#map_height').val();
    for (var x = 0; x < terkep_szelesseg; x++) {
        for (var y = 0; y < terkep_magassag; y++) {
            var kocka_elem = $('.editor_kocka[data-x-y="'+y+'|'+x+'"]');
            
            
            
            if (kocka_elem.attr("data-tipus") == 0) {
                terkep_matrix[y][x] = 0;
            }
            if (kocka_elem.attr("data-tipus") == 1) {
                terkep_matrix[y][x] = 1;
            }
            
        }
    }
    
    console.log(terkep_matrix[0]);
}

</script>

<style>

    #editor_kulso {
        border: 1px solid red;
        float: left;
    }
    .editor_kocka {
        width: 20px;
        height: 20px;
        background-color: gray;
        float: left;
        font-size: 11px;
        font-family: Arial;
        text-align: center;
    }
</style>

Load map: 
<select id="load_melyik_terkep">
    <option value="1">Level 1</option>
    <option value="2">Level 2</option>
</select>
<input type="button" value="LOAD MAP" id="load_map_gomb">
<input type="button" value="SAVE MAP" id="export_map_gomb">
<br>
Width: <input type="text" id="map_width" name="map_width" value="40">
Height: <input type="text" id="map_height" name="map_height" value="40">
<input id="change_dimensions_gomb" type="button" value="Change dimensions">

<div id="kocka_adatok">
    <input type="text" name="xy" id="xy" value="">
    Wall: <select name="tipus" id="tipus">
        <option value="0">Empty</option>
        <option value="1">Wall</option>
    </select>
    
    Content:
    <select name="kieg_tipus">
        <option value="">None</option>
        <option value="KEZDO_POZICIO">Starting Point</option>
        <option value="AJTO_TITKOS1">Door secret</option>
        <option value="AJTO1">Door 1</option>
        <option value="AJTO2">Door 2</option>
        <option value="AJTO_KAPCSOLO1">Door Switch</option>
        <option value="AJTO_TITKOS1_KAPCSOLO1">Door secret Switch</option>
        <option value="KULCSLYUK">KeyHole</option>
        <option value="KULCSLYUK_AKTIV">KeyHole Active</option>
        <option value="UTJELZO_TABLA">Tutorial sign</option>
        <option value="TARGY">Item</option>
        <option value="SZINTVALTAS_LE">Level Change down</option>
        <option value="SZINTVALTAS_FEL">Level Change up</option>
        <option value="ELLENSEG">Enemy</option>
        <option value="TABLA_FALRA">Sign on wall</option>
        <option value="NPC">NPC</option>
        <option value="LADA">Chest</option>
        <option value="TELEPORT">Teleport</option>
        <option value="FAKLYA">Torch</option>
        <option value="FELTAMASZTAS">Resurrection Statue</option>
    </select>
    
    <input type="button" id="kocka_adatok_mentes" value="Save position value">
    
</div>

<br style="clear: both;">
<div id="editor_kulso">
    <div class="editor_kocka"></div>
</div>
<br style="clear: both;">
<div id="legend">
    Sp=Starting Point<br>
    D=Door<br>
    DSw = Door Switch<br>
    Ds=Door secret<br>
    DsS=Door secret Switch<br>
    N=NPC<br>
    T=Teleport<br>
    Lc=Level Change<br>
    Kh=KeyHole<br>
    KhA=KeyHole Active<br>
    Itm=Item<br>
    Enm=Enemy<br>
    Cht=Chest<br>
    Trc=Torch<br>
    Rsr=Resurrection Statue<br>
    
    
</div>

</body>
</html>
