export default class User {
  constructor (username, email, password) {
    const emailLowerCase = email.toLowerCase ();
    this.username = username;
    this.email = emailLowerCase;
    this.password = password;
  }
}
