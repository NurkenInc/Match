import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Button,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Textarea
} from '@chakra-ui/react'
import moment from 'moment'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { activityTypes, timeTypes } from '../../constants'
import { createActivityCard } from '../../actions/activityCards'


const initialState = {
  activityType: 'Computer Science',
  timeType: '',
  requirements: [],
  benefits: [],
  responsibilities: [],
  country: '',
  employerLogo: '',
  image: '',
  employerName: '',
  title: '',
  text: '',
  deadline: null,
  position: '',
  link: ''
}

const CreateActivityCardModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(initialState)
  const [requirements, setRequirements] = useState([''])
  const [benefits, setBenefits] = useState([''])
  const [responsibilities, setResponsibilities] = useState([''])
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(isOpen === false) {
      setRequirements([''])
      setResponsibilities([''])
      setBenefits([''])
      setForm('')
    }
  }, [isOpen])

  const increaseList = (list, setList) => {
    setList([...list, ''])
  }

  const decreaseList = (list, setList, itemIndex) => {
    setList(list.filter((item, index) => index !== itemIndex))    
  }

  const handleListChange = (list, setList, e, itemIndex) => {
    setList(list.map((item, index) => index === itemIndex ? e.target.value : item))
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const handleDate = (e) => {
    if(moment(e.target.value, 'YYYY-MM-DD').isValid()) {
      setForm({...form, deadline: e.target.value })
    }
  }

  const handleRadio = (value) => {
    setForm({...form, timeType: value })
  }

  const isInputValid = (inputName) => {
    return form[inputName] !== ''
  }

  const validateForm = () => {
    
  }

  const createPost = () => {
    setForm({...form, requirements, responsibilities, benefits })

    dispatch(createActivityCard(form))
    onClose()
    navigate('/')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl>
              <FormLabel>Enter image url(optional):</FormLabel>
              <Input name='image' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Enter opportunity title:</FormLabel>
              <Input name='title' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Enter opportunity text:</FormLabel>
              <Textarea name='text' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Organization name:</FormLabel>
              <Input name='employerName' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Organization logo url(optional):</FormLabel>
              <Input name='employerLogo' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Position in team(profession):</FormLabel>
              <Input name='position' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Opportunity country:</FormLabel>
              <Input name='country' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Link to opportunity:</FormLabel>
              <Input name='link' onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Enter requirements list:</FormLabel>
              {
                Array(requirements.length).fill('').map((item, index) => (
                  <Box key={item + index} display={'flex'} py={1}>
                    <Input
                      value={requirements[index]}
                      onChange={(e) => handleListChange(requirements, setRequirements, e, index)}
                    />
                    {
                      (requirements.length - 1) === index ?
                      <Button px={0} onClick={() => {
                        increaseList(requirements, setRequirements)
                      }}>
                        +
                      </Button> :
                      <Button px={0} onClick={() => {
                        decreaseList(requirements, setRequirements, index)
                      }}>
                        -
                      </Button>
                    }
                  </Box>
                ))
              }
            </FormControl>
            <FormControl>
              <FormLabel>Enter benefits list:</FormLabel>
              {
                Array(benefits.length).fill('').map((item, index) => (
                  <Box key={item + index} display={'flex'} py={1}>
                    <Input
                      value={benefits[index]}
                      onChange={(e) => handleListChange(benefits, setBenefits, e, index)}
                    />
                    {
                      (benefits.length - 1) === index ?
                      <Button px={0} onClick={() => {
                        increaseList(benefits, setBenefits)
                      }}>
                        +
                      </Button> :
                      <Button px={0} onClick={() => {
                        decreaseList(benefits, setBenefits, index)
                      }}>
                        -
                      </Button>
                    }
                  </Box>
                ))
              }
            </FormControl>
            <FormControl>
              <FormLabel>Enter responsibilities list:</FormLabel>
              {
                Array(responsibilities.length).fill('').map((item, index) => (
                  <Box key={item + index} display={'flex'} py={1}>
                    <Input
                      value={responsibilities[index]}
                      onChange={(e) => handleListChange(responsibilities, setResponsibilities, e, index)}
                    />
                    {
                      (responsibilities.length - 1) === index ?
                      <Button px={0} onClick={() => {
                        increaseList(responsibilities, setResponsibilities)
                      }}>
                        +
                      </Button> :
                      <Button px={0} onClick={() => {
                        decreaseList(responsibilities, setResponsibilities, index)
                      }}>
                        -
                      </Button>
                    }
                  </Box>
                ))
              }
            </FormControl>
            
            <FormLabel>Select activity type:</FormLabel>
              <Select name='activityType' placeholder='Select option' onChange={(e) => { handleChange(e) }}>
                {
                  activityTypes.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))
                }
              </Select>
            <FormLabel pt={2}>Select time type:</FormLabel>
            <RadioGroup name='timeType' onChange={(value) => { handleRadio(value) }}>
              <Stack gap={4} direction={'col'}>
                {
                  timeTypes.map((item, index) => (
                    <Radio key={index} value={item}>{item}</Radio>
                  ))                    
                }
              </Stack>
            </RadioGroup>
            <FormControl>
              <FormLabel>Opportunity deadlines:</FormLabel>
              <Input name='deadline' max={'2025-01-01'} min={'2023-01-01'} type={'date'} onChange={(e) => { handleDate(e) }} />
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button 
            colorScheme='teal' 
            onClick={() => {
              createPost()
              navigate('/')
            }}
          >
            Create
          </Button>
          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateActivityCardModal