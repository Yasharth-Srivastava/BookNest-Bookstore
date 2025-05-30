import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './History.css'

const History = () => {

    const [orderHistory , setOrderHistory] = useState([])
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:1000/api/orders/fetch-order-history/${userId}`)
            // console.log(response.data)
            // console.log(response.data.user)
            setOrderHistory(response.data)
        } catch (error) {
            // console.log("Not able to load the route")
        }
        
    }
    useEffect(
        () => {
            fetchOrderHistory()
        },
        []
    )

    return (
        <div className="history-container">
            <h1 className="history-title">Order History</h1>
            {orderHistory.length > 0 ? (
                <div className="order-list">
                    {orderHistory.map(order => (
                        <div key={order._id} className="order-card">
                            <h3 className="order-card-status">Status: <span>{order.status}</span></h3>
                            <ul className="order-items">
                                {order.items.map((item, index) => (
                                    <li key={index} className="order-item">
                                        <p className="item-name"><strong>{item.bookName}</strong> by {item.bookAuthor}</p>
                                        <p className="item-details">Price: ₹{item.bookPrice} | Quantity: {item.quantity}</p>
                                        <p className="order-total">Total Amount: ₹ {item.bookPrice * item.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="order-date">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-orders-message">No orders found in your history.</p>
            )}
        </div>
    )
}

export default History