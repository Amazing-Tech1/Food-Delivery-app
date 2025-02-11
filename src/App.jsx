import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Missing from "./Missing"
import ProtectedRoutes from './ProtectedRoutes'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import Orders from './pages/Order/Order'
import VerifyPayment from './pages/VerifyPayment'




function App() {
  const { login } = useContext(AuthContext)

  return (
    <>
      <ToastContainer />
      {login ? <Login /> : <></>}
      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/cart' element={<Cart />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order' element={<Orders />} />
            <Route path='/verify' element={<VerifyPayment />} />
          </Route>
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </div >
    </>
  )
}

export default App
