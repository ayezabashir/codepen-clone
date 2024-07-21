import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const UserAuthInput = ({
  label,
  placeHolder,
  isPass,
  key,
  setStateFunction,
  Icon,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);
  };
  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96
        rounded-md px-4 py-1 bg-gray-200 `}
      >
        <Icon className="text-text555 text-2xl" />
        <input
          type={isPass && showPass ? "password" : "text"}
          placeholder={placeHolder}
          className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-lg text-text555"
          value={value}
          onChange={handleTextChange}
        />

        {isPass && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPass(!showPass)}
            className="cursor-pointer"
          >
            {showPass ? (
              <FaEye className="text-text555 text-2xl" />
            ) : (
              <FaEyeSlash className="text-text555 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
