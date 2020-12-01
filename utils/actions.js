import firebase from 'firebase';

export const auth = (user) => {
    return async dispatch => {
        dispatch({
            type: "AUTH",
            payload: user
        })
    } 
}

export const clear = () => {
    return async dispatch => {
        dispatch({
            type: "CLEAR"
        })
    }
}

export const loadDetails = (uid) => {
    return async dispatch => {
        firebase.database().ref("users").child(uid).child("notes").once("value", res => {
            const myNotes = res.toJSON();
            const notes = [];
            for(let key in myNotes) {
                
                if(myNotes[key].list) {
                    const list = [];
                    for(let lk in myNotes[key].list) {
                        list.push(myNotes[key].list[lk]);
                    }
                    myNotes[key].list = list;
                }
                notes.push(myNotes[key]);
            }
            dispatch({
                type: "LOAD_DETAILS",
                payload: notes
            })
        })
    }
}

export const extraDetails = (obj) => {
    return async dispatch => {
        dispatch({
            type: "EXTRA_DETAILS",
            payload: obj
        })
    }
}

export const saveDetails = () => {
    return async dispatch => {
        dispatch({
            type: "SAVE_DETAILS"
        })
    }
}

export const changeColor = (color) => {
    return async dispatch => {
        dispatch({
            type: "CHANGE_COLOR",
            payload: color
        })
    }
}

export const globalFocused = (focused) => {
    return async dispatch => {
        dispatch({
            type: "GLOBAL_FOCUSED",
            payload: focused
        })
    }
}

export const addNote = (type,startPos,posY, url) => {
    return async dispatch => {
        dispatch({
            type: "ADD_NOTE",
            payload: {
                type: type,
                url: url,
                startPos: startPos,
                posY: posY
            }
        })
    }
}

export const changePositon = (pos,posY) => {
    return async dispatch => {
        dispatch({
            type: "RESET_POSITION",
            payload: {
                pos: pos,
                posY: posY
            }
        })
    }
}

export const noteClicked = (id) => {
    return async dispatch => {
        dispatch({
            type: "NOTE_CLICKED",
            payload: id
        })
    }
}

export const deleteNote = (id) => {
    return async dispatch => {
        dispatch({
            type: "DELETE_NOTE",
            payload: id
        })
    }
}

export const clearFocus = () => {
    return async dispatch => {
        dispatch({
            type: "CLEAR_FOCUS",
        })
    }
}