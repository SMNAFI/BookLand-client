import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const Checkout = () => {
    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);  
    useEffect(() => {
        axios.get('https://fast-escarpment-67839.herokuapp.com/getBook?id=' + id)
            .then(function (response) {
                console.log(response.data);
                setBookInfo(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }, [])

    const handleCheckOut = () => {
        const orderDetail = {...loggedInUser, ...bookInfo, orderTime: new Date()};
        console.log(orderDetail);
        axios.post('https://fast-escarpment-67839.herokuapp.com/addOrder', orderDetail)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
            <h3>{bookInfo.name}</h3>
            <h5>{bookInfo.price}</h5>
            <button onClick={handleCheckOut}>Checkout</button>
        </div>
    );
};

export default Checkout;