import { KeyPairs } from "..";
import formatKeypairPublic from "./formatKeypairPublic";

export const formatMember = async (member) => {
  let keypairs = await KeyPairs.find({ user: member.user.id })
  keypairs = formatKeypairPublic(keypairs)

  return {
    username: member.user.username,
    accountCode: member.user.accountCode,
    bio: member.user.bio,
    avatar: member.user.avatar,
    nickname: member.nickname,
    publicKeys: keypairs
  }
}

export default formatMember