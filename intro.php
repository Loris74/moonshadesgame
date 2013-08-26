<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Moonshades: an old-school dungeon crawler role playing game</title>
    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <meta name="robots" content="INDEX,FOLLOW" />

        <meta name="keywords" content="moonshades, rpg, game, webgl, rola playing game, dungeon, dungeon crawler, rpg game " />
        <meta name="subject" content="Moonshades is an old-school dungeon crawler rpg ( role playing game ). Runs in the browser no need to download or install." />

        <meta name="description" content="Moonshades is an old-school dungeon crawler rpg ( role playing game ). Runs in the browser no need to download or install." />
        
        <script src="js/three.js"></script>
        <script type='text/javascript' src='js/jquery-1.8.2.js'></script>

        <script type='text/javascript' src='js/soundmanager2-jsmin.js'></script>
        
        <script type='text/javascript' src='js/jquery.imgpreload.min.js'></script>
        
        
        <script type='text/javascript' src='js/Detector.js'></script>

        
        <meta charset="utf-8">
        <style>
            body {
                margin: 0px;
                background-color: #000000;
                overflow: hidden;
            }
            
            
            @font-face {
            font-family: 'intro_betutipus';
            src: url('fonts/dc_s.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;

            }            
            
            #szovegek {
                position: absolute;
                bottom: 0px;
                width: 100%;
                height: 100px;
                padding: 20px;
                background-color: black;
                opacity: 0.9;
            }
            
            #szovegek_belso {
                text-align: center;
                color: #ffffff;
                font-family: 'intro_betutipus';
                font-size: 30px;
                padding-right: 40px;
                
                
            }
            
            
            
            #skip {
                position: absolute;
                top: 10px;
                left: 10px;
                color: white;
                font-family: 'intro_betutipus';
                font-size: 18px;
            }

            
        </style>
        
        
        
    </head>
    <body>
    
                                                                            
                                                                     
                                                                     
