import React, { useContext, useState, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { menuList, cartItems, removeFromCart, getTotalCartAmount, formatCurrency } = useContext(StoreContext)
  const navigate = useNavigate()

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (menuList.length > 0) {
      const tempData = [];
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          tempData.push({
            _id: item,
            quantity: cartItems[item]
          })
        }

      }
      setCartData(tempData);
    }

  }, [cartItems, menuList])

  return (
    <div className='cart'>
      <div className="cart items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className='total'>Total</p>
          <p>Remove</p>
        </div>
        <br />

        <hr />
        {menuList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p> {formatCurrency(item.price)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p className='total'>{formatCurrency(item.price * cartItems[item._id])}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p> {formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{formatCurrency(getTotalCartAmount() === 0 ? 0 : 300)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b> {getTotalCartAmount() === 0 ? formatCurrency(0) : formatCurrency(getTotalCartAmount() + 300)}</b>
            </div>
          </div>
          <button onClick={() => navigate('/placeorder')} >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
