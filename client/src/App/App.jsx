import { Route, Routes, BrowserRouter as Router, Navigate, useNavigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'

import {
  Home,
  ActivityDetails,
  Auth
} from '../pages'

import { Navbar, FooterNavbar } from '../components'

import theme from '../theme'
import './App.css'

const clerkKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY

const ClerkProviderWithRouter = () => {
  const navigate = useNavigate()
  
  return (
    <ClerkProvider publishableKey={clerkKey} navigate={(to) => navigate(to)}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/activityCards' />} />
          <Route path='/activityCards/*' element={<Home />} />
          <Route path='/activity-details/:activityId' element={<ActivityDetails />} />
          {/* <Route path='/auth' element={<Auth />} /> */}
          <Route path='/sign-in/*' element={<Auth><SignIn routing='path' path='/sign-in' redirectUrl='/activityCards' signUpUrl='/sign-up' /></Auth>} />
          <Route path='/sign-up/*' element={<Auth><SignUp routing='path' path='/sign-up' redirectUrl='/activityCards' signInUrl='/sign-in' /></Auth>} />
        </Routes>
        <FooterNavbar />
      </ChakraProvider>
    </ClerkProvider>
  )
}

function App() {

  return (
    <Router>
      <ClerkProviderWithRouter />
    </Router>
  )
}

export default App
