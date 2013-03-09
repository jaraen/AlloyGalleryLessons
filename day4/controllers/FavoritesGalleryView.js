

var album = Alloy.Collections.instance('photo');

album.on('change', function(){
	alert('album collection has changed!');
	emptyGallery();
	refreshGallery();	
});

var photoViews = [];

refreshGallery();

function emptyGallery(){
	
	for(var i = 0, j = photoViews.length; i < j; i++){
		$.container.remove(photoViews[i]);
	}
	
	photoViews = [];
}

function refreshGallery(){
	
	var i = 0;
	
	
	album.fetch();
	
	album.each(function(photo) {
		
		photoViews[i] = Alloy.createController('ThumbnailView', {image:photo.get('image'), id:photo.get('alloy_id'), i:i}).getView();
		
		photoViews[i].addEventListener('edit', function(e){

			var photoToDelete = album.get(e.id);
			
			photoToDelete.destroy();
			
			album.fetch();
			
			$.container.remove(photoViews[e.i]);
			
			alert('Photo deleted');
			
		});
		
		$.container.add(photoViews[i]);
		
		i++;
		
	});
}

function openItem(e){
	
	if(e.source.image){
		var imgWin = Alloy.createController('PhotoWindow', e.source).getView();
	
		if(OS_IOS){
			Alloy.Globals.tabFavorites.open(imgWin);
		}else{
			imgWin.open();	
		}
		
	}	
}