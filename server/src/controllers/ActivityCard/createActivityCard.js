import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models/index.js'

const createActivityCard = async (req, res) => {
  const card = req.body

  const newActivityCard = new ActivityCard({ ...card, creator: req.userId, createdAt: new Date().toISOString() })

  try {
    await newActivityCard.save()

    res.status(201).json({ 
      data: newActivityCard
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default createActivityCard