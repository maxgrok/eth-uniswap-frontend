import React, {Component} from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import {InMemoryCache} from 'apollo-cache-inmemory';
import TransferEthForm from './transferEthForm';
import {Collapsible, CollapsibleItem} from 'react-materialize';
// import { Router, Route, Link, IndexRoute} from 'react-router';
// import { HttpLink } from 'apollo-link-http';
import ReactDOM from 'react-dom';
import UserList from './exchangeRates';

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap", 
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id || null,
  })});

class App extends Component{
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
      <ul>
          <UserList />
      </ul>
    </div>
  </ApolloProvider>
)}
    }

    export default App;