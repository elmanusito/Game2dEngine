//Canvas stuff
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();
var images = [];

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

var draw_terrain = function draw_terrain () {
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, 450, 450);
	for (var row = 0; row < terrainMap.length ; row++) {
		for (var col = 0; col <= terrainMap[row].length -1; col++) {
			sx = objetos[terrainMap[row][col]].sx;
			sy = objetos[terrainMap[row][col]].sy;
			sw = objetos[terrainMap[row][col]].sw;
			sh = objetos[terrainMap[row][col]].sh;
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
	for (var row = 0; row < itemsMap.length ; row++) {
		for (var col = 0; col <= itemsMap[row].length -1; col++) {
			if (itemsMap[row][col] > 0) {
				sx = items[itemsMap[row][col]].sx;
				sy = items[itemsMap[row][col]].sy;
				sw = items[itemsMap[row][col]].sw;
				sh = items[itemsMap[row][col]].sh;
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