import React from 'react'
import { Box } from '@chakra-ui/react'

const CustomIcon = React.forwardRef(({ children, ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    {children}
  </Box>
))

export default CustomIcon