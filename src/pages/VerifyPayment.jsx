import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from '../../axios'
import { AuthContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'

function VerifyPayment() {
    const { setCartItems, cartItems } = useContext(StoreContext)
    const { isAuth } = useContext(AuthContext)

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    const reference = searchParams.get('reference')

    const navigate = useNavigate()

    async function verifyPayment() {
        try {
            const response = await axios.post('/api/order/verifyPaystack', { success, orderId, reference })
            if (response.data.success) {
                console.log('successful Payment')
                setCartItems({})
                console.log(cartItems)
                navigate('/order')
            } else {
                console.log('Unsuccessful Payment')
                navigate('/cart')
                toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }

    }
    useEffect(() => {
        if (isAuth) {
            verifyPayment();
        }
    }, [isAuth]);
    
    return (
        <div>

        </div>
    )
}

export default VerifyPayment
