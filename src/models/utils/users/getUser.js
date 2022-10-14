import { Users } from "../..";
import User from "./User";

export const getUser = async ({ id, email }, options = {}) => {
  const user = await Users.findOne({ id, email })
  if (!user) return

  const userObj = new User(user)

  if (options.original) return [user, userObj]
  return userObj
}

export default getUser