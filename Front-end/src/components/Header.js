import logo from "../images/header-icon.svg";
import { Link } from "react-router-dom";
import React from "react";

function Header(props) {
    return (
        <header className="header">
            <img
                className="header__vector"
                src={logo}
                alt="around the usa logo"
            />
            <div className="header__nav">
                <p className="header__email">{props.userEmail}</p>
                <Link
                    className="header__link link"
                    to={props.link}
                    onClick={props.onClick}
                >
                    {props.text}
                </Link>
            </div>
        </header>
    );
}

export default Header;
