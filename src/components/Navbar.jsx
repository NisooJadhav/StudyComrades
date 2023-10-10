import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="navbar">
        <span className="logo">
          <img className="logo-img" src="https://i.ibb.co/xFFG4VX/logo.jpg" />
          StudyComrades
          <p style={{ fontSize: "15px" }}>we study together</p>
        </span>
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)}>logout</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
