import { KeyPairs, Keys } from "../..";

import keypairs from "../keypairs";
import Key from "./Key";


/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getKeysFromUser = async (keyHash, user, options = {}) => {
  const usersPublickKeys = await Keypairs.getUsersPublicKeys(user)
  if (!usersPublickKeys) return []

  const keys = await Keys.find({ keyHash, publicKey: { $in: usersPublickKeys } })
  if (!keys) return []

  if (options.original) return keys

  const keysObjs = keys.map(key => new Key(key))
  return keysObjs
}

export default getKeysFromUser