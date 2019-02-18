import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";

const TRANS_QUERY = gql` 
    {
  transactions(where: {userAddress: "0x61e7e7665296749678a441de39bbd099cce72fea"}) {
    id
    ethAmount
    timeStamp
  }
}
                    `
//how to export the prop user (user address) to the TRANS_QUERY

class Transaction extends Component{
    render(){
      console.log(this.props.user.toString())
        return (
        <Query 
      query={TRANS_QUERY}
      variable={{userAddress: this.props.user.toString()}}
      >
    {({ loading, error, data }) => {
        console.log(data)
if (loading) return <p>Loading...</p>;
if (error) return <p>Error :</p>;

return (
<div>
{data.transactions.map((transaction)=>{
//display the transaction Id, ethAmount, timeStamp 
    return (
    <ul>
    <li>Transaction ID: {transaction.id}</li>
    <li>Time Stamp: {new Date(transaction.timeStamp *1000).toUTCString()}</li>
    <li>ethAmount: {transaction.ethAmount} wei</li>
    </ul>
    )
})}
</div>
)}}
    </Query>
)
    }
}

export default Transaction;