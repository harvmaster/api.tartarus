import { Servers } from "..";

export const createServer = async ({ name, description, image }) => {
  const servers = await Servers.find({}).select('shortId')
  const ids = [...new Set(servers.map(server => server.shortId))]

  let shortId
  do {
    shortId = Math.random().toString(36).substr(2, 9)
  } while(ids.includes(shortId))

  return new Servers({
    name,
    description,
    shortId
  })
}

export default createServer