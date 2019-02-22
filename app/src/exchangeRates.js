import React, { Component } from "react"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Collapsible, CollapsibleItem} from 'react-materialize';
import TransactionsList from './transactionsList';
// import graphql from 'react-apollo';
import EthBalances from './ethBalances';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Icon} from 'react-materialize';

class Users extends Component{
  constructor(props){
    super(props);
    this.state={
      user:"",
      balance: ""
    }
  }
handleClick(e){
  e.preventDefault();
  
}
  render(){
    return (
<div>
      <div className="container">
      <div className="row">
        <div className="col s6" >
          <h3 style={{"textAlign":"left"}}>
          User ID 
          </h3>
          </div>
          <div className="col s6">
          <h3 style={{"textAlign":"right"}}>
            Ether Balance
            </h3>
            </div>
            
          </div>
          </div>
      <Query
    query={QUERY}
    >
      {({ loading, error, data: {users}, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
          return (
                <div>
                  {users.map((user, index) => {
                   return (

                    <div class="row">
    <div className="col s12" >
      <div className="card gray darken-1" >
        <div className="card-content" >
          <span className="card-title"><p style={{"float":"left"}}>{user.id}</p></span>
          <span style={{"font":"24px", "float":"right","font-weight":"300"}}><EthBalances address={user.id} /></span>
        </div>
        <br />
        <br />
      </div>
    </div>
  </div>
                        )
                  })}
                </div>
                )
            }}
    </Query>
    </div>
    )
                    }
}   

const QUERY = gql`{
    users(first:10){
    id
    exchangeBalances {
        id
        userAddress
        exchangeAddress
        ethDeposited
        tokensDeposited
        uniTokensMinted
        uniTokensBurned
        ethWithdrawn
        tokensWithdrawn
        ethBought
        tokensBought
        totalEthFeesPaid
        totalTokenFeesPaid
      }
  }
}
` 
export default Users;

/**  <Collapsible>
<CollapsibleItem header={`User: ${user.id} | Eth Balance: ${user.exchangeBalances[0].ethBought - user.exchangeBalances[0].ethWithdrawn} wei` }icon='account_circle'>
Transactions Here: 
<thead>

    <Transaction user={user.id} /> 
        
        </thead>
</CollapsibleItem>
</Collapsible>  ;*/