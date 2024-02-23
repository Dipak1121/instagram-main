import React, {useEffect, useState} from "react";
import axios from "axios";
import TokenContex from "../contex/TokenContex";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = ({loadAllPosts})=>{

    const createPostEle = document.querySelector(".create-post");

    
    const [caption, setCaption] = useState("");
    const [uploadFile, setUploadFile] = useState(null);
    const [imgLink, setImgLink] = useState("");

    const {token} = useContext(TokenContex);

    const navigate = useNavigate();

    useEffect(()=>{
        createPost();
    },[imgLink])

    function implementFileUpload(e){
        
        setUploadFile(e.target.files[0]);
    }

    async function letsUpload(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", uploadFile);

        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/post/upload", formData);

            setImgLink(response.data.data.file_url);

        }
        catch(err){
            console.log(err);
        }
        createPostEle.classList.toggle("hide");
        // navigate("/dashboard");
        loadAllPosts();

    }

    async function createPost(){
        if(!imgLink){
            return;
        }

        try{
            const response = await axios.post("https://instagram-express-app.vercel.app/api/post/create",
            {
                "text": caption,
                "image": imgLink
            },
            {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })

            console.log("Create post response", response);
        }
        catch(err){
            console.log("Create post API error");
        }
        

    }

    return(
        <>
            <h3>Create New Post</h3>
            <p>Select photo from your device</p>

            <form onSubmit={letsUpload}>
                <input type="file"     
                onChange={implementFileUpload}/>

                <input type="text" placeholder="Write Caption" 
                value={caption}
                onChange={(e)=>setCaption(e.target.value)}/>
                
                <button>Upload</button>
            </form>
        </>

        
    )
}

export default CreatePost;