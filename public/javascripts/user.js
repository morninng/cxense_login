

var update_userinfo = function(){
	console.log("update_userinfo");
	var auth_jwt = create_jwt();
	var auth_jwt_str = JSON.stringify(auth_jwt)

	//auth_jwt="allow"

	$.ajax({
	  url: 'https://zolduiowmi.execute-api.us-east-1.amazonaws.com/2/userinfo-update',
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	    'Authorization':auth_jwt_str
	  }
	}).done(function(data) {
	    console.log(data);
	}).fail(function(data){
		console.log(data);
	});

}



var send_user_data_login = function(){
	var mail_address = document.login_form.email.value;
	var password_str = document.login_form.password.value;
	var user_data = {
		email:mail_address,
		password: password_str
	}
	var dest_url = "/users/log_in";

	$.post(dest_url, user_data)
		.done(function(res_data){
			console.log(res_data);
			result = res_data.result;
			if(result == true){
				console.log(res_data.message);
				alert("login succeeded");
				location.href = "/";
			}else{
				console.log(res_data.message);
				alert(res_data.message);
			}
		})
}

var send_user_data_signin = function(){
	var mail_address = document.login_form.email.value;
	var password_str = document.login_form.password.value;
	var first_name_str = document.login_form.first_name.value;
	var last_name_str = document.login_form.last_name.value;
	var age_str = document.login_form.age.value;
	var user_data = {
		email:mail_address,
		password: password_str,
		first_name: first_name_str,
		last_name: last_name_str,
		age: age_str
	}
	var dest_url = "/users/sign_in";

	$.post(dest_url, user_data)
		.done(function(res_data){
			console.log(res_data);
			result = res_data.result;
			if(result == true){
				console.log(res_data.message);
				alert(res_data.message);
				location.href = "/";
			}else{
				console.log(res_data.message);
				alert(res_data.message);
			}
		})
}

var logout = function(){

	var dest_url = "/users/logout";
	$.get(dest_url)
		.done(function(res_data){
			location.reload();
		})
		.fail(function(error){
			console.log(error);
		})
}

