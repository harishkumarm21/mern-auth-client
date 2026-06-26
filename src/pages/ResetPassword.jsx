import React, { useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { backendUrl, isLoggedIn, setIsLoggedIn, getUserData, userData } =
    useApp();
  axios.defaults.withCredentials = true;

  const [isEmailSubmited, setisEmailSubmited] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setisOtpSubmited] = useState(false);

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

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email },
      );

      if (data.success) {
        toast.success(data.message);
        setisEmailSubmited(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");
    setOtp(otp);
    setisOtpSubmited(true);
  };

  const onNewPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-violet-200">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      {!isEmailSubmited && (
        <form
          onSubmit={onEmailSubmit}
          className="bg-slate-900 p-6 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center text-white">
            Reset Password
          </h1>
          <p className="mb-6 text-indigo-200 text-md text-center">
            Enter your registered email address.
          </p>

          <div className="flex items-center gap-4 text-white bg-slate-600 px-4 py-3 rounded-xl mb-6">
            <img src={assets.mail_icon} alt="" className="" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <button className="w-full font-medium bg-linear-to-br from-blue-500 to-violet-500 px-6 py-3 rounded-xl text-white text-lg cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {/* verify otp */}
      {!isOtpSubmited && isEmailSubmited && (
        <form
          onSubmit={onOtpSubmit}
          className="bg-slate-900 p-6 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center text-white">
            Reset password otp
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
          <button className="w-full font-medium bg-linear-to-br from-blue-500 to-violet-500 px-6 py-3 rounded-xl text-white text-lg cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {/* new password */}
      {isEmailSubmited && isOtpSubmited && (
        <form
          onSubmit={onNewPasswordSubmit}
          className="bg-slate-900 p-6 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center text-white">
            New Password
          </h1>
          <p className="mb-6 text-indigo-200 text-md text-center">
            Enter your new password below.
          </p>

          <div className="flex items-center gap-4 bg-slate-600 px-4 py-3 rounded-xl mb-6">
            <img src={assets.lock_icon} alt="" className="" />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="outline-none"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <button className="w-full font-medium bg-linear-to-br from-blue-500 to-violet-500 px-6 py-3 rounded-xl text-white text-lg cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
