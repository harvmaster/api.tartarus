
export const formatUserPublic = (user) => {
  return {
    username: user.username,
    accountCode: user.accountCode,
    bio: user.bio
  }
}

export default formatUserPublic