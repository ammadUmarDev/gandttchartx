export const globalFocused = (focused) => {
    return async dispatch => {
        dispatch({
            type: "GLOBAL_FOCUSED",
            payload: focused
        })
    }
}

export const addNote = (type,startPos) => {
    return async dispatch => {
        dispatch({
            type: "ADD_NOTE",
            payload: {
                type: type,
                startPos: startPos
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