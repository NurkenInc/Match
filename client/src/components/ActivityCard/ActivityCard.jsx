import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'

import { AiOutlineShareAlt, AiFillLike } from 'react-icons/ai' 
import { FaFilter } from 'react-icons/fa'
import { BsFillBookFill } from 'react-icons/bs'

import { checkImageURL } from '../../utils'

const ActivityCard = ({ image, title, employerName, employerLogo, text, requirements, responsibilities, benefits, link, country, type, time, position }) => {
  
  const getTextWithoutEnd = (text) => {
    const sentencesArr = text.split('.')
    
    let result = ''

    for(let i = 0; i < sentencesArr.length - 2; i++) {
      result += `${sentencesArr[i]}.`
      if(result.length > 180) break
    }

    return result
  }

  const getTextEnd = (text) => {
    const sentencesArr = text.split('.')
    
    const result = `${sentencesArr[sentencesArr.length - 2]}.`
    
    return result.length > 45 ? result.substring(0, 45) + '...' : result + '..'
  }
  
  return (
    <Box width={'20rem'} position={'relative'}>
      <Card backgroundColor={'gray.200'}>
        <CardHeader p={0}>
        {
              checkImageURL(image) ? 
              <Image src={image} p={0} borderTopRadius={'10px'} /> :
              null
        }
        </CardHeader>
          <CardBody backgroundColor={'white'} borderTopRadius={'30px'}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Button
                borderRadius={'50%'}
                backgroundColor={'rgb(215 166 85)'}
                px={0}
              >
                <AiOutlineShareAlt 
                  color={'white'}
                  opacity={0.8}
                  size={'1rem'} 
                />
              </Button>
              <Heading
                py={1}
                fontSize={'24px'}
              >
                {employerName}
              </Heading>
            </Box>
            <Heading
              color={'orange.800'}
              py={2}
            >
              {position}
            </Heading>
            <Box 
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              color={'yellow.400'}
              py={4}
            >
              <FaFilter />
              <Text>{type} | {time}</Text>
            </Box>
            <Text>{getTextWithoutEnd(title)}</Text>
            <Box 
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Button
                borderRadius={'15px'}
                backgroundColor={'rgb(215 166 85)'}
                px={0}
                m={2}
              >
                <AiFillLike 
                  color={'white'}
                  opacity={1}
                  size={'1rem'}
                />
              </Button>
              <Text>{getTextEnd(title)}</Text>
            </Box>
          </CardBody>
          <CardFooter pt={0} backgroundColor={'white'} borderBottomRadius={'30px'}>
            <Button
              // colorScheme='yellow'
              bgColor={'rgb(215 166 85)'}
            >
              <Box 
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={2}
              >
                <Text>
                  Read more
                </Text>
                <BsFillBookFill />
              </Box>
            </Button>
          </CardFooter>
      </Card>
    </Box>
  )
}

export default ActivityCard