import React, { useState } from 'react';
import PopPop from 'react-poppop';
import GoogleLogin from 'react-google-login';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { auth, loadDetails } from '../utils/actions';
const login = ({setLoginModal}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgot, setForgot] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginHandler = () => {
        setLoading(true)
        firebase.auth().signInWithEmailAndPassword(email,password).then(res => {
            firebase.database().ref("users").child(res.user.uid).once("value",(success) => {
                const details = success.toJSON();
                dispatch(loadDetails(res.user.uid));
                dispatch(auth({
                    uid: res.user.uid,
                    token: res.user.getIdToken(),
                    name: details.name,
                    email: email, 
                }))
                setLoading(false);
                setLoginModal(false);
            })
           
        }).catch(err => {
            setLoading(false);
            alert(err.message);
        })
    }
    return (
        <PopPop position="centerCenter"
        open={true}
        closeBtn={true}
        contentStyle={{overflow: "hidden", paddingLeft: 50,paddingTop: 30,paddingBottom: 30, paddingRight: 50}}
        closeOnEsc={true}
        onClose={() => setLoginModal(false)}
        closeOnOverlay={false}>
          <h2>Login</h2>
          <hr />
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <div>
              <h4>Use other accounts</h4>
              <p style={{maxWidth: 200}}>You can also login using you google account</p>

              <GoogleLogin
            clientId="267359506129-77cuv40e395c8sre6bllc0p4hd9nb0mi.apps.googleusercontent.com"
            buttonText="Login Google"
            onSuccess={(res) => {
              setEmail(res.profileObj.email);
              setPassword("NIL");
              setTimeout(() => {
                loginHandler();
              }, 1000)
            }}
            onFailure={(err) => {
              console.log(err);
            }}
            cookiePolicy={'single_host_origin'}
/>


            </div>
            <div style={{height: 400, width: 1, backgroundColor: "rgba(1,1,1,0.5)",marginLeft:100, marginRight: 10}}/>
            <div style={{marginLeft: 50}}>
              <h4>Use your Toolbee account</h4>
              <p>Please enter the following details</p>

               <div class="form-group">
              <label for="exampleInputEmail1">Email Address</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourid@example.com" />
               </div>

               <div class="form-group">
              <label for="exampleInputEmail1">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Min 6 characters" />
               </div>


               <button onClick={loginHandler} className="btn btn-primary">{loading ? "Please Wait..." : "Login"}</button>
<br /><br />
               <a onClick={e => setForgot(state => !state)} style={{marginTop: 10,textDecoration: "underline"}}>Forgot your Password?</a>

               <br />
               {forgot && <div>
               <div class="form-group">
              <label for="exampleInputEmail1"></label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourid@example.com" />
               </div>

               <button className="btn btn-info">Get Password</button>
               </div>}
            </div>
          </div>
</PopPop>
    );

}

export default login;