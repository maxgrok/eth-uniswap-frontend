import React, {Component} from "react";

import {Button} from 'react-materialize';
import query from './queries/fetchUsers';
import gql from 'graphql-tag';
import graphql from 'apollo-boost';

const Web3 = require('web3');

class TransferEthForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            to: "", 
            toBalance: 0,
            from: "",
            fromBalance: 0, 
            ethAmount: 0
        }
    }

    async getBalance(address){
        const web3 = new Web3(
            new Web3.providers.HttpProvider('https://mainnet.infura.io/')
          );   

         let promise = web3.eth.getBalance(address).then((res)=>{
            return res;
        })
        
        let balance = await promise; 

        balance = balance.toString()

        let promiseWei = web3.utils.fromWei(balance, 'ether'); 

        let ether = await promiseWei;
        ether = ether.toString();
        return ether
    }

    async handleSubmit(e){
        e.preventDefault();
            //submit transaction change to apollo internal cache
        const toBalancePromise = await this.getBalance(this.state.to).then(result =>{
        return result;
        });
        
        let toBalance = await toBalancePromise;
         this.setState({toBalance: toBalance });
        
        console.log(toBalance);    
        const fromBalancePromise = await this.getBalance(this.state.from).then(result =>{ 
            return result
        });
        let fromBalance = await fromBalancePromise;
        this.setState({ fromBalance: fromBalance });
        
        console.log(fromBalance);
        //remove Ether from fromBalance to get new fromBalance
       const newFromBalance = this.state.fromBalance - this.state.ethAmount;
       //update the corresponding collapsible with the key of the address to have newFromBalance 
       //and highlight it in the UI 
        //optimisticResponse updated in UI

            //add Ether to toBalance 
       const newToBalance = this.state.toBalance + this.state.ethAmount;
        //update the corresponding collapsible with the key of the address to have newFromBalance 
       //and highlight it in the UI 
        //optimisticResponse updated in UI

       console.log(newToBalance);
       console.log(newFromBalance);            
       
       //alert Popup confirming transfer complete 
        return (
            <div>
                Transfer Complete! 
            </div>
        )
    }
    handleTo(e){
        e.preventDefault();
        this.setState({to: e.target.value})
    }
    handleFrom(e){
        e.preventDefault();
        this.setState({ from: e.target.value})
    }
    handleEthAmount(e){
        e.preventDefault();
        this.setState({ ethAmount: e.target.value})
    }
    render(){
        return (
           <form onSubmit={this.handleSubmit.bind(this)}>
               
               <input style={{"textAlign":"center"}} onChange={(e) =>{this.handleTo(e)} }value={this.state.to}/>
               <label >To: </label>

               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.handleFrom(e)} value={this.state.from}/>
               <label >From: </label>

               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.handleEthAmount(e)} value={this.state.ethAmount}/>
               <label>ETH Amount: </label>

               <br/>
               <br/>
                <Button>Transfer ETH</Button>
            </form>
        )
    }
}

const mutationBalance = gql`
    mutation addTransactions($id: Int!, $ethAmount: Int!, $to: String!, $from: String!, $toBalance: String!, $fromBalance: String!, $toNewBalance: String!, $fromNewBalance: String!){
        transaction(
            id: $id
            ethAmount: $ethAmount,
            to: $to,
            from: $from,
            toBalance: $toBalance, 
            fromBalance: $fromBalance
            toNewBalance: $newToBalance,
            fromNewBalance: $newFromBalance
            ){
                id
                timeStamp
                to
                from
                toBalance
                fromBalance
                toNewBalance
                fromNewBalance
            }
        }
    }

`

export default graphql(mutationBalance,{
    options: (props) =>{ variables: {id: props.index}, {timeStamp:"1445692"}, {ethAmount: 2}, {to: "0x000817415963a38c16ba6ccc98f4002684c97697"}, {from: "0x70c26c293e52baf04f4482b147c83df339482816"}, {toBalance: 0}, {fromBalance: 3} {newToBalance: 2}, {newFromBalance: 1} }
})(TransferEthForm);