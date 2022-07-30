const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

// Database information required
var schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String
    },
    privateKey: { // Encrypted with users' password
        type: String,
    },
    password: { // As the users password is used to encrypt the public key, the password is hashed client side before transmission and then hashed again here
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

schema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

schema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

schema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 1);
  
    return jwt.sign({
      id: this._id,
      exp: parseInt(exp.getTime() / 10000),
    }, secret);
  };
  

schema.methods.toAuthJSON = function(user) {
    return {
        id: this.id,
        name: this.name,
    }
};

schema.methods.toJSON = function () {
    return {
        name: this.name.first,
    }
}

//Access outside of the file
var User = module.exports = mongoose.model('User', schema);
