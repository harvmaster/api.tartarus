import { Channels, Memberships, Messages, Servers, Utils } from "../../models";

export const sendMessage = async (req, res) => {
  const userId = req.auth.userId
  const channelId = req.params.channel
  const body = req.body.message

  const user = await Utils.Users.getUser({ id: userId })
  console.log(user)

  return res.send('')

  // // Check if the user is allowed to do this
  // const channel = await Channels.findById(channelId)
  // const server = await Servers.findById(channel.server)
  // const membership = await Memberships.find({ user: userId, server: server.id })

  // if (!membership) return res.status(403).send('You are not a member of this server')

  // if (!channel.permittedRoles.length && !membership.roles.every(role => channel.permittedRoles.includes(role))) {
  //   return res.status(403).send('Insufficient permissions to post in this channel')
  // }
  
  // // Create the message
  // const message = new Messages({
  //   channel: channelId,
  //   sender: userId,
  //   content: body.content,
  //   keyUsed: body.keyUsed,
  //   revision: `00-${Utils.generateRevisionId()}`
  // })

  try {
    await message.save()
  } catch (err) {
    console.error(err)
    return res.status(500).send('An error occured while saving your message')
  }

  // Send in websockets

  // Return to user
  return res.status(201).send(message)
}