import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Checkout.css';

const Checkout = () => {
    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        axios.get('https://fast-escarpment-67839.herokuapp.com/getBook?id=' + id)
            .then(function (response) {
                setBookInfo(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }, [])

    const handleCheckOut = () => {
        const orderDetail = { ...loggedInUser, ...bookInfo, orderTime: new Date() };
        axios.post('https://fast-escarpment-67839.herokuapp.com/addOrder', orderDetail)
            .then(function (response) {
                if(response.data) {
                    alert('Book added successfully.')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (

        <div>
            <h1>Checkout</h1>
            {

                Object.keys(bookInfo).length === 0 &&
                <div className="progressBar">
                    <LinearProgress color="secondary" />
                </div>
            }
            {
                Object.keys(bookInfo).length !== 0 &&
                <div>
                    <div className='checkout-container'>
                        <div className="checkout-row">
                            <h3>Description</h3>
                            <h3>Quantity</h3>
                            <h3>Price</h3>
                        </div>
                        <div className="checkout-row">
                            <h4>{bookInfo.name}</h4>
                            <h4>1</h4>
                            <h4>{bookInfo.price}</h4>
                        </div>
                        <div className="checkout-row" style={{ border: 'none' }}>
                            <h3>Total</h3>
                            <div></div>
                            <h3>{bookInfo.price}</h3>
                        </div>

                    </div>
                    <button className="button-all" onClick={handleCheckOut} >Checkout</button>
                </div>
            }
        </div>
    );
};

export default Checkout;