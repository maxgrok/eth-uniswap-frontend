import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Query, refetch } from "react-apollo";
import { graphql } from 'react-apollo';


class TransactionsList extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      userAddress: this.props.user,
      isClicked: false
    }
  }

  componentDidMount(){
    this.state.users.push(this.props.user);
  }
  componentWillReceiveProps(){
    this.refresh();
  }

  onChange(e){
    this.setState({userAddress: e.target.id});
  }

  refresh() {
    this.props.refetch({
      userAddress: this.state.userAddress
    });
  }

  render(){
    return (
      <React.Fragment>
        <Query 
        id={this.state.userAddress}
      query={TRANS_QUERY}
      variables={{userAddress: this.state.userAddress }}
      pollInterval={3000}
      onChange={(e)=>{refetch({variables: {userAddress: e.target.id}})}}
      value={this.state.userAddress}
      >
            {({ loading, error, data, refetch, fetchMore}) => {

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
        
        return (
        <div>
          <br/>
          <br/>
        <table>
              <thead>
              <tr>
                <th>Tx#</th>
                <th>Transaction ID</th>
                <th>TimeStamp</th>
                <th>ethAmount</th>
                <th>Token Symbol</th>
                <th>Gas/Fee</th>
              </tr>
            </thead>
        {data.transactions.map((transaction, index)=>{
          index = index + 1;
            return (
              <tbody id="transaction" style={{"border-bottom":"2px solid #D0D0D0"}}>
            <tr key={`tx-${transaction.id}`}>
              <td>{index}</td>
              <td>{transaction.id}</td>
              <td>{new Date(transaction.timeStamp * 1000).toUTCString()}</td>
              <td>{transaction.ethAmount} wei</td>
              <td>{transaction.tokenSymbol}</td>
              <td>{transaction.fee} wei</td>
            </tr>
            </tbody>
            )
            }
      )}
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

export default TransactionsList;