import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddBooks.css'; // Import external CSS

const AddBooks = () => {
  const [book, setBook] = useState([]);
  const navigate = useNavigate()

  const addBooks = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/books");
      // console.log(response.data);
      setBook(response.data);
    } catch (error) {
      // console.log("Can't add books");
    }
  };

  useEffect(() => {
    addBooks();
  }, []);

  const goToDetails = (bookName) => {
    navigate(`/${bookName}`);
  }


  return (
    <div className='add-books-container'>
      <h1 className='title'>Recently Added Books</h1>
      <div className='books-grid'>
        {book.map((books, index) => (
          <div className='book-card' key={index} onClick={() => goToDetails(books.bookName)}>
            <img src={books.bookURL} alt={books.bookName} />
            <h2>{books.bookName}</h2>
            <h3>By {books.bookAuthor}</h3>
            <p>Price: ₹{books.bookPrice}</p>
            {/* <p>{books.bookDescription}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBooks;
