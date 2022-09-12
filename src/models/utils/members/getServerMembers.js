import { Memberships } from "../..";


/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getServerMembers = async (server, options = {}) => {
  const members = await Memberships.find({ server })
  if (!members) return []

  if (options.original) return members

  const memberObj = members.map(member => new Member(member))
  return memberObj
}

export default getServerMembers