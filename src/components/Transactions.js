import React, { useState, useEffect } from 'react'
import './Transactions.css'
import { db } from '../Firebase';
import firebase from 'firebase';
import Transaction from './Transaction'
import HistoryIcon from '@material-ui/icons/History';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

function Transactions( { calculateBalance } ) {
    const userId = firebase.auth().currentUser.uid;
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    setTimeout(() => {
        setLoading(false);
    }, 700);
    

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
            <div className="transactions__title">
                <h4>Recent Transactions&nbsp;</h4>
                <HistoryIcon/>
            </div>

            <div className="transactions__tableWrapper">
                {loading 
                    ?
                    <div className="transactions__loader">
                        <CircularProgress/>
                    </div>
                    :
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell align="right">Reason</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        { transactions.map((transaction, index) => 
                            <Transaction 
                                amount={ transaction.amount }
                                reason={ transaction.reason }
                                timestamp={ transaction.timestamp }
                                id= { index }
                                calculateBalance = { calculateBalance }
                            />
                        )
                        }                        
                    </TableBody>
                </Table>
                </TableContainer>
                }
            </div>
        </div>
    )
}

export default Transactions
