import React, { Component } from 'react';
import './App.css';
import Popup from "reactjs-popup";

const axios = require('axios');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      ethBalances: [],
      to: "",
      from: "",
      ethAmount: 0
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
       this.setState({users: result.data.users.map((user)=>{return user.id})});
       this.setState({ ethBalances:  result.data.users.map((user)=>{
        return user.exchangeBalances.map((props)=>{
          return props.ethBought-props.ethWithdrawn;
        })})});
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
      <li key={balance} className="collection-item">
          ETH Balance: {balance} wei
      </li>
    )
  })
}

// onSubmit(event){
//   event.preventDefault();
//   //reach out to backend server and add a new song to collection
//   // mutation needed
//   this.props.mutate({
//       variables: { title: this.state.title},
//       refetchQueries: [{ query }]
//   }).then(() => hashHistory.push('/')); //keeping track of history of user navigation
// }

displayForm(e){
  e.preventDefault();
  e.target.value ="Transfer ETH"
  if(e.target.value = "Transfer ETH"){
    return this.renderForm();
    }
  }
  
  updateTo(e){
    e.preventDefault();
    console.log(e.target.value);
  }

  onSubmitForm(e){
    e.preventDefault();
  }
  
  // handleChangeEthAmount(e){
  //   e.preventDefault()
  //   this.setState({ ethAmount: e.target.value })
  // }
  // handleChangeTo(e){
  //   e.preventDefault()
  //   this.setState({ to: e.target.value })
  // }
  // handleChangeFrom(e){
  //   e.preventDefault()
  //   console.log(e.target.value)
  //   this.setState({ from: e.target.value })
  // }
  render() {
    return (
      <div>
      <div className="container">
        
        <h3>Terminal Challenge</h3>
        </div>
        <div className="row">
      <div className="col s6" style={{float: "left"}}>
      <ul className="collection">
          {this.renderUsers()}
        </ul>
        </div>
        <div className="col s6" style={{ float: "right"}}>
        <ul className="collection">
          {this.renderEthBalance()}
        </ul>
        </div>
        </div>
        
        <div className="container">
        <Popup trigger={<button>Transfer ETH</button>} position="right center">
    <div>
    <form handleSubmit={this.handleSubmit}>
        
        <input />
        <label>To: </label>
        <input type="text" value={this.state.to} onChange={this.handleChangeTo} />

        <label>From: </label>
        <input value={this.state.to} onChange={this.handleChangeFrom} />

        <label> Amount of ETH: </label>
        <input value={this.state.ethAmount} onChange={this.handleChangeEthAmount} />
        <br/><br />
        <button>Transfer ETH</button>
      </form>
    </div>
  </Popup>
        </div>
        </div>
    );
  }
}
export default App;

