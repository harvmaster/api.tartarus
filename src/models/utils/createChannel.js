import { Channels } from ".."
import { generateUniuqueId } from "../../utils/generateUnqiueId"

export const createChannel = async (server, { permittedRoles, name, type }) => {
  const channelIds = await Channels.find({}).select('shortId')
  const ids = [...new Set(channelIds.map(channel => channel.shortId))]

  let shortId = generateUniuqueId(ids)

  return new Channels({
    server,
    permittedRoles,
    name,
    type,
    shortId
  })
}

export default createChannel