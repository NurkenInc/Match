import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Stack,
  Select,
  FormLabel,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import { activityTypes, timeTypes } from '../../constants' 

const FilterModal = ({ isOpen, onClose }) => {
  const [activityType, setActivityType] = useState('none')
  const [timeType, setTimeType] = useState('none')
  const navigate = useNavigate()

  useEffect(() => {
    if(isOpen === false) {
      setActivityType('none')
      setTimeType('none')
    }
  }, [])

  const applyFilters = () => {
    if(activityType === 'Select activity type') setActivityType('none')
    onClose()
    navigate('/', { state: { activityType, timeType } })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormLabel>Select activity type:</FormLabel>
            <Select placeholder='Select activity type' onChange={(e) => {setActivityType(e.target.value)}}>
              {
                activityTypes.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </Select>
            <FormLabel pt={2}>Select time type:</FormLabel>
            <RadioGroup onChange={(e) => {setTimeType(e)}}>
              <Stack gap={4} direction={'col'}>
                {
                  timeTypes.map((item, index) => (
                    <Radio key={index} value={item}>{item}</Radio>
                  ))                    
                }
              </Stack>
            </RadioGroup>
            <FormControl>
              <FormHelperText>Note: if you set one of fields to none filters wouldn't apply</FormHelperText>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button
            colorScheme='teal' 
            onClick={applyFilters}
          >
            Apply
          </Button>
          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FilterModal