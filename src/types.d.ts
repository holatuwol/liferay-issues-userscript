interface JIRAComment {
	id : string;
	created : string;
	author : {
		key : string;
		name : string;
		displayName : string;
		avatarUrls : any;
	};
	renderedBody : string;
}