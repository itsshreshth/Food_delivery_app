import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { CartState } from "../context/CartProvider";

const Rowcontainer = ({ data, scrollValue, flag }) => {
  const rowContainer = useRef();
  const { cartitems, setCartitems, foodname, setFoodname, price, setPrice } =
    CartState();
  const [sizes, setSizes] = useState({}); // Store sizes for each item

  useEffect(() => { }, [foodname, sizes]);

  const Addtocart = (item) => {
    let value = sizes[item._id] || Object.keys(item.option)[0]; // Get the size for this item from the state or use the first option

    if (item.name in foodname && foodname[item.name].includes(value)) {
      return;
    } else {
      if (item.name in foodname) {
        setFoodname((prevFoodname) => ({
          ...prevFoodname,
          [item.name]: [...prevFoodname[item.name], value],
        }));
      } else {
        setFoodname((prevFoodname) => ({
          ...prevFoodname,
          [item.name]: [value],
        }));
      }

      let newitem = {
        _id: item._id,
        img: item.img,
        name: item.name,
        size: value,
        price: item.option[value],
        tprice: item.option[value],
        qty: 1,
      };
      if (newitem.size.includes("kg")) newitem.size = "kg";
      if (newitem.size.includes("piece")) newitem.size = "piece";

      setPrice(price + parseFloat(newitem.price));
      setCartitems((prevCartitems) => [...prevCartitems, newitem]);
    }
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center my-12 gap-3 bg-rowBg scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => {
          const value = sizes[item._id] || Object.keys(item.option)[0]; // Get the size for this item from the state or use the first option

          return (
            <div
              key={item?.id}
              className=" w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
            >
              <div className="w-full flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-40 h-40 -mt-8 drop-shadow-2xl"
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-40 h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-md"
                  onClick={() => Addtocart(item)}
                >
                  <MdShoppingBasket className="text-white " />
                </motion.div>
              </div>
              <div className="w-full flex flex-col items-end justify-end -mt-8">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.name}
                </p>
                {Object.keys(item.option).length === 1 ? (
                  <p>{Object.keys(item.option)[0]}</p>
                ) : (
                  <select
                    name=""
                    id=""
                    className="bg-transparent outline-none"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSizes((prevSizes) => ({
                        ...prevSizes,
                        [item._id]: value,
                      }));
                    }}
                    value={value}
                  >
                    {Object.keys(item.option).map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                )}
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">₹</span>
                    {value === ""
                      ? Object.values(item.option)[0]
                      : item.option[value]}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="" className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default Rowcontainer;
