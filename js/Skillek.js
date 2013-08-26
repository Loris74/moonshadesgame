

var Skillek = {};


/*
    sebzes szmaitas:
    1:
    Normal Attacks:
Damage = A's Attack * A's Attack / B's Defense

Skills & Items
Damage = ( Base Damage + ( (A's Attack * Attack F / 100 ) + (A's Spirit * Spirit F / 100) )^2 ) / ( (B's Defense * Attack F) + (B's Spirit * Spirit F) )

2:
For magical attacks made by characters:

    Damage = Spell Power * 4 + (Level * Magic Power * Spell Power / 32)

  
  For magical attacks made by monsters:

    Damage = Spell Power * 4 + (Level * (Magic Power * 3/2) * Spell Power / 32)


  For physical attacks made by characters :

    Step 1a. Vigor2 = Vigor * 2
             If Vigor >= 128 then Vigor2 = 255 instead

    Step 1b. Attack = Battle Power + Vigor2

    Step 1c. If equipped with Gauntlet, Attack = Attack + Battle Power * 3 / 4

    Step 1d. Damage = Battle Power + ((Level * Level * Attack) / 256) * 3 / 2

    Step 1e. If character is equipped with an Offering:

    Damage = Damage / 2

    Step 1f. If the attack is a standard fight attack and the character is
    equipped with a Genji Glove, but only one or zero weapons:

    Damage = ceil(Damage * 3 / 4)


  For physical attacks made by monsters :
        
    Step 1a. Damage = Level * Level * (Battle Power * 4 + Vigor) / 256

    Note that vigor for each monster is randomly determined at the beginning of
    the battle as [56..63]
    
    
    
    
    3:
    The algorithm is:
for the normal Attack is ---> damage = ((attacker attack - target physical defence/2) * (20 + attacker strength) / 20) + random 15%
for the skills is ----> power = skill power + (user attack *skill attackforce / 100) - (target physical defence * skill physical def force /200)- (target magical defence * skill magical def force /200)
rate = 20 + user strength * skill strength force /100 + user dexterity * skill dex force /100 + user agi* skill agi force /100 + user int* skill int force /100 + random variance

damage = power * rate /20



4:
For normal attack damage, how would I calculate: ((Attack Power - Weapon's Attack Power) * 2 + Weapon's Attack Power) - (Opponent's Defense * 2) ?


5:
stat = base_value + growth*level

and we say that the player starts with 10 stat and a growth of 1.1, it would net a scheme like

Lv1: 10
Lv30: 43
Lv100: 110
Lv200: 230
Lv1000: 1 110
Lv9800: 10 780
Lv9900: 10 890


6:

    Swords, Spears, Crossbows, Rods: 

    DMG = [ATK * RANDOM(1~1.125) - DEF] * [1 + STR * (Lv+STR)/256] 
    
    For all weapons (that are not Bow and Arrows), the damage formula is the same as the previous formula, but also adds in the attack power of the weapon.

    Base Attack Power = Weapon's Attack Power + Str/4 + Level/4 
        Hit Rate = Hit Rate + Level/4 
            Base Attack Multiplier = Str/8 + Agi/16 + 1 
        Damage = Attacker's Attack Power * random(100, 150)/100 - Target's Defense 
        
        
        
7:
Figure out a base damage cap per level. This should be a linear scale.

1 dmg / lv.

Thus, a level 10 character with a 1 attack power fighting a creature with a 1 defense power would deal 10 damage.

Now adjust for attack and defence:

Level * (Attack / Defence)

Thus, a level 10 character with 10 attack power fighting a creature with 1 defence will deal: 10 * (10 / 1) = 100dmg.

You can add additional factors to this, but that gives you a starting point I think.

Adjust character and creature HP totals to adjust the difficulty level of the game.


8:

( a.level + 10 ) * ( a.atk - b.def / 2 ) / 5 + 1

9:
5 + (a.atk * 1.4) + ((a.level * 256) ** 0.5).to_i - (b.def * 0.7)


10:
8 * ((a.atk^2)/16+a.atk) * 0.5^(b.def*0.005)

11:
if hit_result == true
# Calculate basic damage
atk = [attacker.atk - self.pdef / 2, 0].max
self.damage = atk + (20 * attacker.str) / 20


12:

Damage = ((2A/5+2)*B*C)/D)/50)+2)*X)*Y/10)*Z)/255

A = attacker's Level
B = attacker's Attack or Special
C = attack Power
D = defender's Defense or Special
X = same-Type attack bonus (1 or 1.5)
Y = Type modifiers (40, 20, 10, 5, 2.5, or 0)
Z = a random number between 217 and 255 


13:
 ( ( ( ( a.level * 2 / 5 ) + 2 ) * 20 * a.atk / 50 ) / b.def ) 
 
 14:
 Damage = ((((2*A/5+2)*B*C/D)/50)+2)*E*F*G/100

A = Level of the attacking Pokémon
B = Attack / Spec. Attack (depending on the attack used) of the attacking Pokémon
C = Base Power of the attack
D = Defense / Spec. Defense (depending on the attack used) of the defending Pokémon
E = STAB --> Same Type Attack Bonus : 1 (if the type of the attack is different from the type[s] of the attacking Pokémon) or 1,5 (if the type of the attack is the same as [one of] the type[s] of the attacking Pokémon)
F = Weakness / Resistance factor : 0 ; 0,25 ; 0,5 ; 1 ; 2 ; 4
G = Random factor : number between 85 and 100

The formula you can implement is :

((((2*A/5+2)*B*C/D)/50)+2)*1*1*G/100
    

    
    15:
    The Strings:
strCharWpnDmg (the damage that his sword does. should create a random number based on its normal damage)
strCharDmg (strCharSTR+strCharWpnDmg)
strRanCharAtt(random number string based on characters acc)
strMonArm (Armor on the opponent)

strRanMonDef(random number string based on Goblins Dex)
If strRanCharAtt > strRanMonDef then
strMonHp=strMonHp-(strCharDMG-strMonArm)


16:
e = Enemy
ATK = Attack
ATKpow = Attack power increase or decrease
ATA = Accuracy
MIND = Magic
MGClvl = Magic technique's level
DEF = Defense
DEFpow = Defense power increase or decrease
EVP = Evasiveness
LUCK = Critical Hit Chance
MG WK = Magic Weakness (Enemy only)
r1 = Random Value from 0 to ATA
r2 = Random Value from 0 to LUCK
r3 = Random Value from -X to X

Normal attack
EQ1 = (((ATK x ATKpow) / (eDEF x eDEFpow)) + r3) Base Attack Damage + powerup increase or decrease
EQ2 = (1 - round(((r1 + eEVP / 2) / ATA))) Chance to miss
EQ3 = (2 - round((r2 / 2) / LUCK)) Chance to critical hit
Final Damage = EQ1 x EQ2 x EQ3
Magic Attack
((MIND x MGClvl) x MG WK) Magic Attack
    
    
    
    17:
    
    BaseWeaponDamage * 0.5 *
( 0.75 + Strength * 0.005 ) *
( 0.2 + ModifiedSkill * 0.015 ) *
( WeaponHealth/MaxWeaponHealth + 1 )/2


18:
Attacker: Attack, Heart
Defender: Defense, Spirit

Simple:
damage = Max(0, Attack + Heart - Defense - Spirit)
or:
damage = Max(0, Attack * Heart - Defense * Spirit)

More complex:
hit = Attack - Defense
if hit > 0 then
damage = Max(0, Heart - Spirit)
this way attack would determine how good you are at hitting someone, defense how good you are at evading a hit. Heart and spirit then determine the amount of damage done and absorbed. Got more stats?


19:
a is the actor
b is the target
v is game variables

So for example, a.atk * 4 - b.def * 2 should be easy to understand: damage = 4-times your attack minus 2-times their def.


20:
Damage = Weapon.attack * (1+(Actor.attack-Enemy.defense)/100)   [Basically the Diablo 2 formula]

    100 * 
    
*/

