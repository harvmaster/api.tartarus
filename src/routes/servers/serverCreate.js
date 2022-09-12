import { 
  Users, 
  Servers,
  Channels,
  Memberships,
  Utils
} from '../../models'
import { getServerSummary } from '../../models/utils/getServerSummary'

import { generateRole } from '../../RoleManagement/generateRole'

export const createServer = async (req, res) => {
  const userId = req.auth.id
  const user = await Users.findById(userId)
  console.log(user)

  const body = req.body.server

  let server = await Utils.createServer(body)

  try {
    await server.save()
  } catch (err) {
    console.error(err)
    return res.status(500).send('There was an error creating server')
  }

  const ownerRole = generateRole.owner(server.id)
  const defualtRole = generateRole.default(server.id)

  try {
    await ownerRole.save()
    await defualtRole.save()
  } catch (err) {
    console.error(err)
    return res.status(500).send('There was an error creating server role')
  }

  const ownerMember = new Memberships({
    server: server.id,
    user: user.id,
    roles: [ownerRole]
  })

  try {
    await ownerMember.save()
  } catch (err) {
    console.error(err)
    return res.status(500).send('There was an error adding user to the server')
  }

  const defaultTextChannel = new Channels({
    server: server.id,
    permittedRoles: [],
    name: 'General',
    type: 'text'
  })
  const defaultVoiceChannel = new Channels({
    server: server.id,
    permittedRoles: [],
    name: 'Voice Channel 1',
    type: 'voice'
  })

  try { 
    await defaultTextChannel.save()
    await defaultVoiceChannel.save()
  } catch (err) {
    console.error(err)
    return res.status(500).send('There was an error adding channels')
  }

  server = await getServerSummary(server.id)
  return res.status(201).send({
    server
  })
}