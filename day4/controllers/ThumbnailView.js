
var args = arguments[0] || {};

//Expects to receive at least an image property in args to load the thumbnail
$.img.image = args.image;
$.container.item = args;
$.container.image = args.image;


// Ti.API.info('image: ' + args.image + ' id:' + args.id)

function fireEditEvent(){
	$.container.fireEvent('edit', args);
}
