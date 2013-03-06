

function openItem(e){
	
	if(e.source.image){
		// alert('es una foto');
		
		var imgWin = Alloy.createController('PhotoWindow', e.source).getView();
		
		imgWin.open();
		
	}else{
		alert('no es una foto')
	}
	
}
