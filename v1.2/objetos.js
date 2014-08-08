/*OBJETOS*/
var objetos = [];
//Suelo semento blando
objetos[0] = {sx:0, sy:0, sw:32, sh:32, salud: 0};

//Suelo semento duro
objetos[1] = {sx:32, sy:0, sw:32, sh:32, salud: 0};

//Tierra
objetos[2] = {sx:64, sy:0, sw:32, sh:32, salud: 0};

//Arena
objetos[3] = {sx:64, sy:32, sw:32, sh:32, salud: 0};

//Lava
objetos[4] = {sx:448, sy:480, sw:32, sh:32, salud: -10};

//Diamante
objetos[5] = {sx:64, sy:96, sw:32, sh:32, salud: 0};

//Agua
objetos[6] = {sx:448, sy:416, sw:32, sh:32, salud: 0};