import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {noteClicked,deleteNote, changePositon, extraDetails} from '../utils/actions'
import Draggable from 'react-draggable';
const colors = ["black", "white", "yellow","green", "blue", "pink", "red"];


export let tempFun;

const main = ({details,type}) => {
  if(type == "note") {
    return <Note details={details}/>
  } else if(type == "todo") {
    return <TODO details={details}/>
  } else if(type == "image") {
    return <Image details={details}/>
  }
}

const Note = ({details}) => {
  const dispatch = useDispatch();
  let note = useSelector(redux => redux.notes.find((note) => note.id == details.id));
  const [bold,setBold] = useState(note.bold ? note.bold : false);
  const [italic, setItalic] = useState(note.italic ? note.italic : false);
  const [underline,setUnderline] = useState(note.underline ? note.underline : false);
  const [color, setColor] = useState(note.color ? note.color : "black");
  const [showColor, setShowColor] = useState(false);
  const [fonts, setMyFont] = useState(note.fonts ? note.fonts : 15);
  const [cursor, setCursor] = useState("text");
  const [outline, setOutline] = useState("3px solid rgba(255,255,255,0.0)")
  const obj = useRef(null);
  const [ordered, setOrdered] = useState(false);
  const [unordered, setUnordered] = useState(false);

  const [left, setLeft] = useState(note.startPos);
  const [top,setTop] = useState(note.posY);
  const [dragFlag ,setDragFlag] = useState(false);
  const [dim, setDim] = useState({x: note.startPos, y: note.posY})
  const [diff, setDiff] = useState({x: note.startPos, y: note.posY});
  const [text,setText] = useState(note.text? note.text : "");

  const [width, setWidth] = useState(note.width ? note.width : 250);
  const [height, setHeight] = useState(note.height ? note.height : 100);

  useEffect(() => {
    dispatch(extraDetails({
      ...note,
      bold: bold,
      italic: italic,
      underline: underline,
      color: color,
      fonts: fonts,
      text: obj.current ? obj.current.target.innerHTML : "",
    }))
  }, [bold,italic,underline,color,fonts,text]);

  useEffect(() => {
    dispatch(extraDetails({
      ...note,
      startPos: dim.x,
      posY: dim.y
    }))
  }, [dim]);


  useEffect(() => {
    dispatch(extraDetails({
      ...note,
      width: width,
      height: height
    }))
  }, [width,height])
  useEffect(() => { 
    document.getElementById(`${note.id}`).innerHTML = note.text ? note.text : "";
   
  }, []);

  const dragStart = (e) => {
    if(!note.isActive) {
      dispatch(noteClicked(details.id));
  }
    if((e.clientX >= e.currentTarget.getBoundingClientRect().left + e.target.offsetWidth - 30) && 
        (e.clientY >= e.currentTarget.getBoundingClientRect().top + e.target.offsetHeight - 30)) {
          setDragFlag(false);
        } else {
          setDragFlag(true);
          setCursor("grab");
        }
    setDiff({
      x: e.pageX - e.currentTarget.offsetLeft,
      y: e.pageY - e.currentTarget.offsetTop,
    });

    setDim({
      x: e.currentTarget.offsetLeft,
      y: e.currentTarget.offsetTop
    })
    
  }

  const dragging = (e) => {
    if(dragFlag) {
      setLeft(e.pageX - diff.x);
      setTop(e.pageY - diff.y);
    }
  }

  const drapEnd = (e) => {
    setDragFlag(false);
    setCursor("text")
    setOutline("3px solid rgba(255,255,255,0.0)");
    console.log(e);
  }

  return (
    <Draggable onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={drapEnd}  handle=".handle"><div  id={`draggable`}   style={{left:  left, top: top,zIndex: note.zIndex,display: 'inline-block', padding: 0, marginLeft: 10, position: "absolute"}} onClick={() => {
          if(!note.isActive) {
              dispatch(noteClicked(details.id));
          }
      }}>

{note.isActive ?  <div  className="toolbar">
  <div className="toolbar-left">
    <i className="fa fa-bold" onClick={() => setBold(state => !state)} style={{fontWeight: bold ? "bold" : "normal"}} type="button" aria-hidden="true" />
    <i className="fa fa-italic" onClick={() => setItalic(state => !state)} style={{fontWeight: italic ? "bold" : "normal"}} type="button" aria-hidden="true" />
    <i className="fa fa-underline" onClick={() => setUnderline(state => !state)} style={{fontWeight: underline ? "bold" : "normal"}} type="button"  aria-hidden="true" />
    <i onClick={e => setOrdered(true)} className="fa fa-list-ol" aria-hidden="true"/>
    <i onClick={e => setUnordered(true)} className="fa fa-list-ul" aria-hidden="true" />
    <select style={{width: 60, fontSize: 12}} onChange={e => {
      setMyFont( parseInt(e.target.options[e.target.selectedIndex].value));
    }} name="font-manager" id="font-manager" >
      <option value="volvo" style={{fontSize: 10}}>Font Size</option>
      <option value={8} style={{fontSize: 8}}>1 (8pt)</option>
      <option value={10} style={{fontSize: 10}}>2 (10pt)</option>
      <option value={12} style={{fontSize: 12}}>3 (12pt)</option>
      <option value={14} style={{fontSize: 14}}>4 (14pt)</option>
      <option value={18} style={{fontSize: 18}}>5 (18pt)</option>
      <option value={24} style={{fontSize: 24}}>6 (24pt)</option>
    </select>
    <i onClick={() => setShowColor(state => !state)} className="fa fa-paint-brush" aria-hidden="true" />
  </div>
  <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={() => {
    dispatch(deleteNote(note.id));
  }}/>
  </div> : <div style={{height: 30, opacity: 0}}/>}
  {(showColor && note.isActive) && <div style={{position: "absolute", height: 40, width: 330, display: "flex",flexDirection: "row", paddingLeft: 10, paddingRight: 10, justifyContent: "center"}}>
    {colors.map((val,index) => <div onClick={() => setColor(val)} style={{height: 40, width: 40, backgroundColor: val, border: color == val ? "3px solid black"  : "0px solid black"}}/>)}
  </div>}
<div   onClick={() => setShowColor(false)}  style={{width: width, height: height}} onMouseUp={e => {
  setWidth(e.target.clientWidth);
  setHeight(e.target.clientHeight);
}} className={`textArea ${note.isActive ? "nothing" : "handle"}`}  id={`${note.id}`}  onInput={e => {
  obj.current = e;
  if(!ordered && !unordered) {
    setText(e.target.innerHTML)
  }
  

}} style={{width: width,height: height,backgroundImage: note.noteColor, color: color, fontWeight: bold ? "bold" : "normal", fontStyle: italic ? "italic" : "normal",
                                  textDecoration: underline ? "underline": "normal", fontSize: fonts, cursor: cursor, outline: outline,}} id={`${note.id}`} contentEditable="true">
                                  {ordered && <ol><li>{text}</li></ol>}
                                  {unordered && <ul><li>{text}</li></ul>}
</div>
</div>
</Draggable>
  );
}





