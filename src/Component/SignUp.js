import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TokenContex from "../contex/TokenContex";

const SignUp = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  // console.log(user);

  const [error, setError] = useState("");

  const {setName,setToken} = useContext(TokenContex);


  const {name, email, password, confirmPassword} = user;

  function updateUser(e){

    let key = e.target.name;
    setUser({...user, [key]: e.target.value});

  }

  async function addUser(e){

    e.preventDefault();
    // console.log("Form is submitted");

    if(password !== confirmPassword){
      alert("Password is not matching !");
      return;
    }

    try{
      const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",
        {
                "name": name,
                "email": email,
                "password": password,
        })

        setToken(response.data.data.token);
        setName(response.data.data.name);

        localStorage.setItem("name", response.data.data.name);
        setError("");

        localStorage.setItem("token", response.data.data.token);

        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })

        alert("Successfully Signed Up !");
        navigate("/dashboard");


    }
    catch(err){
      setError(err.response.data.message);
      console.log("Failed to Signup", err);
    }
  }

  return (
    <div className="main-field">
    <div className="signup-field">
      <i className="insta-name"></i>
      <p className="para-1">
        Sign up to see photos and videos from your friends.
      </p>
      <form className="signup-form" onSubmit={addUser}>

        <input type="text" placeholder="Name" name="name"
        value={name}
        onChange={updateUser}/>

        <input type="email" placeholder="Email Address" name="email"
        value={email}
        onChange={updateUser}/>

        <input type="password" placeholder="Password" name="password"
        value={password}
        onChange={updateUser}/>

        <input type="password" placeholder="Confirm Password" name="confirmPassword"
        value={confirmPassword}
        onChange={updateUser}/>

        <p className="para-2">
        People who use our service may have uploaded your contact information to
        Instagram.{" "}
        <span>
          <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank">Learn more</a>
        </span>
      </p>
      <p className="para-2">
        By signing up, you agree to our{" "}
        <span>
          <a href="https://help.instagram.com/581066165581870/?locale=en_GB" target="_blank">Terms</a>
        </span>
        ,{" "}
        <span>
          <a href="https://www.facebook.com/privacy/policy" target="_blank">Privacy Policy</a>
        </span>{" "}
        and{" "}
        <span>
          <a href="https://privacycenter.instagram.com/policies/cookies/" target="_blank">Cookies Policy</a>
        </span>
        .
      </p>
        <button type="submit">Sign Up</button>
      </form>
      {
        error && <p style={{color: "red"}}>{error}</p>
      }
    </div>
      <div className="login-field">
        <p>Have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
