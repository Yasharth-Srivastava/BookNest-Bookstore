import React from 'react';
import axios from 'axios';
import './Favorite.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Favorite = () => {
    const [favorite, setFavorite] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const fetchFavoriteBooks = async () =>{
        try {
            const response = await axios.get(`http://localhost:1000/api/users/fetch-favorite/${user._id}`)
            setFavorite(response.data.favorite);
            // console.log(response.data.favorite);
        } catch (error) {
            // console.log("Error in Frontend", error);
        }
    }

    useEffect(()=>{
        fetchFavoriteBooks()
    }, [])

    const handleRemoveFavorite = async (userId, bookId) => {
      await axios.post("http://localhost:1000/api/users/remove-from-favorite", {userId, bookId});
      fetchFavoriteBooks();
    }

    const goToDetails = (bookName) => {
      navigate(`/${bookName}`);
    }

  return (
    <div className="favorites-container">
      <h1>Your Favorite Books</h1>
      <div className="books-grid">
        {favorite.map(book => (
            <div key={book._id} className="book-card" onClick={()=>goToDetails(book.bookName)}>
                <img src={book.bookURL} alt={book.bookName} />
                <h2>{book.bookName}</h2>
                <p>{book.bookAuthor}</p>
                <p>₹{book.bookPrice}</p>
                <button onClick={() => handleRemoveFavorite(user._id, book._id)}>Remove From Favorite</button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Favorite