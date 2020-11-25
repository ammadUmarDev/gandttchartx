import Note from '../components/note';
import { useDispatch, useSelector } from 'react-redux';
import {addNote} from '../utils/actions';
import { useState } from 'react';
import {changePositon} from '../utils/actions';
import firebase from 'firebase';
import PopPop from 'react-poppop';

const notely = () => {
  const dispatch = useDispatch();
  const notes = useSelector(redux => redux.notes);
  const [dialog,setDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const position = useSelector(redux => redux.position);
  const positionY = useSelector(redux => redux.positionY);
  return (
    <>
    <div style={{zIndex: 1,marginBottom: 10, boxShadow: "1px 1px rgba(1,1,1,0.5)", width: "100%", backgroundColor: "black", height: 50, display: "flex",justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
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
        <i onClick={() => dispatch(addNote("todo"))}  data-toggle="tooltip" data-placement="bottom" title="Add a To-Do List"  className="fa fa-sticky-note navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i onClick={() => setDialog(true)} data-toggle="tooltip" data-placement="bottom" title="Add an image" className="fa fa-picture-o navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        <i data-toggle="tooltip" data-placement="bottom" title="Change note color" className="fa fa-paint-brush navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
        
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <a style={{color: "#fff",fontWeight: "normal"}}>Login</a>
        <a style={{color: "#fff",marginLeft: 20, fontWeight: "normal"}}>Signup</a>
        <i style={{marginLeft: 20, marginRight: 20, fontSize: 25, color: "#fff"}} class="fa fa-cog" aria-hidden="true"></i>
      </div>
    </div>
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
    </>
  );
}

export default notely;