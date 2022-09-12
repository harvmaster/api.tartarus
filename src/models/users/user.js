const mongoose = require('mongoose');

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../../config').jwt.secret

const schemaName = 'User'
const schema = mongoose.Schema({
  username: String,
  accountCode: Number,
  bio: String,
  email: {
    type: String,
    unique: true
  },
  avatar: {
    image: {
      type: Buffer,
    },
    mimeType: String
  },
  password: { // As the users password is used to encrypt the public key, the password is hashed client side before transmission and then hashed again here
    type: String,
    required: true
  },
  salt: {
      type: String
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

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
  exp.setDate(today.getDate() + 10);

  return jwt.sign({
    id: this._id,
    exp: parseInt(exp.getTime() / 1000),
  }, secret,
  { algorithm: 'HS256' }
  );
};

const User = module.exports = mongoose.model(schemaName, schema)