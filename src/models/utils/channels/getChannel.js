import { Channels } from "../..";
import Channel from "./Channel";

export const getChannel = async ({ id, shortId }) => {
  const channel = await Channels.findOne({ id, shortId })
  if (!channel) return

  const channelObj = new Channel(channel)
  return channelObj
}

export default getChannel