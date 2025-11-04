import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="shrink-0">
      <h1 className="font-zen text-2xl bg-linear-to-r from-[#7E22CE] to-[#14B8A6] text-transparent bg-clip-text font-bold cursor-pointer hover:scale-105 transition-transform duration-200">
        MKET
      </h1>
    </Link>
  );
};

export default Logo;
