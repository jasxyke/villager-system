import './App.css'
import Login from './pages/Login/Login'
import Homepage from './pages/Home/HomePage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Homepage />}
          />
          <Route path="/login" element={<Login />} />
          <Route path='*' element={<Login />} ></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App