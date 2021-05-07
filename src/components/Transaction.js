import React from 'react'
import * as moment from 'moment'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import { db } from '../Firebase';
import firebase from 'firebase';

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

function Transaction({amount, reason, timestamp, id, calculateBalance}) {
    
    const userId = firebase.auth().currentUser.uid;
    var a = String(amount)
    var b = timestamp.toDate()
    var cls;

    if (amount < 0) {
        cls = "transactions__debit"
        a += " (Db)"
    }
    else {
        cls = "transactions__credit"
        a += " (Cr)"
    }

    

    const deleteTransaction = (time) => {
        var query = db.collection('users').doc(userId).collection('transactions').where('timestamp','==',time);
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
                calculateBalance(); 
                });
        });
    }    

    return (
        <TableRow key = {id}>
            <TableCell  className={cls} scope="row">
                &#8377; {a.substring(1)}
            </TableCell>
            <TableCell align="right">{reason}</TableCell>
            <TableCell align="right">{moment(b).format('LLL')}</TableCell>
            <TableCell align="right"><DeleteTwoToneIcon onClick ={() => deleteTransaction(timestamp)}/></TableCell>
        </TableRow>
    )
}

export default Transaction
