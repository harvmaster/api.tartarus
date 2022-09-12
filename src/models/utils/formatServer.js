import formatChannel from "./formatChannel"
import formatMember from "./formatMember"

export const formatServer = async (server) => {
  // Format channels
  server.channels = server.channels?.map(channel => formatChannel(channel))
  
  // Format members
  server.members = server.members?.map(async member => formatMember(member))
  server.members = await Promise.all(server.members || [])

  // Return the server
  const { name, description, channels, members, shortId } = server
  return { shortId, name, description, created: server.create_date, channels, members }
}

export default formatServer