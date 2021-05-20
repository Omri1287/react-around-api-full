import React, { useState } from "react";
//import { Link, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//import * as auth from "../Utils/auth";
//import './styles/Login.css';

function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    //const history = useHistory();

    // const resetForm = () => {
    //     setEmail("");
    //     setPassword("");
    // };
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleLogin(email, password);
        // if (!localStorage.getItem('jwt')) {
        //     resetForm();
        //     history.push("/signin")   
        // }
        // else{
        //     history.push("/")   
        // }
        // else{
        //     history.push("/signin");
        //     resetForm();
        // }

    }

    return (
        <div className="login">
            <div>
            </div>
            <form onSubmit={handleSubmit} className="login__form">
                <p className="login__title">Log in</p>
                <input
                    className="login__form"
                    required
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmail}
                />
                <input
                    className="login__form"
                    required
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={handlePassword}
                />
                <button
                    type="submit"
                    onSubmit={handleSubmit}
                    className="login__submit"
                >
                    Log in
                </button>
                <Link to="signup" className="login__signup">
                    Not a member yet? Sign up here!
                </Link>
            </form>
        </div>
    );
}

export default Login;
// class Login extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       username: '',
//       password: ''
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);

//   }
//   handleChange(e) {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }
//   handleSubmit(e){
//     e.preventDefault();
//     if (!this.state.username || !this.state.password){
//       return;
//     }
//     auth.authorize(this.state.email, this.state.password)
//     .then((data) => {
//       if (data.jwt){
//         this.setState({email: '', password: ''} ,() => {
//         this.props.handleLogin(data.user.en_cal_goal.calGoal);
//         this.props.history.push('/diary');
//         })
//       }
//     })
//     .catch(err => console.log(err));
//   }
//   render(){
//     return(
//       <div className="login">
//         <p className="login__welcome">
//           Welcome back!
//         </p>
//         <form onSubmit={this.handleSubmit} className="login__form">
//           <label htmlFor="username">
//             Username:
//           </label>
//           <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
//           <label htmlFor="password">
//             Password:
//           </label>
//           <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
//           <div className="login__button-container">
//             <button type="submit" onSubmit={this.handleSubmit} className="login__link">Log in</button>
//           </div>
//         </form>

//         <div className="login__signup">
//           <p>Ready to begin your journey?</p>
//           <Link to="/register" className="signup__link">Sign up</Link>
//         </div>
//       </div>
//     )
//   }
// }

// export default withRouter(Login);
