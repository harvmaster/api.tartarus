import { Memberships } from "../..";

export const getServerMembers = async (server) => {
  const members = await Memberships.find({ server })
  if (!members) return []

  const memberObj = members.map(member => new Member(member))
  return memberObj
}

export default getServerMembers