import { Users, KeyPairs, Utils } from '../../models'

export const createUser = async (req, res) => {
  const body = req.body.user
  const { privateKey, publicKey, secretKey } = body

  if (await Utils.isExistingEmail(body.email) ) return res.status(409).send('Email is already taken') 
  
  let accountCode = await Utils.generateAccountCode(username)

  // Create user
  const user = new Users({
    username: body.username,
    email: body.email,
    accountCode,
    bio: body.bio
  })
  user.setPassword(body.password)

  // save user to database
  const created = await user.save().catch((err) => console.error(err))
  if (!created) return res.status(500).send('A problem occured trying to save the user')
  console.log('[routes/users/userCreate]', 'Created User')
  
  let keys = new KeyPairs({ user: created.id, privateKey, publicKey, secretKey })
  keys = await keys.save()
  if (!keys) return res.status(500).send('A problem occured trying to save the user\'s keypair') 

  return res.status(201).send({ ...created, ...keys })
}

export default createUser