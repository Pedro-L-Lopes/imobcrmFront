import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  link?: string; // Agora opcional
  onClick?: () => void;
  icon: any;
  title: string;
};

const Button = ({ link, onClick, icon, title }: ButtonProps) => {
  if (link) {
    return (
      <Link to={link}>
        <button className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-md shadow-md hover:bg-blue-500 transition flex items-center">
          {icon} {title}
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-md shadow-md hover:bg-blue-500 transition flex items-center"
    >
      {icon} {title}
    </button>
  );
};

export default Button;
