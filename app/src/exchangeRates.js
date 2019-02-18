import React, { Component } from "react"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize';
import Transactions from './transactions';
import graphql from 'react-apollo';
import EthBalances from './ethBalances';


const Web3 = require('web3');

const QUERY = gql`
{
    users(first:10) {
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

class Users extends Component{
  constructor(props){
    super(props);
    this.state ={
      ids: []
    }
  }

setStateUserAddress(userId){
  this.setState({
    ids: [...this, userId]
  })
}


  render(){
    
    return (
<div>
      <Query
    query={QUERY}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
          return (
                <div>
                  {data.users.map((user, index) => {
                   this.state.ids.push(user.id)
                    
                   return (
                      <Collapsible key={user.id}>
                        <CollapsibleItem header={`User ID: ${user.id}`} icon='account_circle'>
                        Eth Balance: <EthBalances address={user.id} /><br/>
                        Transactions: <Transactions user={user.id} />
                        </CollapsibleItem>
                      </Collapsible>
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

export default Users;

/**  <Collapsible>
<CollapsibleItem header={`User: ${user.id} | Eth Balance: ${user.exchangeBalances[0].ethBought - user.exchangeBalances[0].ethWithdrawn} wei` }icon='account_circle'>
Transactions Here: 
<thead>

    <Transaction user={user.id} /> 
        
        </thead>
</CollapsibleItem>
</Collapsible>  ;*/