import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import Rowcontainer from "./RowContainer";

const MenuContainer = ({fooditems,scrollValue}) => {
  const [filter, setfilter] = useState("fruits");
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot and Cold Dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.7 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParaName ? "bg-cartNumbg" : "bg-white"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col hover:bg-cartNumbg gap-3 items-center justify-center`}
                onClick={() => setfilter(category.urlParaName)}
              >
                <div
                  className={`w-10 h-10  rounded-full shadow-lg ${
                    filter === category.urlParaName
                      ? "bg-white"
                      : "bg-cartNumbg"
                  } group-hover:bg-white flex items-center justify-center `}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParaName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg `}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParaName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <Rowcontainer
            data={fooditems.filter((n) => n.CategoryName === filter)}
            scrollValue={scrollValue}
            flag={false}
          /> 
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
