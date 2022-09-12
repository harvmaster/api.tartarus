export const generateUniqueId = (ids) => {
  let id
  do {
    id = Math.random().toString(36).substr(2, 9)
  } while (ids.includes(id))

  return id
}