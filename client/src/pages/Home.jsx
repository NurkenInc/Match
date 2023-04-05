import { Box, Image } from '@chakra-ui/react'

import { 
  Navbar,
  Hero,
} from '../components'

import { gradient01 } from '../styles'

const Home = () => {
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
        />
        <Box background={gradient01}>
          <Navbar />
          <Hero />
        </Box>
      </Box>
    </Box>
  )
}

export default Home