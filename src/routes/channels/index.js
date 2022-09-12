import Channel from '../../models/channels/channel'
import Auth from '../../auth'
import express from 'express'
const router = express.Router({ mergeParams: true })

import { createChannel } from './channelCreate'
import { hasServerPermission } from '../../RoleManagement/middleware'

router.post('/create', Auth.required, hasServerPermission('MANAGE_CHANNELS'), createChannel)

export default router