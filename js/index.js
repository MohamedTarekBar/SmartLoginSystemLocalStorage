'use strict';
import {utility, constant, userLocalStorage} from './Managers/GlobalObjects.js';
import User from './Managers/UserModel.js';

let toggleAuthModeBtn = document.getElementById ('toggleAuthMode');
let formHeaderIcon = document.getElementById ('formHeaderIcon');
let formHeaderText = document.getElementById ('formHeaderText');
let askingUserisExisit = document.getElementById ('askingUserisExisit');
let submitBtn = document.getElementById ('submitFormBtn');
var isExisit = false;

function getInputs () {
  return {
    username: document.getElementById ('userNameTF'),
    email: document.getElementById ('emailTF'),
    password: document.getElementById ('passwordTF'),
  };
}

function userSignedBefore() {
   if(userLocalStorage.getArrOfUsers().length == 0) {
    handleRegisterDesign()
  } else {
    handleSignInDesign()
  }
}

function toggleAuthMode () {
  if (isExisit) {
    handleSignInDesign ();
  } else {
    handleRegisterDesign ();
  }
  isExisit = !isExisit; 
  console.log("s")
}

(function () {
  userSignedBefore()
  if (userLocalStorage.isLoggedIn() == 'true') {
    //
  } else {
    constant;
    document.body.classList.remove ('d-none');
    toggleAuthModeBtn.addEventListener (utility.getCommonEvents ().onClick,toggleAuthMode);
    document.addEventListener (utility.getCommonEvents ().keyDown, function (event) {
      if (event.code == 'Enter') {
        submitButtonTapped()
      }
    });

    submitBtn.addEventListener(utility.getCommonEvents().onClick, submitButtonTapped)
  }
}) ();

function handleSignInDesign () {
  toggleAuthModeBtn.innerText = 'Sign Up';
  askingUserisExisit.innerText = 'Don’t have an account?';
  getInputs ().username.parentElement.classList.add ('d-none');
  formHeaderText.innerText = 'Login';
  formHeaderIcon.classList.add ('bi-box-arrow-in-right');
  formHeaderIcon.classList.replace (
    'bi-person-circle',
    'bi-box-arrow-in-right'
  );
  submitBtn.innerText = 'Log in';
  utility.clearAllInputs ();
  utility.getErrVisual ();
}

function handleRegisterDesign () {
  toggleAuthModeBtn.innerText = 'Sign In';
  askingUserisExisit.innerText = 'You have an account?';
  getInputs ().username.parentElement.classList.remove ('d-none');
  formHeaderText.innerText = 'Create account!';
  formHeaderIcon.classList.add ('bi-person-circle');
  formHeaderIcon.classList.replace (
    'bi-box-arrow-in-right',
    'bi-person-circle'
  );
  submitBtn.innerText = 'Create';
  utility.clearAllInputs ();
  utility.getErrVisual ();
}

function submitButtonTapped () {
  var user;
  if (getInputs ().username.parentElement.classList.contains('d-none')) {
    user = new User(undefined,getInputs ().email.value,getInputs ().password.value)
  } else {
    user = new User(getInputs().username.value,getInputs ().email.value,getInputs ().password.value)
  }
  validate (user);
}

function validate (user) {
  if (user.username == undefined) {
    if (utility.validateRegex(constant.emailRegex,user.email)) {
      if (utility.validateRegex(constant.passwordRegex,user.password)) {
        utility.getErrVisual ();
        login(user)
        return true;
      } else {
        utility.addErrAnimation (getInputs ().password);
        utility.getErrVisual (
          getInputs ().password,
          constant.passwordRegexErrExplain
        );
        return false;
      }
    } else {
      utility.addErrAnimation (getInputs ().email);
      utility.getErrVisual (getInputs ().email, constant.emailRegexErrExplain);
      return false;
    }
  } else {
    // sign up
    if (utility.validateRegex(constant.usernameRegex,user.username)) {
      if (utility.validateRegex(constant.emailRegex,user.email)) {
        if (utility.validateRegex(constant.passwordRegex,user.password)) {
          utility.getErrVisual ();
          register(user)
          return true;
        } else {
          utility.addErrAnimation (getInputs ().password);
          utility.getErrVisual (
            getInputs ().password,
            constant.passwordRegexErrExplain
          );
          return false;
        }
      } else {
        utility.addErrAnimation (getInputs ().email);
        utility.getErrVisual (
          getInputs ().email,
          constant.emailRegexErrExplain
        );
        return false;
      }
    } else {
      utility.addErrAnimation (getInputs ().username);
      utility.getErrVisual (getInputs ().username, constant.userNameErrExplain);
      return false;
    }
  }
}


function login(user) {
  userLocalStorage.loginUser(user,function(error) {
    if (error == constant.userNotFound) {
      utility.getErrVisual (getInputs().email,error);
    } else {
      utility.getErrVisual (getInputs ().password,error);
    }
  })
}

function register(user){
  userLocalStorage.signupUser(user,function(error){
    if (error == constant.userAlreadyRegistered) {
      utility.getErrVisual (getInputs().email,error);
    } else {

    }
  })
}