Skillek = function () {
    // ID,TIPUS(passziv, aktiv, buff),NEV,LEIRAS,SKILL_FUNKCIO, HANY MP ig MARAD FENT BUFFNAL, BUFF IKON, COOLDOWN miliszekundumban, ALAP SEBZES VAGY GYOGYITAS ez tulkepp a spell power, DOT vagy HOT per masodperc, DOT VAGY HOT mennyi ideig tart mp ben
    
    this.skillek = 
        [
           {
              "id":1,
              "tipus":"passziv",
              "nev":"Defy me not",
              "leiras":"+10% power if your HP is less than 50%",
              "funkcio":"defy_me_not",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/images/tukimas_dance.png",
              "cd":0,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":2,
              "tipus":"buff",
              "nev":"Let your rage burn",
              "leiras":"+5% power and +5% dexterity",
              "funkcio":"let_your_rage_burn",
              "buff_hany_mpig_marad":6,
              "ikon":"assets/images/berserker_rage.png",
              "cd":11000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":3,
              "tipus":"aktiv",
              "nev":"Fire blast",
              "leiras":"Shoots a fireball dealing high damage",
              "funkcio":"fireball",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/images/fireball.png",
              "cd":12000,
              "spell_power":18,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 32,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":4,
              "tipus":"gyogyitas",
              "nev":"Blessing",
              "leiras":"Bless your target and restore 20% hp",
              "funkcio":"blessing",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/images/tame_beasts.png",
              "cd":8000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":5,
              "tipus":"aktiv",
              "nev":"Magic arrows",
              "leiras":"Shoots 3 magic arrow",
              "funkcio":"magic_arrow",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/bolt_of_magma.png",
              "cd":4000,
              "spell_power":6,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":6,
              "tipus":"passziv",
              "nev":"Fired up",
              "leiras":"+10% power, +10% dexterity, +5% hp if character is at the first row",
              "funkcio":"fired_up",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/orb_of_destruction.png",
              "cd":0,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":7,
              "tipus":"aktiv",
              "nev":"Make them bleed",
              "leiras":"Deal damage and apply bleed on enemy",
              "funkcio":"make_them_bleed",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/pain.png",
              "cd":27000,
              "spell_power":11,
              "dot_per_mp":4,
              "dot_hany_mp_ig_marad":10,
              "mindenki_megkapja":"nem",
              "mana": 15,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":8,
              "tipus":"buff",
              "nev":"Protect",
              "leiras":"+20% defense, +20% vitality for everyone except the caster",
              "funkcio":"protect",
              "buff_hany_mpig_marad":20,
              "ikon":"assets/items/skillek/phase_shift.png",
              "cd":30000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"mindenki_kiveve_caster",
              "mana": 10,
              "szint": 5,
              "mennyi_skillpontba_kerul": 2
           },
           {
              "id":9,
              "tipus":"passziv",
              "nev":"In God we trust",
              "leiras":"+12% power, +12% vitality",
              "funkcio":"in_god_we_trust",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/apportation.png",
              "cd":0,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":10,
              "tipus":"buff",
              "nev":"Rallying shout",
              "leiras":"+10% power for everyone",
              "funkcio":"rallying_shout",
              "buff_hany_mpig_marad":5,
              "ikon":"assets/items/skillek/silence.png",
              "cd":22000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"mindenki",
              "mana": 10,
              "szint": 4,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":11,
              "tipus":"buff",
              "nev":"Hero's presence",
              "leiras":"+20% power, +15% dexterity for you and the character next to you for 5 minutes",
              "funkcio":"heros_presence",
              "buff_hany_mpig_marad":300,
              "ikon":"assets/items/skillek/statue_form.png",
              "cd":300000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"caster_es_mellette_allo",
              "mana": 10,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":12,
              "tipus":"buff",
              "nev":"Let your hatred flow",
              "leiras":"+10% power, +15% dexterity for everyone.",
              "funkcio":"let_your_hatred_flow",
              "buff_hany_mpig_marad":11,
              "ikon":"assets/items/skillek/lees_rapid_deconstruction.png",
              "cd":27000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"mindenki",
              "mana": 10,
              "szint": 10,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":13,
              "tipus":"aktiv",
              "nev":"On my mark",
              "leiras":"Removes cooldown from every character's weapon.",
              "funkcio":"on_my_mark",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/selective_amnesia.png",
              "cd":12000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 23,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":14,
              "tipus":"aktiv",
              "nev":"Corruption",
              "leiras":"Deals dark damage.",
              "funkcio":"corruption",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/alter_self.png",
              "cd":12000,
              "spell_power":18,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 8,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":15,
              "tipus":"aktiv",
              "nev":"Nightmares",
              "leiras":"Deal dark damage and apply damage over time on enemy",
              "funkcio":"nightmares",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/banishment.png",
              "cd":17000,
              "spell_power":9,
              "dot_per_mp":3,
              "dot_hany_mp_ig_marad":13,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 7,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":16,
              "tipus":"aktiv",
              "nev":"Sudden death",
              "leiras":"Deals lightning damage.",
              "funkcio":"sudden_death",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/insulation.png",
              "cd":22000,
              "spell_power":28,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 20,
              "szint": 10,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":17,
              "tipus":"buff",
              "nev":"Your weakness, my pleasure",
              "leiras":"Apply -20% damage debuff on enemy and 5% power to caster",
              "funkcio":"your_weakness_my_pleasure",
              "buff_hany_mpig_marad":25,
              "ikon":"assets/items/skillek/fulsome_distillation.png",
              "cd":38000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 20,
              "szint": 5,
              "mennyi_skillpontba_kerul": 2
           },
           {
              "id":18,
              "tipus":"buff",
              "nev":"Punish them",
              "leiras":"+30% dexterity",
              "funkcio":"punish_them",
              "buff_hany_mpig_marad":15,
              "ikon":"assets/items/skillek/symbol_of_torment.png",
              "cd":23000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 7,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":19,
              "tipus":"aktiv",
              "nev":"Flaming agony",
              "leiras":"Deals area of effect fire damage",
              "funkcio":"flaming_agony",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/sticky_flame.png",
              "cd":48000,
              "spell_power":31,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 46,
              "szint": 10,
              "mennyi_skillpontba_kerul": 3
           },
           {
              "id":20,
              "tipus":"buff",
              "nev":"Judgement",
              "leiras":"+15% dexterity and 15% power",
              "funkcio":"judgement",
              "buff_hany_mpig_marad":15,
              "ikon":"assets/items/skillek/blade_hands.png",
              "cd":23000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":21,
              "tipus":"buff",
              "nev":"Final charge",
              "leiras":"+38% power but -50% defense",
              "funkcio":"final_charge",
              "buff_hany_mpig_marad":10,
              "ikon":"assets/items/skillek/warp_weapon.png",
              "cd":23000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 7,
              "mennyi_skillpontba_kerul": 2
           },
           {
              "id":22,
              "tipus":"buff",
              "nev":"Stand united",
              "leiras":"+5% to all stat for everyone.",
              "funkcio":"stand_united",
              "buff_hany_mpig_marad":600,
              "ikon":"assets/items/skillek/flight.png",
              "cd":600000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"mindenki",
              "mana": 10,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":23,
              "tipus":"gyogyitas",
              "nev":"Martyr",
              "leiras":"Deals damage to caster and heal target for max hp",
              "funkcio":"martyr",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/detect_traps.png",
              "cd":35000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 30,
              "szint": 8,
              "mennyi_skillpontba_kerul": 2
           },
           {
              "id":24,
              "tipus":"gyogyitas",
              "nev":"Resurrect",
              "leiras":"Resurrects target character",
              "funkcio":"resurrect",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/invisibility.png",
              "cd":1800000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 60,
              "szint": 10,
              "mennyi_skillpontba_kerul": 3
           },
           {
              "id":25,
              "tipus":"buff",
              "nev":"Willing to sacrifice",
              "leiras":"+15% to all stat for everyone but deals damage to caster when the buff ends",
              "funkcio":"willing_to_sacrifice",
              "buff_hany_mpig_marad":15,
              "ikon":"assets/items/skillek/see_invisible.png",
              "cd":60000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"mindenki",
              "mana": 30,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":26,
              "tipus":"aktiv",
              "nev":"Hurricane",
              "leiras":"Deals area of effect air damage",
              "funkcio":"hurricane",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/airstrike.png",
              "cd":28000,
              "spell_power":31,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 29,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":27,
              "tipus":"aktiv",
              "nev":"Meteor shower",
              "leiras":"Deals area of effect fire damage",
              "funkcio":"meteor_shower",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/flame_tongue.png",
              "cd":31000,
              "spell_power":34,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 32,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":28,
              "tipus":"aktiv",
              "nev":"Weaken their mind",
              "leiras":"Deals damage and gives -20% damage debuff to enemy",
              "funkcio":"weaken_their_mind",
              "buff_hany_mpig_marad":14,
              "ikon":"assets/items/skillek/detect_items.png",
              "cd":22000,
              "spell_power":22,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 19,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":29,
              "tipus":"aktiv",
              "nev":"Setting fire",
              "leiras":"Deals fire damage",
              "funkcio":"setting_fire",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/bolt_of_fire.png",
              "cd":17000,
              "spell_power":24,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 12,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":30,
              "tipus":"buff",
              "nev":"Burning Hatred",
              "leiras":"+10% power and +10% dexterity",
              "funkcio":"burning_hatred",
              "buff_hany_mpig_marad":20,
              "ikon":"assets/items/skillek/dragon_form.png",
              "cd":30000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":31,
              "tipus":"passziv",
              "nev":"In flames I come",
              "leiras":"At 100% HP +10% dexterity",
              "funkcio":"in_flames_i_come",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/evaporate.png",
              "cd":0,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 10,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":32,
              "tipus":"aktiv",
              "nev":"Scorch",
              "leiras":"Deals damage and gives -30% power, -30% defense debuff to enemy",
              "funkcio":"scorch",
              "buff_hany_mpig_marad":10,
              "ikon":"assets/items/skillek/enslavement.png",
              "cd":22000,
              "spell_power":24,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,  
              "mindenki_megkapja":"nem",
              "mana": 22,
              "szint": 5,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":33,
              "tipus":"buff",
              "nev":"Astral shield",
              "leiras":"+20% defense and reflects 70% of attacks",
              "funkcio":"astral_shield",
              "buff_hany_mpig_marad":20,
              "ikon":"assets/items/skillek/polymorph_other.png",
              "cd":30000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 24,
              "szint": 10,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":34,
              "tipus":"gyogyitas",
              "nev":"Heal",
              "leiras":"Heal your target, restores 30% hp",
              "funkcio":"heal",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/images/tame_beasts.png",
              "cd":9000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 30,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           },
           {
              "id":35,
              "tipus":"aktiv",
              "nev":"Group Heal",
              "leiras":"Heal every character for 40% hp",
              "funkcio":"group_heal",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/items/skillek/sandblast.png",
              "cd":35000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 90,
              "szint": 8,
              "mennyi_skillpontba_kerul": 2
           },
           {
              "id":36,
              "tipus":"gyogyitas",
              "nev":"Dark Heal",
              "leiras":"Heal your target, restores 23% hp",
              "funkcio":"dark_heal",
              "buff_hany_mpig_marad":0,
              "ikon":"assets/images/tame_beasts.png",
              "cd":12000,
              "spell_power":0,
              "dot_per_mp":0,
              "dot_hany_mp_ig_marad":0,
              "mindenki_megkapja":"nem",
              "mana": 25,
              "szint": 1,
              "mennyi_skillpontba_kerul": 1
           }
           
           
           
           
           
           
           
           
           
           
           
           
           
           
        ];
    
}



