import { Servers } from "..";

export const findServer = async (req, res, next) => {
  const shortId = req.params.server
  const server = await Servers.findOne({ shortId })

  if (!server) return res.status(400).send('Invalid Server ID')
  req.server = server
  
  next()
}

export default findServer