import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";

const client = new ApolloClient({
    uri:"https://48p1r2roz4.sse.codesandbox.io"
});

const Root = () =>{
    client
        .query({
        query: gql`
        {
          rates(currency: "USD") {
              currency
            }
          }
        `}).then(result => console.log(result));
      
    return (<div>loading</div>)
}
ReactDOM.render(<Root />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
