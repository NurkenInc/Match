import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models/index.js'
import clerk from '../../middleware/clerk.js'

const likeActivityCard = async (req, res) => {
  const { id } = req.params
  const { userId } = req.auth
  const user = await clerk.users.getUser(userId)

  if(!user) {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  try {
    const activityCard = await ActivityCard.findById(id)

    const index = activityCard.likes.findIndex((id) => id === String(userId))

    if(index === -1) {
      activityCard.likes.push(userId)
    } else {
      activityCard.likes = activityCard.likes.filter((id) => id !== String(userId))
    }

    const updatedPost = await ActivityCard.findByIdAndUpdate(id, activityCard, { new: true })
    
    res.status(200).json({ 
      data: updatedPost
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default likeActivityCard