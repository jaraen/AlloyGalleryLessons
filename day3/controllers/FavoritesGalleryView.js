

initGallery();

function initGallery(){

	var photoViews = [];
    
    var album = Alloy.Collections.instance('photo');
    	album.fetch();	//refresh

	var i = 0;

	album.each(function(photo) {
		
		photoViews[i] = Alloy.createController('ThumbnailView', {image:photo.get('image'), id:photo.get('alloy_id'), i:i}).getView();
		
		//
		photoViews[i].addEventListener('edit', function(e){
			alert('Photo deleted')
			var photoToDelete = album.get(e.id);
			photoToDelete.destroy();
			album.fetch();
			//update UI and filesystem
			//..
			$.container.remove(photoViews[e.i]);
		});
		
		$.container.add(photoViews[i]);
		
		i++;
		
	});
	

}


function openItem(e){
	
	if(e.source.image){
		var imgWin = Alloy.createController('PhotoWindow', e.source).getView();
	
		if(OS_IOS){
			Alloy.CFG.navGroup.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}	
}