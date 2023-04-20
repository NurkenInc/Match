import express from 'express'
import mongoose from 'mongoose'
import clerkClient from '@clerk/clerk-sdk-node'

import { ActivityCard } from '../../models/index.js'
import clerk from '../../middleware/clerk.js'

const createActivityCard = async (req, res) => {
  const card = req.body
  const { userId } = req.auth
  const user = await clerk.users.getUser(userId)

  if(!user || user.publicMetadata.role !== 'copywriter') {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  const newActivityCard = new ActivityCard({ ...card, creator: userId, createdAt: new Date().toISOString() })

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