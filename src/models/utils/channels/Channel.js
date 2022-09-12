import { Channels, Roles } from '../..'

class Channel {

  id;
  shortId;
  server;
  permittedRoles;
  name;
  type;
  created;

  messages;
  roles;

  constructor ({ id, shortId, server, permittedRoles, name, type, create_date }) {
    this.id = id
    this.shortId = shortId
    this.server = server
    this.permittedRoles = permittedRoles
    this.name = name
    this.type = type
    this.created = create_date
  }

  async getMessages ({ limit, offset, startDate, endDate, update }) {
    if (update || !this.messages) {
      const messages = Messages.getChannelMessages(this.id)
      this.messages = messages
    }

    let messages = [...this.messages].sort((a,b) => a.created - b.created)
    if (startDate) messages = messages.filter(message => message.created > startDate)
    if (endDate) messages = messages.filter(message => messages.created < endDate)
    if (offset) messages = messages.slice(offset)
    if (limit) messages = messages.slice(limit)

    return messages
  }

  async populateMessages (params) {
    await this.getMessages(params)

    return this
  }

  async getPermittedRoles ({ update }) {
    if (update || !roles) {
      const roles = await Roles.findManyRoles({ channel: this.id })
      this.roles = roles
    }

    return roles
  }

  summary () {
    return {
      id: this.id,
      shortId: this.shortId,
      permittedRoles: this.permittedRoles,
      name: this.name,
      type: this.type,
      created: this.created
    }
  }

  async details () {
    await this.populateMessages()
    return {
      ...this.summary(),
      messages: this.messages
    }
  }

}

export default Channel