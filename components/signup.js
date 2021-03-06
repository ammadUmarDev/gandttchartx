import React, { useState } from 'react';
import PopPop from 'react-poppop';
import GoogleLogin, {} from 'react-google-login';
import firebase from 'firebase';
import {useDispatch}  from 'react-redux';
import {auth} from '../utils/actions';
const signup = ({setSignupModal}) => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSignup = (type,myEmail,myName) => {
      if(type) {
        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(myEmail,"NIL_GOOGLE_HANDLER").then((res) => {
            firebase.database().ref("users").child(res.user.uid).set({
                email: myEmail,
                name: myName
            }).then(() => {
                dispatch(auth({
                    uid: res.user.uid,
                    token: res.user.getIdToken(),
                    name: myName,
                    email: myEmail, 
                }))
                setLoading(false);
            })
        }).catch(err => {
            alert(err.message);
            setLoading(false);
        })

        return;
      }
        if(email == "" || password == "" || name == "") {
            alert("Please fill the required fields!");
            return;
        }
        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(email,password).then((res) => {
            firebase.database().ref("users").child(res.user.uid).set({
                email: email,
                name: name
            }).then(() => {
                dispatch(auth({
                    uid: res.user.uid,
                    token: res.user.getIdToken(),
                    name: name,
                    email: email, 
                }))
                setLoading(false);
            })
        }).catch(err => {
            alert(err.message);
            setLoading(false);
        })
    }
    return (
        <PopPop position="centerCenter"
                open={true}
                closeBtn={true}
                contentStyle={{overflow: "hidden", paddingLeft: 50,paddingTop: 30,paddingBottom: 30, paddingRight: 50}}
                closeOnEsc={true}
                onClose={() => setSignupModal(false)}
                closeOnOverlay={false}>
                  <h2>Signup</h2>
                  <hr />
                  <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div>
                      <h4>Use other accounts</h4>
                      <p style={{maxWidth: 200}}>You can also signup using you google account</p>

                      <GoogleLogin
                        clientId="267359506129-77cuv40e395c8sre6bllc0p4hd9nb0mi.apps.googleusercontent.com"
                        buttonText="Signup Google"
                        onSuccess={(res) => {
                            handleSignup("Google",res.profileObj.email,res.profileObj.name)
                            }}
                    onFailure={(err) => {
                      console.log(err);
                    }}
                    cookiePolicy={'single_host_origin'}
  />


                    </div>
                    <div style={{height: 400, width: 1, backgroundColor: "rgba(1,1,1,0.5)",marginLeft:100, marginRight: 10}}/>
                    <div style={{marginLeft: 50}}>
                      <h4>Create a new Toolbee account</h4>
                      <p>Please enter the following details</p>

                      <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input value={name} onChange={e => setName(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your fullname" />
                       </div>
                       <div class="form-group">
                      <label for="exampleInputEmail1">Email Address</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourid@example.com" />
                       </div>

                       <div class="form-group">
                      <label for="exampleInputEmail1">Password</label>
                      <input value={password} onChange={e => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Min 6 characters" />
                       </div>
                       <button onClick={handleSignup} className="btn btn-success">{loading ? "Please Wait..." : "Create a new account"}</button>
                    </div>
                  </div>
      </PopPop>
    );
}

export default signup;