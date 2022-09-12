import { Memberships } from "../.."; 
import Member from "./Member";

export const getMember = async ({ server, user }) => {
  const member = await Memberships.findOne({ server, user })
  if (!member) return

  const memberObj = new Member(member)
  return memberObj
}

export default getMember