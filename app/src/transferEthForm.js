import React, {Component} from "react";

import {Button, Modal} from 'react-materialize';
// import query from './queries/fetchUsers';
// import gql from 'graphql-tag';
// import graphql from 'apollo-boost';
// import ReactDOM from 'react-dom';
import Transaction from './transaction';

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

        let promiseWei = web3.utils.fromWei(balance, 'ether'); 

        let ether = await promiseWei;

        return ether
    }
    updateBalance(toBalance, fromBalance){
        let newFromBalance = this.state.fromBalance - this.state.ethAmount;
        //update the corresponding collapsible with the key of the address to have newFromBalance 
        //and highlight it in the UI 
         //optimisticResponse updated in UI
 
             //add Ether to toBalance 
       let newToBalance = parseFloat(this.state.toBalance) + parseFloat(this.state.ethAmount);
     //update the corresponding collapsible with the key of the address to have newFromBalance 
        //and highlight it in the UI 
        //optimisticResponse updated in UI
        
        this.setState({ toBalance: newToBalance });
        this.setState({ fromBalance: newFromBalance });
        //alert Popup confirming transfer complete 
        
    }
    async handleSubmit(e){
        e.preventDefault();
        //get balance of To account
        const toBalancePromise = await this.getBalance(this.state.to).then(result =>{
            return result;
            });
            
            let toBalance = await toBalancePromise;
            //update state of To account balance
            this.setState({ toBalance: toBalance });
          
            //get balance of From account       
            const fromBalancePromise = await this.getBalance(this.state.from).then(result =>{ 
                return result
            });
    
            let fromBalance = await fromBalancePromise;

            //update state for From account balance
            this.setState({ fromBalance: fromBalance });
            
            //update balances with ethAmount transfer
            this.updateBalance(toBalance, fromBalance);
            
            //render the div with the confirmation of transaction 
            this.setState({ to: "", toBalance: 0, from: "", fromBalance: 0, ethAmount: 0});
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
            <div>
           <form onSubmit={this.handleSubmit.bind(this)}>
               
               <input style={{"textAlign":"center"}} onChange={(e) =>{this.handleTo(e)} }value={this.state.to} name="to"/>
               <label >To: </label>

               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.handleFrom(e)} value={this.state.from} name="from"/>
               <label >From: </label>

               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.handleEthAmount(e)} value={this.state.ethAmount} name="ethAmount" />
               <label>ETH Amount: </label>

               <br/>
               <br/>
               <Modal
  header='Transfer Complete!'
  trigger={<Button waves='light'>Transfer Eth</Button>} onClick={(e)=> {this.handleSubmit(e)}}>
  <Transaction tx={this.state} />
</Modal>
            </form>
             </div>
        )
    }
}

// const mutationBalance = gql`
// {
//     mutation addTransactions($id: Int!, $ethAmount: Int!, $to: String!, $from: String!, $toBalance: String!, $fromBalance: String!, $toNewBalance: String!, $fromNewBalance: String!){
//         transaction(
//             id: $id
//             ethAmount: $ethAmount,
//             to: $to,
//             from: $from,
//             toBalance: $toBalance, 
//             fromBalance: $fromBalance
//             toNewBalance: $newToBalance,
//             fromNewBalance: $newFromBalance
//             ){
//                 id
//                 timeStamp
//                 to
//                 from
//                 toBalance
//                 fromBalance
//                 toNewBalance
//                 fromNewBalance
//             }
//         }
//     }
// }
// `

export default TransferEthForm;