import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('https://fast-escarpment-67839.herokuapp.com/getOrder?email=' + loggedInUser.email)
            .then(function (response) {
                setOrders(response.data);
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
                orders.map(order => {
                    return (
                        <div>
                            <h3>Book name: {order.name}</h3>
                            <p>Price: {order.price}</p>
                            <p>Order Time: {order.orderTime}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Orders;