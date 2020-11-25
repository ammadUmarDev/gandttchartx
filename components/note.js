import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import {noteClicked,deleteNote} from '../utils/actions'
const colors = ["black", "white", "yellow","green", "blue", "pink", "red"];

const main = ({details,type}) => {
  if(type == "note") {
    return <Note details={details}/>
  } else if(type == "todo") {
    return <TODO details={details}/>
  }
}

const Note = ({details}) => {
  const dispatch = useDispatch();
  const note = useSelector(redux => redux.notes.find((note) => note.id == details.id));
  const [bold,setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline,setUnderline] = useState(false);
  const [color, setColor] = useState("black");
  const [showColor, setShowColor] = useState(false);
  const [font, setFont] = useState(12);
  const [orderList, setOrderList] = useState(false);

  const [text,setText] = useState("");


  return (
        <div id={`draggable`} className="draggable"  style={{zIndex: note.zIndex,display: 'inline-block', padding: 0, marginLeft: 10, position: "relative"}} onClick={() => {
          if(!note.isActive) {
              dispatch(noteClicked(details.id));
          }
      }}>

{note.isActive ?  <div  className="toolbar">
  <div className="toolbar-left">
    <i className="fa fa-bold" onClick={() => setBold(state => !state)} style={{fontWeight: bold ? "bold" : "normal"}} type="button" aria-hidden="true" />
    <i className="fa fa-italic" onClick={() => setItalic(state => !state)} style={{fontWeight: italic ? "bold" : "normal"}} type="button" aria-hidden="true" />
    <i className="fa fa-underline" onClick={() => setUnderline(state => !state)} style={{fontWeight: underline ? "bold" : "normal"}} type="button"  aria-hidden="true" />
    <i className="fa fa-list-ol" aria-hidden="true"/>
    <i className="fa fa-list-ul" aria-hidden="true" />
    <select name="font-manager" id="font-manager" >
      <option value="volvo">Font Size</option>
      <option value={12} style={{fontSize: 12}}>12 px</option>
      <option value={24} style={{fontSize: 24}}>24 px</option>
      <option value={42} style={{fontSize: 42}}>42 px</option>
    </select>
    <i onClick={() => setShowColor(state => !state)} className="fa fa-paint-brush" aria-hidden="true" />
  </div>
  <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={() => {
    dispatch(deleteNote(note.id));
  }}/>
  </div> : <div style={{height: 30, opacity: 0}}/>}
  {(showColor && note.isActive) && <div style={{position: "absolute", height: 40, width: 330, display: "flex",flexDirection: "row", paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
    {colors.map((val,index) => <div onClick={() => setColor(val)} style={{height: 40, width: 40, backgroundColor: val}}/>)}
  </div>}
<div onClick={() => setShowColor(false)} className="textArea" onInput={e => setText(e.target.innerHTML)} style={{color: color, fontWeight: bold ? "bold" : "normal", fontStyle: italic ? "italic" : "normal",
                                  textDecoration: underline ? "underline": "normal"}} contentEditable="true">
                                     
</div>
</div>
  );
}





const TODO = ({details}) => {
  const dispatch = useDispatch();
  const note = useSelector(redux => redux.notes.find((note) => note.id == details.id));
  const [text,setText] = useState("");

  const [list, setList] = useState([]);

  return (
    <div id={`draggable`} className="draggable"  style={{zIndex: note.zIndex,display: 'inline-block', padding: 0, marginLeft: 10, position: "relative"}} onClick={() => {
      if(!note.isActive) {
          dispatch(noteClicked(details.id));
      }
  }}>

  {note.isActive ?  <div  className="toolbar">
    <div className="toolbar-left">
      </div>
      <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={() => {
        dispatch(deleteNote(note.id));
      }}/>
    </div> : <div style={{height: 30, opacity: 0}}/>
  }
<div className="textArea" style={{height: 120, minHeight: 120, display: "inline-block"}} >
  <center><input onKeyPress={e => {
    if(e.code == "Enter") {
      list.push(text);
      setList([...list]);
      setText("");
    }
  }} onChange={e => setText(e.target.value)} value={text} style={{height: 30,width: "90%"}}/>    </center>    
  {
  list.map((txt,index) => {
    return <><center><div key={index} style={{alignItems: "center",marginTop: 10,display: "flex", flexDirection: "row", width: "90%",justifyContent: "space-between"}}>
      <p>{txt}</p>
      <i class="fa fa-times" aria-hidden="true" style={{width: 20, height: 20, color: "black"}} onClick={() => {
        list.splice(index,1);
        setList([...list])
      }}></i>
    </div>
    <div style={{width: "90%",height: 1, backgroundColor: "rgba(1,1,1,0.7)"}}/>
    </center>
    </>
  })
}      
</div>

</div>
  );
}


export default main;