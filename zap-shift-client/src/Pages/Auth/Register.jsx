import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure()

  const handleRegistration = (data) => {
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        
        // store the image and get the
        const formData = new FormData();
        formData.append("image", profileImage);

        const imageAPIURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios
          .post(imageAPIURL, formData)

          .then((res) => {
            const photoURL= res.data.data.url

            // creat user in database
            const userInfo={
              email:data.email,
              displayName:data.name,
              photoURL:photoURL
            }
              axiosSecure.post('/users',userInfo)
            .then(res=>{
              if(res.data.insertId){
                console.log('user created in the database');
              }
            })
            // update profile
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL
            };
            updateUserProfile(userProfile)
              .then(() => {
                console.log("User profile updated done");
                navigate(location?.state || "/");
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl"'>
      <h3 className="text-center text-3xl font-bold">Register</h3>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-600">Photo is required</p>
          )}

          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Name is required</p>
          )}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=])[A-Za-z\d!@#$%^&*()_+\-=]{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password Must have al least one upper case one lower case,one
              number and one special charecter
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
            state={location?.state || "/"}
            className="text-red-500"
            to="/login"
          >
            login
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
