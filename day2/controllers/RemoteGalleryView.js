

initGallery();

function initGallery(){

	var feedClient = require('FlickrFeed');		//See lib folder

	feedClient.open({
	    callback: fillImages
	});
	
	function fillImages(items){
	    var items = items || [];
		var photoViews = [];
		
		// alert('Items: ' + items.length);
		
	    if(items.length > 0){
			for(var i = 0, j = items.length; i < j; i++){
				Ti.API.info(items[i].media.m);
				photoViews[i] = Alloy.createController('ThumbnailView', {image:items[i].media.m}).getView();
				$.container.add(photoViews[i]);
			}
	    }
	}

}

function openItem(e){
	
	if(e.source.image){
		// alert('es una foto');
		var imgWin = Alloy.createController('PhotoWindow', e.source).getView();
	
		if(OS_IOS){
			Alloy.CFG.navGroup.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}else{
		alert('no es una foto')
	}
	
}