Skillek.prototype.skill_adatok = function (skill_id)  {
    var ret = {};
    for (var i=0;i<this.skillek.length;i++) {
        if (this.skillek[i].id == skill_id) {
            ret.id = this.skillek[i].id;
            ret.tipus  = this.skillek[i].tipus;
            ret.nev  = this.skillek[i].nev;
            ret.leiras  = '<strong>'+ this.skillek[i].id + ' ' + this.skillek[i].nev +'</strong>';
            
            if (this.skillek[i].tipus == "buff") {
                ret.leiras  +=  ' - Buff<br><br>';
            }
            if (this.skillek[i].tipus == "aktiv" || this.skillek[i].tipus == "gyogyitas" ) {
                ret.leiras  +=  ' - Active<br><br>';
            }
            if (this.skillek[i].tipus == "passziv") {
                ret.leiras  +=  ' - Passive<br><br>';
            }
            
            ret.leiras  += this.skillek[i].leiras;
            
            if (this.skillek[i].tipus == "aktiv" && this.skillek[i].spell_power != 0) {
                ret.leiras  += '<br><br>Spell power: ' + this.skillek[i].spell_power;
            }
            
            
            if (this.skillek[i].buff_hany_mpig_marad != 0) {
                ret.leiras  += '<br><br>Buff length: ' + (this.skillek[i].buff_hany_mpig_marad) + ' seconds';
            }
            
            if (this.skillek[i].cd != 0) {
                ret.leiras  += '<br><br>Cooldown: ' + (this.skillek[i].cd/1000) + ' seconds';
            }
            
            if (this.skillek[i].mana != 0) {
                ret.leiras  += '<br><br>Mana cost: ' +  this.skillek[i].mana + ' mana';
            }
            
            ret.leiras  += '<br><br>Requires level ' +  this.skillek[i].szint;
            ret.leiras  += '<br><br>Skill point cost: ' +  this.skillek[i].mennyi_skillpontba_kerul;
            
            
            ret.funkcio = this.skillek[i].funkcio;
            ret.ikon = this.skillek[i].ikon;
            ret.cd = this.skillek[i].cd;
            ret.alap_sebzes = this.skillek[i].spell_power;
            ret.dot = this.skillek[i].dot_per_mp;
            ret.dot_ido = this.skillek[i].dot_hany_mp_ig_marad;
            ret.mennyi_ideig_marad_aktiv = this.skillek[i].buff_hany_mpig_marad;
            ret.mindenki_megkapja = this.skillek[i].mindenki_megkapja; 
            ret.mana = this.skillek[i].mana; 
            ret.szint = this.skillek[i].szint; 
            ret.mennyi_skillpontba_kerul = this.skillek[i].mennyi_skillpontba_kerul; 
            break;
        }
    }
    
    //console.log("skiladatok ret:");
    //console.log(ret);
    
    return ret;
}

