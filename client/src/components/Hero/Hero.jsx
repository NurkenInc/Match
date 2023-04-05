import {
  Container,
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react'

import { ActivityCard } from '../index'

import { testCards } from '../../contstants'

const Hero = () => {
  return (
    <Container maxW={'container.xl'}>
      <Box>
        <Box>
          <Box
            color={'whiteAlpha.700'}
            fontSize={'26px'}
          >
            <Heading>Find Your Match</Heading>
          </Box>
          <Box>
            <Text 
              w={'60%'}
              color={'yellow.500'}
              opacity={0.7}
              fontFamily={'Panoptica-SansBold'}
              lineHeight={'18px'}
            >
              How about find you Match? Our platform it's a great resource to do it! Internships, volunteering, jobs, projects and more! Opportunities all around!
            </Text>
          </Box>
        </Box>
        <Box>
          {
            testCards.map((item, index) => (
              <ActivityCard
                key={item.title + index}
                {...item}
              />
            ))
          }
        </Box>
      </Box>
    </Container>
  )
}

export default Hero