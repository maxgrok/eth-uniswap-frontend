import React, { Component } from 'react';
import './App.css';
// import gql from 'graphql-tag';
// import {graphql} from 'react-apollo';

const axios = require('axios');
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      ethBalances: []
    }
  }

  componentDidMount(){
		this.fetchUsers();
	}
   
  fetchUsers(){
      return axios({
      url: 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap',
      method: "post",
      data:{
        query:`
        {
          users(first: 10) {
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
              currentEthProfit
              currentTokenProfit
              ethBought
              tokensBought
              totalEthFeesPaid
              totalTokenFeesPaid
            }
          }
        }
        `
        }
      }).then((result)=>{
       result = result.data
       this.setState({users: result.data.users.map((user)=>{return user.id})})
       this.setState({ ethBalance:  result.data.users.map((user)=>{
         return user.exchangeBalances.ethBought - user.exchangeBalances.ethWithdrawn
       })})
    })
  }
  

renderUsers(){ 
  return this.state.users.map((id)=>{
    return (
      <li className="collection-item">
          User: {id}
      </li>
    )
  })
}

renderEthBalance(){
  return this.state.ethBalances.map((balance)=>{
    return (
      <li key={balance.id}className="collection-item">
          ETH Balance: {balance}
      </li>
    )
  })
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Terminal Challenge
        </header>
        <ul>
          {this.renderUsers()}
          {this.renderEthBalance()}
        </ul>
      </div>
    );
  }
}

export default App;
