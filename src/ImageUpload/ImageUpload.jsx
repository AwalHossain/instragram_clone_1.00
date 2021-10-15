import { Button } from '@mui/material';
import React, { useState } from 'react';
import { db, storage } from '../Firebase/firebase';
import firebase from "firebase";
import './ImageUpload.css'

const ImageUpload = ({username}) => {
    console.log(username);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0)

    const handleChange =(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    const handleUpload=()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // I didn't uderstand a thing in this function. So, check this out later
        uploadTask.on( 
            "state_changed",
            (snapshot)=>{
                //progress function
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress)
            },
            (error)=>{
                console.log(error);
                alert(error.message)
            },
            ()=>{
                ////complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        //post image inside db
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username: username
                        });
                    })
                    setProgress(0);
                    setCaption("");
                    setImage(null);
            }
        )
    }

    return (
        <div className="imgUpload">
            {/* <progres value={progress} max="100" /> */}
            <progress className="progress-bar"  value={progress} max="100" />  
            <input type="text" name="" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} id="" />
            <input type="file" name="" id="" onChange={handleChange} />
            <Button variant="outlined" onClick={handleUpload} color="success">Upload</Button>
        </div>
    );
};

export default ImageUpload;