import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Users from './exchangeRates';
import TransferEthForm from './transferEthForm';
import {Collapsible, CollapsibleItem} from 'react-materialize';
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap"
});

const Web3 = require('web3');


class App extends Component{
  componentDidMount(){
    const web3 = new Web3(
      new Web3.providers.HttpProvider('https://mainnet.infura.io/')
    );
  }

  render(){
    return (
  <ApolloProvider client={client}>
    <div className="App">
      <h3>Terminal Challenge</h3>
      <hr></hr>
      <div className="row">
        <div className="col s8">        
          <Collapsible>
                <CollapsibleItem header="Transfer Eth">
                  <TransferEthForm />
                </CollapsibleItem>
          </Collapsible>
          </div>
        </div>
    </div>
    <ul>
      <Users />
    </ul>
  </ApolloProvider>
)}
    }

    export default App;