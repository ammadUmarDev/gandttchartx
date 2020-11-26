import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
const app = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        //firebase.storage().ref("notely").listAll().then(res => console.log(res));
    },[])
    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>

        </div>
    )
}

export default app;