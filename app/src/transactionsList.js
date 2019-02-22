import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { graphql } from 'react-apollo';


class TransactionsList extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      userAddress: this.props.user
    }
  }

  componentDidMount(){
    this.state.users.push(this.props.user);
  }
  componentWillReceiveProps(){
    this.setState({})
  }
  render(){
    return (
      <React.Fragment>
        <Query 
      query={TRANS_QUERY}
      pollInterval={3000}
      variables={{$userAddress: this.state.userAddress }}
      >
            {({ loading, error, data, refetch, fetchMore}) => {

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
          index = index + 1;
            return (
            <tr key={`tx-${transaction.id}`}>
              <td>{index}</td>
              <td>{transaction.id}</td>
              <td>{new Date(transaction.timeStamp * 1000).toUTCString()}</td>
              <td>{transaction.ethAmount} wei</td>
              <td>{transaction.tokenSymbol}</td>
              <td>{transaction.fee} wei</td>
            </tr>
            )
            }
      )}
        </tbody>
        </table>
        </div>
        )}}
            </Query>
            </React.Fragment>
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
  name: "MyQuery",
  options: (props) => {return {variables: {userAddress: props.user }}}
})(TransactionsList);