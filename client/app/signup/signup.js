app.controller("SignupController", function($scope, Auth, Nav, $location, $window){

  Nav.setPage(4);

	$scope.signup = function() {
		Auth.signup($scope.user)
		.then(function (token){
			$window.localStorage.setItem("authentication", token);
			$location.path("/user");
      Nav.setPage(3);
		})
		.catch(function(error) {
			swal({
				title: 'User already exists!',
				text: "This username already exists. Please choose another one.",
				type: "error",
				confirmButtonText: "OK"
			});
		})
	};

	$scope.signin = function () {
	  Auth.signin($scope.user)
	  .then(function (token) {
	    if(token === undefined){
	      swal({
					title: 'User not found!',
					text: 'Double check your username/password or create a new account!',
					type: 'error',
					confirmButtonText: 'AWESOME'
				});
	    } else {
		  	$window.localStorage.setItem("authentication", token);
		  	$location.path("/user");
        Nav.setPage(3);
	    }
	  })
	  .catch(function (error) {
	    console.error(error);
	  });
	};
  $scope.validatePhoneNumber = function(){
		var number = $scope.user.phone_number.replace(/\D/g, '');
			if(number.length===10){
				return false;
			}
		return true;
	};
});
