import React, {useState, useEffect} from "react";
import axios from "axios";

const Post = props => {
  const [comments,setComments] = useState([]);

  useEffect(()=>{
    axios
      .get(`http://localhost:5000/api/posts/${props.post.id}/comments`)
      .then(res=>setComments(res.data))
      .catch(err=>console.log(err.response));
  },[]);

  return(
    <div>
      <div>
        <h2>{props.post.title}</h2>
        <p>{props.post.contents}</p>
      </div>
      <div>
        <h3>Comments:</h3>
        {comments.map(comment=>{
          return(
            <p>{comment.text}</p>
          );
        })}
      </div>
    </div>
  )
}

export default Post;