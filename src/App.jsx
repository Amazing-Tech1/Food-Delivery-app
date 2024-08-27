import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Missing from "./Missing"

import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { useState } from 'react'




function App() {
  const [login, setLogin] = useState(false)

  return (
    <>
      {login ?<Login setLogin={setLogin }/>: <></> }
      <div className="app">
        <Navbar setLogin={setLogin }/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div >

    </>
  )
}

export default App
