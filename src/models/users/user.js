const mongoose = require('mongoose');

const schemaName = 'User'
const schema = mongoose.Schema({
  username: String,
  accountCode: Number,
  bio: String,
  email: {
    type: String,
    unique: true
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

const User = module.exports = mongoose.model(schemaName, schema)