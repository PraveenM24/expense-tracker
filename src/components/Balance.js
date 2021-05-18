import React, { useState, useEffect } from 'react'
import './Balance.css'
import { db } from '../Firebase';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Transactions from './Transactions';
import { useSelector } from 'react-redux';
import { selectUser } from './../features/appSlice';
import Analytics from './Analytics';

export default function Balance() {

    const user = useSelector(selectUser);
    const [balance, setBalance] = useState(0);
    const [input, setInput] = useState('');
    const [reason, setReason] = useState('');
    const [option, setOption] = useState('');
    const finalInput = option + input;

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
        calculateBalance()
    }, [])

    const calculateBalance = () => {
        var bal = 0
        db.collection('users').doc(user.id).collection('transactions').get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                bal += parseInt(doc.data().amount)
            });
            if (bal < 0){
                bal = 0
            }
            setBalance(bal)
        })
    }
    
    const addTransaction = e => {
        e.preventDefault();
        db.collection('users').doc(user.id).collection('transactions').add({
            amount: finalInput,
            reason: reason,
            timestamp: new Date()
        });
        calculateBalance()
    }

    return (
        <div className="balance">
            <h1>Balance: &#8377; {balance}</h1>
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
            <div class="balance__splitScreen">
                <div className="balance__half">
                    <div className="balance__transactions">
                        <Transactions  calculateBalance = { calculateBalance }/>
                    </div>
                </div>
                <div className="balance__half">
                    <Analytics/>
                </div>
            </div>
        </div>
    )
}
