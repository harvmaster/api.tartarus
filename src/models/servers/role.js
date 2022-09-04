const mongoose = require('mongoose');

const schemaName = 'Role'
const schema = mongoose.Schema({
  name: String,
  colour: String,         // css valid Hex code
  permissions: Number,    // however the hell the permission number system works
  heirarchy: Number,      // Determines what other roles this role can edit (eg. dont want an admin to be able to edit owner role)

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Role = module.exports = mongoose.model(schemaName, schema)