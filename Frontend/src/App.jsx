import React from 'react';
import Home from './pages/Home/Home';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register/Register';
import AllBooks from './components/AllBooks/AllBooks'
import BookDetail from './components/BookDetail/BookDetail';
import Login from './pages/Login/Login';
import Favorite from './pages/Favorite/Favorite';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Contact from './pages/Contact/Contact';
import History from './pages/History/History';
import './App.css';

const App = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/all-books' element={<AllBooks />} />
            <Route path='/:bookName' element={<BookDetail />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element = {<About />}/>
            <Route path='/contact' element = {<Contact />} />
            <Route path='/history' element = {<History />} />
        </Routes>
        <Footer />
    </>
  );
};

export default App;
