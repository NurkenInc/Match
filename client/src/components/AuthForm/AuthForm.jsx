import React, { useState } from 'react'
import {
  Container,
  Box,
  FormControl,
  FormLabel,
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

import { regGmail, regPassword } from '../../constants'

const initialState = { firstname: '', lastname: '', password: '', email: '', confirmPassword: '' }

const AuthForm = () => {
  const [form, setForm] = useState(initialState)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [invalidInput, setInvalidInput] = useState([])

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

  const isFormValid = () => {
     if (!regPassword.test(form.password)) {
      setInvalidInput('password')
      setError('Incorrect password')
      return false
    }
    if (confirmPassword !== password) {
      setInvalidInput('confirmPassword')
      setError('Password dons\'t match')
      return false
    }
    if (!regGmail.test(form.email)) {
      setInvalidInput('email')
      setError('')
      return false
     }
     return true
  }

  const submitForm = () => {
    if (!isFormValid()) {
      return
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
          </FormControl>
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    </Container>
  )
}

export default AuthForm