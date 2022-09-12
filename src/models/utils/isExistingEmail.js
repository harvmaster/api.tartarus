import { Users } from '..'

export const isExistingEmail = async (email) => {
  const userWith = await Users.find({ email })

  if (!!userWith) return true
  return false
}

export default isExistingEmail