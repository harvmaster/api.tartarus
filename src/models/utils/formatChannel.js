export const formatChannel = (channel) => {
  return {
    shortId: channel.shortId,
    name: channel.name,
    type: channel.type,
    permittedRoles: channel.permittedRoles
  }
}

export default formatChannel