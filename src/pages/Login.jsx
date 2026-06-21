import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const isSignUp = state === "Sign Up";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-violet-200">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h1 className="text-3xl font-semibold mb-3 text-center">
          {isSignUp ? "Create Account" : "Login"}
        </h1>
        <p className="text-center mb-6">
          {isSignUp ? "Create your account" : "Login to your account"}
        </p>
        <form action="" className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex items-center gap-4 bg-slate-600 px-4 py-3 rounded-xl">
              <img src={assets.person_icon} alt="" className="" />
              <input
                className="outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-4 bg-slate-600 px-4 py-3 rounded-xl">
            <img src={assets.mail_icon} alt="" className="" />
            <input
              className="outline-none"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <div className="flex items-center gap-4 bg-slate-600 px-4 py-3 rounded-xl">
            <img src={assets.lock_icon} alt="" className="" />
            <input
              className="outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p className="text-indigo-400 cursor-pointer text-center">
            Forgot password?
          </p>

          <button className="font-medium bg-linear-to-br from-blue-500 to-violet-500 px-6 py-3 rounded-xl text-white text-lg cursor-pointer">
            {state}
          </button>
        </form>
        {isSignUp ? (
          <p className="text-center mt-4">
            Already have an account?{" "}
            <span onClick={()=> setState("Login")} className="text-indigo-400 underline cursor-pointer">
              Login Here
            </span>
          </p>
        ) : (
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <span  onClick={()=> setState("Sign Up")} className="text-indigo-400 underline cursor-pointer">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
