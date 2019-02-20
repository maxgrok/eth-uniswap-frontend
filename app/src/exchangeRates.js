import React, { Component } from "react"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Collapsible, CollapsibleItem} from 'react-materialize';
import Transactions from './transactions';
// import graphql from 'react-apollo';
import EthBalances from './ethBalances';
// import ReactDOM from 'react-dom';

const {QUERY} = client.readQuery(
  query: gql`{
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
)

class Users extends Component{

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
                   return (
                      <Collapsible key={user.id}>
                        <CollapsibleItem header={`${user.id}`} icon='account_circle'>
                        Eth Balance: <EthBalances address={user.id} /><br/>
                        <div style={{"margin":"0 auto"}}>Transactions:</div> 
                          <Transactions user={user.id} />
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

const QUERY = gql`{
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
export default Users;

/**  <Collapsible>
<CollapsibleItem header={`User: ${user.id} | Eth Balance: ${user.exchangeBalances[0].ethBought - user.exchangeBalances[0].ethWithdrawn} wei` }icon='account_circle'>
Transactions Here: 
<thead>

    <Transaction user={user.id} /> 
        
        </thead>
</CollapsibleItem>
</Collapsible>  ;*/