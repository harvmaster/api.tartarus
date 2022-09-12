import { Servers } from "../..";
import { Server } from '..'

import { generateUniqueId } from "../../../utils/generateUnqiueId";

export const create = async ({ name, description, image }) => {
  const servers = await Servers.find({}).select('shortId')
  const ids = [...new Set(servers.map(server => server.shortId))]

  const shortId = generateUniqueId(ids)

  return new Servers({
    name,
    description,
    shortId
  })
}

export default create