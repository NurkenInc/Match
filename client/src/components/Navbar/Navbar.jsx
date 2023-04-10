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

import { Logotype, FilterModal, SearchModal, CreateActivityCardModal } from '../index'

import { navIconsHover } from '../../styles' 

const CustomIcon = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    {children}
  </Box>
))

const Navbar = () => {
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
  console.log('navrerender')

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
          px={8}
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
                cursor={'pointer'}>
                {/* Make filter on recent */}
                <Tooltip label='Popular'>
                    <CustomIcon><AiFillHeart /></CustomIcon>
                  </Tooltip>
              </ListItem>
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
                  navigate('/')
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
                onClick={() => {
                  if (!user) {
                    toast({
                      title: 'You aren\'t logged in',
                      status: 'error',
                      position: 'top',
                      duration: 700,
                      isClosable: true,
                    })
                  }
                }}
              >
                {/* make filter by liked */}
                  <Tooltip label='Saved'>
                    <CustomIcon><BsFillBookmarkFill /></CustomIcon>
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
              userRole.data === 'copywriter' && user && (
                <Button
                  w={'70%'}
                  onClick={createActivityCardModal.onOpen}
                >
                  Create post
                </Button>
              )
            }
            {
              user ?
              <ListItem
                backgroundColor={'white'}
                borderRadius={'50%'}
                width={'2rem'}
                height={'2rem'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                _hover={navIconsHover}
                onClick={() => {
                  navigate('/')
                }}
              >
                <Menu>
                    <MenuButton>
                      <Tooltip label='profile'>
                        <CustomIcon><BiUser /></CustomIcon>
                      </Tooltip>
                    </MenuButton>
                  <MenuList>
                    <MenuItem onClick={logoutUser}>Logout</MenuItem>  
                  </MenuList>
                </Menu>
              </ListItem> :
              <Button
                  w={'100%'}
                  onClick={() => {
                      navigate('/auth')
                  }}
                >
                  <BiLogIn />
                  <Text>Log In</Text>
              </Button>
            }
          </List>
        </Box>
      </Container>
      <FilterModal isOpen={filterModal.isOpen} onClose={filterModal.onClose} />
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.onClose} />
      <CreateActivityCardModal isOpen={createActivityCardModal.isOpen} onClose={createActivityCardModal.onClose} />
    </Box>
  )
}

export default Navbar