import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models/index.js'

const updateActivityCard = async (req, res) => {
  const { id } = req.params
  const { card } = req.body

  if(!req.userId) {
    return res.json('Unauthenticated')
  }

  try {
    const activityCard = await ActivityCard.findById(id)

    const updatedPost = await ActivityCard.findByIdAndUpdate(id, { ...activityCard, ...card }, { new: true })

    res.status(200).json({ 
      data: updatedPost
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default updateActivityCard