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
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { likeActivityCard } from '../../actions/activityCards'
import { AiOutlineShareAlt, AiFillLike } from 'react-icons/ai' 
import { FaFilter } from 'react-icons/fa'
import { BsFillBookFill } from 'react-icons/bs'

import { checkImageURL } from '../../utils'

import { CreateActivityCardModal, ShareButton } from '../index'

// import { gradient01 } from '../../styles'

const ActivityCard = ({ likes, deadline, creator, id, image, title, employerName, employerLogo, text, requirements, responsibilities, benefits, link, country, activityType, timeType, position }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const userRole = useSelector((state) => state.user)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const getTextWithoutEnd = (text) => {
    const sentencesArr = text.split('.')
    
    let result = ''

    for(let i = 0; i < sentencesArr.length - 2; i++) {
      result += `${sentencesArr[i]}.`
      if(result.length > 180) break
    }

    return result.length == 0 ? text : result
  }

  const getTextEnd = (text) => {

    const sentencesArr = text.split('.')

    if(sentencesArr.length === 1) return text

    const result = `${sentencesArr[sentencesArr.length - 2]}.`
    
    return truncateText(result, 45)
  }

  const handleReadMoreClick = () => {
    navigate(`/activity-details/${id}`, 
      { state: {
          id, 
          image, 
          title, 
          employerName, 
          employerLogo, 
          text,
          requirements, 
          responsibilities, 
          benefits, 
          link, 
          country, 
          activityType, 
          timeType, 
          position,
          deadline
      } } 
    )
  }

  const handleLikeClick = () => {
    if(!user) {
      toast({
        title: 'You aren\'t logged in',
        status: 'error',
        position: 'top',
        duration: 700,
        isClosable: true,
      })
      return
    }
    dispatch(likeActivityCard(id))
  }

  const truncateText = (text, length) => {
    return text.length > length ? `${text.slice(0, length)}...` : text
  }

  const handleCardClick = () => {

  }

  return (
    <Box 
      width={'20rem'} 
      position={'relative'}
      h={'100%'}
      shadow={'-30px 20px 50px #383838'}
    >
      <Card backgroundColor={'gray.200'}>
        <CardHeader p={0}>
        {
              checkImageURL(image) ? 
              <Image src={image} w={'20rem'} h={'11rem'} p={0} borderTopRadius={'10px'} /> :
              null
        }
        </CardHeader>
          <CardBody backgroundColor={'white'} borderTopRadius={'30px'}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              gap={1}
            >
              <ShareButton url={`https://matchactivity.netlify.app/activity-details/${id}`} />
              <Heading
                py={1}
                fontSize={'24px'}
              >
                {truncateText(employerName, 15)}
              </Heading>
            </Box>
            <Heading
              color={'orange.800'}
              py={2}
            >
              {truncateText(position, 30)}
            </Heading>
            <Box 
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              color={'yellow.400'}
              py={4}
            >
              <FaFilter />
              <Text>{activityType} | {timeType}</Text>
            </Box>
            <Text>{getTextWithoutEnd(title)}</Text>
            <Box 
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              <Button
                borderRadius={'15px'}
                backgroundColor={'rgb(215 166 85)'}
                onClick={handleLikeClick}
                px={0}
                my={2}
                color={likes.includes(user?.id) ? 'black' : 'white'}
              >
                <AiFillLike
                  opacity={1}
                  size={'1rem'}
                />
                <Text>
                  {likes.length}
                </Text>
              </Button>
              <Text>{getTextEnd(title) === getTextWithoutEnd(title) ? '' : getTextEnd(title)}</Text>
            </Box>
          </CardBody>
          <CardFooter pt={0} gap={4} backgroundColor={'white'} borderBottomRadius={'30px'}>
            <Button
              bgColor={'rgb(215 166 85)'}
              onClick={handleReadMoreClick}
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
                <BsFillBookFill color={'#fce57e'} />
              </Box>
            </Button>
            {
              userRole?.data === 'copywriter' && creator === user?.id && (
                <Button
                  opacity={0.8}
                  colorScheme='teal'
                  fontFamily={'Panoptica-SansBold'}
                  onClick={onOpen}
                >
                  <Box 
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={2}
                  >
                    <Text>
                      Edit
                    </Text>
                  </Box>
                </Button>
              )
            }
          </CardFooter>
      </Card>
      <CreateActivityCardModal 
        isOpen={isOpen} 
        onClose={onClose} 
        isCreate={false}
        id={id}
        card={{
          activityType,
          timeType,
          requirements,
          benefits,
          responsibilities,
          country,
          employerLogo,
          image,
          employerName,
          title,
          text,
          deadline,
          position,
          link
        }} 
      />
    </Box>
  )
}

export default ActivityCard