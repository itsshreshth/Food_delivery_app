import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { CartState } from "../context/CartProvider";
let items = [];

const CartItem = ({ item }) => {
  const { cartitems, setCartitems, price, setPrice, setFoodname, myorder, setMyorder } = CartState();
  const [qty, setQty] = useState(1);
  const updateQty = (action, name, size,id) => {
    if (action == "add") {
      setQty(qty + 1);
      setPrice(price + parseFloat(item.price));
      const updatedCartItems = cartitems.map((item) =>
      (item._id === id && item.size===size)? { ...item, qty: item.qty+1, tprice: parseFloat(item.price+item.tprice)} : item
    );
    setCartitems(updatedCartItems);
    } else {
      if (qty == 1) {
        items = cartitems.filter(
          (item) => !(item.name === name && item.size === size)
        );
        setCartitems(items);
        setFoodname((prevFoodname) => ({
          ...prevFoodname,
          [name]: prevFoodname[name].filter((newsize) => newsize !== size),
        }));
      } else {
        setQty(qty - 1);
        const updatedCartItems = cartitems.map((item) =>
        (item._id === id && item.size===size) ? { ...item, qty: item.qty-1, tprice: parseFloat(item.tprice-item.price)} : item
      );
      setCartitems(updatedCartItems);
      }
      setPrice(price - parseFloat(item.price));
    }
  };
 
  // console.log(myorder);
  useEffect(() => {
    items = cartitems;
  }, [qty, items]);
  return (
    <div className="w-full p-1 rounded-lg px-2 bg-cartItem flex items-center gap-3">
      <img src={item.img} className="w-20 h-20 max-w-[60px]" alt="" />
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item.name}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          ₹ {item.tprice}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item.name, item.size,item._id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <p className="w-12 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.size}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item.name, item.size,item._id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
