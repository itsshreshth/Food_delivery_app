import React, { useState } from "react";
import { motion } from "framer-motion";
import { CartState } from "../context/CartProvider";
import { BiSolidLockOpenAlt } from "react-icons/bi";
import { MdOutlineEmail, MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaRegAddressCard, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
const Signup = () => {
    const {goregister,setGoregister,gologin,setGologin} = CartState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const showregister=()=>{
    setGoregister(!goregister);
  }
  const gotologin=()=>{
    setGoregister(!goregister);
      setGologin(!gologin)
  }
  let submitRegistration = async (event) => {
    event.preventDefault();
    let name = user.name;
    let email = user.email;
    let address = user.address;
    let password = user.password;

    const { status } = await axios.post(
      "https://food-delivery-bphm.onrender.com/api/users/register",
      { name, email, password ,address},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (status == 201) {
      Swal.fire("User already exists", "", "error");
      return;
    } else if (status == 200) {
      Swal.fire("Registration successful", "", "success");
      gotologin();
    }
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen  bg-white drop-shadow-md flex flex-col z-[101] "
    >
      <div className="w-full bg-gray-100 flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace
            className="text-textColor text-3xl"
            onClick={showregister}
          />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center h-full bg-gray-100">
        <form
          className="w-100 rounded-lg grid grid-cols-1 p-4"
          action=""
          onSubmit={submitRegistration}
        >
          <h1 className="mb-2 text-5xl"> Register for Your Account</h1>
          <p className="mb-14 text-xl">Enter Your Details to Register.</p>
          <div className=" flex flex-right w-[350px] bg-white border-solid border-2 border-[#ddd]  px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <FaUserAlt className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              placeholder="Enter Your Name"
              required
              value={user.name}
              onChange={(event) =>
                setUser({ ...user, name: event.target.value })
              }
            />
          </div>
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
              <FaRegAddressCard className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-lg py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              required
              placeholder="Address"
              value={user.address}
              onChange={(event) =>
                setUser({ ...user, address: event.target.value })
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
          <div>
            <input
              type="submit"
              className="border-solid border-2 bg-red-600 w-28 px-2 py-3 my-4 text-xl font-medium cursor-pointer "
              value="Register"
            />
          </div>
          <p className=" text-lg">
            Already have an account ?{" "}
            <span className="text-red-400 hover:cursor-pointer"
            onClick={gotologin}>
              {" "}
              Login
            </span>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
