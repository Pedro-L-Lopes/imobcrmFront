// Hooks
import { useState, createElement } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { CiLogout } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsCalendarCheck, BsCashStack } from "react-icons/bs";
import {
  FaBuilding,
  FaFileContract,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

// Redux
import { useAppDispatch } from "../hooks/useAppDispatch";
import { IoHomeOutline } from "react-icons/io5";
// import { logout, reset } from "../slices/authSlice";

const Sidebar = ({ open, setOpen }: any) => {
  const navigate = useNavigate();
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Clientes", link: "/clientes", icon: FaUsers },
    { name: "Imóveis", link: "/imoveis", icon: FaBuilding },
    { name: "Visitas", link: "/visitas", icon: BsCalendarCheck },
    { name: "Contratos", link: "/contratos", icon: FaFileContract },
    { name: "Controle Aluguel", link: "/controle-aluguel", icon: BsCashStack },
    { name: "Localizações", link: "/localizacoes", icon: FaMapMarkerAlt },
    {
      name: "Sair",
      link: () => navigate("/"),
      icon: CiLogout,
      margin: true,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 min-h-screen bg-blue-700 ${
        open ? "w-48" : "w-16"
      } duration-500 text-gray-100 px-4 flex flex-col`}
    >
      <div className="py-3 flex justify-between items-center gap-4 border-b">
        {open && (
          <div className="flex items-center gap-2">
            <IoHomeOutline size={26} className="cursor-pointer" />
            <h1 className="font-bold">Imob CRM</h1>
          </div>
        )}
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 relative">
        {menus.map((menu, i) => (
          <div
            key={i}
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md transition-all duration-300 cursor-pointer ${
              location.pathname === menu.link
                ? "bg-blue-800 text-white opacity-100"
                : "hover:opacity-70 opacity-60"
            } ${menu.margin && "mt-5"}`}
            onClick={() => {
              if (typeof menu.link === "function") {
                menu.link();
              } else {
                navigate(menu.link);
              }
            }}
          >
            <div>{createElement(menu.icon, { size: "20" })}</div>
            <h2
              className={`whitespace-pre ${
                !open
                  ? "opacity-0 translate-x-[-10px] pointer-events-none"
                  : "opacity-100 translate-x-0"
              } transition-all duration-300`}
            >
              {menu.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
