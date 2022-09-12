import { KeyPairs } from "../..";

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getUsersPublicKeys = async (user, options = {}) => {
  const keypairs = await KeyPairs.find({ user })
  if (!keypairs) return []

  if (options.original) return keypairs

  const publicKeys = keypairs.map(keypair => keypair.publicKey)
  return publicKeys
}

export default getUsersPublicKeys