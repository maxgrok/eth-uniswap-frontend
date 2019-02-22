import React from 'react';

const Transaction= (props) =>{
    return (
        <div>
To: {props.tx.to}<br/>
From: {props.tx.from}<br/>
Eth Amount: {props.tx.ethAmount}<br/>
        </div>
    )
}
export default Transaction;