// ezzel csak ellenorizzuk a skillek allapotat, ha passziv akkor a kondicok teljesulesekor megfelelone hozzaddunk statot
// ha aktiv akkor itt nem ellenorizzuk
// ha buff akkor csak azt nezzuk lejart e!
Skillek.prototype.skill_futtatasa = function (skill_id,karakter_adatok,skillek_hatasok)  {
    
    //console.log("Skillek.prototype.skill_futtatasa:");
    //console.log(skillek_hatasok);
    
    var skilladatok = this.skill_adatok(skill_id);
    
        var mi_a_funkcio_neve = skilladatok.funkcio;
        if (mi_a_funkcio_neve != "") {
            
            
            var mit = "var valasz = this." + mi_a_funkcio_neve + "("+ skill_id +",karakter_adatok,skillek_hatasok);";
            //console.log(mit);
            eval(mit);
            //console.log(mi_a_funkcio_neve);
            return valasz;
        }
    
    
    
}


Skillek.prototype.skill_animalas = function(skill_id,karakter_adatok) {
    
    if (skill_id == 7 ) {
        var boomer = new TextureAnimator( texture_skill_anim_magic_006, 5, 7, 35, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_magic_006;
    }
    
    if (skill_id == 3 ) {
        var boomer = new TextureAnimator( texture_skill_anim_fire_002, 5, 5, 25, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_fire_002;
    }
    
    if (skill_id == 14 ) {
        var boomer = new TextureAnimator( texture_skill_anim_cast_008, 5, 4, 20, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_cast_008;
    }
    if (skill_id == 17 ) {
        var boomer = new TextureAnimator( texture_skill_anim_darkness_002, 5, 6, 30, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_darkness_002;
    }
    if (skill_id == 19 ) {
        var boomer = new TextureAnimator( texture_skill_anim_fire_001, 5, 4, 20, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_fire_001;
    }
    if (skill_id == 16 ) {
        var boomer = new TextureAnimator( texture_skill_anim_thunder_002, 5, 5, 25, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_thunder_002;
    }
    if (skill_id == 15 ) {
        var boomer = new TextureAnimator( texture_skill_anim_darkness_001, 5, 6, 30, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_darkness_001;
    }
    if (skill_id == 5 ) {
        var boomer = new TextureAnimator( texture_skill_anim_cast_001, 5, 4, 20, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_cast_001;
    }
    
    if (skill_id == 26 ) {
        var boomer = new TextureAnimator( texture_skill_anim_wind_003, 5, 6, 30, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_wind_003;
    }
    if (skill_id == 27 ) {
        var boomer = new TextureAnimator( texture_skill_anim_fire_003, 5, 8, 40, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_fire_003;
    }
    if (skill_id == 28 ) {
        var boomer = new TextureAnimator( texture_skill_anim_magic_007, 5, 4, 20, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_magic_007;
    }
    if (skill_id == 32 ) {
        var boomer = new TextureAnimator( texture_skill_anim_cast_009, 5, 4, 20, 40  ,0); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_cast_009;
    }
    
    // buffok
    if (skill_id == 20 || skill_id == 10 || skill_id == 25 || skill_id == 21 || skill_id == 22 || skill_id == 18 || skill_id == 17 || skill_id == 12 || skill_id == 8) {
        var boomer = new TextureAnimator( texture_skill_anim_effect_002, 5, 5, 25, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_effect_002;
    }
    
    // amiire meg kell anim
    if (skill_id == 11 || skill_id == 13 || skill_id == 4 || skill_id == 24 || skill_id == 23 || skill_id == 33 || skill_id == 34 || skill_id == 35|| skill_id == 36) {
        var boomer = new TextureAnimator( texture_skill_anim_effect_002, 5, 5, 25, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_effect_002;
    }
    // ezekre is kell fanatichoz
    if (skill_id == 1 || skill_id == 2 || skill_id == 29 || skill_id == 30 || skill_id == 31) {
        var boomer = new TextureAnimator( texture_skill_anim_effect_002, 5, 5, 25, 40 ,0 ); // texture, #horiz, #vert, #total, duration.
        explosionTexture = texture_skill_anim_effect_002;
    }

    skill_animaciok.push(boomer);
    
    var skilladatok = this.skill_adatok(skill_id);
    
    if (skilladatok.tipus == "aktiv") {
        var wallGeometry = new THREE.PlaneGeometry(35, 35,1,1);
    } else {
        var wallGeometry = new THREE.PlaneGeometry(15, 15,1,1);
    }
    var wallMaterial = new THREE.MeshBasicMaterial( {map: explosionTexture} );
    wallMaterial.transparent = true;
    var spell_mesh = new THREE.Mesh(wallGeometry, wallMaterial);
    //spell_mesh.rotation = camera.rotation;
    spell_mesh.rotation =  MovingCube.rotation ;
    if (skilladatok.tipus == "aktiv") {
        spell_mesh.position.set(MovingCube.position.x,-10,MovingCube.position.z);    
    } else {
        spell_mesh.position.set(MovingCube.position.x,-15,MovingCube.position.z);
    }
    
    scene.add(spell_mesh);        

    // a spell aozn az oldalon jelenik meg ahol a caster all
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_adatok.karakter_id);
    
    
    spell_mesh.position.x = MovingCube.position.x;
    spell_mesh.position.z = MovingCube.position.z;
    
    if (skilladatok.tipus == "aktiv") {
        var eltoltas_elore = 65;
    } else {
        var eltoltas_elore = 25;
    }
    
    if (deg(MovingCube.rotation.y) == 180) {
        spell_mesh.position.z += eltoltas_elore; 
        if (karakterek[karakter_index].sorban_melyik_oldal == "bal") {
            spell_mesh.position.x += 8; 
        } else {
            spell_mesh.position.x -= 8; 
        }
        
        
    }
    if (deg(MovingCube.rotation.y) == 0) {
        spell_mesh.position.z -= eltoltas_elore; 
        if (karakterek[karakter_index].sorban_melyik_oldal == "bal") {
            spell_mesh.position.x -= 8; 
        } else {
            spell_mesh.position.x += 8; 
        }
    }
    if (deg(MovingCube.rotation.y) == 90) {
        spell_mesh.position.x -= eltoltas_elore; 
        if (karakterek[karakter_index].sorban_melyik_oldal == "bal") {
            spell_mesh.position.z += 8; 
        } else {
            spell_mesh.position.z -= 8; 
        }
    }
    if (deg(MovingCube.rotation.y) == 270) {
        spell_mesh.position.x += eltoltas_elore; 
        if (karakterek[karakter_index].sorban_melyik_oldal == "bal") {
            spell_mesh.position.z -= 8; 
        } else {
            spell_mesh.position.z += 8; 
        }
    }
    
    setTimeout(function() {
        // par mp mulva amikor mar tuti lelalt az anim leszedjuk a mest is. az anim updatet a textureanimator szedi ki
        scene.remove(spell_mesh);
        
    },4000);
    
    
    
    // verzio 1: szall a mob fele
    /*
    var sebesseg = 5;
    var mennyit_ment_az_anim = 0;
    
    //console.log(deg(MovingCube.rotation.y));
    if (deg(MovingCube.rotation.y) == 180) {
        var spell_anim_interval = setInterval(function(){
            mennyit_ment_az_anim++;
            spell_mesh.position.z += 1;
            
            // ha tobbet szallt az anim mint x tavolsag akkor is leallitjuk
            if (mennyit_ment_az_anim > 300) {
                clearInterval(spell_anim_interval);
                scene.remove(spell_mesh);
            }
            
            // megnezzuk van e enemy a helyen ahol jar
            for (var i=0;i<ellensegek.length;i++) {
                var tavolsag = ellensegek[i].mesh.position.distanceTo(spell_mesh.position);
                //console.log(tavolsag);
                if (tavolsag <= 40) {
                    // lellitjuk az intervalt es toroljuk a mesht
                    clearInterval(spell_anim_interval);
                    scene.remove(spell_mesh);
                }
                
            }
            
            
        },sebesseg);
    }
    if (deg(MovingCube.rotation.y) == 0) {
        var spell_anim_interval = setInterval(function(){
            spell_mesh.position.z -= 1;
        },sebesseg);
    }
    if (deg(MovingCube.rotation.y) == 90) {
        var spell_anim_interval = setInterval(function(){
            spell_mesh.position.x -= 1;
        },sebesseg);
    }
    if (deg(MovingCube.rotation.y) == 270) {
        var spell_anim_interval = setInterval(function(){
            spell_mesh.position.x += 1;
        },sebesseg);
    }
    
    */
    
}

// buffok itt indulnak el! skill_id,karakter_aktualis_statjai, karakter_aktualis_hatasai
Skillek.prototype.skill_inditasa = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    
    var ret = skillek_hatasok;
    
    if (skill_id_kulso == 3) { hang_lejatszas(45,{pan:0,volume:50}); }
    if (skill_id_kulso == 5) { hang_lejatszas(46,{pan:0,volume:60}); }
    if (skill_id_kulso == 4) { hang_lejatszas(47,{pan:0,volume:30}); }
    if (skill_id_kulso == 17) { hang_lejatszas(48,{pan:0,volume:60}); }
    if (skill_id_kulso == 8) { hang_lejatszas(49,{pan:0,volume:60}); }
    if (skill_id_kulso == 23) { hang_lejatszas(50,{pan:0,volume:60}); }
    if (skill_id_kulso == 19) { hang_lejatszas(51,{pan:0,volume:60}); }
    if (skill_id_kulso == 27) { hang_lejatszas(52,{pan:0,volume:60}); }
    if (skill_id_kulso == 32) { hang_lejatszas(53,{pan:0,volume:60}); }
    if (skill_id_kulso == 33) { hang_lejatszas(54,{pan:0,volume:60}); }
    if (skill_id_kulso == 12) { hang_lejatszas(55,{pan:0,volume:60}); }
    if (skill_id_kulso == 24) { hang_lejatszas(56,{pan:0,volume:60}); }
    if (skill_id_kulso == 28) { hang_lejatszas(57,{pan:0,volume:60}); }
    if (skill_id_kulso == 18) { hang_lejatszas(58,{pan:0,volume:60}); }
    if (skill_id_kulso == 20) { hang_lejatszas(59,{pan:0,volume:60}); }
    if (skill_id_kulso == 25) { hang_lejatszas(60,{pan:0,volume:60}); }
    if (skill_id_kulso == 21) { hang_lejatszas(61,{pan:0,volume:60}); }
    if (skill_id_kulso == 22) { hang_lejatszas(62,{pan:0,volume:60}); }
    if (skill_id_kulso == 7) { hang_lejatszas(63,{pan:0,volume:60}); }
    if (skill_id_kulso == 10) { hang_lejatszas(64,{pan:0,volume:60}); }
    if (skill_id_kulso == 11) { hang_lejatszas(65,{pan:0,volume:60}); }
    if (skill_id_kulso == 13) { hang_lejatszas(66,{pan:0,volume:60}); }
    if (skill_id_kulso == 14) { hang_lejatszas(67,{pan:0,volume:60}); }
    if (skill_id_kulso == 16) { hang_lejatszas(68,{pan:0,volume:60}); }
    if (skill_id_kulso == 15) { hang_lejatszas(69,{pan:0,volume:60}); }
    if (skill_id_kulso == 26) { hang_lejatszas(70,{pan:0,volume:60}); }
    if (skill_id_kulso == 34) { hang_lejatszas(47,{pan:0,volume:30}); }
    if (skill_id_kulso == 35) { hang_lejatszas(47,{pan:0,volume:30}); }
    if (skill_id_kulso == 36) { hang_lejatszas(47,{pan:0,volume:30}); }

    
    
    /*
    if (skill_id_kulso == 4) {
        hang_lejatszas(31,{pan:0,volume:20});    
    } else if (skill_id_kulso == 5) {
        hang_lejatszas(30,{pan:0,volume:30});    
    } else {
        hang_lejatszas(43,{pan:0,volume:70});    
    }
    */
    
    // masodpercben a jelenlegi ido
    
    // csak akkro indithatja ujra ha epp nincsen rajta!
    
    // ide kell majd a CD is!
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    // mikor jon le rola a fedo, a masodikat szorozzuk 1000 el mert mp ben van
    var mikor_hasznalhato_ujra = skilladatok.cd+(skilladatok.mennyi_ideig_marad_aktiv*1000);
    //var mikor_hasznalhato_ujra = skilladatok.cd;
    
    
    //if (skilladatok.tipus == "aktiv" || skilladatok.tipus == "buff" ) {
        this.skill_animalas(skill_id_kulso,karakter_adatok);
    //}

    //console.log("skill inditas");
    
    var mikor_aktivalta = "";
    
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta
    }
    
    //console.log("mikor_aktivalta" + mikor_aktivalta);
    if (mikor_aktivalta == "") {
        ret.mikor_aktivalta = Math.round(new Date().getTime() / 1000);    
        
        
    }
    
    // le is futtatjuk:
    this.skill_futtatasa(skill_id_kulso,karakter_adatok,skillek_hatasok);
    
    //console.log("ret");
    //console.log(ret);
    
    return ret;
    
}



Skillek.prototype.willing_to_sacrifice = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    //console.log(skillek_hatasok.buff_lejart);
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.power = 0;
            ret.defense = 0;
            ret.vitality = 0;
            ret.dexterity = 0;
            //ret.mikor_aktivalta = "";
            if (skillek_hatasok.buff_lejart == 0) {
                ret.buff_lejart = 1;    
                
                // ha lejar akkor sebzi a castert, de csak egyszer       
                if (karakter_adatok.karakter_id == skillek_hatasok.forras_karakter_id ) {
                    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_adatok.karakter_id);
            
                    karakterek[karakter_index].sebzodes((karakterek[karakter_index].max_hp*0.35));
                    
                }
            }
            
            
            
            
            // az aktivalast csak akkor allitjuk uresre ha a mennyi dieig marad aktiv + a CD ideje is lejart
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
                
                
                
            }
            
        } else {
            ret.power = parseInt(karakter_adatok.power*0.15);
            ret.defense = parseInt(karakter_adatok.defense*0.15);
            ret.vitality = parseInt(karakter_adatok.defense*0.15);
            ret.dexterity = parseInt(karakter_adatok.defense*0.15);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}

Skillek.prototype.astral_shield = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.defense = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
            
        } else {
            ret.defense = parseInt(karakter_adatok.defense*0.10);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}


Skillek.prototype.burning_hatred = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.power = 0;
            ret.dexterity = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
            
        } else {
            ret.power = parseInt(karakter_adatok.power*0.10);
            ret.dexterity = parseInt(karakter_adatok.defense*0.10);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}

Skillek.prototype.stand_united = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.power = 0;
            ret.defense = 0;
            ret.vitality = 0;
            ret.dexterity = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
            
        } else {
            ret.power = parseInt(karakter_adatok.power*0.05);
            ret.defense = parseInt(karakter_adatok.defense*0.05);
            ret.vitality = parseInt(karakter_adatok.defense*0.05);
            ret.dexterity = parseInt(karakter_adatok.defense*0.05);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}

Skillek.prototype.final_charge = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.power = 0;
            ret.defense = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
            ret.power = parseInt(karakter_adatok.power*0.39);
            ret.defense = -parseInt(karakter_adatok.defense*0.50);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}


Skillek.prototype.judgement = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.dexterity = 0;
            ret.power = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
            ret.power = parseInt(karakter_adatok.power*0.15);
            ret.dexterity = parseInt(karakter_adatok.dexterity*0.15);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}


Skillek.prototype.punish_them = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.dexterity = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
            ret.dexterity = parseInt(karakter_adatok.dexterity*0.30);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}
Skillek.prototype.let_your_hatred_flow = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.power = 0;
            ret.dexterity = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
            ret.power = parseInt(karakter_adatok.power*0.1);
            ret.dexterity = parseInt(karakter_adatok.dexterity*0.15);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}

