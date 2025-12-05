import React from 'react';
import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';

const reviewsPromise =fetch('/public/reviews.json').then(res=>res.json())

const Home = () => {
    return (
        <div>
            This is home
             <Banner></Banner>
             <Brands></Brands>
             <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
       
    );
};

export default Home;