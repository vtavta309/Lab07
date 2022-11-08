import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Icon } from "react-materialize";
import { useDispatch } from "react-redux";
import "./navigation.css";
import { actLogout } from "../../store/user.reducer";
import { useIsLogin } from "../../hooks/useIsLogin";

export default function Navigation() {
  const dispatch = useDispatch();
  const { isLogin } = useIsLogin();
  function handleLogout(e) {
    e.preventDefault();
    dispatch(actLogout());
  }
  return (
    <header>
      <div className="header">
        <Link to="/" className="headerLogo">
          FILM
        </Link>
        <Navbar
          alignLinks="right"
          menuIcon={<Icon>menu</Icon>}
          options={{
            preventScrolling: true,
          }}
        >
          <div className="navbar">
            <nav>
              <ul className="nav-cont">
                <li>
                  <Link to="/">Home</Link>
                </li>
                {isLogin && (
                  <li>
                    <Link to="/add-film">AddFilm</Link>
                  </li>
                )}
                <li>
                  <Link to="#" className="contact" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
                {isLogin && (
                  <li>
                    <img
                      src={isLogin.img}
                      alt=""
                      style={{ borderRadius: "50%", width: "60px" }}
                    />
                  </li>
                )} 
              </ul>
            </nav>
          </div>
        </Navbar>
      </div>
    </header>
  );
}
