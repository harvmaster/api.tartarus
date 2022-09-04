const mongoose = require('mongoose');

const schemaName = 'ChannelEvent'
const schema = mongoose.Schema({
  channel: {
    type: mongoose.schema.Types.ObjectId,
    ref: 'Channel'
  },
  type: String,       // messageUpdate, messageDelete, messageSent, voiceDeafen, voiceMute, voiceKick
  reference: String,  // The id of the message that was updated. This wont always be here, client uses thsi depending on the type

  create_date: {
    type: Date,
    default: Date.now
  }
})

const Channel = module.exports = mongoose.model(schemaName, schema)