import React, {Component} from "react";
import {Button} from 'react-materialize';

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

    handleSubmit(e){
        e.preventDefault();
            //submit transaction change to apollo internal cache

            //add Ether to toBalance 
            //replace Eth Balance of that account with new Eth balance
            //remove Ether from fromBalance
            //replace Eth Balance of that account with new Eth Balance
            //optimisticResponse updated in UI
            //alert Popup confirming transfer complete
        
        return (
            <PopUp>
                Transfer Complete! 
            </PopUp>
        )
    }
    render(){
        return (
           <form onSubmit={this.handleSubmit.bind(this)}>
               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.setState({ to: e.target.value})}value={this.state.to}/>
               <label >To: </label>

               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.setState({ from: e.target.value})} value={this.state.from}/>
               <label >From: </label>

               
               <input style={{"textAlign":"center"}} onChange={(e) =>this.setState({ ethAmount: e.target.value})} value={this.state.ethAmount}/>
               <label>ETH Amount: </label>

               <br/>
               <br/>
                <Button>Transfer ETH</Button>
            </form>
        )
    }
}

export default TransferEthForm;