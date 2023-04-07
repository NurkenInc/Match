import {
  Container,
  Box,
} from '@chakra-ui/react'
import { AuthForm } from '../components'

const Auth = () => {
  return (
    <Box 
      h={'100vh'} 
      w={'100vw'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <AuthForm />
    </Box>
  )
}

export default Auth