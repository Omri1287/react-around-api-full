import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import * as auth from "../Utils/auth";
//import './styles/Register.css';

function Register({ handleRegistration }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({})


    const history = useHistory();

    // function handleEmail(e) {
    //     setEmail(e.target.value)
    //     setError({...error, [e.target.name]: e.target.validationMessage})
    // }
    // function handlePassword(e) {
    //     setPassword(e.target.value)
    //     setError({...error, [e.target.name]: e.target.validationMessage})
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(email, password);

        if (localStorage.getItem("jwt")) {
            history.push("/signin");
            
        }
        //reset()
    };
    return (
        <div className="login">
            <form action="#" onSubmit={handleSubmit} className="login__form">
                <h2 className="login__title">Sign up</h2>
                <input
                    required
                    className="login__form"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    //onChange={handleEmail}
                />
                <input
                    required
                    className="login__form"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    //onChange={handlePassword}
                />
                <button type="submit" className="login__submit">
                    Sign up!
                </button>
                <Link to="/signin" className="login__signup">
                    Already a member? Log in here!
                </Link>
            </form>
        </div>
    );
}

export default Register;
