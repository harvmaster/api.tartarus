export const formatKeypairAuth = (keyPairs) => {
  const format = keypair => {
    return {
      privateKey: keypair.privateKey,
      publicKey: keypair.publicKey,
      secretKey: keypair.secretKey,
      exposed: keypair.exposed
    }
  }

  const res = keyPairs instanceof Array ? keyPairs.map(format) : format(keyPairs)

  return res
}

export default formatKeypairAuth