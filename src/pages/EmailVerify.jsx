import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const inputRefs = useRef([]);
  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData, userData } =
    useApp();
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace" && e.target.value == "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    e.preventDefault();
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      console.log("otp = >", otp);

      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        {
          otp,
        },
      );
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [setIsLoggedIn, userData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-violet-200">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-6 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-2xl font-semibold mb-4 text-center text-white">
          Email Verify Otp
        </h1>
        <p className="mb-6 text-indigo-200 text-md text-center">
          Enter the 6-digit code send to your email id.
        </p>
        <div
          className="flex justify-between mb-6"
          onPaste={(e) => handlePaste(e)}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 bg-gray-600 rounded-lg text-white font-medium text-center text-xl"
              />
            ))}
        </div>
        <button className="font-medium w-full bg-linear-to-br from-blue-500 to-violet-500 px-6 py-3 rounded-2xl text-white text-lg cursor-pointer">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
