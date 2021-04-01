import React from 'react';
import { useHistory } from 'react-router';
import './BookCard.css'

const BookCard = props => {
    const { name, imageURL, price, author, _id } = props.book;
    const history = useHistory()
    const handleBuyNow = id => {
        history.push(`/checkout/${id}`);
    }
    return (
        <div className="card-container">
            <img src={imageURL} alt="" />
            <h3>{name}</h3>
            <p>{author}</p>
            <div className="row">
                <h2>{price}</h2>
                <div className="btn">
                    <button className="button-all" onClick={() => handleBuyNow(_id)}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;