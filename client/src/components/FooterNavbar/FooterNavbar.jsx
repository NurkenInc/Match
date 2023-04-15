import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  List,
  ListItem,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  Button,
  Text,
  useToast,
  position,
  Menu,
  MenuList,
  MenuItem,
  MenuButton
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import decode from 'jwt-decode'

import { logout } from '../../actions/auth'
import { getUserRole } from '../../actions/user'
import { BiUser, BiLogIn } from 'react-icons/bi'
import { AiFillHome, AiOutlineSearch, AiFillHeart  } from 'react-icons/ai'
import { HiFilter } from 'react-icons/hi'
import { BsFillBookmarkFill } from 'react-icons/bs'

import { 
  Logotype, 
  FilterModal, 
  SearchModal, 
  CreateActivityCardModal, 
  CustomIcon,
} from '../index'

import { navIconsHover } from '../../styles' 

const FooterNavbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))?.token)
  const userRole = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)

  const searchModal = useDisclosure()
  const filterModal = useDisclosure()
  const createActivityCardModal = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(logout())

    navigate('/')

    setUser(null)
  }

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('profile'))?.token

    if (user) {
      const decodedToken  = decode(user)

      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logoutUser()
        return
      }

      setUser(user)
    }
  }

  const handleSavedFilter = () => {
    if (!user) {
      toast({
        title: 'You aren\'t logged in',
        status: 'error',
        position: 'top',
        duration: 700,
        isClosable: true,
      })
      return
    }
    navigate('/activityCards', { state: { saved: 'saved', id: JSON.parse(localStorage.getItem('profile'))?.id } })
  }

  useEffect(() => {
    getToken()
  }, [location, auth.data])
  
  useEffect(() => {
    getToken()
    if(user) {
      dispatch(getUserRole())
    }
  }, [])
  
  return (
    <Box
      display={{ base: 'block', sm: 'none' }}
      as='nav' 
      position={'fixed'}
      bottom={0}
      py={2} 
      w={'100%'}
      zIndex={2}
      css={{ backdropFilter: 'blur(10px)' }}
      bg={useColorModeValue('#20202380', '#ffffff40')}
    >
      <Box>
            <List 
              display={'flex'}
              justifyContent={'center'}
              alignContent={'center'}
              gap={8}
              fontFamily={'Panoptica-SansBold'}
              color={'white'}
              opacity={0.4}
            >
              <ListItem 
                _hover={navIconsHover} 
                cursor={'pointer'} 
                onClick={searchModal.onOpen}
              >
                <Tooltip label='Search'>
                  <CustomIcon>
                    <AiOutlineSearch />
                  </CustomIcon>
                </Tooltip>
              </ListItem>
              <ListItem 
                _hover={navIconsHover} 
                onClick={() => {
                  navigate('/activityCards')
                }}
              >
                <Tooltip label='Home'>
                  <CustomIcon><AiFillHome /></CustomIcon>
                </Tooltip>
              </ListItem>
              <ListItem 
                cursor={'pointer'} 
                onClick={filterModal.onOpen}
                _hover={navIconsHover}
              >
                <Tooltip label='Filter'>
                  <CustomIcon><HiFilter /></CustomIcon>
                </Tooltip>
              </ListItem>
              <ListItem 
                cursor={'pointer'}
                _hover={navIconsHover}
                onClick={handleSavedFilter}
              >
                {/* make filter by liked */}
                  <Tooltip label='Saved'>
                    <CustomIcon><AiFillHeart /></CustomIcon>
                  </Tooltip>
              </ListItem>
            </List>
          </Box>
      <FilterModal isOpen={filterModal.isOpen} onClose={filterModal.onClose} />
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.onClose} />
      <CreateActivityCardModal isCreate={true} isOpen={createActivityCardModal.isOpen} onClose={createActivityCardModal.onClose} />
    </Box>
  )
}

export default FooterNavbar