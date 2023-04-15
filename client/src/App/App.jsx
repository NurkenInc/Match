import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import {
  Home,
  ActivityDetails,
  Auth
} from '../pages'

import { Navbar } from '../components'

import theme from '../theme'
import './App.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/activityCards' />} />
          <Route path='/activityCards' element={<Home />} />
          <Route path='/activity-details/:activityId' element={<ActivityDetails />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
