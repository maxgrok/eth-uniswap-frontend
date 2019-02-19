import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { graphql } from 'react-apollo';

const TRANS_QUERY = gql` 
    {
      transactions(first: 4, where: $userAddress, first: 10) {
        id
        ethAmount
        timeStamp
      }
    }`

class Transaction extends Component{
  constructor(props){
    super(props);
    this.state = {
      transactions: []
    }
  }
  
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
{data.transactions.map((transaction, index)=>{
//display the transaction Id, ethAmount, timeStamp
index = index + 1;
    return (
    <div key={transaction.id}>
      <p>{index}) Transaction ID: {transaction.id}</p>
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
  options: (props) => {return {variables: {userAddress: props.user }}}
})(Transaction);