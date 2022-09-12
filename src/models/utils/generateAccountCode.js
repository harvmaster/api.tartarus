import { Users } from ".."

export const generateAccountCode = async (username) => {
  const users = await Users.find({ username })
  const accountCodes = users.map(user => user.accountCode)

  let code
  do {
    code = Math.floor(Math.random()*9000) + 1000
  } while (accountCodes.includes(code))

  return code
}

export default generateAccountCode