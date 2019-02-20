import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { graphql } from 'react-apollo';

class Transaction extends Component{
  constructor(props){
    super(props);
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
        <table>
              <thead>
              <tr>
                <th>Tx#</th>
                <th>Tx ID</th>
                <th>TimeStamp</th>
                <th>ethAmount</th>
                <th>Token Symbol</th>
                <th>Fee</th>
              </tr>
            </thead>
          <tbody>
        {data.transactions.map((transaction, index)=>{
          if (index< 10){
            index = index + 1;
            return (
            <tr key={transaction.id}>
              <td>{index}</td>
              <td>{transaction.id}</td>
              <td>{new Date(transaction.timeStamp * 1000).toUTCString()}</td>
              <td>{transaction.ethAmount} wei</td>
              <td>{transaction.tokenSymbol}</td>
              <td>{transaction.fee} wei</td>
            </tr>
            )
          }
        }
      )}

        </tbody>
        </table>
        </div>
        )}}
            </Query>
        )
            }
        }

const TRANS_QUERY = gql` 
    {
      transactions(where: $userAddress, orderBy: timeStamp, orderDirection: desc) {
        id
        ethAmount
        timeStamp
    		tokenSymbol	
    		tokenAmount
    		fee
      }
    }`

export default graphql(TRANS_QUERY, {
  options: (props) => {return {variables: {userAddress: props.user }}}
})(Transaction);