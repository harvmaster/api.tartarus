import { Users } from "../..";
import User from "./User";

export const getUser = async ({ id }, options = {}) => {
  const user = await Users.findById(id)
  if (!user) return

  if (options.original) return user

  const userObj = new User(user)
  return userObj
}

export default getUser