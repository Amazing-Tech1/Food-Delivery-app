import React, { useContext } from 'react'
import './PaymentType.css'
import { StoreContext } from '../../Context/StoreContext'


function PaymentType() {
    const { setPaymentType, setIsPayment } = useContext(StoreContext)
    return (
        <div className='paymentType'>
            <div className="paymentType-container">
                <div className="payment-type-header">
                    <h1>Select Payment Mode</h1>
                    <p onClick={() => setIsPayment(false)}>X</p>
                </div>

                <div className="payment-type">
                    <button type='submit' onClick={() => setPaymentType("PayStack")}>Paystack</button>
                    <button type='submit' onClick={() => setPaymentType("COD")}>Cash on Delivery</button>
                </div>

            </div>

        </div>
    )
}

export default PaymentType
