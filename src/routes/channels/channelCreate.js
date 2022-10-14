import { Utils } from '../../models'
import RoleManagement from '../../RoleManagement'

export const createChannel = async (req, res) => {
  const server = req.server.id
  const body = req.body.channel

  console.log('server', server)
  // Create channel
  const channel = await Utils.Channels.createChannel(server, body)

  try {
    await channel.save()
  } catch (err) {
    console.error(err)
    return res.status(500).send('An error occured while creating channel')
  }

  return res.send(channel)
}