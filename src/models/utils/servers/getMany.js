import { Servers } from "../..";
import Server from "./Server";

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getManyServers = async (params, options = {}) => {
  const servers = await Servers.find(params)
  if (!servers) return

  if (options.original) return servers

  const serverObj = servers.map(server => new Server(server))
  return serverObj
}

export default getManyServers