import React, { useContext, useEffect, useState } from 'react';
import './Order.css';
import axios from '../../../axios';
import { AuthContext } from '../../Context/AuthContext';
import { StoreContext } from '../../Context/StoreContext';

function Orders() {
    const { isAuth } = useContext(AuthContext)
    const { formatCurrency } = useContext(StoreContext)
    const [orderData, setOrderData] = useState([])

    async function getUsersOrders() {
        try {
            const response = await axios.get('/api/order/userorders')
            if (response.data.success) {

                let allOrdersItem = []

                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())

            }
            else {
                console.log("Trouble getting your orders");
            }
        } catch (error) {
            console.log(err.response.data)
        }
    }
    useEffect(() => {
        if (isAuth) {
            getUsersOrders();
        }
    }, [isAuth])



    return (
        <div className='orders'>
            <div className='order-list'>
                {orderData.map((p, index) => (
                    <div key={index} className='order-container'>
                        <div className='order-image-cont'>
                            <img src={p.image} alt={p.name} className='order-image' />
                        </div>

                        <div className='order-details'>
                            <p className='order-name'>{p.name}</p>
                            <div className='order-info'>
                                <p className='order-price'>{formatCurrency(p.price)}</p>
                                <p className='order-quantity'>Quantity: {p.quantity}</p>
                            </div>
                            <p className='order-date'>
                                Date: <span>{new Date(p.date).toDateString()}</span>
                            </p>
                            <p className='order-date'>
                                Payment: <span>{p.paymentMethod}</span>
                            </p>
                        </div>
                        <div className='order-status'>
                            <div className='status-container'>
                                <span className='status-dot'></span>
                                <p className='status-text'>{p.status}</p>
                            </div>
                            <button className='track-order-btn' onClick={getUsersOrders}>Track Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
