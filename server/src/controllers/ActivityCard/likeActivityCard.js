import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models/index.js'

const likeActivityCard = async (req, res) => {
  const { id } = req.params

  if(!req.userId) {
    return res.json('Unauthenticated')
  }

  try {
    const activityCard = await ActivityCard.findById(id)

    const index = activityCard.likes.findIndex((id) => id === String(req.userId))

    if(index === -1) {
      activityCard.likes.push(req.userId)
    } else {
      activityCard.likes = activityCard.likes.filter((id) => id !== String(req.userId))
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