import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models'

const getActivityCard = async (req, res) => {
  const { id } = req.params

  try {
    const activityCard = await ActivityCard.findById(id)

    res.status(200).json({ 
      data: activityCard
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default getActivityCard