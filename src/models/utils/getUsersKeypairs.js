import { KeyPairs } from "..";

export const getUsersKeypairs = async (user) => {
  const keyPairs = await KeyPairs.find({ user: user.id })

  return keyPairs
}

export default getUsersKeypairs