# username az emailcime lesz!
CREATE TABLE felhasznalok (
	felhasznalo_id INT AUTO_INCREMENT PRIMARY KEY,
    email varchar(80) NOT NULL default '',
    jelszo varchar(180) NOT NULL default '',
    fb_id varchar(255) NOT NULL,
    regisztracio_ideje datetime,
	statusz INT NOT NULL default 1
);


# adat mezokbe (karakterek,ellensegek, terkep) serializevel kerulbe minden a struktura a ments.js fajlban lesz definialva
# var json_text = JSON.stringify(karakterek, null, 2);
#
CREATE TABLE mentesek (
    mentes_id INT AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_id varchar(255) NOT NULL,
    mentes_datuma datetime,
    karakterek text,
    ellensegek text,
    terkepek text,
    npck text,
    statusz INT NOT NULL default 1
);


CREATE TABLE kerdoiv_valaszok (
    valasz_id INT AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_id INT NOT NULL,
    mikor datetime,
    valaszolt INT NOT NULL,
    valasz1 varchar(255) NULL,
    valasz2 varchar(255) NULL,
    valasz3 varchar(255) NULL,
    valasz4 varchar(255) NULL,
    valasz5 varchar(255) NULL,
    valasz6 varchar(255) NULL,
    valasz7 varchar(255) NULL,
    valasz_egyeb varchar(255) NULL,
    statusz INT NOT NULL default 1
);


