import { Servers } from "../..";
import Server from "./Server";

export const getServer = async (params) => {
  const server = await Servers.findOne(params)
  if (!server) return

  const serverObj = new Server(server)

  return server
}

export default getServer