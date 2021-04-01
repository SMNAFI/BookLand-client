import React, { useEffect, useState } from 'react';
import './Home.css'
import BookCard from '../BookCard/BookCard';
import LinearProgress from '@material-ui/core/LinearProgress';
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
            });
    }, [])

    return (
        <div>
            <div className="search">
                <input type="text" placeholder="Search Book" className="search-field"/>
                <button className="search-btn">Search</button>
            </div>
            {
                books.length === 0 &&
                <div className="progressBar">
                    <LinearProgress color="secondary" />
                </div>
            }
            <div className='home-container'>
                {
                    books.map(book => <BookCard book={book} key={book._id} />)
                }
            </div>
        </div>
    );
};

export default Home;