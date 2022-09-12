import Channel from '../../models/channels/channel'
import Auth from '../../auth'
import express from 'express'
const router = express.Router()

import { createServer } from './serverCreate'

router.get('/', (req, res) => {
  console.log(Channel)
  res.send('yep')
})

router.post('/create', Auth.required, createServer)

export default router