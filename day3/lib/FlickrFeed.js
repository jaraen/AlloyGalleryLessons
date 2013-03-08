

//api: http://www.flickr.com/services/api/response.json.html
//test url: http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=girl

exports.open = function(args) {

	var callback = args.callback;

	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {

			var response = this.responseText;

			Ti.API.info("Response: " + response);
			
			//some flickr response requires to do this...
			response = response.replace("\n", "");

			
			try{
				var obj = JSON.parse(response);
			}catch(err){
				alert("FlickrFeed.js: Error parsing JSON response. Try other tag.\n\n" + response);
				Ti.API.error(JSON.stringify(err));
			}
			
			if(obj.items){
				callback(obj.items);
			}else{
				callback({items:[]});
			}
		},
		onerror : function(e) {
			callback({
				error : e
			})
		},
		timeout : 5000
	});

	xhr.open('POST', 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=appcelerator');

	xhr.send();

}