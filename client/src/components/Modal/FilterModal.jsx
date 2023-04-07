import React, { useState } from 'react'
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
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import { activityTypes, timeTypes } from '../../constants' 

const FilterModal = ({ isOpen, onClose }) => {
  const [activityType, setActivityType] = useState('')
  const [timeType, setTimeType] = useState('')
  const navigate = useNavigate()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormLabel>Select activity type:</FormLabel>
            <Select onChange={(e) => {setActivityType(e.target.value)}}>
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
          </Box>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button 
            colorScheme='teal' 
            onClick={() => {
              navigate('/', { state: { activityType, timeType } })
            }}
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