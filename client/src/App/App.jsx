import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import {
  Home,
  ActivityDetails,
} from '../pages'

import { Navbar } from '../components'

import theme from '../theme'
import './App.css'

function App() {
  return (
    // <Provider>
      <ChakraProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:activityId' element={<ActivityDetails />} />
          </Routes>
        </Router>
      </ChakraProvider>
    // </Provider>
  )
}

export default App
