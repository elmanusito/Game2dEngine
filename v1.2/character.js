var character = {
	skin: 'img/char_face.png',
	usingItem:0,
	salud:100,
	armadura:0,
	hambre:100,
	experiencia:0,
	sx:0, 
	sy:0, 
	sw:22, 
	sh:22,
	x:96,
	y:96,
	w:32,
	h:32,
	init: function(){
		that = this;
		this.charImg = new Image();
		this.charImg.src = this.skin;
		this.charImg.onload = function(){
			that.draw_char();
		}
	},
	draw_char: function () {
		ctx.drawImage(this.charImg, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
	},
	useItem: function (posInInventary){
		//Setea que id de item está en la posición del inventario que eligió el usuario.
		this.usingItem = inventary.items[posInInventary-1];
		
		//Busca el id de item seleccionado en el invantario.
		var index = inventary.items.indexOf(this.usingItem);

		//Si lo encuentra, lo elimina del inventario.
		if (index > -1) {
			inventary.items.splice(index, 1);
		}

		//Se lo agrega al character
		if (this.usingItem != undefined) {
			this.salud 		 += items[this.usingItem].salud;
			this.armadura 	 += items[this.usingItem].armadura;
			this.hambre 	 += items[this.usingItem].hambre;
			this.experiencia += items[this.usingItem].experiencia;
		};

		//Chequea el status del character y que debe realizar.
		this.checkIndicators();

		//Muestro indicadores por consola.
		this.showIndicators();
	},
	dropItem: function (posInInventary){
		//Setea que id de item está en la posición del inventario que eligió el usuario.
		this.usingItem = inventary.items[posInInventary-1];

		//Busca el id de item seleccionado en el invantario.
		var index = inventary.items.indexOf(this.usingItem);

		//Si lo encuentra, lo elimina del inventario.
		if (index > -1) {
			inventary.items.splice(index, 1);
		}

		//Lo agrega al mapa
		var row = this.x / 32;
		var col = this.y / 32;
		itemsMap[col][row] = this.usingItem;
	},
	checkIndicators: function() {
		if (this.hambre <= 0) {
			this.salud = this.salud - 10;
			console.log('Tengo hambre y me muero!');
		};

		if (this.salud <= 0) {
			console.log('oh me morri!');
			for (var i = terrainMap.length - 1; i >= 0; i--) {
				terrainMap[i].fill(0);
			};
			for (var i = itemsMap.length - 1; i >= 0; i--) {
				itemsMap[i].fill(0);
			};
		};
	},
	showIndicators: function () {
		console.log(' Salud:'+this.salud, ' Armadura:'+this.armadura, ' Hambre:'+this.hambre, ' Experiencia:'+this.experiencia );
	}
};

//Comprueba si el character puede o no pasar por un bloque.
var puedoPasar = function puedoPasar (direccion) {
	switch(direccion){
		case 'izquierda':
			if(terrainMap[(character.y/32)][(character.x/32)-1] != 3){
				character.x = character.x - 32;
				if (character.x < 0) {
					character.x = (canvas.width -32);
				};
				checkDamage();
			}
			break;
		case 'derecha':
			if(terrainMap[(character.y/32)][(character.x/32)+1] != 3){
				character.x = character.x + 32;
				if (character.x > canvas.width-34) {
					character.x = 0;
				};
				checkDamage();
			}
			break;
		case 'arriba':
			if(terrainMap[(character.y/32)+1][(character.x/32)] != 3){
				character.y = character.y + 32;
				if (character.y > canvas.height-32) {
					character.y = 0;
				};
				checkDamage();
			}
			break;
		case 'abajo':
			if(terrainMap[(character.y/32)-1][(character.x/32)] != 3){
				character.y = character.y - 32;
				if (character.y < 0) {
					character.y = canvas.height-32;
				};
				checkDamage();
			}
			break;
	}
}

var checkDamage = function checkDanio () {
	console.log(terrainMap[(character.y/32)][(character.x/32)]);
	if (terrainMap[(character.y/32)][(character.x/32)] == 4) {
		var damage = objetos[terrainMap[(character.y/32)][(character.x/32)]].salud;
		character.salud += damage;
	};
}