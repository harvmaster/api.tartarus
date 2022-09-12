import { Channels } from "../..";
import Channel from './Channel'

export const getServerChannels = async (server) => {
  const channels = await Channels.find({ server })
  if (!channels) return

  const channelObj = channels.map(channel => new Channel(channel))
  return channelObj
}

export default getServerChannels