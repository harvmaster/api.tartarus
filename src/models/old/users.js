const mongoose = require('mongoose')

var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var secret = require('../../config').jwt.secret

const KeyPairs = require('./keypairs')
const Channels = require('./channels')
const Rooms = require('./rooms')

// Database information required
var schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    accountCode: { // random 4 digit number to allow users to have the same username (similar to discord)
      type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
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

schema.methods.generateAccountCode = async function (save = false) {
  const genCode = () => Math.floor(Math.random()*9000) + 1000
  
  // Generate random, unique Codes
  let code, found
  do {
    code = genCode()
    found = await User.find({ username: this.username, accountCode: code })
  } while (found.length) 

  try {
    this.accountCode = code
    if (save) await this.save()
  } catch (err) {
    console.error(err)
  }
}

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

  console.log(secret)

  return jwt.sign({
    id: this._id,
    exp: parseInt(exp.getTime() / 1000),
  }, secret,
  { algorithm: 'HS256' }
  );
};

schema.methods.createKeyPair = async function (privateKey, publicKey, secretHash) {
  const keys = new KeyPairs({
    user: this.id,
    privateKey,
    publicKey,
    secretHash
  })
  try {
    const created = await keys.save()
    return created.toAuthJSON()
  } catch (err) {
    console.error(err)
  }
}

schema.methods.getKeyPairs = async function () {
  let keyPairs = await KeyPairs.find({ user: this.id })
  keyPairs = keyPairs.map(pair => pair.toAuthJSON())
  return keyPairs
}

schema.methods.getPublicKeys = async function (limit) {
  const publicKeys = await KeyPairs.findPublicKeys(this.id)
  return publicKeys.slice(0, limit)
}

schema.methods.getRooms = async function (getMessages) {
  let channels = await Channels.getUsersChannels(this.id, getMessages)
  // console.log(channels)
  let rooms = [...new Set(channels.map(channel => channel.roomId))]
  // console.log(rooms)
  rooms = rooms.map(id => Rooms.findById(id))
  rooms = await Promise.all(rooms)
  // console.log('getting rooms')

  // console.log('rooms')
  // console.log(rooms)

  // Map channels into rooms
  rooms = rooms.map((room) => {
    if (!room?.id) return
    let c = channels.filter(ch => ch.roomId == room.id) 
    return {
      id: room.id,
      name: room.name,
      created: room.create_date,
      channels: c
    }
  })
  // Get channels that are private conversations
  let privateConversations = channels.filter(channel => channel.roomId == null)

  rooms = rooms.filter(room => !!room)

  return {
    rooms,
    private: privateConversations
  }
}

schema.methods.toAuthJSON = async function(user) {
  const keypairs = await this.getKeyPairs()
  return {
    id: this.id,
    username: this.username,
    accountCode: this.accountCode,
    keypairs,
    jwt: this.generateJWT()
  }
};

schema.methods.toJSON = async function () {
  const publicKeys = await this.getPublicKeys()
  return {
    username: this.username,
    accountCode: this.accountCode, // This might be removed. Probs a security issue here
    publicKeys: publicKeys
  }
}

schema.statics.getFromPubKey = async function (pubkey) {
  const key = await Keys.findOne({ publicKey: pubkey })
  const user = await User.findById(key.user)

  return user
}

schema.statics.isEmailTaken = async function (email) {
  const user = await User.findOne({ email: email })

  return !!user
}

// Remove this later. Just for development
schema.statics.dropTable = async function () {
  User.collection.dropIndexes(function (err, res) {                           // Weird comment placement so i see this later
    console.log(err, res)
  })
}

//Access outside of the file
var User = module.exports = mongoose.model('User', schema);
