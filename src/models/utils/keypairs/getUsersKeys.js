import { KeyPairs } from "../..";
import Keypair from "./Keypair";

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getUsersKeys = async (user, options = {}) => {
  const keypairs = await KeyPairs.find({ user })
  if (!keypairs) return []

  if (options.original) return keypairs

  const keypairObjs = keypairs.map(keypair => new Keypair(keypair))
  return keypairObjs
}

export default getUsersKeys