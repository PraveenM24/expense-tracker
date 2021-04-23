import React, { useState, useEffect } from 'react'
import './Balance.css'
import { db } from '../Firebase';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Transactions from './Transactions';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './../features/appSlice';

export default function Balance() {

    const user = useSelector(selectUser);

    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState([]);
    const [input, setInput] = useState('');
    const [reason, setReason] = useState('');
    const [option, setOption] = useState('');
    const finalInput = option + input;
    var final = 0

    const options = [
        {
          value: '+',
          label: 'Credit',
        },
        {
          value: '-',
          label: 'Debit',
        }
      ];

    useEffect(() => {
        db.collection('users')
        .doc(user.id)
        .collection('transactions')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            setAmount([])
            snapshot.docs.map((doc => {
                setAmount(amount => amount.concat(parseInt(doc.data().amount)))
            }))
        });
        setBalance(final)
    }, []); 
    
    const addTransaction = e => {
        e.preventDefault();
        db.collection('users').doc(user.id).collection('transactions').add({
            amount: finalInput,
            reason: reason,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    final = amount.reduce((a,v) =>  a = a + v , 0 )
    
    return (
        <div className="balance">
            <h1>Balance: {balance}</h1>
            <form className="balance__form">
                <TextField
                    id="standard-select-currency"
                    select
                    label=" "
                    onChange={(e) => setOption(e.target.value)}
                    helperText="Credit/Debit"
                >   
                    {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                
                </TextField>
                <TextField 
                    label = "Amount"
                    type = "number"
                    onChange = {(e) => setInput(e.target.value)}    
                />
                <TextField 
                    label = "Reason"
                    onChange = {(e) => setReason(e.target.value)}    
                />
                <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="span"
                    type="submit"
                    onClick={addTransaction}
                >
                    <AddIcon />
                </IconButton>
            </form>
            <div className="balance__transactions">
                <Transactions/>
            </div>
        </div>
    )
}
