import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  Role: { type: String, default: 'user' },
  id: { type: String },
  // provider: { type: String }, // Store the provider name (e.g. "google", "github", etc.)
  // providerId: { type: String }, // Store the provider-specific user ID (e.g. Google's "sub" claim)
  // providerData: { type: Object }, // Store any additional data provided by the provider
})

const User = mongoose.model('User', UserSchema)

export default User