
var PARSER = require('json_parse');

//api: http://www.flickr.com/services/api/response.json.html
//test url: http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=lomo

exports.open = function(args) {

	var callback = args.callback;
	var tag = args.tag || 'bye'

	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {

			var response = this.responseText;

			// Ti.API.info("Response: " + response);
			
			try{
				var obj = PARSER.jsonParse(response); //Use this instead of JSON.parse
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

	xhr.open('POST', 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=' + tag);

	xhr.send();

}

