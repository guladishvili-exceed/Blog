import React from "react";
import "./style.css";
import logo from "./logo.png";

const Header = () => {
  {
    return (
      <div className={"container"}>
        <div className={"elements"}>
          <img src={logo} alt="Logo" />;
          <button className={"btn btn-primary"}>Log In</button>
          <button className={"btn btn-primary"}>Register</button>
        </div>
      </div>
    );
  }
};

export default Header;
