// get user
// get server
// get membership
// get roles
// check roles
// validate role

import { Channels, Memberships, Roles, Servers } from "../models"
import RoleManagement from "."

export const hasServerPermission = (permission) => {
  const validate = async (req, res, next) => {
    const userId = req.auth.id
    let server = req.params.server

    if (!server) return res.status(400).send('Invalid server ID')
    const s = await Servers.findOne({ shortId: server })
    server = s.id
    if (!server) return res.status(400).send('Invalid Server ID')

    const membership = await Memberships.findOne({ server, user: userId })
    if (!membership) return res.status(403).send('You are not a member of this server')

    let roles = membership.roles.map(role => Roles.findById(role))
    roles = await Promise.all(roles)

    if (roles.every(role => !RoleManagement.hasPermission(role.permissions, permission))) {
      return res.status(403).send(`Insufficient Permission. Requires: ${permission}`)
    }

    return next()
  }
  return validate
}

export const hasChannelAccess = async (req, res, next) => {
  const userId = req.auth.id
  const channelId = req.params.channel

  // Validate input
  if (!channelId) return res.status(400).send('Invalid channel ID')

  // Get channel
  const channel = await Channels.findById(channelId)
  if (!channel) return res.status(400).send('Could not find channel')

  // Get membership and validate
  const membership = Memberships.findOne({ server: channel.server, user: userId })
  if (!membership) return res.status(403).send('You are not a member of this server')

  let roles = membership.roles.map(role => Roles.findById(role))
  roles = await Promise.all(roles)

  // Check if they have a valid role for the channel
  if (!channel.permittedRoles.length && roles.every(role => !channel.permittedRoles.includes(role))) {
    return res.status(403).send(`You do not have access to this channel`)
  }
  
  return next()
}