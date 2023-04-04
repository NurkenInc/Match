import React from 'react'
import {
  Container,
  Box,
  List,
  ListItem,
  Tooltip,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { BiUser } from 'react-icons/bi'
import { AiFillHome, AiOutlineSearch, AiFillHeart  } from 'react-icons/ai'
import { HiFilter } from 'react-icons/hi'
import { BsFillBookmarkFill } from 'react-icons/bs'

import { Logotype } from '../index'

const CustomIcon = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    {children}
  </Box>
))

const Navbar = () => {
  return (
    <Box as='nav'>
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
        >
          <Box p={2}>
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
              <ListItem>
                <Link to={'/'}>
                <Tooltip label='Popular'>
                    <CustomIcon><AiFillHeart /></CustomIcon>
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/'}>
                  <Tooltip label='Search'>
                    <CustomIcon><AiOutlineSearch /></CustomIcon>
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/'}>
                <Tooltip label='Home'>
                    <CustomIcon><AiFillHome /></CustomIcon>
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/'}>
                  <Tooltip label='Filter'>
                    <CustomIcon><HiFilter /></CustomIcon>
                  </Tooltip>
                </Link>
              </ListItem>
              <ListItem>
                <Link to={'/'}>
                  <Tooltip label='Saved'>
                    <CustomIcon><BsFillBookmarkFill /></CustomIcon>
                  </Tooltip>
                </Link>
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
            >
              <Link to={'/'}>
                <Tooltip label='profile'>
                  <CustomIcon><BiUser /></CustomIcon>
                </Tooltip>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar