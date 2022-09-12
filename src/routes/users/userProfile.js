import { KeyPairs, Utils } from '../../models'

export const getPublicProfile = async (req, res) => {
  const params = req.params
  
  // Parses params and tries to find the user
  let user = await Utils.findUser(params)
  if (!user) return res.status(204).send('No user found')

  let keypairs = KeyPairs.find({ user: user.id })
  keypairs = Utils.formatKeypairPublic(keypairs)
  user = Utils.formatUserPublic(user)

  return res.send({ user: { ...user, keypairs } })
}