Skillek.prototype.rallying_shout = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    //console.log("karakter_adatok.id:" + karakter_adatok.id + " skillek_hatasok.mikor_aktivalta:" + skillek_hatasok.mikor_aktivalta);
    
    // ha meg nem aktivalta akkro siman visszadjuk uresen az aktivalta-t a tobbi statot meg valtoztlanul
    if (mikor_aktivalta != "") {
        // ha mar atkvivalta akkor megnezzuk lejart e a megadott buff ido
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            // lejart
            //console.log("lejart: mikor_aktival:" + mikor_aktivalta + " skilladatok.mennyi_ideig_marad_aktiv:" + skilladatok.mennyi_ideig_marad_aktiv);
            ret.power = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
           // console.log("megkapja! " + karakter_adatok.power*0.1);
            // meg nem jart le megadjuk a buffot
            ret.power = parseInt(karakter_adatok.power*0.1);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}


Skillek.prototype.protect = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta
    }
    
    // ha meg nem aktivalta akkro siman visszadjuk uresen az aktivalta-t a tobbi statot meg valtoztlanul
    if (mikor_aktivalta != "") {
        // ha mar atkvivalta akkor megnezzuk lejart e a megadott buff ido
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            // lejart
            ret.defense = 0;
            ret.vitality = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
            // meg nem jart le megadjuk a buffot
            ret.defense = parseInt(karakter_adatok.defense*0.2);
            ret.vitality = parseInt(karakter_adatok.vitality*0.20);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}


