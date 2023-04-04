import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      bg: mode('rgb(82,75,71)', 'rgb(50,44,40)')(props),
      bg: mode(
        'linear-gradient(144deg, rgba(82,75,71,1) 0%, rgba(231,176,126,1) 61%, rgba(230,172,119,1) 100%)',
        'linear-gradient(144deg, rgba(50,44,40,1) 0%, rgba(172,120,73,1) 61%, rgba(172,120,73,1) 100%)')(props)
    }
  })
}

const components = {

}

const fonts = {
  heading: 'Panoptica-SansBold',
  text: 'Panoptica-SansBold',
}

const colors = {

}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })

export default theme