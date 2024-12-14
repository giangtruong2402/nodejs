import React from "react";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="h-[50px] w-full bg-gray-50 flex items-center justify-center shadow-md">
      <div className="w-main flex items-center justify-between text-[15px]  font-semibold">
    {navigation.map((el) => (
      <NavLink
        to={el.path}
        key={el.id}
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 border-b-2 border-main text-main font-semibold rounded-lg hover:bg-gray-100 transition duration-200"
            : "px-4 py-2 text-gray-700 hover:text-main hover:bg-gray-100 rounded-lg transition duration-200"
        }
      >
        {el.value}
      </NavLink>
    ))}
  </div>
</div>
  );
};

export default Navigation;
