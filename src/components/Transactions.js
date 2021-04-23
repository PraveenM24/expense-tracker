import React, { useState, useEffect } from 'react'
import './Transactions.css'
import { db } from '../Firebase';
import firebase from 'firebase';
import Transaction from './Transaction'

function Transactions() {
    const userId = firebase.auth().currentUser.uid;
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        db.collection('users')
        .doc(userId)
        .collection('transactions')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            setTransactions(
                snapshot.docs.map((doc) => 
                doc.data()
            ))
        });
    }, []);

    return (
        <div className="transactions">
            <h4>Recent Transactions</h4>
            
           { transactions.map((transaction) => 
               <Transaction 
                   amount={ transaction.amount }
                   reason={ transaction.reason }
                   timestamp={ transaction.timestamp }
               />
            )}
        </div>
    )
}

export default Transactions
