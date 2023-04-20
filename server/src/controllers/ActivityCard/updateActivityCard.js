import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models/index.js'
import clerk from '../../middleware/clerk.js'

const updateActivityCard = async (req, res) => {
  const { id } = req.params
  const card = req.body
  const { userId } = req.auth
  const user = await clerk.users.getUser(userId)

  if(!user || user.publicMetadata.role !== 'copywriter') {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  try {
    const updatedPost = await ActivityCard.findByIdAndUpdate(id, { ...card }, { new: true })
    
    res.status(200).json({ 
      data: updatedPost
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default updateActivityCard