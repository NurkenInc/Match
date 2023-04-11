import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Spinner
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityCards } from '../../actions/activityCards'

import { ActivityCard } from '../index'

import { testCards } from '../../constants'

const ActivityList = () => {
  const { activityCards, activityCard, isLoading, error, numberOfPages, currentPage } = useSelector((state) => state.activityCards)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActivityCards())
  }, [])

  const sortByDates = (type) => {
    return activityCards.sort((a, b) => {
      a = new Date(a.createdAt)
      b = new Date(b.createdAt)
      const result = a > b ? -1 : a < b ? 1 : 0
      return result * type // asc or desc
    })
  }

  return (
    <Container maxW={'container.xl'}>
      {
        isLoading ? 
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Spinner size={'xl'} />
        </Box> :
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'space-between'}
          gap={8}
          py={8}
        >
          {
            activityCards !== undefined && (
              sortByDates(1).map((item, index) => (
                <ActivityCard
                  key={item._id}
                  id={item._id}
                  {...item}
                />
              ))
            )
          }
        </Box>
      }
    </Container>
  )
}

export default ActivityList