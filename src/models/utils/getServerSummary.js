import { Channels, Memberships, Servers } from "..";
import formatServer from "./formatServer";

export const getServerSummary = async (serverId) => {
  let server = Servers.findById(serverId)
  const channels = Channels.find({ server: serverId })
  const members = Memberships.find({ server: serverId }).populate('user')

  const res = await Promise.all([server, channels, members])
  
  server = { ...res[0]._doc }
  server.channels = res[1]
  server.members = res[2]
  server = await formatServer(server)

  return server
}