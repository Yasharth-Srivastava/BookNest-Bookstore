import react from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import AddBooks from '../../components/AddBooks/AddBooks'
import ShortAbout from '../ShortAbout/ShortAbout';

const Home = () =>{
    return(
        <div>
            <Hero />
            <ShortAbout />
            <AddBooks />
        </div>
    )
}

export default Home;