import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../lib/mongodb'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Connect to the database
      const { db } = await connectToDatabase()

      // Find the user in the database
      const existingUser = await db.collection('users').findOne({ email: user.email })

      // If the user doesn't exist yet, create a new user object with the relevant fields
      const newUser = {
        name: user.name,
        email: user.email,
        provider: account.provider,
        providerId: account.id,
        providerData: account,
        role: 'user',
      }

      // If the user already exists, update their provider information
      if (existingUser) {
        await db.collection('users').updateOne({ _id: existingUser._id }, { $set: newUser })
      } else {
        await db.collection('users').insertOne(newUser)
      }

      return true
    },
  },
}

export default (req, res) => NextAuth(req, res, options)