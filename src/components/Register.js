import React, { useState } from 'react'
import './Register.css'
import { auth } from './../Firebase.js';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Register() {
    const history = useHistory('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth.user) {
                    auth.user.updateProfile({
                        displayName: firstName + " " + lastName
                    }).then((s) => {
                        history.push("/")
                    })
                }
            })
            .catch((e) => {
                alert(e.message);
            })
    }

    return (
        <div className="register">
            <form className="register__form" noValidate autoComplete="off">
            <h3>Sign Up</h3>
                <TextField
                    id="fname"
                    label="First Name"
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    id="lname"
                    label="Last Name"
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                />
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
                <div className="register__buttons">
                    <Button variant="contained" color="primary" type="submit" onClick={register}>Sign Up</Button>
                </div>
            </form>
        </div>
    )
}

export default Register
