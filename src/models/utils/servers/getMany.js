import { Servers } from "../..";
import Server from "./Server";

export const getManyServers = async (params) => {
  const servers = await Servers.find(params)
  if (!servers) return

  const serverObj = servers.map(server => new Server(server))

  return serverObj
}

export default getManyServers