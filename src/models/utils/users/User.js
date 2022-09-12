import Keypairs from '../keypairs'

class User {

  id;
  username;
  accountCode;
  bio;
  email;
  avatar;

  keypairs;
  channelKeys;

  constructor ({ id, username, accountCode, bio, email, avatar,  }) {
    this.id = id
    this.username = username
    this.accountCode = accountCode
    this.bio = bio
    this.email = email
    this.avatar = avatar
  }

  async getKeypairs ({ update }) {
    if (update || !this.keypairs) {
      const keypairs = await Keypairs.getUsersKeys(this.id)
      this.keypairs = keypairs
    }

    return this.keypairs
  }

  async getChannelKeys ({ update, channel }) {
    if (update || !this.channelKeys) {
      const keys = await Keys.getKeysFromUser(this.id)
      this.channelKeys = keys
    }

    if (channel) return this.channelKeys.filter(c => c.channel == channel)
    return this.channelKeys
  }

  
}

export default User