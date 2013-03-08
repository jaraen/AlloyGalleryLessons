var args = arguments[0] || {};

//Initialize
$.img.image = args.image;
$.win.image = args.name;

if(OS_IOS){			//iOS option dialog when rightNavButton is clicked
	function showOptionsDialog(){
		$.options.show();
	}
	
	function selectOption(e){
		switch(e.index){
			case 0:
				savePhoto();
				break;
			case 1:
				mailPhoto();
				break;
			default:
				break;
		}
	}
}

function savePhoto(){
	Ti.API.info('savePhoto')

	var d = new Date();
	
	var filename = d.getTime() + '.jpg';

	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
	
	file.write($.img.toImage());
	
	//store info locally
    var album = Alloy.Collections.instance('photo');
	
    // Create a new model for this photo
    var photo = Alloy.createModel('photo', {
		"title": args.title,
		"link": args.link,
		"original_image": args.image,
		"image": file.getNativePath(),
		"author": args.author,
		"tags": args.tags
    });
    
    album.add(photo);

    photo.save();

	album.fetch();
	
	alert('saved correctly as ' + filename + "\nThere are " + album.length + ' photos in the album.');

}

function mailPhoto(){
	Ti.API.info('mailPhoto')
	alert('mail photo')
	
	//save the file to a temporary directory and then attach it to the e-mail
	
}

