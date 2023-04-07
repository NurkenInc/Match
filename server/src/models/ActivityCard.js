import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ActivityCardSchema = new Schema({
  creator: String,
  image: String,
  title: String,
  employerName: String,
  type: String,
  time: String,
  position: String,
  employerLogo: String,
  deadlines: Date,
  text: String,
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  link: String,
  country: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  }
})

const ActivityCard = mongoose.model('ActivityCard', ActivityCardSchema)

export default ActivityCard