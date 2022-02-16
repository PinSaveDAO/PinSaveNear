import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
      <nav className="bg-slate-800  px-2 sm:px-4 py-2.5 shadow-slate-500/50 shadow-xl">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <NavLink className="flex text-white self-center text-2xl font-semibold whitespace-nowrap" to="/">
            Dspyt-NFTs
          </NavLink>
          <div>
            <ul className="flex my-auto mt-4 flex-row md:space-x-8 md:mt-0 md:text-sm font-medium">
              <li>
                <NavLink className={isActive =>`hover:bg-slate-600/20 ${isActive?"text-white":"text-gray-500"} rounded-md p-2 hover:text-white/40`} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={isActive =>`hover:bg-slate-600/20 ${isActive?"text-white":"text-gray-500"} rounded-md p-2 hover:text-white/40`} to="/upload">
                  Upload
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navigation;