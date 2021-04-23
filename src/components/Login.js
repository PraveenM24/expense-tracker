import React, { useState } from 'react'
import './Login.css'
import { auth } from './../Firebase.js';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory('');

    const login = (event) => {
        event.preventDefault();
        if (email === '' || password === '') {
            document.getElementById('email').style.border= '1px solid red';
            document.getElementById('email').style.borderRadius= '5px';
            document.getElementById('password').style.border= '1px solid red';
            document.getElementById('password').style.borderRadius= '5px';
            console.log(document.getElementById('email'))
            setTimeout(() => {
                document.getElementById('email').style.border= '';
                document.getElementById('password').style.border= '';
            }, 2000);
        }
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                history.push("/home");
            })
            .catch((e) => {
                document.getElementById('email').style.border= '1px solid red';
                document.getElementById('email').style.borderRadius= '5px';
                document.getElementById('password').style.border= '1px solid red';
                document.getElementById('password').style.borderRadius= '5px';
                setTimeout(() => {
                    document.getElementById('email').style.border= '';
                    document.getElementById('password').style.border= '';
                }, 2000);
            })
    }
    return (
        <div className="login" >    
            <form className="login__form" noValidate autoComplete="off">
            <h3>Sign In</h3>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <div className="login__buttons">
                    <Button href="/register" color="primary">
                        Create account
                    </Button>
                    <Button variant="contained" color="primary" type="submit" onClick={login}>Log In</Button>
                </div>
            </form>
        </div>
    )
}

export default Login
