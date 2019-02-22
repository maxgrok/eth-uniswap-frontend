import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const Web3 = require('web3');

class EthBalances extends Component{
    constructor(props){
        super(props);
        this.state = {
            balance: ""
        }
    }

    componentDidMount(){
        this.setBalance(this.props.address).then(result => this.setState({
              balance: result
            }));
          }


    async setBalance(address){
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

    render(){
        return (
            <div style={{"float":"right", "margin": "0 0 0 0"}}>
            <p key={`${this.state.balance}`} id="ethBalance" style={{ "textAlign": "left","font":"24px", "font-weight":"300"}}><strong id={this.props.address} onClick={(e)=> this.props.onClick(e)}>{parseFloat(this.state.balance)}</strong></p>
                 </div>
        )
    }
}

export default EthBalances;
