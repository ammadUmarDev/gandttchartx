import Note from '../components/note';
import { useDispatch, useSelector } from 'react-redux';
import {addNote, changeColor, clear, saveDetails} from '../utils/actions';
import { useState,useEffect } from 'react';
import {changePositon} from '../utils/actions';
import firebase from 'firebase';
import PopPop from 'react-poppop';
import Login from '../components/login';
import Signup from '../components/signup';
import {auth} from '../utils/actions';
const linears = ["linear-gradient(0deg, rgb(245, 229, 27) 64%, rgb(255, 250, 173) 100%)", "linear-gradient(160deg, rgba(139,208,74,1) 64%, rgba(170,223,119,1) 100%)", 
"linear-gradient(160deg, rgba(86,194,231,1) 64%, rgba(152,219,242,1) 100%)", "linear-gradient(160deg, rgba(171,105,234,1) 64%, rgba(204,157,249,1) 100%)"
,"linear-gradient(160deg, rgba(229,95,220,1) 64%, rgba(245,150,240,1) 100%)", "linear-gradient(160deg, rgba(211,74,66,1) 64%, rgba(239,115,108,1) 100%)"]
//
const DropDown = () => {
  const dispatch = useDispatch();
  return (
    <div style={{display :"flex", flexDirection: "row", width: "100%", backgroundColor: "rgba(1,1,1,0.4)",padding: 5}}>
      {linears.map((color) => 
      <div onClick={() => {
        dispatch(changeColor(color));
      }} style={{boxShadow: "1px 1px rgba(1,1,1,0.5)", width: 80, height: 80, background: color, borderBottomRightRadius: 30, marginLeft:10}}/>)}
    </div>
  )
}

