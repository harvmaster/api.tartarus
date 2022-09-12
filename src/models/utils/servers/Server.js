import Channels from '../channels'

class Server {

  id;
  shortId;
  name;
  description;
  defaultRole;
  avatar;
  create_date;

  channels;
  roles;
  members;
  
  constructor ({id, shortId, name, description, defaultRole, avatar, create_date }) {
    this.id = id
    this.shortId = shortId
    this.name = name
    this.description = description
    this.defaultRole = defaultRole
    this.avatar = avatar
    this.create_date = create_date
  }

  async getChannels ({ limit, offset, ids, force = false }) {
    if (force || this.channels == null) {
      const channels = await Channels.getServerChannels(this.id)
      this.channels = channels
    }

    let channels = [...this.channels] // create a copy of channels
    if (ids) channels = channels.filter(channel => ids.includes(channel.shortId))

    channels = channels.map(channel => delete channel.messages)
    return channels
  }

  async getChannel ({ populateMessages, shortId }) {
    const channel = Channels.getChannel(shortId)
    if (populateMessages)  await channel.populateMessages()

    return channel
  }

  async getRoles ({ update = false }) {
    if (update || !this.roles) {
      const roles = await Roles.getServerRoles(this.id)
      this.roles = roles
    }

    return this.roles
  }

  async getRole ({ id, name }) {
    const role = await Roles.getRole({ id, name })

    return role
  }

  async getMembers ({ update }) {
    if (update || !this.members) {
      const members = await Members.getServerMembers(this.id)
      members.forEach(member => member.getRoles())
      this.members = members
    }

    return this.members
  }

  async getMember ({ id: user, publicKey, username, accountCode }) {
    const member = await Members.getMember({ server: this.id, user })

    return member
  }

  async getSummary () {
    return {
      shortId: this.shortId,
      name: this.name,
      description: this.description,
      avatar: this.avatar,
      created: this.create_date
    }
  }

  async getDetails () {

  }
}

export default Server