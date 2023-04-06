import React from 'react'
import {
  Container,
  Box,
  List,
  ListItem,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { BiUser } from 'react-icons/bi'
import { AiFillHome, AiOutlineSearch, AiFillHeart  } from 'react-icons/ai'
import { HiFilter } from 'react-icons/hi'
import { BsFillBookmarkFill } from 'react-icons/bs'

import { Logotype, FilterModal, SearchModal } from '../index'

import { navIconsHover } from '../../styles' 

const CustomIcon = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    {children}
  </Box>
))

const Navbar = () => {
  const searchModal = useDisclosure()
  const filterModal = useDisclosure()
  const navigate = useNavigate()

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
            alignContent={'center'}
            gap={8}
            fontFamily={'Panoptica-SansBold'}
            color={'black'}
            opacity={0.4}
          >
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
                navigate('/profile')
              }}
            >
                <Tooltip label='profile'>
                  <CustomIcon><BiUser /></CustomIcon>
                </Tooltip>
            </ListItem>
          </List>
        </Box>
      </Container>
      <FilterModal isOpen={filterModal.isOpen} onClose={filterModal.onClose} />
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.onClose} />
    </Box>
  )
}

export default Navbar