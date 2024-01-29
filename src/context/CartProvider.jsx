import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
const cartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartshow, setCartshow] = useState(false);
  const [foodname, setFoodname] = useState({});
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [cartitems, setCartitems] = useState([]);
  const[goregister,setGoregister]=useState(false);
  const[gologin,setGologin]=useState(false);
// console.log(myorder);
  return (
    <>
      <cartContext.Provider
        value={{
          cartshow,
          setCartshow,
          cartitems,
          setCartitems,
          category,
          setCategory,
          price,
          setPrice,
          foodname,
          setFoodname,
          goregister,
          setGoregister,
          gologin,
          setGologin,
       }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
};

export const CartState = () => {
  return useContext(cartContext);
};

export default CartProvider;
