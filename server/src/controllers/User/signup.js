import { User } from '../../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = async (req, res) => {
  const { email, password, firstname, lastname, confirmPassword } = req.body
  
  try {
    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'User already exist' })
    }

    if(password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords doesn\'t match' })
    }

    const hashedPassword = bcrypt.hash(password, 12)

    const result = User.create({ email: email, password: hashedPassword, name: `${firstname} ${lastname}` })

    const secret = GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '3h' })

    res.status(201).json({ result: user, token })
  } catch(error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
}

export default signup