Skillek.prototype.your_weakness_my_pleasure = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta
    }
    
    // ha meg nem aktivalta akkro siman visszadjuk uresen az aktivalta-t a tobbi statot meg valtoztlanul
    if (mikor_aktivalta != "") {
        // ha mar atkvivalta akkor megnezzuk lejart e a megadott buff ido
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            // lejart
            ret.power = 0;
            ret.enemy_damage = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
        } else {
            // meg nem jart le megadjuk a buffot
            ret.power = parseInt(karakter_adatok.power*0.05);
            // szazalekban mennyit vesz le tole
            // 20% ot a vegso damagejabol
            ret.enemy_damage = 0.2;
            ret.buff_lejart = 0;
        }
    }

    return ret;
}

// 5 re adja most
Skillek.prototype.let_your_rage_burn = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta
    }
    
    // ha meg nem aktivalta akkro siman visszadjuk uresen az aktivalta-t a tobbi statot meg valtoztlanul
    if (mikor_aktivalta != "") {
        // ha mar atkvivalta akkor megnezzuk lejart e a megadott buff ido
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            // lejart
            ret.power = 0;
            ret.dexterity = 0;
            
            ret.buff_lejart = 1;
            
            // az aktivalast csak akkor allitjuk uresre ha a mennyi dieig marad aktiv + a CD ideje is lejart
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
            
        } else {
            // meg nem jart le megadjuk a buffot
            ret.power = parseInt(karakter_adatok.power*0.10);
            ret.dexterity = parseInt(karakter_adatok.dexterity*0.15);
            ret.buff_lejart = 0;
        }
    }

    return ret;
}




