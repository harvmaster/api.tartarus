import config from '../../config'
import { Roles } from '../models'

import defaults from './defaults'
import { calcPermissions } from '.'

export const generateRole = {
  owner: (server) => {
    return new Roles({
      server,
      name: 'Owner',
      colour: config.colours.ownerRole,
      permissions: defaults.ownerPermissions,
      hierarchy: 0
    })
  },
  default: (server) => {
    return new Roles({
      server,
      name: 'Default',
      colour: config.colours.defaultRole,
      permissions: defaults.defaultPermissions,
      hierarchy: 1
    })
  },
  custom: async (server, { name, colour, permissions }) => {
    const serverRoles = await Roles.find({ server }).sort('hierarchy', -1)
    if (!serverRoles) throw new Error('No roles found for that server')
    const lowestRole = serverRoles[0]
    
    let hierarchy = lowestRole.hierarchy + 1
    if (permissions instanceof Array) permissions = calcPermissions(permissions)
    
    return new Roles({
      server,
      name,
      colour,
      permissions,
      hierarchy
    })
  }
}