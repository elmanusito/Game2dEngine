/*
TODO:
	* Cargar las imagenes al principio y ejecutar un evento de "Carga completada" para iniciar el juego, no el anidamiento de loaders de imagenes.
	* Redefinir var objetos[] ya que también tenemos items, y los items son objetos también. items = items | objetos = terrainObjects
*/

$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var images = [];
	var game_loop;
	var level = 1;
	var terrainLevel;
	var itemsLevel;

	var terrainMapLevel1 = [
		[3,3,3,3,3,3,3,3,3,3,3,3,3,3],
		[3,4,3,1,2,1,1,1,4,3,1,2,2,3],
		[3,1,3,1,2,1,1,1,2,3,1,4,1,3],
		[3,1,0,1,2,1,1,1,2,3,1,2,3,3],
		[3,1,3,1,4,1,1,1,2,3,1,2,2,3],
		[3,0,3,1,2,1,1,1,2,3,1,2,3,3],
		[3,0,3,1,2,1,1,1,2,3,1,2,1,3],
		[3,0,3,1,2,1,1,1,5,3,1,2,3,3],
		[3,0,3,1,2,1,1,1,6,6,4,2,1,3],
		[3,0,3,1,2,1,1,1,6,6,1,2,3,3],
		[3,0,3,1,2,1,1,1,2,6,6,2,2,3],
		[3,0,0,0,2,1,1,1,2,3,1,2,3,3],
		[3,1,3,1,2,1,1,1,2,3,1,2,7,3],
		[3,3,3,3,3,3,3,3,3,3,3,3,3,3]
	];

	var terrainMapLevel2 = [
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4],
		[4,7,4,1,2,1,4,1,4,3,1,4,2,4],
		[4,0,4,1,2,1,4,1,2,3,1,4,1,4],
		[4,0,4,1,4,1,4,1,4,3,1,4,3,4],
		[4,0,4,1,4,1,4,1,4,3,1,4,2,4],
		[4,0,4,1,4,1,4,1,4,3,1,4,3,4],
		[4,0,4,1,4,1,4,1,4,3,1,4,1,4],
		[4,0,4,1,4,1,4,1,4,3,1,4,3,4],
		[4,0,4,1,4,1,4,1,4,6,4,4,1,4],
		[4,0,4,1,4,1,4,1,4,6,1,4,3,4],
		[4,0,4,1,4,1,4,1,4,6,6,4,2,4],
		[4,0,4,0,4,1,1,1,4,3,1,2,3,4],
		[4,0,0,1,4,1,1,1,4,3,1,2,1,4],
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4]
	]


	var itemsMapLevel1 = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,2,1,3,5,4,0,0,0,4,0],
		[0,0,0,6,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,5,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,7,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];

	var itemsMapLevel2 = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,3,0,0,0,0,0,0,0,0,0,0,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,7,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,2,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,4,0,0,0,0,0,0,0,5,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,6,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];

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
	
	//Portal
	objetos[7] = {sx:160, sy:64, sw:32, sh:32, salud: 0};




	/*ITEMS*/
	var items = [];
	//Casco de cuero
	items[1] = {sx:0, sy:0, sw:32, sh:32, name:'Casco de cuero', salud: 0, armadura: 3, hambre: 0, experiencia: 0};

	//Casco de malla
	items[2] = {sx:32, sy:0, sw:32, sh:32, name:'Casco de malla', salud: 0, armadura: 4, hambre: 0, experiencia: 0};

	//Casco de metal
	items[3] = {sx:64, sy:0, sw:32, sh:32, name:'Casco de metal', salud: 0, armadura: 10, hambre: 0, experiencia: 10};

	//Casco de diamante
	items[4] = {sx:96, sy:0, sw:32, sh:32, name:'Casco de diamante', salud: 0, armadura: 50, hambre: 0, experiencia: 50};

	//Casco de oro
	items[5] = {sx:128, sy:0, sw:32, sh:32, name:'Casco de oro', salud: 0, armadura: 30, hambre: 0, experiencia: 20};

	//Carne de vaca asada
	items[6] = {sx:260, sy:162, sw:32, sh:32, name:'Carne de vaca asada', salud: 0, armadura: 0, hambre: 40, experiencia: 0};

	//Manzana
	items[7] = {sx:324, sy:2, sw:32, sh:32, name:'Manzana', salud: 0, armadura: 0, hambre: 20, experiencia: 0};



	/*ENEMIGOS*/
	var enemies = []

	//Enemigo 1
	enemies[0] = {sx:0, sy:0, sw:0, sh:0, salud:100};

	//Enemigo 2
	enemies[1] = {sx:0, sy:0, sw:0, sh:0, salud:300};


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
			itemsLevel[row][col] = this.usingItem;
		},
		dondeEstoy: function () {
			var row = this.x / 32;
			var col = this.y / 32;

			switch(terrainLevel[col][row]){
				case 7:
					if (level == 1) {
						terrainLevel = terrainMapLevel2;
						itemsLevel = itemsMapLevel2;
						level = 2;
						console.log('level 2');
					}else if (level == 2) {
						terrainLevel = terrainMapLevel1;
						itemsLevel = itemsMapLevel1;
						level = 1;
						console.log('level 1');
					};
				break;
			}
			
		},
		checkIndicators: function() {
			if (this.hambre <= 0) {
				this.salud = this.salud - 10;
				console.log('Tengo hambre y me muero!');
			};

			if (this.salud <= 0) {
				console.log('oh me morri!');
				for (var i = terrainLevel.length - 1; i >= 0; i--) {
					terrainLevel[i].fill(0);
				};
				for (var i = itemsLevel.length - 1; i >= 0; i--) {
					itemsLevel[i].fill(0);
				};
			};
		},
		showIndicators: function () {
			console.log(' Salud:'+this.salud, ' Armadura:'+this.armadura, ' Hambre:'+this.hambre, ' Experiencia:'+this.experiencia );
		}
	};
	

	/*Inventario*/
	var inventary = {
		length: 8,
		items: [],
		itemSelected:0,
		selectItem: function(item){
			this.itemSelected = item;
		}
	};

	
	// Inicializador
	var init = function	init()	{
		preloadimages(['img/terrain.png', 'img/items.png', 'img/inventary.png', 'img/icons1.png']).done(function(img){
			images = img;
			terrainLevel = terrainMapLevel1;
			itemsLevel = itemsMapLevel1;
			character.init();
			dibujar();
		})
	};

	var draw_terrain = function draw_terrain () {
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, 450, 450);
		for (var row = 0; row < terrainLevel.length ; row++) {
			for (var col = 0; col <= terrainLevel[row].length -1; col++) {
				sx = objetos[terrainLevel[row][col]].sx;
				sy = objetos[terrainLevel[row][col]].sy;
				sw = objetos[terrainLevel[row][col]].sw;
				sh = objetos[terrainLevel[row][col]].sh;
				x  = 32 * col;
				y  = 32 * row;
				w  = 32;
				h  = 32;

				/* COMO SETEAR LOS VALORES CORRECTAMENTE */
				// sx 		= 0;	// Pos x del punto de inicio
				// sy 		= 0;	// Pos y del punto de inicio
				// swidth	= 32;	// Ancho del punto de inicio
				// sheight	= 32;	// Alto del punto de inicio
				// x		= 0; 	// Pos x a donde quiero poner la imagen
				// y		= 0;	// Pos y a donde quiero poner la imagen
				// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
				// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
				ctx.drawImage(images[0], sx, sy, sw, sh, x, y, w, h);
			};
		};
	}

	var draw_items = function draw_items () {
		for (var row = 0; row < itemsLevel.length ; row++) {
			for (var col = 0; col <= itemsLevel[row].length -1; col++) {
				if (itemsLevel[row][col] > 0) {
					sx = items[itemsLevel[row][col]].sx;
					sy = items[itemsLevel[row][col]].sy;
					sw = items[itemsLevel[row][col]].sw;
					sh = items[itemsLevel[row][col]].sh;
					x  = 32 * col;
					y  = 32 * row;
					w  = 32;
					h  = 32;

					/* COMO SETEAR LOS VALORES CORRECTAMENTE */
					// sx 		= 0;	// Pos x del punto de inicio
					// sy 		= 0;	// Pos y del punto de inicio
					// swidth	= 32;	// Ancho del punto de inicio
					// sheight	= 32;	// Alto del punto de inicio
					// x		= 0; 	// Pos x a donde quiero poner la imagen
					// y		= 0;	// Pos y a donde quiero poner la imagen
					// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
					// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
					ctx.drawImage(images[1], sx, sy, sw, sh, x, y, w, h);
				};
			};
		};
	}

	var draw_inventary = function draw_inventary () {
		for (var col = 0; col <= inventary.length -1; col++) {
			sx = 0;
			sy = 0;
			sw = 22;
			sh = 22;
			x  = 22 * col + 150;
			y  = 455;
			w  = 22;
			h  = 22;
			/* COMO SETEAR LOS VALORES CORRECTAMENTE */
			// sx 		= 0;	// Pos x del punto de inicio
			// sy 		= 0;	// Pos y del punto de inicio
			// swidth	= 32;	// Ancho del punto de inicio
			// sheight	= 32;	// Alto del punto de inicio
			// x		= 0; 	// Pos x a donde quiero poner la imagen
			// y		= 0;	// Pos y a donde quiero poner la imagen
			// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
			// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
			ctx.drawImage(images[2], sx, sy, sw, sh, x, y, w, h);

			//Muestro seleccionado
			if (this.itemSelected != 0 && (col+1) == inventary.itemSelected) {
				sx = 0;
				sy = 22;
				sw = 24;
				sh = 24;
				x  = 22 * col + 150;
				y  = 454;
				w  = 23;
				h  = 23;
				ctx.drawImage(images[2], sx, sy, sw, sh, x, y, w, h);

				if(inventary.itemSelected > 0 && inventary.items[inventary.itemSelected-1] != undefined){
					ctx.font = '10pt Calibri';
					ctx.fillText(items[inventary.items[inventary.itemSelected-1]].name, x, y + sh + 15);
				}
			};

		}
		//has items?
		if (inventary.items.length > 0) {
			for (var item = 1; item <= inventary.items.length; item++) {
				if (inventary.items[item-1] != undefined) {
					sx = items[inventary.items[item-1]].sx;
					sy = items[inventary.items[item-1]].sy;
					sw = items[inventary.items[item-1]].sw;
					sh = items[inventary.items[item-1]].sh;
					x  = 22 * item + 128;
					y  = 455;
					w  = 22;
					h  = 22;
					ctx.drawImage(images[1], sx, sy, sw, sh, x, y, w, h);
				};
			}
		};
		
	}

	var draw_salud = function draw_salud (argument) {
		for (var col = 0; col < Math.ceil(Number(character.salud/10)); col++) {
			sx = 0;
			sy = 0;
			sw = 10;
			sh = 10;
			x  = 12 * col + 150;
			y  = 500;
			w  = 10;
			h  = 10;
			/* COMO SETEAR LOS VALORES CORRECTAMENTE */
			// sx 		= 0;	// Pos x del punto de inicio
			// sy 		= 0;	// Pos y del punto de inicio
			// swidth	= 32;	// Ancho del punto de inicio
			// sheight	= 32;	// Alto del punto de inicio
			// x		= 0; 	// Pos x a donde quiero poner la imagen
			// y		= 0;	// Pos y a donde quiero poner la imagen
			// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
			// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
			ctx.drawImage(images[3], sx, sy, sw, sh, x, y, w, h);
		}
	}

	var draw_armadura = function draw_armadura (argument) {
		for (var col = 0; col < Math.ceil(Number(character.armadura/10)); col++) {
			sx = 20;
			sy = 0;
			sw = 10;
			sh = 10;
			x  = 12 * col + 150;
			y  = 515;
			w  = 10;
			h  = 10;
			/* COMO SETEAR LOS VALORES CORRECTAMENTE */
			// sx 		= 0;	// Pos x del punto de inicio
			// sy 		= 0;	// Pos y del punto de inicio
			// swidth	= 32;	// Ancho del punto de inicio
			// sheight	= 32;	// Alto del punto de inicio
			// x		= 0; 	// Pos x a donde quiero poner la imagen
			// y		= 0;	// Pos y a donde quiero poner la imagen
			// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
			// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
			ctx.drawImage(images[3], sx, sy, sw, sh, x, y, w, h);
		}
	}

	var draw_hambre = function draw_hambre (argument) {
		for (var col = 0; col < Math.ceil(Number(character.hambre/10)); col++) {
			sx = 0;
			sy = 10;
			sw = 10;
			sh = 10;
			x  = 12 * col + 150;
			y  = 530;
			w  = 10;
			h  = 10;
			/* COMO SETEAR LOS VALORES CORRECTAMENTE */
			// sx 		= 0;	// Pos x del punto de inicio
			// sy 		= 0;	// Pos y del punto de inicio
			// swidth	= 32;	// Ancho del punto de inicio
			// sheight	= 32;	// Alto del punto de inicio
			// x		= 0; 	// Pos x a donde quiero poner la imagen
			// y		= 0;	// Pos y a donde quiero poner la imagen
			// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
			// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
			ctx.drawImage(images[3], sx, sy, sw, sh, x, y, w, h);
		}
	}

	var draw_experiencia = function draw_experiencia (argument) {
		for (var col = 0; col < Math.ceil(Number(character.experiencia/10)); col++) {
			sx = 10;
			sy = 10;
			sw = 10;
			sh = 10;
			x  = 12 * col + 150;
			y  = 545;
			w  = 10;
			h  = 10;
			/* COMO SETEAR LOS VALORES CORRECTAMENTE */
			// sx 		= 0;	// Pos x del punto de inicio
			// sy 		= 0;	// Pos y del punto de inicio
			// swidth	= 32;	// Ancho del punto de inicio
			// sheight	= 32;	// Alto del punto de inicio
			// x		= 0; 	// Pos x a donde quiero poner la imagen
			// y		= 0;	// Pos y a donde quiero poner la imagen
			// width 	= 32;	// Ancho del punto de final a donde quiero poner la imagen
			// height 	= 32;	// Alto del punto de final a donde quiero poner la imagen
			ctx.drawImage(images[3], sx, sy, sw, sh, x, y, w, h);
		}
	}
	
	

	var dibujar = function dibujar () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw_terrain();
		draw_items();
		draw_inventary();
		draw_salud();
		draw_armadura();
		draw_hambre();
		draw_experiencia();
		character.draw_char();
	}

	//Convertidor de radianes a grados.
	var convertToRadians = function convertToRadians(degree) {
		return degree*(Math.PI/180);
	}

	//Game loop
	var loop = function startGameLoop (argument) {
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(dibujar, 60);
	}
	
	//Comprueba si el character puede o no pasar por un bloque.
	var puedoPasar = function puedoPasar (direccion) {
		switch(direccion){
			case 'izquierda':
				if(terrainLevel[(character.y/32)][(character.x/32)-1] != 3){
					character.x = character.x - 32;
					if (character.x < 0) {
						character.x = (canvas.width -32);
					};
					checkDamage();
				}
				break;
			case 'derecha':
				if(terrainLevel[(character.y/32)][(character.x/32)+1] != 3){
					character.x = character.x + 32;
					if (character.x > canvas.width-34) {
						character.x = 0;
					};
					checkDamage();
				}
				break;
			case 'arriba':
				if(terrainLevel[(character.y/32)+1][(character.x/32)] != 3){
					character.y = character.y + 32;
					if (character.y > canvas.height-32) {
						character.y = 0;
					};
					checkDamage();
				}
				break;
			case 'abajo':
				if(terrainLevel[(character.y/32)-1][(character.x/32)] != 3){
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
		console.log(terrainLevel[(character.y/32)][(character.x/32)]);
		if (terrainLevel[(character.y/32)][(character.x/32)] == 4) {
			var damage = objetos[terrainLevel[(character.y/32)][(character.x/32)]].salud;
			character.salud += damage;
		};
	}

	var exportVars = function exportVars(){
		window.character = character;
		window.items = items;
		window.inventary = inventary;
		window.itemsLevel = itemsLevel;
	}
	

	//Lets add the keyboard controls now
	$(document).keydown(function(e){
		var key = e.which;
		//console.log(' Key: '+ key);
		if (key == 32) {
			//Muestro indicadores por consola.
			character.showIndicators();
			console.log('x: '+character.x, 'y: '+character.y, 'sobre: '+terrainMap[(character.y/32)][character.x/32]);
		} else if(key == "37"){ //Izquierda
			puedoPasar('izquierda');
		} else if(key == "38" ){ //Abajo
			puedoPasar('abajo');
		} else if(key == "39" ){ //Derecha
			puedoPasar('derecha');
		} else if(key == "40" ){ //Arriba
			puedoPasar('arriba');
		}

		//Agregar al invetnario;
		if (itemsLevel[(character.y/32)][character.x/32] != 0) {
			//Agrego el item en el cual estoy parado al inventario
			inventary.items.push(itemsLevel[(character.y/32)][character.x/32])
			//Lo elimino del mapa de items.
			itemsLevel[(character.y/32)][(character.x/32)] = 0;
		};

		//Seleccion de item del Inventario.
		if (key == 49) { // Boton 1 no teclado numérico
			inventary.selectItem(1);
		};
		if (key == 50) { // Boton 2 no teclado numérico
			inventary.selectItem(2);
		};
		if (key == 51) { // Boton 3 no teclado numérico
			inventary.selectItem(3);
		};
		if (key == 52) { // Boton 4 no teclado numérico
			inventary.selectItem(4);
		};
		if (key == 53) { // Boton 5 no teclado numérico
			inventary.selectItem(5);
		};
		if (key == 54) { // Boton 6 no teclado numérico
			inventary.selectItem(6);
		};
		if (key == 55) { // Boton 7 no teclado numérico
			inventary.selectItem(7);
		};
		if (key == 56) { // Boton 8 no teclado numérico
			inventary.selectItem(8);
		};
		
		//Use Item
		if (key == 85) { //u
			character.useItem(inventary.itemSelected);
		};

		if (key == 68) { //d
			character.dropItem(inventary.itemSelected);
		};

		character.checkIndicators();
		character.dondeEstoy();
		exportVars();
		dibujar();
	})

	//
	init();
})


/*

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var rectWidth = 50;
var rectHeight = 50;

// translation matrix:
//  1  0  tx
//  0  1  ty
//  0  0  1
var tx = canvas.width / 2;
var ty = canvas.height / 2;

// apply custom transform
ty = ty - 200
context.rotate(0.8);
context.transform(1, 0, 0.5, 1, tx, ty);

context.fillStyle = 'blue';
context.fillRect(rectWidth / -2, rectHeight / -2, rectWidth, rectHeight);

*/