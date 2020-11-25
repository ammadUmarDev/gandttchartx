import { deleteNote } from "./actions";

const initialState = {
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
                url: action.payload.url
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