<!--                                             
who doesn't want to be a hero? the knight in the shining armor, or the powerful mage, people who repel any evil on sight. battling hordes of demons.
the people in Harten are all in a mess. desperately fighting for their lives, for their homeland against the sudden curse. the night which brought them shelter and peaceful moments, the stars which were their guiding signs, now all turned on them by the curse, that has wrought upon the land, by unknown forces of evil.
they live beneath the surface, forced into holes, like animals. ripped from their once great honor, and freedom. in tunnels they traverse the lands, searching for a cure, for heroes.
little they knew, when they  thought they are in a safe place, from the demons and unholy creatures of the dead walking the night. beneath the surface, others dangers are lurking.
there is only one way for them. fighting the treats they uncover in the dungeons and tunnels. gathering enough power to fight back the evil and retake what once was theirs. -->

    

    <script>
        var cutscene_oldal = 1;
        
        var kepek = new Array("assets/artworks/kingis_ver3.jpg","assets/artworks/fossil_cave.jpg","assets/artworks/story9_14_full.jpg","assets/artworks/darknight.jpg","assets/artworks/crowprin4_0.jpg","assets/artworks/luminenluola2.jpg","assets/artworks/castle15b.jpg")
        
        console.log('loading...');
        
        var kepek_betoltve = 0;
        
        jQuery.imgpreload(kepek, {
            all: function() {
                //$('#status').append('<li> all images loaded </li>');
                console.log('loaded!');
                kepek_betoltve = 1;
            }
        });
    
        
        function intro_inditas_pre() {
            if (kepek_betoltve == 1) {
                animate();
                intro_inditas();
            } else {
                setTimeout(function(){
                    intro_inditas_pre();
                },500);
            }
        }
        
        function intro_inditas() {
            $("#szoveg_"+cutscene_oldal).fadeIn(2000);
            setTimeout(function(){
                intro_leptetes();
            },12000);
        }
        
        function intro_leptetes() {
            
            $('#szinpad').fadeOut(2000);
            
        
            var i = 1;
            var forgasInterval = setInterval(function() {
                i++;
                camera.rotation.y -= rad(0.07);    
                camera.position.z += 1; 
                //camera.rotation.y += rad(0.07);    
                if (i >= 300) {
                    clearInterval(forgasInterval);
                    camera.rotation.y = 0;
                    camera.position.z = 800; 
                    
                    scene.remove( mesh );
                    
                    texture = THREE.ImageUtils.loadTexture( kepek[cutscene_oldal] );
                    material = new THREE.MeshBasicMaterial( { map: texture } );
                    var geometry = new THREE.CubeGeometry( intro_geo_meretek.x, intro_geo_meretek.y, intro_geo_meretek.y);
                     mesh = new THREE.Mesh( geometry, material );
                     mesh.dynamic = true;
                     scene.add( mesh );
                    
                    $('#szinpad').fadeIn(2000);
                    

                }
            },3);                    
            
            $("#szoveg_"+cutscene_oldal).fadeOut(2000,function(){
                
                if (cutscene_oldal == 7) {
                    document.location = 'index.php';
                }
                
                cutscene_oldal++;
                $("#szoveg_"+cutscene_oldal).fadeIn(2000);
                setTimeout(function(){
                    intro_leptetes();
                },15000);
                
                
                        
                
            });
        }

        
        function rad(n) {
            return n*(Math.PI/180);
        }
        
        $(document).ready(function() {
            
            $(document).keyup(function(e) {

                if (e.keyCode == 27) { document.location = 'index.php'; }  
            });
            
            if (  !Detector.webgl ) {
                alert('Your browser does not seem to support WebGL. Please use Google Chrome to play.')

            }
                        
            soundManager.setup({
              url: 'js/swf/',
              debugMode: false,
              flashVersion: 9, // optional: shiny features (default = 8)
              useFlashBlock: false, // optionally, enable when you're ready to dive in
              /**
               * read up on HTML5 audio support, if you're feeling adventurous.
               * iPad/iPhone and devices without flash installed will always attempt to use it.
               */
              onready: function() {
                // Ready to use; soundManager.createSound() etc. can now be called.
                
                
                    var akarmi = soundManager.createSound({
                      id: "intro",
                      url: "assets/audio/TheDarkAmulet_0.mp3",
                      autoLoad: true,
                      autoPlay: true,
                      onload: function(j) {
                          // zene eindult. elindul a cutscene is
                          intro_inditas_pre();
                      },
                      volume: 100
                    });
              }
        }); 
    }); 
    
    </script>
    
    <div id="szinpad">
        <div id="skip">Press ESC to skip</div>
    </div> 
    <div id="szovegek">
        <div id="szovegek_belso">
            <div id="szoveg_1" style="display: none;">Who doesn't want to be a hero? the knight in the shining armor, or the powerful mage, people who repel any evil on sight. battling hordes of demons.</div>
            <div id="szoveg_2" style="display: none;">The people in Harten are all in a mess. desperately fighting for their lives, for their homeland against the sudden curse. the night which brought them shelter and peaceful moments, the stars which were their guiding signs </div>
            <div id="szoveg_3" style="display: none;">now all turned on them by the curse, that has wrought upon the land, by unknown forces of evil.</div>
            <div id="szoveg_4" style="display: none;">They live beneath the surface, forced into holes, like animals. ripped from their once great honor, and freedom. in tunnels they traverse the lands, searching for a cure, for heroes.</div>
            <div id="szoveg_5" style="display: none;">Little they knew, when they  thought they are in a safe place, from the demons and unholy creatures of the dead walking the night. beneath the surface, others dangers are lurking.</div>
            <div id="szoveg_6" style="display: none;">There is only one way for them. fighting the treats they uncover in the dungeons and tunnels. gathering enough power to fight back the evil and retake what once was theirs. </div>
            <div id="szoveg_7" style="display: none;">Moonshades</div>
        
        </div>
    </div>
       
       
       


       
        
        <script>
            var intro_geo_meretek = {x:1000,y:900,z:600};
            
            var container = $('#szinpad');
            
            var camera, scene, renderer;
            var mesh;
                var mouseX = 0, mouseY = 0;
            
            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            
            var texture;
            var material;
            
            init();
            
            
            function init() {

                renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.append( renderer.domElement );

                //

                camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.z = 800;

                
               scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2( 0x000000, 0.0010 );


                // LIGHTS

                var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
                dirLight.position.set( 0, 0, 1 ).normalize();
                scene.add( dirLight );

                var pointLight = new THREE.PointLight( 0xffffff, 1.5 );
                pointLight.position.set( 0, 100, 90 );
                scene.add( pointLight );
                
                
                var geometry = new THREE.CubeGeometry( intro_geo_meretek.x, intro_geo_meretek.y, intro_geo_meretek.y);

                texture = THREE.ImageUtils.loadTexture( 'assets/artworks/kingis_ver3.jpg' );
                material = new THREE.MeshBasicMaterial( { map: texture } );
                

                mesh = new THREE.Mesh( geometry, material );
                mesh.dynamic = true;
                scene.add( mesh );
                //mesh.rotation.x = 30;
                
                
                
                geometry = new THREE.Geometry();
                sprite = THREE.ImageUtils.loadTexture( "assets/images/particle.png" );
                
                for ( i = 0; i < 10000; i ++ ) {

                    var vertex = new THREE.Vector3();
                    vertex.x = 2000 * Math.random() - 1000;
                    vertex.y = 2000 * Math.random() - 1000;
                    vertex.z = 2000 * Math.random() - 1000;

                    geometry.vertices.push( vertex );

                }

                material = new THREE.ParticleBasicMaterial( { size: 15, sizeAttenuation: false, map: sprite,transparent: true } );
                material.transparent = 1;
                //material.color.setHSV( 1.0, 0.2, 0.8 );

                particles = new THREE.ParticleSystem( geometry, material );
                particles.sortParticles = false;
                scene.add( particles );                
                
                window.addEventListener( 'resize', onWindowResize, false );
                
                document.addEventListener( 'mousemove', onDocumentMouseMove, false );

            }
            
            function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            }
            
            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }
            
            var mouseX_regi = null;
            var mouseY_regi = null;
            
            function animate() {

                requestAnimationFrame( animate );

                //mesh.rotation.x += 0.005;
                //mesh.rotation.y += 0.01;
                //mesh.rotation.z += 0.01;
                
                //textMesh1.rotation.x += 0.01;

                //mesh.scale.x += 0.01;
                //mesh.scale.z += 0.01;
                
                
                if (mouseX_regi == mouseX && mouseY_regi == mouseY) {
                    // ha nem mozog az eger
                    camera.position.z += 0.06;
                    //camera.rotation.z -= rad(0.01);

                } else {
                    
                }

                if (mouseX_regi != mouseX) {
                    mouseX_regi = mouseX;
                }
                if (mouseY_regi != mouseY) {
                    mouseY_regi = mouseY;
                }
                
                camera.position.x += ( mouseX/8 - camera.position.x ) * 0.05;
                camera.position.y += ( - mouseY/8 - camera.position.y ) * 0.05;
                var time = Date.now() * 0.00005;

                
                //camera.rotation.z = ( - mouseY/5 - camera.position.y ) * 0.001;
                
                
                
                renderer.render( scene, camera );
                
                

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
