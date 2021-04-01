import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import './Manage.css'

const Manage = () => {
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

    const handleDelete = (event, id) => {
        const e = event.currentTarget.parentNode.parentNode;
        fetch('https://fast-escarpment-67839.herokuapp.com/delete?id=' + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {    
                    e.style.display = 'none';               
                    alert('Item deleted successfully.')
                }
            })
    }
    return (
        <div>
            <div className="container">
                <h2>Manage Books</h2>
                <div className="manage-row manage-header">
                    <h3>Book Name</h3>
                    <h3>Author Name</h3>
                    <h3>Price</h3>
                    <h3>Action</h3>
                </div>
                {
                    books.length === 0 &&
                    <div className="progressBar">
                        <LinearProgress color="secondary" />
                    </div>
                }
                {
                    books.map(book => {
                        return (
                            <div className="manage-row">
                                <h4>{book.name}</h4>
                                <h4>{book.author}</h4>
                                <h4>{book.price}</h4>
                                <div>
                                    <button className="edit-icon">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className='delete-icon' onClick={e => handleDelete(e, book._id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Manage;