import React, { useState } from "react";
import { motion } from "framer-motion";
import { CartState } from "../context/CartProvider";
import { BiSolidLockOpenAlt } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
const Login = () => {
  const { gologin, setGologin,goregister,setGoregister } = CartState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const showlogin = () => {
    setGologin(!gologin);
  };
  const gotoregister=()=>{
    setGoregister(!goregister)
    setGologin(!gologin);
  }
  let submitLogin = async (event) => {
    event.preventDefault();
    let email = user.email;
    let password = user.password;

    const { status, data } = await axios.post(
      "https://food-delivery-bphm.onrender.com/api/users/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (status == 201) {
      Swal.fire("Invalid credentials", "", "error");
    } else if (status == 200) {
      Swal.fire("Login successful", "", "success");
      localStorage.setItem("USER", JSON.stringify(data));
      console.log(data);
      setGologin(!gologin)
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101] "
    >
      <div className="w-full bg-gray-100 flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace
            className="text-textColor text-3xl"
            onClick={showlogin}
          />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center h-full bg-gray-100">
        <form
          className="w-100 rounded-lg grid grid-cols-1 p-4"
          action=""
          onSubmit={submitLogin}
        >
          <h1 className="mb-2 text-5xl"> Login for Your Account</h1>
          <p className="mb-14 text-xl">Enter Your Details to Login.</p>
          <div className=" flex flex-right w-[350px] bg-white border-solid border-2 border-[#ddd] px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <MdOutlineEmail className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              placeholder="Enter Your Email"
              required
              value={user.email}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
            />
          </div>
          <div className=" flex flex-right w-[350px] bg-white border-solid border-2 border-[#ddd] px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <BiSolidLockOpenAlt className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl text-black py-4 px-3 tracking-widest outline-none bg-transparent"
              type="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
          </div>
          <button className="border-solid border-2 bg-red-600 w-28 px-2 py-3 my-4 text-xl font-medium">
            Sign In
          </button>
          <p className=" text-lg">
            Don't have an account ?{" "}
            <span className="text-red-400 hover:cursor-pointer"
            onClick={gotoregister}>
              {" "}
              Register
            </span>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
