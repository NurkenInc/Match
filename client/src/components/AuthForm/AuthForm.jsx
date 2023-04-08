import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Input,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Button
} from '@chakra-ui/react'
import { AiFillEye } from 'react-icons/ai'
import { CgMail } from 'react-icons/cg'
import { MdPassword } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { signin, signup } from '../../actions/auth'
import { regGmail, regPassword } from '../../constants'

const initialState = { firstname: '', lastname: '', password: '', email: '', confirmPassword: '' }

const AuthForm = () => {
  const [form, setForm] = useState(initialState)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [invalidInput, setInvalidInput] = useState([])
  const acitivityCards = useSelector((state) => state.activityCards)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getInputType = (show) => {
    return show ? 'text' : 'password'
  }

  // const checkToPattern = (pattern, value) => {
  //   if(!pattern.test(value)) {
  //     setInvalidInput(value)
  //     return false
  //   }
  //   return true
  // }

  const switchType = () => {
    setIsLogin(() => !isLogin)
    setForm(initialState)
    setInvalidInput([])
    setError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const isFormValid = () => {
    if (form.firstname === '' && !isLogin) {
      setInvalidInput([...invalidInput, 'firstname'])
      setError('firstname is required')
      return false
    }
    if (!regGmail.test(form.email)) {
      setInvalidInput([...invalidInput, 'email'])
      setError('email should end to gmail.com and at least 6 letter before')
      return false
    }
    if (!regPassword.test(form.password)) {
      setInvalidInput([...invalidInput, 'password'])
      setError('password at least should have: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, 1 spec symbol')
      return false
    }
    if (form.confirmPassword !== form.password && !isLogin) {
      setInvalidInput([...invalidInput, 'confirmPassword'])
      setError('confirm password should match to password')
      return false
    }
    return true
  }

  const submitForm = () => {
    if (!isFormValid()) {
      return
    }
    if (isLogin) {
      dispatch(signin(form))
      navigate('/')
    } else {
      dispatch(signup(form))
      navigate('/')
    }
  }

  const isInputInvalid = (name) => {
    return invalidInput.find(item => item === name) ? true : false
  }

  const removeFromInvalid = (name) => {
    if(isInputInvalid(name)) {
      setInvalidInput(invalidInput.filter(item => item !== name))
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  return (
    <Container maxW={'container.xl'}>
      <Card>
        <CardHeader>
          <Box textAlign={'center'}>
            <Heading>
              {
                isLogin ?
                'Log In' :
                'Sign Up'
              }
            </Heading>
          </Box>
        </CardHeader>
        <CardBody>
        {
            !isLogin && (
              <>
                <FormControl>
                  <FormLabel>Firstname(required)</FormLabel>
                  <InputGroup>                
                    <Input 
                      placeholder='Your firstname'
                      isInvalid={isInputInvalid('firstname')}
                      name='firstname'
                      onChange={(e) => {
                        handleChange(e)
                        removeFromInvalid('firstname')
                      }}
                      value={form.firstname}
                    />
                  </InputGroup>
                  <FormHelperText color={isInputInvalid('firstname') ?  'red' : 'gray'}>
                      {
                        isInputInvalid('firstname') ? 
                        error :
                        'or you can use your preferred name'
                      }
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Lastname(optional)</FormLabel>
                  <InputGroup>         
                    <Input 
                      placeholder='Your lastname'
                      name='lastname'
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      value={form.lastname}
                    />
                  </InputGroup>
                </FormControl>
              </>
            )
          }
          <FormControl>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents={'none'}
                children={<CgMail />}
              />
              <Input
                placeholder='Your email'
                isInvalid={isInputInvalid('email')}
                name='email'
                onChange={(e) => {
                  handleChange(e)
                  removeFromInvalid('email')
                }}
                value={form.email}
              />
            </InputGroup>
            <FormHelperText color={'red'}>
                {
                  isInputInvalid('email') && 
                  (error)
                }
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents={'none'}
                children={<MdPassword />}
              />                
              <Input 
                placeholder='Your password'
                isInvalid={isInputInvalid('password')}
                type={getInputType(showPassword)}
                name='password'
                onChange={(e) => {
                  handleChange(e)
                  removeFromInvalid('password')
                }}
                value={form.password}
              />
              <Button 
                onClick={() => {
                  setShowPassword(() => !showPassword)
                }}
              >
                <AiFillEye />
              </Button>
            </InputGroup>
            <FormHelperText color={'red'}>
                {
                  isInputInvalid('password') && 
                  (error)
                }
            </FormHelperText>
          </FormControl>
          {
            !isLogin && (
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents={'none'}
                    children={<MdPassword />}
                  />                
                  <Input 
                    placeholder='Repeat your password'
                    isInvalid={isInputInvalid('confirmPassword')}
                    type={getInputType(showConfirmPassword)}
                    name='confirmPassword'
                    onChange={(e) => {
                      handleChange(e)
                      removeFromInvalid('confirmPassword')
                    }}
                    value={form.confirmPassword}
                  />
                  <Button
                    onClick={() => {
                      setShowConfirmPassword(() => !showConfirmPassword)
                    }}
                  >
                    <AiFillEye />
                  </Button>
                </InputGroup>
                <FormHelperText color={'red'}>
                {
                  isInputInvalid('confirmPassword') && 
                  (error)
                }
            </FormHelperText>
              </FormControl>
            )
          }
        </CardBody>
        <CardFooter display={'flex'} flexDir={'column'} gap={2}>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Button 
              colorScheme='teal'
              onClick={submitForm}
            >
              {
                isLogin ?
                'Login' :
                'Register'
              }
            </Button>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            gap={1}
          >
            <Text>
              {
                isLogin ?
                'Don\'t have an account yet?' :
                'Already have an account?'
              }
            </Text>
            <Text
              cursor={'pointer'}
              color={'blue.500'}
              onClick={switchType}
            >
              {
                isLogin ?
                'Register' :
                'Login'
              }
            </Text>
          </Box>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default AuthForm