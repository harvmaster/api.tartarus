import { Utils } from '../../models'

export const loginUser = async (req, res) => {
  const body = req.body.user

    // Find user and then check their password
  const [userDoc, userObj] = await Utils.Users.getUser({ email: body.email }, { original: true })
  if (!userDoc?.validPassword(body.password)) return res.status(401).send('Username or Password incorrect')

  const keypairs = await userObj.getKeypairs()
  // let keypairs = await Utils.getUsersKeypairs(user)
  // keypairs = Utils.formatKeypairAuth(keypairs)

  const response = {
    ...userObj.toAuthFormat(),
    jwt: userDoc.generateJWT(),
    keypairs
  }

  // Return the user to ther client
  res.status(200).send(response)
}

export default loginUser