

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
				// Ti.API.info(items[i].media.m);
				items[i].image = items[i].media.m;
				photoViews[i] = Alloy.createController('ThumbnailView', items[i]).getView();
				$.container.add(photoViews[i]);
			}
	    }
	}

}

function openItem(e){
		Ti.API.info('source' + JSON.stringify(e.source))
			
	if(e.source.item){

		var item = e.source.item;
		var imgWin = Alloy.createController('PhotoWindow', item).getView();
	
		if(OS_IOS){
			Alloy.CFG.navGroup.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}
	
}
