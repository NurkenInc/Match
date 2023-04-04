import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import {
  Home,
  ActivitySearch,
  ActivityDetails
} from '../pages/index'

import theme from '../theme'
import './App.css'

function App() {
  return (
    // <Provider>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </ChakraProvider>
    // </Provider>
  )
}

export default App
