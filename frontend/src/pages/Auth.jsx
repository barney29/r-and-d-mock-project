import { TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const initialFormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [formData, setFormData] = useState(initialFormState);
  // check login or sign up
  const [isLogin, changePage] = useState(true);

  const handleChangeFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="grid grid-cols-2 h-screen">
      <img src="pro.svg" alt="Professional" className="h-screen" />
      <div className="flex-col space-y-20 mt-40">
        {isLogin ? (
          <>
            {" "}
            <div>
              <h2 className="font-bold text-xl">Sign in to your account</h2>
              <p className="font-extralight w-1/2 mt-5">
                Enter your email and password below to access your account.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5 w-1/2"
            >
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                onChange={handleChangeFormData}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                name="password"
                variant="outlined"
                onChange={handleChangeFormData}
              />
              <button
                type="submit"
                className="bg-green-400 text-white pt-4 pb-4 rounded-xl font-bold hover:bg-orange-600"
              >
                Login
              </button>
              <p className="font-extralight">
                Don't have account?
                <NavLink
                  className="text-orange-600 underline font-bold ml-2"
                  onClick={() => {
                    changePage(false);
                    setFormData(initialFormState);
                  }}
                >
                  create account
                </NavLink>
              </p>
            </form>{" "}
          </>
        ) : (
          <>
            <div>
              <h2 className="font-bold text-xl">Create your account</h2>
              <p className="font-extralight w-1/2 mt-1">
                Enter your details below to create an account
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5 w-1/2"
            >
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="first_name"
                onChange={handleChangeFormData}
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                name="last_name"
                variant="outlined"
                onChange={handleChangeFormData}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                onChange={handleChangeFormData}
              />
              <TextField
                id="outlined-basic"
                label="Phone number"
                name="phone_number"
                variant="outlined"
                onChange={handleChangeFormData}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                name="password"
                variant="outlined"
                onChange={handleChangeFormData}
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                name="confirmPassword"
                variant="outlined"
                onChange={handleChangeFormData}
              />
              <button
                type="submit"
                className="bg-green-400 text-white pt-4 pb-4 rounded-xl font-bold hover:bg-orange-600"
              >
                Login
              </button>
              <p className="font-extralight">
                you already have account?
                <NavLink
                  className="text-orange-600 underline font-bold ml-2"
                  onClick={() => {
                    changePage(true);
                    setFormData(initialFormState);
                  }}
                >
                  Login
                </NavLink>
              </p>
            </form>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
