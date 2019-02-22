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
import User from './user';

class UserList extends Component{
  constructor(props){
    super(props);
    this.state={
      user:"",
      balance: ""
    }
  }
handleClick(e){
  e.preventDefault();
  console.log($(`#id`).html());
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
          <Collapsible>
      <Query
    query={QUERY}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
          return (
                <div>
                  {data.users.map((user, index) => {
                   return (
                     <div>
                      <User id="id" address={user.id} onClick={(e)=>{this.handleClick(e)}}/>
                      </div>
                        )
                  })}
                </div>
                )
            }}
    </Query>
    </Collapsible>
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
export default UserList;

/**  <Collapsible>
<CollapsibleItem header={`User: ${user.id} | Eth Balance: ${user.exchangeBalances[0].ethBought - user.exchangeBalances[0].ethWithdrawn} wei` }icon='account_circle'>
Transactions Here: 
<thead>

    <Transaction user={user.id} /> 
        
        </thead>
</CollapsibleItem>
</Collapsible>  ;*/