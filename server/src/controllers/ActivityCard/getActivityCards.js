import express from 'express'
import mongoose from 'mongoose'

import { ActivityCard } from '../../models'

const getActivityCards = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT

    const total = await ActivityCard.countDocuments({})
    const activityCards = await ActivityCard.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

    res.status(200).json({ 
      data: activityCards,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT)
    })

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default getActivityCards