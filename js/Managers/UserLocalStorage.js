'use strict';

import {baseURL} from './path.js';
import {constant,utility} from './GlobalObjects.js';

export default class UserLocalStorage {
  constructor () {
    this.isLoggedIn ();
  }

  isLoggedIn () {
    if (localStorage.getItem (constant.isLoggedIn) == null) {
      if (!window.location.pathname.includes ('index.html')) {
        window.location = `${baseURL}index.html`;
      }
      return false;
    } else {
      if (localStorage.getItem (constant.isLoggedIn) == 'true') {
        if (!window.location.pathname.includes ('profilepage.html')) {
          window.location = `${baseURL}pages/profilepage.html`;
        } else {
        }
      } else {
        if (!window.location.pathname.includes ('index.html')) {
          window.location = `${baseURL}index.html`;
        }
      }
    }
  }

  isExist (user) {
    const arrOfUsers = this.getArrOfUsers ();
    var isExist = false;
    if (arrOfUsers.length != 0) {
      for (let i = 0; i < arrOfUsers.length; i++) {
        if (arrOfUsers[i].email == user.email) {
          isExist = true;
          return isExist;
        }
      }
    }
    return isExist;
  }

  getArrOfUsers () {
    var arr = JSON.parse (localStorage.getItem (constant.usersArr));
    if (arr == null) {
      localStorage.setItem (constant.usersArr, JSON.stringify ([]));
      arr = JSON.parse (localStorage.getItem (constant.usersArr));
    }
    return arr;
  }

  signupUser (user, error) {
    if (!this.isExist (user)) {
      const arr = JSON.parse (localStorage.getItem (constant.usersArr));
      arr.push (user);
      localStorage.setItem (constant.usersArr, JSON.stringify (arr));
      this.loginUser (user, function (error) {console.log(error)});
    } else {
      error (constant.userAlreadyRegistered);
    }
  }

  loginUser (user, error) {
    const arr = this.getArrOfUsers();
    var emailFounded = false
    if (arr.length == 0) {
      error (constant.userNotFound);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (user.email == arr[i].email) {
        emailFounded = true
        if (user.password == arr[i].password) {
          let currentUser = {email: arr[i].email, username: arr[i].username};
          localStorage.setItem (
            constant.currentUser,
            JSON.stringify (currentUser)
          );
          localStorage.setItem (constant.isLoggedIn, true);
          this.isLoggedIn ();
          break;
        } else {
          error (constant.passwordIsIncorrect);
        }
      }
    }
    if (!emailFounded) {
        error(constant.userNotFound)
    }
  }
  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(constant.currentUser))
  }

  updateUserName(updateWith,done,error) {
    if (utility.validateRegex(constant.usernameRegex,updateWith)){
      const arr = this.getArrOfUsers ();
      var currentUser = JSON.parse(localStorage.getItem(constant.currentUser))
      var user;
      if (arr.length == 0) {
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        if (currentUser.email == arr[i].email) {
            user = arr[i]
            user.username = updateWith
            arr.splice(i,1)
            arr.push(user)
            localStorage.setItem (constant.usersArr, JSON.stringify (arr));
            localStorage.setItem (constant.currentUser,JSON.stringify(arr[i]))
            done()
        }
      }
    } else {
      error(constant.userNameErrExplain)
    }
  }

  logoutUser () {
    localStorage.removeItem (constant.isLoggedIn);
    localStorage.removeItem (constant.currentUser);
    this.isLoggedIn ();
  }
}
