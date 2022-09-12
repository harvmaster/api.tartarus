import mongoose from "mongoose";

import { Memberships } from "../..";
import Member from "./Member";

export const getWithRole = async (roleId) => {
  console.log('[getWithRole.js] Experimental: finding value in array of objectIds')
  const members = await Memberships.find({ roles: mongoose.Types.ObjectId(roleId) })
  console.log('[getWithRole.js] Success: ', members)
  if (!members) return []

  const memberObj = members.map(member => new Member(member))
  return memberObj
}

export default getWithRole