import mongoose from "mongoose";

import { Memberships } from "../..";
import Member from "./Member";


/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getWithRole = async (roleId, options = {}) => {
  console.log('[getWithRole.js] Experimental: finding value in array of objectIds')
  const members = await Memberships.find({ roles: mongoose.Types.ObjectId(roleId) })
  console.log('[getWithRole.js] Success: ', members)
  if (!members) return []

  if (options.original) return members

  const memberObj = members.map(member => new Member(member))
  return memberObj
}

export default getWithRole