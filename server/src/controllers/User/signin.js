import { User } from '../../models'
import bcrypt from 'bcrypt'

const signin = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ email })

    if(!user) {
      return res.status(404).json('User doesn\'t exist')
    }

    const isPasswordCorrect = 

  } catch(error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export default signin