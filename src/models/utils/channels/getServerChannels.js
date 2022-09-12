import { Channels } from "../..";
import Channel from './Channel'

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getServerChannels = async (server, options = {}) => {
  const channels = await Channels.find({ server })
  if (!channels) return

  if (options.original) return channels

  const channelObj = channels.map(channel => new Channel(channel))
  return channelObj
}

export default getServerChannels