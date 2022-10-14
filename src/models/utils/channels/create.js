import { Channels } from "../.."
import { generateUniqueId } from "../../../utils/generateUniqueId"

export const createChannel = async (server, { permittedRoles, name, type }) => {
  const channelIds = await Channels.find({}).select('shortId')
  const ids = [...new Set(channelIds.map(channel => channel.shortId))]

  let shortId = generateUniqueId(ids)

  return new Channels({
    server,
    permittedRoles,
    name,
    type,
    shortId
  })
}

export default createChannel