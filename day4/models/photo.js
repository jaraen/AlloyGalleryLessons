exports.definition = {
	config: {
		"columns": {
			"title":"text",
			"link":"text",
			"url":"text",
			"original_image":"text",
			"image":"text",
			"author":"text",
			"tags":"text"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "photo"
		}
	}
}