import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { FaSearchengin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { MdHome } from "react-icons/md";
import { Routes, Route } from "react-router-dom";
import { Projects, SignUp } from "../container";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";

const Home = () => {
  const [isSideMenu, setIsSideMenu] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.4]"
        } min-h-screen max-h-screen  relative bg-secondary px-3 py-6 flex
         flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out `}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary  rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>
        <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={"/home"}>
            <img src={Logo} alt="logo" className="object-contain w-64 h-auto" />
          </Link>
          <Link to={"/newProject"}>
            <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
              <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                Start Coding
              </p>
            </div>
          </Link>
          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-6"
            >
              <MdHome className="text-primaryText text-xl" />
              <p className="text-lg text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
        {/* Top Section */}
        <div className="w-full flex items-center justify-between gap-3">
          {/* Search */}
          <div className="bg-secondary w-full px-4 py-3 rounded-md flex justify-center items-center gap-3">
            <FaSearchengin className="text-2xl text-primaryText" />
            <input
              type="text"
              value={searchTerm}
              className="flex-1 px-4 py-1 text-xl bg-transparent
            outline-none border-none text-primaryText
            placeholder:text-gray-600"
              placeholder="Searh codepens..."
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
            />
          </div>
          {/* Profile Section */}
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 hover:bg-emerald-700 cursor-pointer text-white px-6 py-2 rounded-md"
              >
                SignUp
              </Link>
            </motion.div>
          )}
          {user && <UserProfileDetails />}
        </div>
        {/* Bottom Section */}
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
