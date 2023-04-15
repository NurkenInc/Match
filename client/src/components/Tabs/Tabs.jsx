import {
  Button,
  Box
} from '@chakra-ui/react'

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Box 
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={1}
    >
      {
        tabs.map((item, index) => (
          <Button
            key={index}
            onClick={() => {
              setActiveTab(item)
            }}
            bg={activeTab === item ? 'purple.600' : '#303030'}
            color={'whiteAlpha.800'}
            fontStyle={'normal'}
            rounded={'30px'}
            mx={2}
          >
            {item}
          </Button>
        ))
      }
    </Box>
  )
}

export default Tabs