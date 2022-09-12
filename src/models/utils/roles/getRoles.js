import { Roles } from "../..";
import Role from "./Role";

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getRoles = async (roleIds, options = {}) => {
  let roles = roleIds.map(role => Roles.findById(role))
  roles = await Promise.all(roles)
  
  if (options.original) return roles

  const rolesObjs = roles.map(role => new Role(role))
  return rolesObjs
}

export default getRoles