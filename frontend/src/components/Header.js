import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./log/Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.user);

  return (
    <header>
      <nav>
        <div className="nav-container">
          <div className="logo-container">
            <NavLink to="/home" className="link">
              <div className="logo">
                <img
                  className="logo"
                  src="./img/logo/icon-left-font-monochrome-black.png"
                  alt="groupomania logo"
                />
              </div>
            </NavLink>
          </div>
          {uid ? (
            <>
              <ul>
                <li></li>
                <li className="welcome-msg">
                  <NavLink to="/profil" className="link">
                    <img
                      className="userPict"
                      src={userData.picture}
                      alt="user-pict"
                    />{" "}
                  </NavLink>
                  <div className="dropDown-container">
                    <img src="./img/icons/caret-down.svg" alt="caret-icon" />
                    <div className="dropDown-content">
                      <NavLink to="/profil" className="link">
                        <p>Mon profil</p>
                      </NavLink>
                      <Logout />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="phone">
                <NavLink to="/profil" className="link">
                  <p>Mon profil</p>
                </NavLink>
                <Logout />
              </div>
            </>
          ) : (
            <ul>
              <li>
                <NavLink to="/" className="link">
                  <img
                    className="login"
                    src="./img/icons/login.svg"
                    alt="login"
                  />
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
