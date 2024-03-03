import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TokenContex from "../contex/TokenContex";
import axios from "axios";
import { useRef } from "react";
import CreatePost from "./CreatePost";
import LoadingCircle from "./LoadingCircle";
// import DisplayPost from "./DisplayPost";
import { Suspense } from "react";
const LazyDisplayPost = React.lazy(()=>import("./DisplayPost"));


const Dashboard = ()=>{

    const componentRef = useRef(null);

    const navigate = useNavigate();

    const {name, setName,token, setToken} = useContext(TokenContex);

    const[postArr, setPostArr] = useState([]);

    const [updatePost, setUpdatePost] = useState(false);

    console.log("Post Array",postArr);

    console.log("This is token in dashboard", token);

    useEffect(()=>{
        if(!token){
            setToken(localStorage.getItem("token"));
        }
        if(!name){
            setName(localStorage.getItem("name"))
        }
    },[])

    useEffect(()=>{
        token && loadAllPosts();
    },[token])

    async function logout(){
        // console.log("Logout");
        try{
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",
            {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })

            setToken("");
            localStorage.setItem("token", "");
            localStorage.setItem("name", "");
            alert("Successfully Logged Out");
            navigate("/login");
        }
        catch(err){
            console.log("Logout Error", err);
        }

    }

    async function loadAllPosts(){
        try{
            const response = await axios.get("https://instagram-express-app.vercel.app/api/post/my-posts",
            {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            console.log("Load All Posts",response);
            console.log(response.data.data);
            setPostArr(response.data.data.reverse());
            

        }
        catch(err){
            console.log("This is error from load all posts", err);
        }
    }

    

    async function createandUpdatePost(){
        // console.log(componentRef.current);
        // componentRef.current.classList.toggle("hide");
        console.log(updatePost);
        componentRef.current.classList.toggle("hide");
    }

    return(
        <div className="dashboard-page">
        <div className="left-side">
            <i className="fa-brands fa-instagram" style={{color: "#e809ec", fontSize:"35px", marginLeft:"30px", marginTop:"20px"}}></i>
            <div className="icon-title">
                <i className="fa-solid fa-house"></i>
                <p>Home</p>
            </div>
            <div className="icon-title">
                <i className="fa-solid fa-magnifying-glass"></i>
                <p>Search</p>
            </div>
           <div className="icon-title">
                <i className="fa-solid fa-video"></i>
                <p>Your Posts</p>
           </div>
           <div className="icon-title" onClick={createandUpdatePost}>
                <i className="fa-regular fa-square-plus"></i>
                <p>Create</p>
           </div>
           <div className="icon-title">
                <i className="fa-regular fa-user"></i>
                <p>Profile</p>
           </div>
           <div className="icon-title" onClick={logout}>
                <i className="fa-solid fa-power-off"></i>
                <p>Logout</p>
           </div>
        </div>
        <div className="post-suggestions">
        <div className="all-posts">
            {
                postArr.length > 0 &&
                postArr.map((item, index)=>{
                    return(
                        <Suspense fallback={<LoadingCircle />}>
                            <LazyDisplayPost item={item} index={index} loadAllPosts={loadAllPosts} key={index} createandUpdatePost={createandUpdatePost} setUpdatePost={setUpdatePost}/>
                        </Suspense>
                        
                    )
                })
            }
        </div>
        <div className="right-side">
            <div className="user-div">
            <div className="user">
                <i className="fa-regular fa-user" style={{color: "#ff0000"}}></i>
                <div>
                <p>Welcome</p>
                <h4>{name}</h4>
                </div>
            </div>
            <p onClick={()=>navigate("/login")}>Switch</p>
            </div>
            <div>
                <p style={{color:"#737373", fontWeight:"600"}}>Suggested for you</p>
            </div>
            
            <div className="user-div">
            <div className="user">
                <i className="fa-regular fa-user" style={{color: "#ff0000"}}></i>
                <div>
                <h4>Surakshit_0030</h4>
                <p>Suggested for you</p>
                </div>
            </div>
            <p>Follow</p>
            </div>

            <div className="user-div">
            <div className="user">
                <i className="fa-regular fa-user" style={{color: "#ff0000"}}></i>
                <div>
                <h4>Vishalraj_chesser</h4>
                <p>Followed by Amit_king</p>
                </div>
            </div>
            <p>Follow</p>
            </div>

            <div className="user-div">
            <div className="user">
                <i className="fa-regular fa-user" style={{color: "#ff0000"}}></i>
                <div>
                <h4>Sharavani_97</h4>
                <p>Follows you</p>
                </div>
            </div>
            <p>Follow</p>
            </div>

            <div className="user-div">
            <div className="user">
                <i className="fa-regular fa-user" style={{color: "#ff0000"}}></i>
                <div>
                <h4>Yadnesh_123</h4>
                <p>Suggested for you</p>
                </div>
            </div>
            <p>Follow</p>
            </div>

            <div className="user-div">
            <div className="user">
                <i className="fa-regular fa-user" style={{color: "#ff0000"}}></i>
                <div>
                <h4>Zakir_racer</h4>
                <p>Follows you</p>
                </div>
            </div>
            <p>Follow</p>
            </div>

        </div>
        </div>
        <div className="create-post hide" ref={componentRef}>
            <CreatePost loadAllPosts={loadAllPosts} updatePost={updatePost} setUpdatePost={setUpdatePost}/>
        </div>
        </div>
    )
}

export default Dashboard;