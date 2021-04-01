import React, { useEffect, useState } from 'react';
import './Home.css'
import BookCard from '../BookCard/BookCard';
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('https://fast-escarpment-67839.herokuapp.com/getAllBooks')
            .then(function (response) {
                setBooks(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    return (
        <div className='home-container'>
            {
                books.map(book => <BookCard book={book} key={book._id} />)
            }
        </div>
    );
};

export default Home;