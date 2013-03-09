

initGallery();

function initGallery(){
	
	var images = getGalleryImages();

	var photoViews = [];

	for (var i = 0, j = images.length; i < j; i++) {
		photoViews[i] = Alloy.createController('ThumbnailView', {image:images[i]}).getView();
		$.container.add(photoViews[i]);
	};

}

function getGalleryImages(){
	
	//use applicationDataDirectory instead of resourcesDirectory if want to see saved pictures
	var dataDirectory = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,  'images/');
	var filesArray = dataDirectory.getDirectoryListing();


	for(var i = 0, j = filesArray.length; i< j; i++){
		filesArray[i] = '/images/' + filesArray[i];
	}
	
	return filesArray;
}

function openItem(e){
	
	if(e.source.image){
		// alert('es una foto');
		var imgWin = Alloy.createController('PhotoWindow', e.source).getView();
	
		if(OS_IOS){
			Alloy.Globals.tabFavorites.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}else{
		alert('no es una foto')
	}
	
}
