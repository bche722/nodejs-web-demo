var uuid = require('node-uuid');

module.exports = User;

function User(name,password){
    this.id = uuid.v4();
    this.name = name;
    this.password = password;
}