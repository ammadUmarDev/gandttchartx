import Note from '../components/note';
import { useDispatch, useSelector } from 'react-redux';
import {addNote, changeColor} from '../utils/actions';
import { useState } from 'react';
import {changePositon} from '../utils/actions';
import firebase from 'firebase';
import PopPop from 'react-poppop';
import GoogleLogin from 'react-google-login';
import {auth} from '../utils/actions';
const linears = ["linear-gradient(0deg, rgba(255,246,110,1) 64%, rgba(255,250,173,1) 100%)", "linear-gradient(0deg, rgba(139,208,74,1) 64%, rgba(170,223,119,1) 100%)", 
"linear-gradient(0deg, rgba(86,194,231,1) 64%, rgba(152,219,242,1) 100%)", "linear-gradient(0deg, rgba(171,105,234,1) 64%, rgba(204,157,249,1) 100%)"
,"linear-gradient(0deg, rgba(229,95,220,1) 64%, rgba(245,150,240,1) 100%)", "linear-gradient(0deg, rgba(211,74,66,1) 64%, rgba(239,115,108,1) 100%)"]
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
  const [showColor, setShowColor] = useState(false);
  const [dialog,setDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logDialog, setLogDialog] = useState(false);
  const position = useSelector(redux => redux.position);
  const positionY = useSelector(redux => redux.positionY);
  console.log(auth)
  return (
    <>
     
    <div style={{zIndex: 1, boxShadow: "1px 1px rgba(1,1,1,0.5)", width: "100%", backgroundColor: "black", height: 50, display: "flex",justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "row",alignItems: "center"}}>
        <h3 style={{color: "#fff",marginLeft: 20, textShadow: "1px 1px #fff"}}>GandttchartX</h3>
        <div style={{height: 30, width: 1,backgroundColor: "rgba(255,255,255,0.5)", marginLeft: 20}}/>

        <i onClick={() => {
          if(position >= window.innerWidth - 330) {
            dispatch(changePositon(0,positionY + 200))
          }

          dispatch(addNote("note",position,position >= window.innerWidth - 330 ? (positionY + 200) : positionY,""));

          dispatch(changePositon(position >= window.innerWidth -660 ? 0 : position + 330,positionY));

        }} data-toggle="tooltip" data-placement="bottom" title="Add a note" className="fa fa-plus navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => {
           if(position >= window.innerWidth - 330) {
            dispatch(changePositon(0,positionY + 200))
          }

          dispatch(addNote("todo",position,position >= window.innerWidth - 330 ? (positionY + 200) : positionY,""));

          dispatch(changePositon(position >= window.innerWidth -660 ? 0 : position + 330,positionY));
          
        }}  data-toggle="tooltip" data-placement="bottom" title="Add a To-Do List"  className="fa fa-sticky-note navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => setDialog(true)} data-toggle="tooltip" data-placement="bottom" title="Add an image" className="fa fa-picture-o navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => setShowColor(state => !state)} data-toggle="tooltip" data-placement="bottom" title="Change note color" className="fa fa-paint-brush navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        
      </div>
      {credentials == null ? 
      <div style={{display: "flex", flexDirection: "row"}}>

        <a onClick={() => setLogDialog(true)} style={{color: "#fff",fontWeight: "normal"}}>Login</a>
        <a onClick={() => setLogDialog(true)} style={{color: "#fff",marginLeft: 20, fontWeight: "normal"}}>Signup</a>
        <i style={{marginLeft: 20, marginRight: 20, fontSize: 25, color: "#fff"}} class="fa fa-cog" aria-hidden="true"></i>
      </div>
      :
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <a style={{color: "#fff",fontWeight: "normal",marginRight: 20}}>{credentials}</a>
        <a onClick={() => {
          dispatch(auth(null));
        }}  style={{color: "#fff",fontWeight: "normal"}}>Logout</a>
        <i style={{marginLeft: 20, marginRight: 20, fontSize: 25, color: "#fff"}} class="fa fa-cog" aria-hidden="true"></i>
      </div>
}
    </div>
    {showColor && <DropDown />}
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

      <PopPop position="centerCenter"
                open={logDialog}
                closeBtn={true}
                contentStyle={{overflow: "hidden"}}
                closeOnEsc={true}
                onClose={() => setLogDialog(false)}
                closeOnOverlay={false}>
                   <GoogleLogin
                    clientId="574784519360-2jkme7semar6tbks15gjck2g41689f7p.apps.googleusercontent.com"
                    buttonText="Google"
                    onSuccess={(res) => {
                      dispatch(auth(res.profileObj.name));
                      setLogDialog(false)
                    }}
                    onFailure={(err) => {
                      console.log(err);
                    }}
                    cookiePolicy={'single_host_origin'}
  />

      </PopPop>
    </>
  );
}

export default notely;