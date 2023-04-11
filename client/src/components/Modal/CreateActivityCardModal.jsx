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
  Textarea,
  useToast
} from '@chakra-ui/react'
import moment from 'moment'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { activityTypes, timeTypes } from '../../constants'
import { createActivityCard, updateActivityCard } from '../../actions/activityCards'


const initialState = {
  activityType: '',
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

const CreateActivityCardModal = ({ isOpen, onClose, isCreate, id, card }) => {
  const [form, setForm] = useState(initialState)
  const [requirements, setRequirements] = useState([''])
  const [benefits, setBenefits] = useState([''])
  const [responsibilities, setResponsibilities] = useState([''])
  const [invalidInput, setInvalidInput] = useState([])
  const [inputError, setInpurError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  // console.log(id)

  useEffect(() => {
    if(isOpen === false) {
      setRequirements([''])
      setResponsibilities([''])
      setBenefits([''])
      if(isCreate) {
        setForm(initialState)
      } else {
        setForm(card)
      }
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

  const isInputInvalid = (name) => {
    return invalidInput.includes(name)
  }

  const removeInvalidInput = (name) => {
    setInvalidInput(invalidInput.filter((item) => item !== name))
  }

  const isFormValid = () => {
    const optionalFields = ['image', 'employerLogo']
    
    return !Object.keys(form).some((item) => {
      if(form[item] === '' || form[item] === null  && !optionalFields.includes(item)) {
        setInvalidInput([...invalidInput, item])
        setInpurError('this input is empty')
        return true
      }
    })
  }

  const createPost = () => {
    if(!isFormValid()) {
      toast({
        title: 'Empty inputs',
        position: 'top',
        description: "Not all required inputs are filled",
        status: 'error',
        duration: 1200,
        isClosable: true,
      })
      return
    }

    setForm({...form, requirements, responsibilities, benefits })
    if(isCreate) {
      dispatch(createActivityCard(form))
    } else {
      dispatch(updateActivityCard(id, form))
    }
    onClose()
    navigate('/')
    toast({
      title: 'Success',
      position: 'top',
      description: `Post ${isCreate ? 'created' : 'updated'} successfully`,
      status: 'success',
      duration: 1200,
      isClosable: true,
    })
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
              <Input name='image' value={form.image} onChange={(e) => { handleChange(e) }} />
            </FormControl>
            <FormControl>
              <FormLabel>Enter opportunity title:</FormLabel>
              <Input 
                isInvalid={isInputInvalid('title')} 
                name='title'
                value={form.title}
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter opportunity text:</FormLabel>
              <Textarea
                isInvalid={isInputInvalid('text')} 
                name='text'
                value={form.text}
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Organization name:</FormLabel>
              <Input 
                isInvalid={isInputInvalid('employerName')} 
                name='employerName'
                value={form.employerName}
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Organization logo url(optional):</FormLabel>
              <Input 
                name='employerLogo'
                value={form.employerLogo}
                onChange={(e) => { 
                  handleChange(e) 
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Position in team(profession):</FormLabel>
              <Input 
                isInvalid={isInputInvalid('position')} 
                name='position'
                value={form.position}
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Opportunity country:</FormLabel>
              <Input 
                isInvalid={isInputInvalid('country')} 
                name='country'
                value={form.country}
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Link to opportunity:</FormLabel>
              <Input 
                isInvalid={isInputInvalid('link')} 
                name='link'
                value={form.link}
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter requirements list:</FormLabel>
              {/* rewrite it to function that generate this data {requirements} */}
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
              <Select 
                isInvalid={isInputInvalid('activityType')} 
                name='activityType' 
                placeholder='Select option'
                value={form.activityType} 
                onChange={(e) => { 
                  handleChange(e) 
                  removeInvalidInput(e.target.name)
                }}
              >
                {
                  activityTypes.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))
                }
              </Select>
            <FormLabel pt={2}>Select time type:</FormLabel>
            <RadioGroup  
              name='timeType' 
              value={form.timeType}
              onChange={(value) => { 
                handleRadio(value) 
                removeInvalidInput('timeType')
              }}
            >
              <Stack gap={4} direction={'col'}>
                {
                  timeTypes.map((item, index) => (
                    <Radio isInvalid={isInputInvalid('timeType')} key={index} value={item}>{item}</Radio>
                  ))             
                }
              </Stack>
            </RadioGroup>
            <FormControl>
              <FormLabel>Opportunity deadlines:</FormLabel>
              <Input 
                name='deadline' 
                isInvalid={isInputInvalid('deadline')}
                max={'2025-01-01'} 
                min={'2023-01-01'} 
                type={'date'} 
                onChange={(e) => { 
                  handleDate(e) 
                  removeInvalidInput(e.target.name)
                }} 
              />
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
            {
              isCreate ? 'Create' : 'Update'
            }
          </Button>
          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateActivityCardModal