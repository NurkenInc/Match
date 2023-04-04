import { Box } from '@chakra-ui/react'

import { 
  Navbar,
  Hero,
} from '../components'

const Home = () => {
  return (
    <Box w={'100vw'} h={'100vh'}>
      <Navbar />
      <Hero  />   
    </Box>
  )
}

export default Home