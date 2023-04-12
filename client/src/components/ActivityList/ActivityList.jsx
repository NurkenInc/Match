import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Spinner,
  Heading
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivityCards } from '../../actions/activityCards'

import { ActivityCard } from '../index'

import { testCards } from '../../constants'

const ActivityList = ({ filters }) => {
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

  const applyFilters = (arr) => {
    if(filters === null || !Object.keys(filters).length || filters?.timeType === 'none' || filters?.activityType === 'none') {
      return arr
    }
    return arr.filter((item) => item.activityType === filters?.activityType && item.timeType === filters?.timeType)
  }

  const getActivityList = () => {
    return applyFilters(sortByDates(1))
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
            getActivityList() !== undefined && getActivityList().length ? (
              getActivityList().map((item, index) => (
                <ActivityCard
                  key={item._id}
                  id={item._id}
                  {...item}
                />
              ))
            ) :
            <Box>
              <Heading>Sorry. Data not found</Heading>
            </Box>
          }
        </Box>
      }
    </Container>
  )
}

export default ActivityList