Skillek.prototype.nightmares = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    ret.mennyit_sebzett = skilladatok.alap_sebzes;
    ret.dot = skilladatok.dot;

    return ret;
}



Skillek.prototype.make_them_bleed = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    ret.mennyit_sebzett = skilladatok.alap_sebzes;
    ret.dot = skilladatok.dot;

    return ret;
}


// a skill cd megegyezik a buff mennyi_ideig_marad_aktiv ertekkel, igy tudjuk mikor futhat ujra! ez egy aktiv skill de ide is kell mert specialis
Skillek.prototype.on_my_mark  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    for(var i=0;i<karakterek.length;i++) {
        karakterek[i].minden_fegyverrol_cd_leszedes();
    }
    
    /*
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta
    }
    
    if (mikor_aktivalta != "") {
        // ha mar atkvivalta akkor megnezzuk lejart e a megadott buff ido
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            // lejart
            ret.power = 0;
            ret.dexterity = 0;
            ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
        } else {
            // meg nem jart le megadjuk a buffot
            ret.power = 5;
            ret.dexterity = 5;
            ret.buff_lejart = 0;
        }
    }

    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        
        console.log(parseInt(mikor_aktivalta)+(skilladatok.cd/1000) + " > " + most);
        
        if ( (parseInt(mikor_aktivalta)+(skilladatok.cd/1000)) < most ) {
            for(var i=0;i<karakterek.length;i++) {
                karakterek[i].minden_fegyverrol_cd_leszedes();
            }
            
        }
        
    }
    */

    return ret;
}


Skillek.prototype.scorch  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;
    
    // szazalekban mennyit vesz le tole

    ret.enemy_power = 0.3;
    ret.enemy_defense = 0.3;
    
    return ret;
}

Skillek.prototype.weaken_their_mind  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;
    
    // szazalekban mennyit vesz le tole
    // 20% ot a vegso damagejabol
    ret.enemy_damage = 0.2;
    
    return ret;
}

Skillek.prototype.setting_fire  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;

    return ret;
}




Skillek.prototype.meteor_shower  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;

    return ret;
}

Skillek.prototype.hurricane  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;

    return ret;
}

Skillek.prototype.flaming_agony  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;

    return ret;
}

Skillek.prototype.sudden_death  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;

    return ret;
}

Skillek.prototype.corruption  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    ret.mennyit_sebzett = skilladatok.alap_sebzes;

    return ret;
}


Skillek.prototype.fireball  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    //skilladatok.alap_sebzes
    //console.log(karakter_adatok);
    
    // sebez:
    // kiszmoaljuk mennyit sebez a akrakter statok alapjan es atadjuk a karakter osztalynak aki majd az enemyket hivja meg
    ret.mennyit_sebzett = skilladatok.alap_sebzes;
    
    // Damage = Weapon.attack * (1+(Actor.attack-Enemy.defense)/100)   [Basically the Diablo 2 formula]

    return ret;
}
Skillek.prototype.magic_arrow  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    // sebez:
    // kiszmoaljuk mennyit sebez a akrakter statok alapjan es atadjuk a karakter osztalynak aki majd az enemyket hivja meg
    ret.mennyit_sebzett = 30;
    
   

    return ret;
}



Skillek.prototype.resurrect  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;

    // heal
    ret.mennyit_sebzett = 30;

    return ret;
}

