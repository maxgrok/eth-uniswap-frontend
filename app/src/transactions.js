import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { graphql } from 'react-apollo';

const TRANS_QUERY = gql` 
    {
  transactions(where: {userAddress: $userAddress}) {
    id
    ethAmount
    timeStamp
  }
}`
//how to export the prop user (user address) to the TRANS_QUERY

class Transaction extends Component{
    render(){
        return (
        <Query 
      query={TRANS_QUERY}
      >
    {({ loading, error, data }) => {
if (loading) return <p>Loading...</p>;
if (error) return <p>Error :</p>;

return (
<div>
{data.transactions.map((transaction)=>{
//display the transaction Id, ethAmount, timeStamp 
    return (
    <div>
      <p>Transaction ID: {transaction.id}</p>
      <p>Time Stamp: {new Date(transaction.timeStamp *1000).toUTCString()}</p>
      <p>ethAmount: {transaction.ethAmount} wei</p>
    </div>
    )
})}
</div>
)}}
    </Query>
)
    }
}

export default graphql(TRANS_QUERY, {
  options: (props) => {return {variables: {userAddress: props.user}}
}})(Transaction);