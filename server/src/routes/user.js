import express from 'express'

import { signin, signup, role } from '../controllers/index.js'
// import auth from '../middleware/clerk.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
// router.get('/role', auth, role)

export default router