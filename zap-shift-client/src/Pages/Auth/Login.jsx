import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {


    const {register,handleSubmit,formState:{errors}}=useForm()
    const {signInUser}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()

    const handleLogin=(data)=>{
        signInUser(data.email,data.password)
        .then(result=>{
            console.log(result.user);
            navigate(location?.state || '/')
        })
        .catch(error=>{
            console.log(error);
        })
    }
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-center text-3xl font-bold">Please Login</h3>
      <form  className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
          {errors.email?.type==='required' && <p className="text-red-500">Email is required</p>}
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6})} className="input" placeholder="Password" />
          {errors.password?.type==='minLength' && <p className="text-red-600">Password must be 6 charecter or longer</p>}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to Zap Shift? <Link state={location?.state || '/'} className="text-red-500" to='/register'>Register</Link> </p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Login;
