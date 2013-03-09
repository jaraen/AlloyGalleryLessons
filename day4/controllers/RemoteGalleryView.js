
var feedClient = require('FlickrFeed');		//See lib folder
var photoViews = [];

refreshGallery();
		
function refreshGallery(){

	feedClient.open({
	    callback: fillImages,
	    tag: $.searchBar.value
	});

}

function emptyGallery(){
	for(var i = 0, j = photoViews.length; i < j; i++){
		$.container.remove(photoViews[i]);
	}
}

function search(e){
	$.searchBar.blur();
	emptyGallery();
	refreshGallery();	
}


function fillImages(items){
    var items = items || [];
    photoViews = [];
	
	// alert('Items: ' + items.length);
	
    if(items.length > 0){
		for(var i = 0, j = items.length; i < j; i++){
			// Ti.API.info(items[i].media.m);
			items[i].image = items[i].media.m;
			photoViews[i] = Alloy.createController('ThumbnailView', items[i]).getView();
			$.container.add(photoViews[i]);
		}
    }
}


function openItem(e){
		Ti.API.info('source' + JSON.stringify(e.source))
			
	if(e.source.item){

		var item = e.source.item;
		var imgWin = Alloy.createController('PhotoWindow', item).getView();
	
		if(OS_IOS){
			Alloy.Globals.tabRemote.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}
	
}
