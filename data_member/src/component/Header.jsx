import React, { Component, useEffect, useState } from "react";
import img from "./bulma-logo-white.png";
const Header = () => {
  return (
    <div>
      <nav
        className="navbar is-primary "
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={img} width={112} height={28} />
          </a>
          <a
            role="button"
            // className="navbar-burger burger is-active"
            className="navbar-burger burger "
            id="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={(e) => {
              e.preventDefault();

              let body = document.getElementById("navbarBasicExample");
              body.classList.toggle("is-active");
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        {/* <div id="navbarBasicExample" className="navbar-menu is-active"> */}
        <div id="navbarBasicExample" className="navbar-menu ">
          <div className="navbar-start">
            <a className="navbar-item" href="/redux">
              Redux
            </a>
            <a className="navbar-item" href="/firestore">
              FireStore
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
