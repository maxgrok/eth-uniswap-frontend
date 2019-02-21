import React, { Component } from "react"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {Collapsible, CollapsibleItem} from 'react-materialize';
import TransactionsList from './transactionsList';
// import graphql from 'react-apollo';
import EthBalances from './ethBalances';
// import ReactDOM from 'react-dom';


class Users extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
<div>
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
                      <Collapsible>
                        <CollapsibleItem key={user.id} header={`${user.id}`} icon='account_circle'>
                        Eth Balance: <EthBalances key={`EthBalance-${user.id}`} address={user.id} /><br/>
                        <div style={{"margin":"0 auto"}}>Transactions:</div> 
                          <TransactionsList key={`transactions-${user.id}`} user={user.id} />
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