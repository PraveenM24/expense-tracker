import React, { useState } from 'react'
import './Login.css'
import { auth } from './../Firebase.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { login } from '../features/appSlice';
import LinearProgress from '@material-ui/core/LinearProgress';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch(); 

    const loginUser = (event) => {
        setLoading(true)
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
                console.log(auth.user.uid)
                dispatch(
                    login({
                        id: auth.user.uid,
                        email: auth.user.email,
                    })
                );
            })
            .catch((e) => {
                setLoading(false)
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
        <div className="login">               
            <div className="login__wrapper" >
            {loading ? <LinearProgress/>: null}
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
                        <Button variant="contained" color="primary" type="submit" onClick={loginUser}>Login</Button>
                    </div>
                </form>
            </div>
        </div>  
    )
}

export default Login
