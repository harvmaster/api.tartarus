import { Users, Utils } from '../../models'

export const loginUser = async (req, res) => {
  const body = req.body.user

    // Find user and then check their password
  const user = await Users.findOne({ email: body.email })
  if (!user?.validPassword(body.password)) return res.status(401).send('Username or Password incorrect')

  let keypairs = await Utils.getUsersKeypairs(user)
  keypairs = Utils.formatKeypairAuth(keypairs)

  const response = {
    ...Utils.formatUserAuth(user),
    keypairs
  }

  // Return the user to ther client
  res.status(200).send(response)
}

export default loginUser