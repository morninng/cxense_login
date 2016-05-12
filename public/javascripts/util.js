var get_value_fromCookie = function(key){
	var cookie_data = document.cookie;
	var cookie_array = cookie_data.split("; ");

	for(var i=0; i < cookie_array.length;i++){
		var c = cookie_array[i].split("=");
		if(c[0] === key){
			return c[1];
		}
	}
	return null;
}


var get_tuuid = function(){
	var tuuid = get_value_fromCookie("tuuid");
	return tuuid;
}


var get_temporal_random = function(){
	var temporal_random = get_value_fromCookie("temporal_random");
	return temporal_random;
}

var get_mac = function(){
	var mac = get_value_fromCookie("mac");
	return mac;
}

var create_jwt = function(){

	var user_id = get_tuuid();
	var temporal_random = get_temporal_random();
	var mac = get_mac();
	var jwt = {
		"user_id":user_id,
		"temporal_random":temporal_random,
		"mac":mac
	}
	//var jwt_str = JSON.stringify(jwt)

	return jwt;

}

