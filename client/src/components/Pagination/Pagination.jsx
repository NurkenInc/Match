import React, { useState, useEffect } from 'react'
import { Stack, Button, Box, getToken } from '@chakra-ui/react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'

import { getActivityCards } from '../../actions/activityCards'

const Pagination = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.activityCards)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handlePagination = (value) => {
    if(isInvalid(value)) return
    navigate(`/activityCards?page=${Number(page) + Number(value)}`)
  }

  const isInvalid = (value) => {
    return Number(page) + Number(value) < 1 || Number(page) + Number(value) > numberOfPages
  }

  const fetchActivityCards = async () => {
    if(page) {
      dispatch(getActivityCards(page))
    }
  }

  useEffect(() => {
    fetchActivityCards()
  }, [dispatch, page])

  return (
    <Box py={{ base: 10, sm: 5 }}>
      <Stack 
        display={'flex'} 
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={2}
      >
        <Button 
          h={6} 
          mt={2}
          opacity={isInvalid(-1) ? 0.4 : 1}
          onClick={() => {
            handlePagination(-1)
          }}
        >
          <AiOutlineArrowLeft />
        </Button>
        <Button h={6}>
          {page}
        </Button>
        <Button 
          h={6}
          opacity={isInvalid(1) ? 0.4 : 1}
          onClick={() => {
            handlePagination(1)
          }}
        >
          <AiOutlineArrowRight />
        </Button>
      </Stack>
    </Box>
  )
}

export default Pagination