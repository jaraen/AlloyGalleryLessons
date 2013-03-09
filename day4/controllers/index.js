

var ACS = require('ACS');



//share tabs to let the views to open new windows using the tabs navigationGroups
if (OS_IOS) {
	Alloy.Globals.tabRemote = $.tab1;
	Alloy.Globals.tabFavorites = $.tab2;
	Alloy.Globals.tabCamera = $.tab3;
	Alloy.Globals.tabACS = $.tab4;
}

$.index.open();


//a test user should exists in ACS
//username: test, password: test
ACS.login({
	login:'test',
	password:'test',
	callback:function(user){
		alert(JSON.stringify(user));
	}
});


function refreshACS(){
	$.acsGallery.refresh();
}

