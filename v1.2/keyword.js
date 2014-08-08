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
	if (itemsMap[(character.y/32)][character.x/32] != 0) {
		//Muestro aviso por consola
		inventary.items.push(itemsMap[(character.y/32)][character.x/32])
		itemsMap[(character.y/32)][(character.x/32)] = 0;
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
	exportVars();
	dibujar();
})