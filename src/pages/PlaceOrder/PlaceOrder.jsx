import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import PaymentType from '../../components/PaymentType/PaymentType'
function PlaceOrder() {
  const { getTotalCartAmount, formatCurrency, formData, handleFormSubmit, handleFormChange, setIsPayment, isPayment } = useContext(StoreContext)
  return (
    <form onSubmit={handleFormSubmit}>
      <div className='place-order' >
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text"
              name='firstName'
              placeholder='First Name' required value={formData.firstName} onChange={handleFormChange} />
            <input type="text"
              name='lastName' placeholder='Last Name' required value={formData.lastName} onChange={handleFormChange} />
          </div>
          <input type="email"
            name='email'
            placeholder='Email' required value={formData.email} onChange={handleFormChange} />
          <input type="text"
            name='address' placeholder='Street' required value={formData.address} onChange={handleFormChange} />
          <div className="multi-fields">
            <input type="text"
              name='city'
              placeholder='City' required value={formData.city} onChange={handleFormChange} />
            <input type="text"
              name='state'
              placeholder='State' required value={formData.state} onChange={handleFormChange} />
          </div>
          <div className="multi-fields">
            <input type="text"
              name='zipcode'
              placeholder='Zip code' required value={formData.zipcode} onChange={handleFormChange} />
            <input type="text"
              name='country'
              placeholder='Country' required value={formData.country} onChange={handleFormChange} />
          </div>
          <input type="number"
            name='phoneNumber'
            placeholder='Phone ' required value={formData.phoneNumber} onChange={handleFormChange} />

        </div >
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{formatCurrency(getTotalCartAmount())}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{formatCurrency(getTotalCartAmount() === 0 ? 0 : 300)}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>{formatCurrency(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 300)}</b>
              </div>
            </div>
            <p onClick={() => { setIsPayment(true); window.scrollTo(0, 0) }} className='proceed'>PROCEED TO PAYMENT</p>
          </div>
        </div>

      </div>
      {isPayment && <PaymentType />}
    </form>

  )
}

export default PlaceOrder
