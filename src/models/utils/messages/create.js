import { Messages } from "../..";

import generateRevisionId from "./generateRevisionId";

export const create = async ({ channel, sender, content, keyUsed }) => {
  const message = new Messages({
    channel,
    sender,
    content,
    keyUsed,
    revision: `0-${generateRevisionId()}`
  })

  return message
}

export default create