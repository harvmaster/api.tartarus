import { Channels } from "../..";
import Channel from "./Channel";

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getChannel = async ({ id, shortId }, options = {}) => {
  const channel = await Channels.findOne({ id, shortId })
  if (!channel) return

  if (options.original) return channel

  const channelObj = new Channel(channel)
  return channelObj
}

export default getChannel