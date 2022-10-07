'use strict';

export var constants = {
    emailRegex : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    emailRegexErrExplain: 'Email should have one @ and at least one char before @ and at least one char after @ only acceptable symbol in mail accepted and domain name at least has 2 char',
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/,
    passwordRegexErrExplain: 'password should have at least 8 char and maximum char is 25 and at least one uppercase char',
    usernameRegex: /^\S[A-Za-z0-9]{2,}$/,
    userNameErrExplain: 'user must have at least 3 char no spaces no symbols',
    user: 'User',
    isLoggedIn: 'isLoggedIn',
    usersArr:'usersArr',
    currentUser: 'currentUser',
    userNotFound: "user not found in Local Storage", 
    passwordIsIncorrect: "password is in correct",
    userAlreadyRegistered: "User Already Registered"
}
