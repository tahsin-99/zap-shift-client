import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
const Navbar = () => {
  const {user,logOut}=useAuth()
  const handleLogout=()=>{
    logOut()
    .then()
    .catch(error=>{
      error
    })
  }
  const links = (
    <>
      <div className="flex flex-row gap-4 font-bold">
        <NavLink to="">Home</NavLink>
        <NavLink to="">Services</NavLink>
        <NavLink to="/coverage">Coverage Areas</NavLink>
        <NavLink to="/send-parcel">Send Parcel</NavLink>

        {
          user &&<>
          <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
          <NavLink to="/rider">Be a Rider</NavLink>
          <NavLink to='/dashboard'>DashBoard</NavLink>
          </>
        }
      </div>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow  "
          >
            {links}
          </ul>
        </div>
        <Link to='/'>
        <div className="flex items-center">
          <img src={logo} alt="" />
          <h3 className="text-3xl font-bold -ms-2.5">Zapshift</h3>
        </div></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {
          user ? <p onClick={handleLogout} className="btn">Logout</p>:<Link to='/login'><p className="btn">Login</p></Link>
        }
        <Link to='/rider'><p className="btn btn-primary text-black mx-4">Be a Rider</p></Link>
      </div>
    </div>
  );
};

export default Navbar;
