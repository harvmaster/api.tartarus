const hasKeys = (obj, keys) => {
  const missing = []
  keys = keys.split(' ')
  keys.forEach(key => !obj[key] ? missing.push(key) : {})

  return missing.length ? [false, missing] : [true]
}

const requireBodyKeys = (keys, location) => (req, res, next) => {
  const body = location ? req.body[location] : req.body

  const [isValidBody, missingKeys] = hasKeys(body, keys)
  if (!isValidBody) return res.status(400).send(`Bad request\nMissing fields: ${missingKeys}`)

  next()
}

module.exports = { hasKeys, requireBodyKeys }