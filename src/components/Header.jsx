import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  console.log("AppContext =>", JSON.stringify(userData))
  return (
    <div className="flex flex-col items-center mt-20 text-gray-800 text-center">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex gap-2 items-center text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}!
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square " />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>

      <p className="mb-8 max-w-md">
        Let’s start with a quick product tour, and we’ll have you up and running
        in no time{" "}
      </p>

      <button className="border border-gray-500 px-8 py-2.5 rounded-full hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
