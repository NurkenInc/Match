import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = token.length < 500

    let decodedData
    const secret = process.env.GOOGLE_CLIENT_SECRET

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret)

      req.userId = decodedData?.id

      req.role = decodedData?.role
    } else {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    // handle error
  }
}

export default auth