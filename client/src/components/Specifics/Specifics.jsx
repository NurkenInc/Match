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
          <Text>{text}</Text> :
          text.map((item, index) => (
              <ListItem key={item + index}>
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