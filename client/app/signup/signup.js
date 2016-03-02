var MAX_PASSWORD_LENGTH = 20;
var MAX_EMAIL_LENGTH = 30;
var MAX_USERNAME_LENGTH = 20;
var MAX_FIRST_AND_LAST_NAME_LENGTH = 25;

app.controller("SignupController", function($scope, Auth, Nav, $location, $window){

  Nav.setPage(4);

  $scope.passwordLength = MAX_PASSWORD_LENGTH;
  $scope.emailLength = MAX_EMAIL_LENGTH;
  $scope.usernameLength = MAX_USERNAME_LENGTH;
  $scope.firstAndLastLength = MAX_FIRST_AND_LAST_NAME_LENGTH;

  $scope.$watch('user.password', function(newValue, oldValue){
    if(newValue){
      if(newValue.length > MAX_PASSWORD_LENGTH){
        $scope.user.password = oldValue;
      }
      $scope.passwordLength = MAX_PASSWORD_LENGTH - newValue.length;
    }
  });

  $scope.$watch('user.email', function(newValue, oldValue){
    if(newValue){
      if(newValue.length > MAX_EMAIL_LENGTH){
        $scope.user.email = oldValue;
      }
      $scope.emailLength = MAX_EMAIL_LENGTH - newValue.length;
    }
  });

  $scope.updateBody = function(event){
    return false;
  };

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
  $scope.validatePhoneNumber = function(){
    if($scope.user.phone_number.length >= 1){
		var number = $scope.user.phone_number.replace(/\D/g, '');
			if(number.length===10){
				return false;
			}
		return true;
    }
	};
});
