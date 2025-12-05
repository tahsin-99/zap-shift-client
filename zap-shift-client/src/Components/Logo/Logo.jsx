import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
       <Link to='/'>
        <div className='flex items-center'>
            <img src={logo} alt="" />
            <h3 className="text-3xl font-bold -ms-2.5">Zapshift</h3>
        </div>
       </Link>
    );
};

export default Logo;