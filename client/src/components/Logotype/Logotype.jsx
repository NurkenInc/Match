import {
  Box,
  Image,
  Heading,
} from '@chakra-ui/react'

const Logotype = () => {
  return (
    <Box>
      <Box gap={6} display='flex' justifyContent='center' alignItems='center'>
        <Image
          src='/logo.png' 
          width='1rem'
          height='1.5rem'
          opacity={0.5}
        />
        <Heading
          color={'white'}
          opacity={0.3}
          fontSize={'24px'}
        >
          Match
        </Heading>
      </Box>
    </Box>
  )
}

export default Logotype