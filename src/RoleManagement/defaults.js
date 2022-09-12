import { permissions } from "./permissions"
export const defaultRole = [
  permissions.CREATE_CHANNEL_INVITE,
  permissions.ADD_REACTIONS,
  permissions.STREAM,
  permissions.VIEW_CHANNEL,
  permissions.SEND_MESSAGES,
  permissions.READ_MESSAGE_HISTORY,
  permissions.USE_EXTERNAL_EMOJIS,
  permissions.CONNECT,
  permissions.SPEAK,
  permissions.USE_VAD,
  permissions.CHANGE_NICKNAME,
  permissions.USE_EXTERNAL_STICKERS,
  permissions.SEND_MESSAGES_IN_THREADS
]

export const ownerRole = [
  permissions.CREATE_CHANNEL_INVITE,
  permissions.KICK_MEMBERS,
  permissions.BAN_MEMBERS,
  permissions.ADMINISTRATOR,
  permissions.MANAGE_CHANNELS,
  permissions.MANAGE_GUILD,
  permissions.ADD_REACTIONS,
  permissions.VIEW_AUDIT_LOG,
  permissions.PRIORITY_SPEAKER,
  permissions.STREAM,
  permissions.VIEW_CHANNEL,
  permissions.SEND_MESSAGES,
  permissions.SEND_TTS_MESSAGES,
  permissions.MANAGE_MESSAGES,
  permissions.EMBED_LINKS,
  permissions.ATTACH_FILES,
  permissions.READ_MESSAGE_HISTORY,
  permissions.MENTION_EVERYONE,
  permissions.USE_EXTERNAL_EMOJIS,
  permissions.VIEW_GUILD_INSIGHTS,
  permissions.CONNECT,
  permissions.SPEAK,
  permissions.MUTE_MEMBERS,
  permissions.DEAFEN_MEMBERS,
  permissions.MOVE_MEMBERS,
  permissions.USE_VAD,
  permissions.CHANGE_NICKNAME,
  permissions.MANAGE_NICKNAMES,
  permissions.MANAGE_ROLES,
  permissions.MANAGE_WEBHOOKS,
  permissions.MANAGE_EMOJIS_AND_STICKERS,
  permissions.USE_APPLICATION_COMMANDS,
  permissions.REQUEST_TO_SPEAK,
  permissions.MANAGE_EVENTS,
  permissions.MANAGE_THREADS,
  permissions.CREATE_PUBLIC_THREAD,
  permissions.CREATE_PRIVATE_THREADS,
  permissions.USE_EXTERNAL_STICKERS,
  permissions.SEND_MESSAGES_IN_THREADS,
  permissions.USE_EMBEDDED_ACTIVITES,
  permissions.MODERATE_MEMBERS
]

const ownerPermissions = ownerRole.reduce((acc, p) => acc += p)
const defaultPermissions = defaultRole.reduce((acc, p) => acc += p)

export default {
  ownerPermissions,
  defaultPermissions
}