app.factory('ValidationFactory', function(){

var validatePasswordAndEmail = function(email, password, secondEntryPassword){
  var passwordFormFlag = false;
  var emailFormFlag = false;
  var resultsObj = {};
  var validateEmail = function(email){
    var flag = false;
      for(var i = 0; i < email.length; i++){
        if(email[i]==="@"){
          flag = true;
        }
      }
      return flag;
  };

  var emailFlag = validateEmail(email);

  if (password !== secondEntryPassword || emailFlag ===false){
    if(password !==secondEntryPassword){
      passwordFormFlag = true;
    } else {
      emailFormFlag = true;
    }
  }
  resultsObj.passwordFormFlag = passwordFormFlag;
  resultsObj.emailFormFlag = emailFormFlag;

  return resultsObj;

  };
  return validatePasswordAndEmail = {
    validatePasswordAndEmail: validatePasswordAndEmail
  };
});
