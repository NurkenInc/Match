import express from 'express'

import {
  createActivityCard,
  deleteActivityCard,
  getActivityCard,
  getActivityCards,
  likeActivityCard,
  updateActivityCard
} from '../controllers/index.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getActivityCards)
router.get('/:id', getActivityCard)

router.post('/', auth, createActivityCard)

router.delete('/:id', auth, deleteActivityCard)

router.patch('/:id', auth, updateActivityCard)
router.patch('/:id/likeActivityCard', auth, likeActivityCard)

export default router