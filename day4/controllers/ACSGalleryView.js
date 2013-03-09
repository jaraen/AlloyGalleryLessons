
var ACS = require('ACS');		//See lib folder

var photoViews = [];

initGallery();

function initGallery(){
	ACS.getPictures({
	    callback: fillImages
	});
}

function fillImages(items){
    var items = items || [];
	
	// alert('ACS Items: ' + items.length);
	
    if(items.length > 0){
    	photoViews = [];
		for(var i = 0, j = items.length; i < j; i++){
			items[i].image = items[i].urls.medium_640;
			photoViews[i] = Alloy.createController('ThumbnailView', items[i]).getView();
			$.container.add(photoViews[i]);
		}
    }else{
    	$.container.add(Ti.UI.createLabel({text:'no photos :('}));
    }
}

function openItem(e){
		Ti.API.info('source' + JSON.stringify(e.source))
			
	if(e.source.item){

		var item = e.source.item;
		var imgWin = Alloy.createController('PhotoWindow', item).getView();
	
		if(OS_IOS){
			Alloy.Globals.tabACS.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}	
}


exports.refresh = function(){
	for(var i = 0, j = photoViews.length; i<j; i++){
		$.container.remove(photoViews[i]);
	}
	
	photoViews = [];
	
	ACS.getPictures({
	    callback: fillImages
	});
}

