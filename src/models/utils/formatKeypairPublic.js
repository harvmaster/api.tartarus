import formatKeypairAuth from "./formatKeypairAuth";

export const formatKeypairPublic = (keyPairs) => {
  let keypairs = formatKeypairAuth(keyPairs)
  keypairs = keypairs.map(keypair => keypair.publicKey)

  return keypairs
}

export default formatKeypairPublic