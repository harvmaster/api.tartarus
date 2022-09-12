import Keypairs from "../keypairs";
import Keys from './Keys'

class Message {

  id;
  channel;
  sender;
  content;
  keyUsed;
  revision;

  senderKey

  constructor ({ id, channel, sender, content, keyUsed, revision }) {
    this.id = id
    this.channel = channel
    this.sender = sender
    this.content = content
    this.keyUsed = keyUsed
    this.revision = revision
  }

  async getKeyForUser ({ userId, publicKey }) {
    let keys
    if (usedId) keys = await Keys.getKeysFromUser(this.keyUsed, userId)
    else if (publicKey) keys = await Keys.getKeyFromPublicKey(this.keyUsed, publicKey)
    else return []

    return keys
  }

  async getSenderPubKeys ({ update }) {
    if (update || !this.sendersKey) {
      const keys = await Keypairs.getUsersKeys(this.sender)
      this.senderKeys = keys.map(key => key.getPublicFormat())
    }

    return this.senderKeys
  }

  format () {
    return {
      id: this.id,
      sender: this.sender,
      content: this.content,
      keyUsed: this.keyUsed,
      revision: this.revision
    }
  }
}

export default Message