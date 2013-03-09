


function capturePhoto() {
	Titanium.Media.showCamera({
	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
	
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
				$.img.image = event.media;
			};
				
		},
		cancel:function()
		{
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			}else{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		saveToPhotoGallery:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
}




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
			case 2:
				sharePhoto();
				break;
			default:
				break;
		}
	}
}

function savePhoto(){
	

}

function mailPhoto(){
	Ti.API.info('mailPhoto')
	alert('mail photo')
	
	//save the file to a temporary directory and then attach it to the e-mail
	
}


function sharePhoto(){

	Ti.API.info('sharePhoto')

	var ACS = require('ACS');
	
	ACS.createPhoto({
		image: $.img.toImage(),
		callback: function(e){
			alert('Photo shared!')
		}
	});
}