


(function (d) {

	var get_value_fromCookie = function(key){
		var cookie_data = d.cookie;
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

	window.get_tuuid = window.get_tuuid || get_tuuid;

}(document));