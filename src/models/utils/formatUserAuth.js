export const formatUserAuth = (user) => {
  return {
    id: user.id,
    username: user.username,
    accountCode: user.accountCode,
    bio: user.bio,
    jwt: user.generateJWT()
  }
}

export default formatUserAuth