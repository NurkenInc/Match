import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models/index.js'
import clerk from '../../middleware/clerk.js'

const deleteActivityCard = async (req, res) => {
  const { id } = req.params
  const { userId } = req.auth
  const user = await clerk.users.getUser(userId)

  if(!user || user.publicMetadata.role !== 'copywriter') {
    return res.status(403).json({ message: 'Unauthorized' })
  }

  try {
    await ActivityCard.findByIdAndRemove(id)

    res.status(200).json({ 
      message: 'Activity card deleted successfully'
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default deleteActivityCard