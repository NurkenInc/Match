import express from 'express'

import {
  createActivityCard,
  deleteActivityCard,
  getActivityCard,
  getActivityCards,
  likeActivityCard,
  updateActivityCard
} from '../controllers/index.js'
import clerk from '../middleware/clerk.js'

const router = express.Router()

router.get('/', getActivityCards)
router.get('/:id', getActivityCard)

router.post('/', clerk.expressWithAuth(), createActivityCard)

router.delete('/:id', clerk.expressWithAuth(), deleteActivityCard)

router.patch('/:id', clerk.expressWithAuth(), updateActivityCard)
router.patch('/:id/likeActivityCard', clerk.expressWithAuth(), likeActivityCard)

export default router