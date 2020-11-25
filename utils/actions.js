export const globalFocused = (focused) => {
    return async dispatch => {
        dispatch({
            type: "GLOBAL_FOCUSED",
            payload: focused
        })
    }
}

export const addNote = (type,startPos,posY) => {
    return async dispatch => {
        dispatch({
            type: "ADD_NOTE",
            payload: {
                type: type,
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