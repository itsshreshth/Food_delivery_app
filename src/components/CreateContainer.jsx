import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import axios from "axios";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  // const [size, setSize] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [half, setHalf] = useState("");
  const [full, setFull] = useState("");
  const [regular, setRegular] = useState("");
  const [medium, setMedium] = useState("");
  const [large, setLarge] = useState("");
  const [perkg, setPerkg] = useState("");
  const [perpiece, setPerpiece] = useState("");
  const uploadImage = (pic) => {
    setIsLoading(true);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Fooddelivery");
      data.append("cloud_name", "dhy70hewh");
      fetch("https://api.cloudinary.com/v1_1/dhy70hewh/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          setImageAsset(data.url.toString());
          setFields(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
    } else {
      setMsg("Please Upload a image in jpg or png form");
      setFields(true);
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };
  const deleteImage = () => {
    setImageAsset(null);
    setIsLoading(false);
    setFields(true);
    setMsg("Image deleted successfully");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
    }, 4000);
  };
  const saveDetails = async (event) => {
    event.preventDefault();
    let option;
    if (
      category === "chicken" ||
      category === "curry" ||
      category === "fish" ||
      category === "rice"
    ) {
      option = {
        Half: half,
        Full: full,
      };
    } else if (category == "pizza") {
      option = {
        Regular: regular,
        Medium: medium,
        Large: large,
      };
    } else if (category == "fruits") {
      option = {
        Perkg: perkg,
      };
    } else if (category === "icecreams" || category === "softdrinks") {
      option = {
        Perpiece: perpiece,
      };
    }
    let CategoryName = category;
    let name = title;
    let img = imageAsset;
    console.log(title);
    const { status } = await axios.post(
      "https://food-delivery-bphm.onrender.com/api/additem",
      { CategoryName, name, img, option },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (status === 200) {
      setIsLoading(false);
      setFields(true);
      setMsg("Data uploaded successfully");
      // clearData();
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    } else {
      setFields(true);
      setMsg("Error while uploading:Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCategory("Select Category");
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 p-4 rounded-lg flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParaName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>{" "}
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={(e) => uploadImage(e.target.files[0])}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 bg-red-500 rounded-full outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full py-2 border-gray-300 flex items-center gap-2">
          {(category === "chicken" ||
            category === "curry" ||
            category === "fish" ||
            category === "rice") && (
            <div className="grid gap-2">
              <label htmlFor="" className="flex gap-2">
                Half
                <input
                  type="text"
                  required
                  value={half}
                  onChange={(e) => {
                    setHalf(e.target.value);
                  }}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
              <label htmlFor="" className="flex gap-2">
                Full
                <input
                  type="text"
                  required
                  value={full}
                  onChange={(e) => setFull(e.target.value)}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
            </div>
          )}
          {category === "pizza" && (
            <div className="grid gap-2">
              <label htmlFor="" className="flex gap-2">
                Regular
                <input
                  type="text"
                  required
                  value={regular}
                  onChange={(e) => setRegular(e.target.value)}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
              <label htmlFor="" className="flex gap-2">
                Medium
                <input
                  type="text"
                  required
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
              <label htmlFor="" className="flex gap-2">
                Large
                <input
                  type="text"
                  required
                  value={large}
                  onChange={(e) => setLarge(e.target.value)}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
            </div>
          )}
          {category === "fruits" && (
            <div className="">
              <label htmlFor="" className="flex gap-2">
                PerKg
                <input
                  type="text"
                  required
                  value={perkg}
                  onChange={(e) => setPerkg(e.target.value)}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
            </div>
          )}
          {(category === "icecreams" || category === "softdrinks") && (
            <div>
              <label htmlFor="" className="flex gap-2">
                PerPiece
                <input
                  type="text"
                  required
                  value={perpiece}
                  onChange={(e) => setPerpiece(e.target.value)}
                  placeholder="price"
                  className="w-full h-full text-lg outline-none bg-transparent border-none placeholder:text-gray-400 text-textColor"
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
