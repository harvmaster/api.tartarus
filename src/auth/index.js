const { expressjwt: jwt } = require('express-jwt')
const jwtVerify = require('jsonwebtoken')
const { get } = require('mongoose')
const secret = require('../../config').jwt.secret
const Users = require('../models/users')

const auth = () => {
  return {
    optional: jwt({
      secret: secret,
      algorithms: ['HS256'],
      userProperty: 'payload',
      credentialsRequired: false,
      getToken: getTokenFromHeader
    }),
    required: jwt({
      secret: secret,
      algorithms: ['HS256'],
      userProperty: 'payload',
      getToken: getTokenFromHeader
    })
  }
}

const getTokenFromHeader = (req, res) => {
  console.log(req.header.authorization)
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const getUserId = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const header = req.headers.authorization
    console.log(header)

    let decoded
    try {
      decoded = jwtVerify.verify(header, secret);
      console.log(decoded)
    } catch (err) {
      console.log('nope')
      return null
    }

    return decoded.id
  }

  return null
}

const getUser = async (req, res) => {
  const id = getUserId(req, res)
  const user = await Users.findById(id)
  return user
}

module.exports = { required: auth().required, optional: auth().optional, getUserId, getUser }