const notely = () => {
  const dispatch = useDispatch();
  const notes = useSelector(redux => redux.notes);
  const credentials = useSelector(redux => redux.auth);
  const [settings, setSettings] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const [dialog,setDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const position = useSelector(redux => redux.position);
  const positionY = useSelector(redux => redux.positionY);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    dispatch(saveDetails())
  } ,[notes])
  return (
    <>
     
    <div style={{zIndex: 1, boxShadow: "1px 1px rgba(1,1,1,0.5)", width: "100%", backgroundColor: "black", height: 50, display: "flex",justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "row",alignItems: "center"}}>
        <h3 style={{color: "#fff",marginLeft: 20, textShadow: "1px 1px #fff"}}>GandttchartX</h3>
        <div style={{height: 30, width: 1,backgroundColor: "rgba(255,255,255,0.5)", marginLeft: 20}}/>

        <i onClick={() => {
          if(position >= window.innerWidth - 280) {
            dispatch(changePositon(0,positionY + 140))
          }

          dispatch(addNote("note",position,positionY,""));

          dispatch(changePositon(position >= window.innerWidth -500 ? 0 : position + 280,position >= window.innerWidth -500 ? positionY + 140 : positionY));

        }} data-toggle="tooltip" data-placement="bottom" title="Add a note" className="fa fa-plus navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => {
          if(position >= window.innerWidth - 280) {
            dispatch(changePositon(0,positionY + 160))
          }

          dispatch(addNote("todo",position,positionY,""));

          dispatch(changePositon(position >= window.innerWidth -500 ? 0 : position + 280,position >= window.innerWidth -500 ? positionY + 160 : positionY));

        }}  data-toggle="tooltip" data-placement="bottom" title="Add a To-Do List"  className="fa fa-sticky-note navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => setDialog(true)} data-toggle="tooltip" data-placement="bottom" title="Add an image" className="fa fa-picture-o navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => setShowColor(state => !state)} data-toggle="tooltip" data-placement="bottom" title="Change note color" className="fa fa-paint-brush navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        
      </div>
      {credentials == null ? 
      <div style={{display: "flex", flexDirection: "row"}}>

        <a onClick={() => setLoginModal(true)} style={{color: "#fff",fontWeight: "normal"}}>Login</a>
        <a onClick={() => setSignupModal(true)} style={{color: "#fff",marginLeft: 20, fontWeight: "normal"}}>Signup</a>
        <i onClick={e => setSettings(state => !state)} style={{marginLeft: 20, marginRight: 20, fontSize: 25, color: "#fff"}} class="fa fa-cog" aria-hidden="true"></i>
      </div>
      :
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <button onClick={() => {
           dispatch(saveDetails());
        }} className="btn btn-primary" style={{marginRight: 20}}>Save</button>
        <a style={{color: "#fff",fontWeight: "normal",marginRight: 20}}>{credentials.name}</a>
        <i onClick={e => setSettings(state => !state)} style={{marginLeft: 20, marginRight: 20, fontSize: 25, color: "#fff"}} class="fa fa-cog" aria-hidden="true"></i>
      </div>
}
    </div>

   

    {showColor && <DropDown />}
    {settings && <div style={{backgroundColor: "black",display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-end"}}>
    
    <p style={{color: "#fff", marginRight: 20}}>Account Options: </p>
    <p onClick={async () => {
      await dispatch(saveDetails())
      firebase.auth().signOut();
      dispatch(auth(null))
      dispatch(clear());
    }} style={{color: "#fff", marginRight: 20}}>{credentials &&  "Logout"}</p>
    <p onClick={e => setBackground(true)} style={{color: "#fff", marginRight: 20}}>Wall Options</p>
    </div>}
    {notes.map((note,index) => {
      return <Note type={note.type} key={note.id} details={note}/>
    })}
     <PopPop position="centerCenter"
                open={dialog}
                closeBtn={true}
                closeOnEsc={true}
                onClose={() => setDialog(false)}
                closeOnOverlay={false}>

                  <input type="file" disabled={uploading} onChange={(e) => {
                    setUploading(true);
                    firebase.storage().ref("notely").child(new Date().toString()).put(e.target.files[0]).then(res => {
                      res.ref.getDownloadURL().then(url => {
                        if(position >= window.innerWidth - 330) {
                          dispatch(changePositon(0,positionY + 200))
                        }
              
                        dispatch(addNote("image",position,position >= window.innerWidth - 330 ? (positionY + 200) : positionY, url));
              
                        dispatch(changePositon(position >= window.innerWidth -660 ? 0 : position + 330,positionY));
                        setUploading(false);
                        setDialog(false);
                      });
                    });
                  }}/>
                  <p>{uploading && "Please wait..."}</p>
                
      </PopPop>


      {loginModal && <Login setLoginModal={() => setLoginModal(false)} />}


      {signupModal && <Signup setSignupModal={() => setSignupModal(false)} />}

      <PopPop position="centerCenter"
                open={background}
                closeBtn={true}
                closeOnEsc={true}
                onClose={() => setBackground(false)}
                closeOnOverlay={false}>
                  <div style={{display: "flex", flexDirection: "row"}}>

                  <img onClick={() => {
                    document.body.style.backgroundImage = "url(https://firebasestorage.googleapis.com/v0/b/notely-539a9.appspot.com/o/notely%2Fbg.jpeg?alt=media&token=0044ec0c-6d9a-4a90-8d04-0948c3b7d477)"
                  }} style={{width: 200, height: 200, marginLeft: 20}} src="https://firebasestorage.googleapis.com/v0/b/notely-539a9.appspot.com/o/notely%2Fbg.jpeg?alt=media&token=0044ec0c-6d9a-4a90-8d04-0948c3b7d477"/>
                  
                  <img onClick={() => {
                    document.body.style.backgroundImage = "url(https://images-na.ssl-images-amazon.com/images/I/81CnmpCGe5L._AC_SL1000_.jpg)"
                  }} style={{width: 200, height: 200, marginLeft: 20}} src="https://images-na.ssl-images-amazon.com/images/I/81CnmpCGe5L._AC_SL1000_.jpg"/>
                  
                  <img onClick={() => {
                    document.body.style.backgroundImage = "url(https://i.pinimg.com/originals/62/65/4b/62654bc9be4f20b50928cecb1b2209a8.jpg)"
                  }} style={{width: 200, height: 200, marginLeft: 20}} src="https://i.pinimg.com/originals/62/65/4b/62654bc9be4f20b50928cecb1b2209a8.jpg"/>
                  
                  </div>
                  
      </PopPop>
    </>
  );
}

export default notely;