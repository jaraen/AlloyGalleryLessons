var args = arguments[0] || {};

//Initialize
$.img.image = args.image;

//iOS option dialog when rightNavButton is clicked
if(OS_IOS){			
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
	
	if(file.write($.img.image) ){
		alert('saved correctly as ' + filename);
	}else{
		alert('error saving picture :(');
	}
	
}

function mailPhoto(){
	Ti.API.info('mailPhoto')
	alert('mail photo')
	
	//save the file to a temporary directory and then attach it to the e-mail
	
}

