import { User } from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signin = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User doesn\'t exist' })
    }

    const isPasswordCorrect = bcrypt.compare(user.password, password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const secret = GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '3h' })

    res.status(200).json({ result: user, token })
  } catch(error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export default signin