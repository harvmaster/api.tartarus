import { Servers } from "../..";
import Server from "./Server";

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getServer = async (params, options = {}) => {
  const server = await Servers.findOne(params)
  if (!server) return

  if (options.original) return server

  const serverObj = new Server(server)
  return serverObj
}

export default getServer