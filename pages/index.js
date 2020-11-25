import Note from '../components/note';
import { useDispatch, useSelector } from 'react-redux';
import {addNote} from '../utils/actions';
import PopPop from 'react-poppop';
import { useState } from 'react';
const notely = () => {
  const dispatch = useDispatch();
  const notes = useSelector(redux => redux.notes);
  const [dialog,setDialog] = useState(false);
  
  console.log(notes);
  return (
    <>
    <div style={{zIndex: 1,marginBottom: 10, boxShadow: "1px 1px rgba(1,1,1,0.5)", width: "100%", backgroundColor: "black", height: 50, display: "flex",justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
      <div style={{display: "flex", flexDirection: "row",alignItems: "center"}}>
        <h3 style={{color: "#fff",marginLeft: 20, textShadow: "1px 1px #fff"}}>GandttchartX</h3>
        <div style={{height: 30, width: 1,backgroundColor: "rgba(255,255,255,0.5)", marginLeft: 20}}/>

        <i onClick={() => dispatch(addNote("note"))} data-toggle="tooltip" data-placement="bottom" title="Add a note" className="fa fa-plus navIcons" aria-hidden="true" style={{marginLeft: 20,color: "#fff", paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, fontSize: 25}}></i>
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
    {notes.map((note,index) => <Note type={note.type} key={note.id} details={note}/>)}
    </>
  );
}

export default notely;