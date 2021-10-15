
import { Button, Input, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import './App.css';
import { auth, db } from './Firebase/firebase';
import ImageUpload from './ImageUpload/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

import Posted from './Post/Posted';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const signUp = (e)=>{
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))
    setOpen(false)
  }
  const signIn = (e)=>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))
    setOpenSignIn(false)
  }
  const handleChange =(e)=>{
    e.preventDefault()
  }
  useEffect(
()=>{
 const unsubscribed = auth.onAuthStateChanged(user=>{
    if(user){
      //user has looged in
      console.log(user);
      setUser(user)

      if(user.displayName){
        //dont update username
      }
      else{
        return user.updateProfile(({
          displayName:username
        }))
      }
    }

    else{
      setUser(null);
    }
  })
  return (()=> unsubscribed())
}
    ,[user, username])
  
  // useEffect- runs a piece of code based on a specific condition
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      //every time a new post is added, this code fires
    setPosts(snapshot.docs.map(doc =>  ({
      id:doc.id,
      post:doc.data()})))
    })
  },[])
  return (
    <div className="App">
      
    <div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Box sx={style}>
          <form onChange={handleChange} className="form-control">
          <center>
          <img
          className="app_headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="" 
          />
          </center>
            <Input 
            sx={{p:0.5}}         
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="User-name"/>
            <Input   
            required
            sx={{p:0.5}}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"/>           
            <Input 
            sx={{p:0.5}}
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            />
           <Button 
           type="submit"
           sx={{ml:2, mt:2}}
           onClick={signUp}
           variant="contained" 
           color="success">Sign-Up</Button>

          </form>
          
        </Box>
      </Modal>
    </div>
    {/* Log in modal */}
    <div>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
        <Box sx={style}>
          <form onChange={handleChange} className="form-control">
          <center>
          <img
          className="app_headerImage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="" 
          />
          </center>
            <Input   
  
            required
            sx={{p:0.5}}
      
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"/>

            
            <Input
            sx={{p:0.5}}

            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            />
 

           <Button 
           type="submit"
           sx={{ml:2, mt:2}}
           onClick={signIn}
           variant="contained" 
           color="success">Sign-In</Button>

          </form>
          
        </Box>
      </Modal>
    </div>
     <div className="app_header">
       <img
       className="app_headerImage" 
       src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="" 
       />
        {
        user? <Button onClick={()=> auth.signOut()}>log out</Button> 
        :
        <div className="app-loginContainer">
          <Button onClick={()=> setOpen(true)}>Sign up</Button>
          <Button onClick={()=> setOpenSignIn(true)}>Sign in</Button>
        </div>
      }
     </div>
 {/*Post goes from here  */}

      <div className="app-post">
      <div className="">
      {
      posts.map(({id,post})=> 
     
        (<Posted key={id} user={user} postId={id}
          imageUrl={post.imageUrl}
          caption={post.caption}
           username={post.username}></Posted>))
    
    }
      </div>
      <div className="rightSide-post">
      {/* <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/> */}
      </div>
      </div>
          {user?.displayName? (<ImageUpload username={user.displayName}/>)
      : <h3>Please log in to upload</h3>}
    </div>

  );
}

export default App;
