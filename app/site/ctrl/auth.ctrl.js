// login function

app.controller('AuthCtrl', AuthCtrl);

function AuthCtrl($state, api){
	var ctrl = this;
	ctrl.$state = $state;
	ctrl.api = api;

	ctrl.password = null;
	ctrl.email = null;

	ctrl.auth_button = 'Continue';

	if(localStorage.authToken){
		ctrl.$state.go('admin');
	}	
}

AuthCtrl.prototype.login = function(){
	var ctrl = this

	var payload = {
		email:ctrl.email,
		password:ctrl.password
	}

	ctrl.auth_btn = "Authorizing";
	ctrl.api.request('/users/login', payload, 'POST')
	.then(function(response){
		console.log(response);

		if (response.status == 200){
			ctrl.auth_btn = "Success!";

			if (response.data.user != null){
				ctrl.$state.go('admin.dashboard');
			}
		}

		else {
			ctrl.auth_btn = 'Invalid Password';
		}

	}, function(){
		console.log(response);
		ctrl.auth_btn = "Errorr";
	})
}