import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {

  const [cartDetail, setCartDetail] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [unit, setUnit] = useState(1);

  const fetchCartDetails = async (req, res) => {
    try {
      const response = await axios.get(`http://localhost:1000/api/users/fetch-cart-details/${user._id}`)
      const cartQuantity = response.data.cart.map(book => ({
        ...book,
        quantity : book.quantity || 1
      }))
      // console.log(response.data.cart);
      setCartDetail(cartQuantity);
    } catch (error) {
      // console.log("Can't Fetch Cart Details", error);
    }
  }

  useEffect(()=>{
    fetchCartDetails();
  }, []);

  const quantities = [1,2,3,4,5,6,7,8,9,10];

  const handleQuantityChange = (bookId, quantity) => {
    const updatedCart = cartDetail.map(book =>
      book._id === bookId ? {...book , quantity : parseInt(quantity)} : book
    )
    setCartDetail(updatedCart);
  }

  const handlePlaceOrder = async () => {

    const orderPayload = {
        user : {
          userId : user._id,
          username : user.username,
          email : user.email,
          address : user.address
        },

        items : cartDetail.map((book) => ({
          bookId : book._id,
          bookName : book.bookName,
          bookAuthor : book.bookAuthor,
          bookPrice : book.bookPrice,
          quantity : book.quantity,
        })),

        status : "Order Placed"
      }
    const response = await axios.post("http://localhost:1000/api/orders/place-order", orderPayload);
    // console.log(response.data);
    setCartDetail([])
    alert("Order Placed")
  }

  const removeCurrentCartItem = async (userId, bookId) => {
    const response = await axios.post("http://localhost:1000/api/users/remove-from-cart", {userId, bookId});
    // console.log(response.data);
    fetchCartDetails();
  }

  return (
    <div className="cart-container">
    <h1>Your Cart</h1>
  
    <div className="cart-grid">
      {cartDetail.map(book => (
        <div key={book._id} className="cart-item">
          <img src={book.bookURL} alt={book.bookName} className="cart-item-img" />
          <div className="cart-item-info">
            <h2 className="cart-item-title">{book.bookName}</h2>
            <p className="cart-item-author">{book.bookAuthor}</p>
            <p className="cart-item-price">₹{book.bookPrice}</p>

            <div className="cart-item-actions">
              <select className="select-quantity"
                value={book.quantity}
                onChange={(e) => handleQuantityChange(book._id, e.target.value)}
              >
                {quantities.map(quantity => (
                  <option key={quantity} value={quantity}>{quantity}</option>
                ))}
              </select>
              <button className="remove-cart-button" onClick={() => removeCurrentCartItem(user._id, book._id)}>Remove From Cart</button>
            </div>
            <div>
              <h3>Total Price : {book.bookPrice * book.quantity}</h3>
            </div>
          </div>
        </div>
  
      ))}
    </div>

      {
      cartDetail.length !== 0 ? 
        (
        <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
        )
      :
        (
          <p>Your cart is empty</p>
        )
      }
    </div>
  )
}

export default Cart