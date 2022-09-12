import { Users, KeyPairs } from '..'

export const findUser = async (params) => {
  let user
  if (params.userId) {
    user = await Users.findById(params.userId)
  } else if (params.publicKey) {
    const key = await KeyPairs.findOne({ publicKey: params.publicKey })
    user = await Users.findById(key.user)
  } else if (params.username && params.accountCode)  {
    user = await Users.findOne({ username: params.username, accountCode: params.accountCode })
  }

  return user
}

export default findUser