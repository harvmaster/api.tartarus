import { permissionsArray, permissions } from './permissions'
import defaults from './defaults'

export const getPermissions = (num) => {
  let bits = num.toString(2).split('').map(s => parseInt(s));
  for (let i = bits.length; i < 40; i++) {
    bits.unshift(0)
  }
  bits = bits.reverse()

  let perms = []
  bits.forEach((v, i) => {
    if (!v) return
    perms.push(permissionsArray[i])
  })

  return perms
}

export const calcPermissions = (perms) => {
  if (perms == '*') return permissionsArray.reduce((acc, p) => acc += permissions[p])
  let num = 0
  perms.forEach(perm => {
    num += permissions[perm]
  })

  return num
}

export const hasPermission = (num, perm) => {
  perm = perm.toLowerCase()
  const perms = getPermissions(num).map(p => p.toLowerCase())

  return perms.includes(perm)
}

export default { getPermissions, calcPermissions, hasPermission, defaults }