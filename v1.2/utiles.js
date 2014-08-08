//Convertidor de radianes a grados.
var convertToRadians = function convertToRadians(degree) {
	return degree*(Math.PI/180);
}


var exportVars = function exportVars(){
	window.character = character;
	window.items = items;
	window.inventary = inventary;
	window.itemsMap = itemsMap;
}