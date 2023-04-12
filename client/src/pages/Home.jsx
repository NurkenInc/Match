import { Box, Image } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import { 
  Navbar,
  Hero,
  ActivityList
} from '../components'

import { gradient01 } from '../styles'

const Home = () => {
  const location = useLocation()

  const filters = location.state
  
  return (
    <Box w={'100vw'} h={'100vh'}>
      <Box
        w={'100%'}
        h={'100%'}
        position={'relative'}
        overflowX={'hidden'}
      >
        <Image 
          position={'absolute'}
          src='public/university_bg.jpg'
          opacity={0.2}
          w={'70%'}
          h={'80%'}
          borderRadius={'30% 70% 100% 0% / 0% 77% 23% 100%'}
          objectFit={'cover'}
        />
        <Box background={gradient01}>
          <Hero />
          <ActivityList filters={filters} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home