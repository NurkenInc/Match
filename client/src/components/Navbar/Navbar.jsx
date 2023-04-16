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
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
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

const Navbar = () => {
  const { user } = useUser()

  const searchModal = useDisclosure()
  const filterModal = useDisclosure()
  const createActivityCardModal = useDisclosure()
  const toast = useToast()
  const navigate = useNavigate()

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

  return (
    <Box
      as='nav' 
      position={'fixed'} 
      w={'100%'}
      zIndex={2}
      css={{ backdropFilter: 'blur(10px)' }}
      bg={useColorModeValue('#20202380', '#ffffff40')}
    >
      <Container 
        maxW={'container.xl'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box 
          display={'flex'} 
          alignItems={'center'}
          gap={14}
          backgroundColor={'blackAlpha.200'}
          px={{ base: 0, sm: 8 }}
          borderTopRadius={'30px'}
          borderRightRadius={'30px'}
          >
          <Box
            cursor={'default'}
            p={2}
            _hover={navIconsHover}
          >
            <Logotype />
          </Box>
          <Box 
            display={{ base: 'none', sm: 'block' }}
          >
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
        </Box>
        <Box>
          <List
            display={'flex'}
            justifyContent={'center'}
            gap={4}
            alignContent={'center'}
            fontFamily={'Panoptica-SansBold'}
            color={'black'}
            opacity={0.4}
          >
            {
              user?.publicMetadata.role === 'copywriter' && (
                <Button
                  w={'70%'}
                  onClick={createActivityCardModal.onOpen}
                >
                  Create post
                </Button>
              )
            }
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button
                    w={'100%'}
                    onClick={() => {
                        navigate('/sign-in')
                    }}
                  >
                    <BiLogIn />
                    <Text>Log In</Text>
              </Button>
            </SignedOut>
          </List>
        </Box>
      </Container>
      <FilterModal isOpen={filterModal.isOpen} onClose={filterModal.onClose} />
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.onClose} />
      <CreateActivityCardModal isCreate={true} isOpen={createActivityCardModal.isOpen} onClose={createActivityCardModal.onClose} />
    </Box>
  )
}

export default Navbar