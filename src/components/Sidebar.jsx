import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
      <NavLink to="/chat">enter chatroom</NavLink>      
    </div>
  );
};

export default Sidebar;
