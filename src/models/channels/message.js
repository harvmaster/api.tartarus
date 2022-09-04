const mongoose = require('mongoose');

const schemaName = 'Message'
const schema = mongoose.Schema({
  channel: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'Channel'
  },
  sender: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: Buffer    // Type 'buffer' as these are encrypted. can probs base64 them though
  },
  keyUsed: {
    type: String    // Type 'String' as this is a hash of the key used to encrypt the message. Use this to lookup key
  },
  revision: {
    type: String    // Revision is 'revNo'-'RandomId' to account for editing
  },

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Message = module.exports = mongoose.model(schemaName, schema)