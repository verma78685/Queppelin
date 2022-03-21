class Details {
  constructor() {
    this.email = "";
    this.role = "";
  }

  inputEmail(email) {
    this.email = email;
  }

  setRole(role) {
    this.role = role;
  }
}

var obj = new Details();
export default obj;
