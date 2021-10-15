import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase';
import './Post.css'
import firebase from "firebase";

const Post = ({username, caption, imageUrl, postId, user}) => {

    const [comments, setCommnets] = useState([]);
    const [comment, setCommnet] = useState('')


    useEffect(()=>{
        let unsubscribed;
        if(postId){
            unsubscribed = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot)=>{
                    setCommnets(snapshot.docs.map(doc=> doc.data()))
                })

        }
        return ()=> unsubscribed ();
    },[postId])
 const postComment =(event)=>{
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add(
    {
        text: comment,
        username:user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setCommnet('')
 }
    return (
        <div className="post">
            <div className="post-header">
            <div className="">
                <Avatar
                className="post-avatar"
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                />
            </div>
            <h3>{username}</h3>
            </div>
            {/* heade-> avatar + username */}
            <img 
            className="post-img"
            src={imageUrl}
             alt="" />
            {/* image  */}
            <p className="post-text"><strong>{username}</strong> {caption}</p>
            <div className="comment">
                { 
                    comments?.map((comment)=> (
                         <p>
                    <strong>{comment.username}</strong> {comment.text}
                         </p>
                    )

                    )
                }
            </div>
                {
                    user && <form className="post-comment">
                    <input
                    sx={{p:0.5}}
                    className="post-input"
                    value={comment}
                    onChange={(e)=>setCommnet(e.target.value)}
                    placeholder="Add a comment ..."
                    />
                    <button
                    disabled={!comment}
                    className="post-btn"
                    type="submit"
                    onClick={postComment}
                    >Post</button>
                    </form> 
                }
            {/* username + caption  */}
        </div>
    );
};

export default Post;