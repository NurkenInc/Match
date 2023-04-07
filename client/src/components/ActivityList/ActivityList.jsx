import {
  Box,
  Container
} from '@chakra-ui/react'

import { ActivityCard } from '../index'

import { testCards } from '../../constants'

const ActivityList = () => {
  return (
    <Container maxW={'container.xl'}>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        gap={8}
        py={8}
      >
        {
          testCards.map((item, index) => (
            <ActivityCard
              key={item.id}
              {...item}
            />
          ))
        }
      </Box>
    </Container>
  )
}

export default ActivityList