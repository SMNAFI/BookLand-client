import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTasks, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';
import axios from 'axios';

const Admin = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data => {
        const newBook = {
            name: data.name,
            author: data.author,
            price: data.price,
            imageURL: imageURL
        }

        axios.post('https://fast-escarpment-67839.herokuapp.com/addBook', newBook)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleImageUpload = event => {
        const bookData = new FormData();
        bookData.set('key', '571346f6e8a7d61c4cf8cce645fbf09c');
        bookData.append('image', event.target.files[0])
        console.log(bookData);

        axios.post('https://api.imgbb.com/1/upload', bookData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


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

    const handleDelete = id => {       
        fetch('https://fast-escarpment-67839.herokuapp.com/delete?id='+id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
        })
    }

    return (
        <div>
            <div className="admin-container">
                <div className="sidebar">
                    <p><FontAwesomeIcon icon={faTasks} /> Manage Book</p>
                    <p><FontAwesomeIcon icon={faPlus} /> Add Book</p>
                    <p><FontAwesomeIcon icon={faEdit} /> Edit Book</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                        <div>
                            <p>Book Name</p>
                            <input name="name" placeholder="Enter Name" ref={register({ required: true })} />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>
                        <div>
                            <p>Author Name</p>
                            <input name="author" placeholder="Enter Name" ref={register({ required: true })} />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>
                        <div>
                            <p>Add Price</p>
                            <input name="price" placeholder="Enter Price" ref={register({ required: true })} />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>
                        <div>
                            <p>Add Price</p>
                            <input type="file" onChange={handleImageUpload} />
                            {/* {errors.exampleRequired && <span>This field is required</span>} */}
                        </div>
                        <div></div>
                        <div>
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="manage-container">
                <div className="manage-row">
                    <h3>Book Name</h3>
                    <h3>Author Name</h3>
                    <h3>Price</h3>
                    <h3>Action</h3>
                </div>
                {
                    books.map(book => {
                        return (
                            <div className="manage-row">
                                <h3>{book.name}</h3>
                                <h3>{book.author}</h3>
                                <h3>{book.price}</h3>
                                <div>
                                    <button className="edit-icon">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className='delete-icon' onClick={() => handleDelete(book._id)}>
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

export default Admin;