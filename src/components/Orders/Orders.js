import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Order.css'

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [haveOrders, setHaveOrders] = useState(true);
    useEffect(() => {
        axios.get('https://fast-escarpment-67839.herokuapp.com/getOrder?email=' + loggedInUser.email)
            .then(function (response) {
                setOrders(response.data);
                if(!response.data.length) {
                    setHaveOrders(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }, [])
    
    return (
        <div>
            <h1>Order History</h1>
            {
                !haveOrders &&
                <div style={{ textAlign: 'center' }}>
                    <h1>You haven't ordered anything yet.</h1>
                </div>
            }
            {
                orders.length !== 0 &&
                <div className='order-container'>
                    <div className="order-row order-header">
                        <h3>Description</h3>
                        <h3>Quantity</h3>
                        <h3>Price</h3>
                        <h3>Order Time</h3>
                        <h3>Status</h3>
                    </div>
                    {
                        orders.map(order => {
                            return (
                                <div className="order-row">
                                    <h5>{order.name}</h5>
                                    <h5>1</h5>
                                    <h5>{order.price}</h5>
                                    <h5>{new Date(order.orderTime).toDateString('dd/MM/yyyy')}</h5>
                                    <h5>Processing</h5>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
};

export default Orders;