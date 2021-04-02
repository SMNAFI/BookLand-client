import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTasks } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';
import axios from 'axios';
import Manage from '../Manage/Manage';

const Admin = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [isAddActive, setIsAddActive] = useState(true);
    const onSubmit = data => {
        const newBook = {
            name: data.name,
            author: data.author,
            price: data.price,
            imageURL: imageURL
        }
        axios.post('https://fast-escarpment-67839.herokuapp.com/addBook', newBook)
            .then(function (response) {
                if (response) {
                    alert('Book added successfully.')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleImageUpload = event => {
        alert('Please wait few seconds. There will be another pop-up after image is uploaded.')
        const bookData = new FormData();
        bookData.set('key', '571346f6e8a7d61c4cf8cce645fbf09c');
        bookData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', bookData)
            .then(function (response) {
                alert('Image uploaded successfully. You can submit your data now.')
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="admin-container">
            <div className="sidebar">
                <p onClick={() => setIsAddActive(false)}><FontAwesomeIcon icon={faTasks} /> Manage Book</p>
                <p onClick={() => setIsAddActive(true)}><FontAwesomeIcon icon={faPlus} /> Add Book</p>
                <p><FontAwesomeIcon icon={faEdit} /> Edit Book</p>
            </div>
            {
                isAddActive &&
                <div className="container">
                    <h2>Add Book</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                        <div>
                            <p>Book Name</p>
                            <input name="name" placeholder="Enter Name" ref={register({ required: true })} className="input-field" />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>
                        <div>
                            <p>Author Name</p>
                            <input name="author" placeholder="Enter Name" ref={register({ required: true })} className="input-field" />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>
                        <div>
                            <p>Add Price</p>
                            <input name="price" placeholder="Enter Price" ref={register({ required: true })} className="input-field" />
                            {errors.exampleRequired && <span>This field is required</span>}
                        </div>
                        <div>
                            <p>Add Book Cover Photo</p>
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <input type="submit" className="button-all" />
                        </div>
                    </form>
                </div>
            }
            {
                !isAddActive && <Manage />
            }
        </div>
    );
};

export default Admin;