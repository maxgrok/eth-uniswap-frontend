import React, {Component} from "react";
import {Button} from 'react-materialize';

class TransferEthForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            to: "", 
            from: "",
            ethAmount: 0
        }
    }

    handleSubmit(e){
        e.preventDefault();
            //submit transaction change to apollo internal cache
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