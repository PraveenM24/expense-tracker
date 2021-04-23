import React from 'react'
import './Transaction.css'
import ReactTimeago from 'react-timeago';

function Transaction({amount, reason, timestamp }) {
    return (
        <div>
            <p>{amount} used for &nbsp; { reason } &nbsp;
                <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/>
            </p>
        </div>
    )
}

export default Transaction
