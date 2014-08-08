$(document).ready(function(){
	// Inicializador
	var init = function	init()	{
		preloadimages(['img/terrain.png', 'img/items.png', 'img/inventary.png', 'img/icons1.png']).done(function(img){
			images = img;
			character.init();
			dibujar();
		})
	};
	//
	init();
});