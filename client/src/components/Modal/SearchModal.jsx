import React, { useEffect, useState } from 'react'
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
  Input,
  FormLabel,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router'

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setQuery('')
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormLabel>Type your query: </FormLabel>
            <Input 
              placeholder={'Your query...'} 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </Box>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button 
            colorScheme='teal'
            onClick={() => {
              onClose()
              navigate('/', { state: { query } })
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

export default SearchModal