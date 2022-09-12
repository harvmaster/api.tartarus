import { Memberships, Servers } from "../../models";
import { getServerSummary } from "../../models/utils/getServerSummary";

export const getMemberships = async (req, res) => {
  const userId = req.auth.id
  const memberships = await Memberships.find({ user: userId })

  const serverIds = [ ...new Set(memberships.map(membership => membership.server)) ]
  let servers = serverIds.map(id => Servers.findById(id))
  servers = await Promise.all(servers)

  servers = servers.map(server => getServerSummary(server))
  servers = await Promise.all(servers)

  return res.send({ servers })
}

export default getMemberships