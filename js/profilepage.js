'use strict';
import {utility, constant, userLocalStorage} from './Managers/GlobalObjects.js';

let logoutBtn = document.getElementById ('logoutBtn');
let profileSetting = document.getElementById ('profileSetting');
let usernameTextField = document.getElementById ('usernameTextField');
let emailTextField = document.getElementById ('emailTextField');
let updateUserBtn = document.getElementById ('updateUserBtn');
let greetingUser = document.getElementById ('greetingUser');
let modal = document.getElementById('Modal');

(function () {

  logoutBtn.addEventListener (utility.getCommonEvents ().onClick, function () {
    userLocalStorage.logoutUser ();
  });
  updateUserBtn.addEventListener (utility.getCommonEvents ().onClick,function () {
      userLocalStorage.updateUserName(usernameTextField.value,() => {
        // modal.style.display = 'none';
      },function(error) {
        utility.getErrVisual(emailTextField,error)
      })
      setUpView ();
    }
  );
  setUpView ();
}) ();

function setUpView () {
  var currentUser = userLocalStorage.getCurrentUser();
  usernameTextField.value = currentUser.username
  profileSetting.innerHTML = currentUser.username
  greetingUser.innerHTML = `Hello ${currentUser.username} &#128512;`;
  emailTextField.value = currentUser.email
}
