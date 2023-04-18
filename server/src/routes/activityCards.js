import express from 'express'

import {
  createActivityCard,
  deleteActivityCard,
  getActivityCard,
  getActivityCards,
  likeActivityCard,
  updateActivityCard
} from '../controllers/index.js'

const router = express.Router()

// TODO: implement middleware

router.get('/', getActivityCards)
router.get('/:id', getActivityCard)

router.post('/', createActivityCard)

router.delete('/:id', deleteActivityCard)

router.patch('/:id', updateActivityCard)
router.patch('/:id/likeActivityCard', likeActivityCard)

export default router