Skillek.prototype.martyr  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    //console.log(karakter_adatok);
    
    // caster sebzodik:
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_adatok.karakter_id);
    
    karakterek[karakter_index].sebzodes((karakterek[karakter_index].max_hp*0.3));
    //console.log(karakterek[karakter_index]);
    //console.log((karakterek[karakter_index].max_hp*0.3));
    
    // heal
    ret.mennyit_sebzett = 99999;
    
   

    return ret;
}


Skillek.prototype.group_heal  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);

    for(var i=0;i<karakterek.length;i++) {
        var mennyit_gyogyit = parseInt(karakterek[i].max_hp * 0.40);
        karakterek[i].gyogyulas(35,mennyit_gyogyit);
    }
    

    return ret;
}

Skillek.prototype.dark_heal  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_adatok.karakter_id);
    var mennyit_gyogyit = parseInt(karakterek[karakter_index].max_hp * 0.23);
    
    ret.mennyit_sebzett = mennyit_gyogyit;
    
   

    return ret;
}



Skillek.prototype.heal  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_adatok.karakter_id);
    var mennyit_gyogyit = parseInt(karakterek[karakter_index].max_hp * 0.30);
    
    ret.mennyit_sebzett = mennyit_gyogyit;
    
   

    return ret;
}



Skillek.prototype.blessing  = function(skill_id_kulso,karakter_adatok,skillek_hatasok) {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var karakter_index = karakter_hanyadik_a_tombben_id_alapjan(karakter_adatok.karakter_id);
    var mennyit_gyogyit = parseInt(karakterek[karakter_index].max_hp * 0.20);

    ret.mennyit_sebzett = mennyit_gyogyit;
    
   

    return ret;
}



// - Fired up(+10pwr +10dex +5% vitality ha elöl van) passzív
Skillek.prototype.fired_up = function(skill_id_kulso,karakter_adatok,skillek_hatasok)  {
    var ret = skillek_hatasok;
    
    //console.log(karakter_adatok.hanyadik_sorban_van);
    if (karakter_adatok.hanyadik_sorban_van == 1) {
        ret.power = parseInt(karakter_adatok.power*0.1);
        ret.dexterity = parseInt(karakter_adatok.dexterity*0.1);
        ret.vitality = parseInt(karakter_adatok.vitality*0.05);
        ret.buff_bekapcsolt = 1;
        
        //console.log("karakter_adatok.power:" + karakter_adatok.power + "ret.power:" + ret.power);
    } else {
        // ha nem az elsoben van akkor kikpcsoljuk!
        ret.power = 0;
        ret.dexterity = 0;
        ret.vitality = 0;
        ret.buff_lejart = 1;
    }
    
    return ret;
}

Skillek.prototype.heros_presence = function (skill_id_kulso,karakter_adatok,skillek_hatasok)  {
    var ret = skillek_hatasok;
    
    var skilladatok = this.skill_adatok(skill_id_kulso);
    
    var mikor_aktivalta = "";
    if (skillek_hatasok.mikor_aktivalta != "") {
        mikor_aktivalta = skillek_hatasok.mikor_aktivalta;
    }
    
    if (mikor_aktivalta != "") {
        var most = Math.round(new Date().getTime() / 1000);
        
        if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv) < most ) {
            ret.power = 0;
            ret.dexterity = 0;
            //ret.mikor_aktivalta = "";
            ret.buff_lejart = 1;
            
            // az aktivalast csak akkor allitjuk uresre ha a mennyi dieig marad aktiv + a CD ideje is lejart
            if ( (parseInt(mikor_aktivalta)+skilladatok.mennyi_ideig_marad_aktiv+(skilladatok.cd/1000)) < most ) {
                ret.mikor_aktivalta = "";    
            }
            
        } else {
            ret.power = parseInt(karakter_adatok.power*0.20);
            ret.dexterity = parseInt(karakter_adatok.dexterity*0.15);
            ret.buff_lejart = 0;
        }
    }

    return ret;    
    
}

Skillek.prototype.in_god_we_trust = function (skill_id_kulso,karakter_adatok,skillek_hatasok)  {
    var ret = skillek_hatasok;
    
    ret.power = parseInt(karakter_adatok.power*0.15);
    ret.vitality = parseInt(karakter_adatok.vitality*0.15);
    ret.buff_bekapcsolt = 1;
    
    return ret;
}


Skillek.prototype.in_flames_i_come = function (skill_id_kulso,karakter_adatok,skillek_hatasok)  {
    var ret = skillek_hatasok;

    var jelenlegi_hp_szazalek = (karakter_adatok.hp / karakter_adatok.max_hp)*100;
    
    if (jelenlegi_hp_szazalek == 100) { 
        ret.dexterity = parseInt(karakter_adatok.dexterity*0.10);
        ret.buff_bekapcsolt = 1;
        // buff bekapocslas
        
        //console.log(ret.power);
    } else {
        ret.buff_lejart = 1;
    }
    
    return ret;
}

// passziv skill ha a HP kisebb mint 100% akkor ad plusz 10% powert
Skillek.prototype.defy_me_not = function (skill_id_kulso,karakter_adatok,skillek_hatasok)  {
    //console.log("defy_me_not fut");
    
    // a valasz a karakerek objektum skill_hatasoknak megfelelo
    //var ret = {skill_id:skill_id_kulso,mikor_aktivalta:"",power:karakter_adatok.power,dexterity:karakter_adatok.dexterity,defense:karakter_adatok.defense,vitality:karakter_adatok.vitality,szint:karakter_adatok.szint,magicfind:karakter_adatok.magicfind,hp:karakter_adatok.hp};
    
    //var ret = {skill_id:skill_id_kulso,mikor_aktivalta:"",power:0,dexterity:0,defense:0,vitality:0,szint:0,magicfind:0,hp:0};
    var ret = skillek_hatasok;
    
    // csak annyit adunk vissza amennyit maga as kill adna pluszban. igy ha lejar vagy leveszi akkor ezt nullazuk es nem fog hozzaadodni
    
    //
    var jelenlegi_hp_szazalek = (karakter_adatok.hp / karakter_adatok.max_hp)*100;
    
    if (jelenlegi_hp_szazalek < 50) { 
        //console.log("ksiebb mint 100" + karakter_adatok.hp);
        //ret.power = 8;
        // szazalekban
        ret.power = parseInt((karakter_adatok.power/100)*10);
        ret.buff_bekapcsolt = 1;
        // buff bekapocslas
        
        //console.log(ret.power);
    } else {
        ret.buff_lejart = 1;
    }
    //if (karakter_adatok.hp == 100) { ret.power += 8;}
    
    return ret;
}
