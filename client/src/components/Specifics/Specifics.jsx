import {
  Text,
  Heading,
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  List,
  ListItem
} from '@chakra-ui/react'

const Specifics = ({ title, text }) => {
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Heading
          color={'whiteAlpha.900'}
        >
          {title}
        </Heading>
      </Box>
      <Box
        display='flex'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <List>
        {
          typeof(text) === 'string' ?
          text :
          text.map((item, index) => (
              <ListItem>
                <Text color={'blackAlpha.800'}>
                  {index}. {item}
                </Text>
              </ListItem>
          ))
        }
        </List>
      </Box>
    </Box>
  )
}

export default Specifics