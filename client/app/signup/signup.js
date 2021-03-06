var MAX_PASSWORD_LENGTH = 20;
var MAX_EMAIL_LENGTH = 30;
var MAX_USERNAME_LENGTH = 20;
var MAX_FIRST_AND_LAST_NAME_LENGTH = 25;

app.controller("SignupController", function($scope, Auth, Nav, ValidationFactory, $location, $window){

  Nav.setPage(4);

	$scope.signup = function() {
  var validate = ValidationFactory.validatePasswordAndEmail($scope.user.email, $scope.user.password, $scope.user.confirm_password);

  if(validate.passwordFormFlag === true){
    swal({
      title: "Passwords do not match! Please double check.",
      type: "error",
      confirmationButtonText: "OK"
    });
  } else if(validate.emailFormFlag === true){
    swal({
      title: "Please enter a valid email.",
      type: "error",
      confirmationButtonText: "OK"
    });
  }  else {
		Auth.signup($scope.user)
		.then(function (token){
			$window.localStorage.setItem("authentication", token);
			$location.path("/user");
      Nav.setPage(3);
		})
		.catch(function(error) {
      console.log(error);
			swal({
				title: 'User already exists!',
				text: "This username already exists. Please choose another one.",
				type: "error",
				confirmButtonText: "OK"
			});
		});
	}
};

	$scope.signin = function () {
	  Auth.signin($scope.user)
	  .then(function (token) {
	    if(token === undefined){
	      swal({
					title: 'User not found!',
					text: 'Double check your username/password or create a new account!',
					type: 'error',
					confirmButtonText: 'OK'
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
});
