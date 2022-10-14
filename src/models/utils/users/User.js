import Keypairs from '../keypairs'
import Members from '../members'

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

  async getKeypairs ({ update } = {}) {
    if (update || !this.keypairs) {
      const keypairs = await Keypairs.getUsersKeypairs(this.id)
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

  async isMember ({ server }) {
    const membership = await Member.getMember({ user: this.id, server })
    return !!membership
  }

  async canAccessChannel ({ channel: channelId }) {
    const channel = await Channels.getChannel({ channelId })
    if (!channel) return false

    const membership = await Members.getMember({ user: this.id, server: channel.server })
    if (!membership) return false
    
    if (channel.permittedRoles?.every(role => membership.roles.includes(role))) return true
    return false
  }

  toAuthFormat() {
    return {
      id: this.id,
      username: this.username,
      accountCode: this.accountCode,
      bio: this.bio,
      avatar: this.avatar
    }
  }
  
}

export default User