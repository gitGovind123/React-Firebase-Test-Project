import React, { useState, useEffect } from 'react';
import '../src/style/main.css'
import { db } from './services/firebase';

function Post({newPost, user, posts}) {
  const [response, setResponse] = React.useState('')
  const [resposeList, setResponseList] = React.useState([])

  const[newPosts, setNewPosts]= React.useState([])

  const onResponsiveChange = (e) => {
   setResponse(e)
  }

  useEffect (() => {
    setNewPosts(newPost)
  },[newPost])

  useEffect(() => {
    handlePostComment(newPosts);
  },[newPosts])

  const handlePostComment = async(newPosts)=>{
  
    db.collection("Posts").doc(newPosts.key).update({
      ...newPosts
    })
    .then((docRef) => {
      console.log("Sucess");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

  const handleCLick = () => {
    let comments = newPosts.comments
    comments.push({
      email: newPosts.email,
      name: newPosts.name,
      comment: response})
    const updatedComments = {
        ...newPosts,
        comments:comments
    }
    setNewPosts(updatedComments);
  }
  return (
    <div className="channel">
      <div>
        <div className="heading">
          <p>{newPosts.subject}</p>
        </div>
        <div className="user_name">
            <p>{newPosts.name}</p>
            <p>{newPosts.body}</p> 
        </div>
        {newPosts?.comments?.length ? newPosts.comments.map(val => {
          return <div className="user_name">
            <p>{val.name}</p>
            <p>{val.comment}</p> 
        </div>
        }): null}
        <div className="submit">
            <input placeholder='Response' onChange={e => onResponsiveChange(e.target.value)}/>
            <button className="submit_button" onClick={() => {
              handleCLick()
            }}>Submit</button>
        </div>
        <div>
          <p> </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
