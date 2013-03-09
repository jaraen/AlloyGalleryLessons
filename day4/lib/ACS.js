
var Cloud = require('ti.cloud');

Cloud.debug = Ti.App.deployType !== 'production';


//NOTE: create a test user in ACS
//username: test, password: test
exports.login = function(args){
	
	var callback = args.callback || function(){};
	
    Cloud.Users.login({
        login: args.login || 'test',
        password: args.password || 'test'
    }, function (e) {
        if (e.success) {
            var user = e.users[0];

            if(callback) callback(user);
            
        } else {
        	Ti.API.info(JSON.stringify(e));
        	alert(JSON.stringify(e.message));
            if(callback) callback(e);
        }
    });	
}

exports.createPhoto = function(args){
	
	var args = args || {};
	var callback = args.callback;
	var image = args.image;
	var item = args.item || {};
	
	var tags = args.tags || '';
	
	tags = tags.replace(/[ ,]+/g, ",").toLowerCase(); //replace whitespace by commas
	
	if(!image){
		Ti.API.error('ACS.createPhoto error: no photo');
		return;
	}

	Cloud.Photos.create({
		
	    photo: image,
	    
	    tags: tags,
	    
	}, function (e) {
	    if (e.success) {
	    	
	        var photo = e.photos[0];
	        
			if(callback) callback(photo);
	           
	    } else {
	        alert('Error:\\n' +  ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
	
}


exports.getPictures = function(args){
	
	var callback = args.callback;
	
	Ti.API.info('getPictures');
	
	if(!Ti.Network.online){
		Alert(L('no_network'));
		callback([], 0);
		return;
	}
	

	Cloud.Photos.query({} , function (e) {

	    if (e.success) {
			Ti.API.info(e.photos)
 
	  		if(callback) callback(e.photos);
	    
	    } else {
	        Alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
	        
	  		if(callback) callback([],0);	//no products
	    }
	    
	});
}

