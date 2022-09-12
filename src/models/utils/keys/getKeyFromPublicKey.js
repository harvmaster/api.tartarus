import { Keys } from '../..'
import Key from './Key'

/*
  options: {
    original: Give back the document straight from mongoose instead of the wrapped document
  }
*/
export const getKeyFromPublicKey = async (keyHash, publicKey, options = {}) => {
  const key = await Keys.findOne({ publicKey, keyHash })
  if (!key) return

  if (options.original) return key
  
  const keyObj = new Key(key)
  return keyObj
}

export default getKeyFromPublicKey