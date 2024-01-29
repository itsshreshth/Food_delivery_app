import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import MenuContainer from "./MenuContainer";
import Rowcontainer from "./RowContainer";
import axios from "axios";
import { CartState } from "../context/CartProvider";
import CartContainer from "./CartContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Login from "./Login";
import Register from"./Register";
const MainContainer = () => {
  const {goregister,gologin } = CartState();
  const [data, setData] = useState([]);
  const getItems = async () => {
    let { data } = await axios.get("https://food-delivery-bphm.onrender.com/api");
    setData(data.cartitems);
  };
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {
    getItems();
  }, [scrollValue]);
  const { cartshow } = CartState();
  return (
    <div>
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center ">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(+200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <Rowcontainer
          scrollValue={scrollValue}
          flag={true}
          data={data.filter((n) => n.CategoryName === "fruits")}
        />
      </section>
      <MenuContainer fooditems={data} scrollValue={scrollValue} />
      {cartshow && <CartContainer />}
      {gologin && <Login />}
      {goregister &&<Register/>}
    </div>
  );
};

export default MainContainer;