const TODO = ({details}) => {
  const dispatch = useDispatch();
  let note = useSelector(redux => redux.notes.find((note) => note.id == details.id));
  console.log(note);
  const [text,setText] = useState(note.text ? note.text : "");

  const [list, setList] = useState(note.list ? note.list : []);

  const [left, setLeft] = useState(note.startPos);
  const [top,setTop] = useState(note.posY);
  const [dragFlag ,setDragFlag] = useState(false);

  const [cursor, setCursor] = useState("text");
  const [outline, setOutline] = useState("3px solid rgba(255,255,255,0.0)")

  const [diff, setDiff] = useState({x: 0, y: 0});
  const [dim, setDim] = useState({x: note.startPos, y: note.posY})

  const [width, setWidth] = useState(note.width ? note.width : 250);
  const [height, setHeight] = useState(note.height ? note.height : 100);

   useEffect(() => {
     dispatch(extraDetails({
      ...note,
      text: text,
      list: list,
    }));
   }, [text,list]);

   useEffect(() => {
    dispatch(extraDetails({
     ...note,
     startPos: dim.x,
     posY: dim.y
   }));
  }, [dim]);

  const dragStart = (e) => {
    if(!note.isActive) {
      dispatch(noteClicked(details.id));
  }
    if((e.clientX >= e.currentTarget.getBoundingClientRect().left + e.target.offsetWidth - 30) && 
        (e.clientY >= e.currentTarget.getBoundingClientRect().top + e.target.offsetHeight - 30)) {
          setDragFlag(false);
        } else {
          setDragFlag(true);
          setCursor("grab");
        }
      setDiff({
        x: e.screenX - e.currentTarget.getBoundingClientRect().left,
        y: e.screenY - e.currentTarget.getBoundingClientRect().top
      })

      setDim({
        x: e.pageX,
        y: e.pageY
      })


  }
  const dragging = (e) => {
    if(dragFlag) {
      setLeft(e.screenX - diff.x);
      setTop(e.screenY - diff.y);
    }
    
  }

  const drapEnd = (e) => {
    setDragFlag(false);
    setCursor("text")
    setOutline("3px solid rgba(255,255,255,0.0)")
  }

  return (
    <Draggable onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={drapEnd} handle=".handle"><div id={`draggable`}   className="draggable"  style={{left: left, top: top, zIndex: note.zIndex,display: 'inline-block', padding: 0, marginLeft: 10, position: "absolute"}} onClick={() => {
      if(!note.isActive) {
          dispatch(noteClicked(details.id));
      }
  }}>

  {note.isActive ?  <div  className="toolbar" >
    <div className="toolbar-left">
      </div>
      <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={() => {
        dispatch(deleteNote(note.id));
      }}/>
    </div> : <div style={{height: 30, opacity: 0}}/>
  }
<div  className={`textArea ${note.isActive ? "nothing" : "handle"}`} style={{cursor: cursor, outline: outline, background: note.noteColor, height: 120, minHeight: 120, display: "inline-block"}} >
  <center>{note.isActive && <input onKeyPress={e => {
    if(e.code == "Enter") {
      list.push(text);
      setList([...list]);
      setText("");
    }
  }} onChange={e => setText(e.target.value)} value={text} style={{height: 30,width: "90%"}}/> }   </center>    
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
</div></Draggable>
  );
}

