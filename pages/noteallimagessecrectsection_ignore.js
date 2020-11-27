import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
const app = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
       (async () => {
        firebase.storage().ref("notely").listAll().then(async res => {
            const temp = [];
           for(let i=0; i<res.items.length; i++) {
               const url = await res.items[i].getDownloadURL();
               temp.push(url);
               setImages([...temp]);
           }
           setImages([...temp])
        });
       })();
    },[])
    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {images.map(url => {
                return (
                    <img src={url} style={{width: "auto", height: "auto"}}/>
                )
            })}
        </div>
    )
}

export default app;