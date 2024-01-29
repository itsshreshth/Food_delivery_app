import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import axios from 'axios';
const Myorder = () => {
    const [order, setOrder] = useState([{}]);
    let user = JSON.parse(localStorage.getItem("USER"));
    if (user) user = user.email;
    const getorders = async () => {
        try {
            let email = user;
            let { data } = await axios.post("https://food-delivery-bphm.onrender.com/api/getorder",
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

            setOrder(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getorders();
    }, []);
    return (
        <div className='min-h-[85vh]'>
            {order.orders ? (
                order.orders.order_data
                    .slice(0)
                    .reverse()
                    .map((item, index) => (
                        <div key={index} className="">
                            {item.map((arrayData, index) => (
                                <div>
                                    {(arrayData.Order_date || arrayData.Order_amount) ? <div>
                                        <div className="flex">
                                            {arrayData.Order_date && <div>{arrayData.Order_date}</div>}
                                            {arrayData.Order_amount && <div className="ml-auto">
                                                <p>
                                                    <span className="text-textColor font-bold">Total Amount:</span>
                                                    <span className="text-base text-red-500">₹{" "}</span>{arrayData.Order_amount}
                                                </p>
                                            </div>}
                                        </div></div> : <div></div>}
                                </div>
                            ))}
                            <div className="w-full flex items-center gap-3 bg-rowBg scroll-smooth overflow-x-scroll scrollbar-none">
                                {item.map((arrayData, index) => (
                                    <div>
                                        {(arrayData.Order_date || arrayData.Order_amount) ? <div></div> : <div>
                                            <div key={index} className="w-275 h-[200px] min-w-[275px] md:w-300 md:min-w-[400px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                                                <div className="w-full flex items-center justify-between">
                                                    <motion.div whileHover={{ scale: 1.2 }} className="w-40 h-40 -mt-8 drop-shadow-2xl">
                                                        <img src={arrayData.img} alt="" className="w-40 h-full object-contain" />
                                                    </motion.div>
                                                </div>
                                                <div className="w-full flex flex-col items-end justify-end -mt-10 gap-1">
                                                    <p className="text-textColor font-semibold text-base md:text-lg">{arrayData.name}</p>
                                                   <div className='flex gap-1'>
                                                    <p className="text-textColor ">{arrayData.qty}</p>
                                                   <p className="text-textColor ">{arrayData.size}</p>
                                                   </div>
                                                    <p className="text-lg text-headingColor font-semibold">
                                                        <span className="text-sm text-red-500">₹</span>
                                                        {arrayData.tprice}
                                                    </p>
                                                </div>
                                            </div></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
            ) : (
                ""
            )}
        </div>
        //   <div>
        //      {order.orders ? <div>
        //         abhishek
        //      </div>:<div>
        //         mittal</div>}
        //   </div>
    )
}

export default Myorder