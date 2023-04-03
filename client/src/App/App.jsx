import { Provider, createStore, applyMiddleware } from 'react-redux'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path='/' />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
