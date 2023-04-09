import { User } from '../../models/index.js'
import jwt from 'jsonwebtoken'

const role = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData, id
    const secret = process.env.GOOGLE_CLIENT_SECRET

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret)

      id = decodedData?.id
    } else {
      decodedData = jwt.decode(token)

      id = decodedData?.sub
    }

    const user = await User.findById(id)

    const role = user.Role
    res.status(200).json({ 
      role
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default role