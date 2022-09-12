import { Memberships } from "../.."; 
import Member from "./Member";


/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getMember = async ({ server, user }, options = {}) => {
  const member = await Memberships.findOne({ server, user })
  if (!member) return

  if (options.original) return member

  const memberObj = new Member(member)
  return memberObj
}

export default getMember