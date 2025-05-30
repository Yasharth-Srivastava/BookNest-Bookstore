import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Favorite from '../../assets/Favorite.png';
import redHeart from '../../assets/red-Heart.webp';
import shoppingCart from '../../assets/shopping-cart.png';
import addedToCart from '../../assets/added-to-cart.png';
import './BookDetail.css';

const BookDetail = () => {

  const [bookDetail, setBookDetail] = useState([]);
  const {bookName} = useParams();

  const [addFavorite, setaddFavorite] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBookDetail = async () => {
    try{
      const response = await axios.get(`http://localhost:1000/api/books/${bookName}`)
      setBookDetail(response.data);
      // console.log(response.data);
    }catch(error){
      // console.log("Can't Find Details", error)
    }
  }

  useEffect(()=>{
    fetchBookDetail()
  }, [bookName]);

  const handleFavorite = async (userId, bookId) => {
    if(!addFavorite){
      await axios.post("http://localhost:1000/api/users/add-to-favorite", {userId, bookId});
      setaddFavorite(true)
    }
    else{
      await axios.post("http://localhost:1000/api/users/remove-from-favorite", {userId, bookId});
      setaddFavorite(false);
    }
  }

  const addToCart = async (userId, bookId) =>{
    try {
      const response = await axios.post("http://localhost:1000/api/users/add-to-cart", {userId, bookId});
      // console.log("Book Added to cart")
    } catch (error) {
      // console.log("Cant add to cart", error);
    }
  }

  const handleCart = (userId, bookId) => {
    setAddCart(!addCart);
    addToCart(userId, bookId);
  }
 

  if (!bookDetail) return <p>Loading...</p>;

  return (
    <div className="book-detail-container">
      <img src={bookDetail.bookURL} alt={bookDetail.bookName} />
      <div className="book-info">
        {/* <h1>{user._id}</h1>
        <h1>{bookDetail._id}</h1> */}
        <h1>{bookDetail.bookName}</h1>
        <h2>By {bookDetail.bookAuthor}</h2>
        <p><strong>Price:</strong> ₹{bookDetail.bookPrice}</p>
        <p><strong>Description:</strong> {bookDetail.bookDescription}</p>
      </div>
      <div className="book-actions">
        <div className='favorites' onClick={() => handleFavorite(user._id, bookDetail._id)}>
          {!addFavorite ? (
            <img src={Favorite} alt="Add to Favorites" />
          ) : (
            <img src={redHeart} alt="Remove from Favorites" />
          )}
        </div>

        <div className='cart' onClick={() => handleCart(user._id, bookDetail._id)}>
          {!addCart ? (
            <img src={shoppingCart} alt="Add to Cart" />
          ) : (
            <img src={addedToCart} alt="Added to Cart" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
