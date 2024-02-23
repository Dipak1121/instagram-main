import React, { useState } from "react";
import axios from "axios";
import TokenContex from "../contex/TokenContex";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("");

    const {email, password} = user;

    const {setName,setToken} = useContext(TokenContex);

    const navigate = useNavigate();

    function updateUser(e){
        let key = e.target.name;
        setUser({...user, [key]: e.target.value});
    }

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login",
            {
                "email": email,
                "password": password
            })
            
            setToken(response.data.data.token);
            setName(response.data.data.name);
            // console.log("Name is, ", response.data.data.name);
            localStorage.setItem("name", response.data.data.name);
            localStorage.setItem("token", response.data.data.token);

            setUser({
                email: "",
                password: ""
            })

            setError("");
            alert("Logged in successfully !");
            navigate("/dashboard");
        }
        catch(err){
            setError(err.response.data.message);
            console.log("Logged In Failed", err);
        }
        
    }


    return(
    <div className="main-field">
        <div className="signup-field">
            <i className="insta-name"></i>
            <form className="signup-form" onSubmit={handleLogin}>
                <input type="email" placeholder="Email address" name="email"
                value={email}
                onChange={updateUser}/>

                <input type="password" placeholder="Password" name="password"
                value={password}
                onChange={updateUser}/>

                <button type="submit">Login</button>
            </form>
            {
                error && <p style={{"color": "red"}}>{error}</p>
            }
        </div>
        <div className="login-field">
            <p>Don't have an account? <Link to="/">Sign Up</Link> </p>
        </div>
    </div>
    )
}

export default Login;