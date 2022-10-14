import express from 'express'
const router = express.Router()

import { requireBodyKeys } from '../../utils'
import Auth from '../../auth'

import createUser from "./userCreate";
import loginUser from "./userLogin";
import getMemberships from "./getMemberships";

router.get('/memberships', Auth.required, getMemberships)

router.post('/', requireBodyKeys('username email password privateKey publicKey', 'user'), createUser)
router.post('/login', requireBodyKeys('email password', 'user'), loginUser)

export default router