import React from "react";
import axios from "axios";
import TokenContex from "../contex/TokenContex";
import { useContext } from "react";

const DisplayPost = ({item, index, loadAllPosts, createandUpdatePost, setUpdatePost}) => {

    const {token, name} = useContext(TokenContex);

    function handleLike(e){
        console.log(e.target);
        e.target.classList.toggle("active");

    }

    async function deletePost(e){
        console.log("Deleting post", e.currentTarget);
        let deletePostId = e.currentTarget.id;
        console.log(deletePostId);

        try{
            const response = await axios.delete(`https://instagram-express-app.vercel.app/api/post/delete/${deletePostId}`,
            {
                headers:{
                    authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.message);
            loadAllPosts();
        }
        catch(err){
            console.log("Deleting post error", err);
        }
        
    }

    function timeOfPost(dateString){

      const parsedDate = new Date(dateString);
      const currentDate = new Date();

    // Calculate the difference in milliseconds
      const differenceMs = currentDate - parsedDate;

    // Convert milliseconds to days
      const secsBeforeCurrentTime = Math.floor(differenceMs / 1000);

      if(secsBeforeCurrentTime < 60){
        return `${secsBeforeCurrentTime}  s`;
      }
      else{

        const minBeforeCurrentTime = Math.floor(differenceMs / (1000 * 60) );

        if(minBeforeCurrentTime < 60){
          return `${minBeforeCurrentTime}  m`;
        }
        else{
          const hourBeforeCurrentTime = Math.floor(differenceMs / (1000 * 60 * 60) );

          if(hourBeforeCurrentTime < 24){
            return `${hourBeforeCurrentTime}  h`;
          }
          else{
            const daysBeforeCurrentTime = Math.floor(differenceMs / (1000 * 60 * 60 * 24) );
            return `${daysBeforeCurrentTime}  d`;
          }
        }
      }

    }

  return (
    <div key={index} className="post">
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <i className="fa-regular fa-user" style={{fontWeight: "600"}}></i>
        <p>{name}</p>
        <p style={{color: "gray"}}>{timeOfPost(item.createdAt)}</p>
      </div>
      <div className="img-div">
        <img className="post-image" src={item.image} alt="Image not Found" />
      </div>
      <div className="post-access">
        <div className="post-access-1">
          <button className="like" onClick={handleLike}>
            <i className="fa-regular fa-heart"></i>
          </button>
          <button className="comment">
            <i className="fa-regular fa-comment"></i>
          </button>
          <button className="share">
            <i className="fa-regular fa-share-from-square"></i>
          </button>
          <button className="edit" onClick={()=>{
            setUpdatePost(item._id);
            createandUpdatePost();
          }}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
        <div className="post-access-2">
          <button className="delete" id={item._id} onClick={deletePost}>
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
      <div className="post-text">
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export default DisplayPost;
