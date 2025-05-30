import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AllBooksStyle.css';


const AllBooks = () => {
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  const allBooks = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/books/all-books");
      // console.log(response.data);
      setBook(response.data);
    } catch (error) {
      // console.log("Can't add books");
    }
  };

  useEffect(() => {
    allBooks();
  }, []);

  const goToDetails = (bookName) => {
    navigate(`/${bookName}`);
  }

  return (
    <div className='add-books-container'>
      <h1 className='title'>All Books</h1>
      <div className='books-grid'>
        {book.map((books, index) => (
          <div className='book-card' key={index} onClick={()=>goToDetails(books.bookName)}>
            <img src={books.bookURL} alt={books.bookName} />
            <h2>{books.bookName}</h2>
            <h3>By {books.bookAuthor}</h3>
            <p>Price: ₹{books.bookPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