const Image = ({details}) => {
  const dispatch = useDispatch();
  let note = useSelector(redux => redux.notes.find((note) => note.id == details.id));

  const [left, setLeft] = useState(note.startPos);
  const [top,setTop] = useState(note.posY);
  const [dragFlag ,setDragFlag] = useState(false);


  const [cursor, setCursor] = useState("text");
  const [outline, setOutline] = useState("3px solid rgba(255,255,255,0.0)")

  const [diff, setDiff] = useState({x: 0, y: 0});
  const [dim, setDim] = useState({x: note.startPos, y: note.posY})

  useEffect(() => {
    dispatch(extraDetails({
     ...note,
     startPos: dim.x,
     posY: dim.y
   }));
  }, [dim]);

  const dragStart = (e) => {
    if(!note.isActive) {
      dispatch(noteClicked(details.id));
  }
    if((e.clientX >= e.currentTarget.getBoundingClientRect().left + e.target.offsetWidth - 30) && 
        (e.clientY >= e.currentTarget.getBoundingClientRect().top + e.target.offsetHeight - 30)) {
          setDragFlag(false);
        } else {
          setDragFlag(true);
          setCursor("grab");
          setOutline("3px solid rgba(255,255,255,0.4)")
        }
    setDiff({
      x: e.screenX - e.currentTarget.getBoundingClientRect().left,
      y: e.screenY - e.currentTarget.getBoundingClientRect().top
    })

    setDim({
      x: e.screenX,
      y: e.screenY

    })
  }

  const dragging = (e) => {
    if(dragFlag) {
      setLeft(e.screenX - diff.x);
      setTop(e.screenY - diff.y);
    }
    
  }

  const drapEnd = (e) => {
    setDragFlag(false);
    setCursor("text")
    setOutline("3px solid rgba(255,255,255,0.0)")
  }
  return (
    <Draggable onMouseDown={dragStart} onMouseMove={dragging} onMouseUp={drapEnd} handle=".handle"><div id={`draggable`}  className="draggable imgaer"  style={{top: top, left: left, zIndex: note.zIndex,display: 'inline-block', padding: 0, marginLeft: 10, position: "absolute"}} onClick={() => {
      if(!note.isActive) {
          dispatch(noteClicked(details.id));
      }
  }}>

  {note.isActive ?  <div  className="toolbar handle">
    <div className="toolbar-left">
      </div>
      <i className="fa fa-times-circle close-btn" aria-hidden="true" onClick={() => {
        dispatch(deleteNote(note.id));
      }}/>
    </div> : <div style={{height: 30, opacity: 0}}/>
  }
<div  className={`textArea ${note.isActive ? "nothing" : "handle"}`} style={{cursor: cursor, outline: outline,background: note.noteColor, height: 200,minHeight: 120,width: 200,display: "inline-block", border: "0px solid rgba(0,0,0,0.0)"}} >
  <img   style={{width: "100%", height: "100%", objectFit: "fill", pointerEvents: "none"}} src={note.url}/>     
</div>

</div></Draggable>
  );
}


export default main;