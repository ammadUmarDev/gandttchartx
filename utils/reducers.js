import { deleteNote } from "./actions";
import {tempFun} from '../components/note';
import firebase from 'firebase';

const initialState = {
    auth: null,
    color: "linear-gradient(0deg, rgba(255,246,110,1) 64%, rgba(255,250,173,1) 100%)",
    notes: [],
    position: 0,
    positionY: 60,
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "CLEAR":
            return {
                auth: null,
                color: "linear-gradient(0deg, rgba(255,246,110,1) 64%, rgba(255,250,173,1) 100%)",
                notes: [],
                position: 0,
                positionY: 60,
            }
        case "LOAD_DETAILS":
            return {
                ...state,
                notes: action.payload
            }
        case "EXTRA_DETAILS":
            for(let i=0; i < state.notes.length; i++) {
                if(state.notes[i].id == action.payload.id) {
                    state.notes[i] = {
                        ...action.payload
                    }
                    break;
                }
            }
            return {
                ...state,
            }
        case "SAVE_DETAILS":
            if(state.auth) {
                firebase.database().ref("users").child(state.auth.uid).child("notes").set(state.notes).then(res => {
                    console.log("Response",res);
                })
            }
            return {
                ...state,
            }
        case "CHANGE_COLOR":
            for(let i=0; i<state.notes.length; i++) {
                if(state.notes[i].isActive) {
                    state.notes[i].noteColor = action.payload;
                    break;
                }
            }
            return {
                ...state,
                color: action.payload
            }
        case "AUTH":
            return {
                ...state,
                auth: action.payload
            }
        case "RESET_POSITION":
            console.log(action.payload);
            return {
                ...state,
                position: action.payload.pos,
                positionY: action.payload.posY

            }
        case "DELETE_NOTE":
            const delNote = [...state.notes];
            for(let i=0; i<delNote.length; i++) {
                if(delNote[i].id == action.payload) {
                    delNote.splice(i,1);
                    break;
                }
            }
            return {
                ...state,
                notes: delNote
            }
        case "CLEAR_FOCUS":
            const focusNotes = [...state.notes];
            for(let i=0; i<focusNotes.length; i++) {
                focusNotes[i].isActive = false
            }
            return {
                ...state,
                notes: focusNotes
            }
        case "ADD_NOTE":
            const myNotes = [...state.notes];
            for(let i=0; i<myNotes.length; i++) {
                myNotes[i].isActive = false
                myNotes[i].zIndex = 0
            }
            myNotes.push({
                id: create_UUID(),
                isActive: true,
                zIndex: 10,
                type: action.payload.type,
                startPos: action.payload.startPos,
                posY: action.payload.posY,
                url: action.payload.url,
                noteColor: state.color
            })
            return {
                ...state,
                notes: myNotes,
            }
        case "NOTE_CLICKED":
            const temp = [...state.notes];
            for(let i=0; i<temp.length; i++) {
                if(temp[i].id == action.payload) {
                    temp[i].isActive = true
                    temp[i].zIndex = 10
                } else {
                    temp[i].isActive = false
                    temp[i].zIndex = 0
                }
            }
            return {
                ...state,
                notes: temp
            }
    }
    return {
        ...state,
    }
}

export default reducer;