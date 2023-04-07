import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models'

const deleteActivityCard = async (req, res) => {
  const { id } = req.params

  try {
    await ActivityCard.findByIdAndRemove(id)

    res.status(200).json({ 
      message: 'Activity card deleted successfully'
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default createActivityCard