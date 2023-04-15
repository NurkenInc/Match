import React, { useState } from 'react'
import {
  Container,
  Box,
  Image,
  Text,
  Heading,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { MdFilterListAlt } from 'react-icons/md'
import { BiTimeFive } from 'react-icons/bi'

import { checkImageURL } from '../utils'
import { Tabs, Specifics } from '../components'

const tabs = ['about', 'requirements', 'responsibilities', 'benefits']

const ActivityDetails = () => {
  const [activeTab, setActiveTab] = useState('about')
  const location = useLocation()
  const navigate = useNavigate()
  const { image, title, employerName, employerLogo, text, requirements, responsibilities, benefits, link, country, activityType, timeType, position } = location.state

  const getActiveTabText = () => {
    switch(activeTab) {
      case 'requirements':
        return requirements
      case 'responsibilities':
        return responsibilities
      case 'benefits':
        return benefits
      case 'about':
        return text
      default:
        return ''
    }
  }

  return (
    <Box
      w={'100vw'} 
      h={'100vh'}
      overflowX={'hidden'}
    >
      <Container maxW={'container.xl'}>
        <Box position={'absolute'}>
          <Button 
            bg={'orange.200'} 
            opacity={0.5} 
            borderRadius={'15px'} 
            px={0}
            onClick={() => {
              navigate('/')
            }}
          >
            <AiOutlineArrowLeft />
          </Button>
        </Box>
        <Box
          w={'100%'}
          mt={16}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            py={4}
          >
            <Box>
              <Image 
                src={checkImageURL(employerLogo) ? employerLogo : '/logo-placeholder.svg'}
                width={'5rem'}
                height={'5rem'}
                borderRadius={'50%'}
              />
            </Box>
            <Box
              fontFamily={'Panoptica-SansBold'}
              color={'whiteAlpha.700'}
              display={'flex'}
              fontSize={{base: '14px', sm: '16px' }}
              justifyContent={'center'}
              alignItems={'center'}
              pb={4}
            >
              <Box
                display={'flex'}
                flexDir={'row'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <GoLocation />
                <Text>{country}</Text>
              </Box>
              <Text px={1}> / </Text>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <BiTimeFive />
                <Text>{timeType}</Text>
              </Box>
              <Text px={1}> / </Text>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <MdFilterListAlt />
                <Text>{activityType}</Text>
              </Box>
              <Text px={1}> / </Text>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text>{position}</Text>
              </Box>
            </Box>
            <Box>
              <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </Box>
            <Box py={4}>
              <Specifics title={activeTab} text={getActiveTabText()}></Specifics>
            </Box>
          </Box>
          <Box
            position={'fixed'}
            bottom={5}
          >
            <Link href={link} target='_blank' _hover={``} >
              <Button 
                px={20} 
                bg={'orange.500'} 
                color={'white'}
                >
                Apply to opportunity
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default ActivityDetails