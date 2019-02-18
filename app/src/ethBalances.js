import React, {Component} from 'react';

const Web3 = require('web3');

class EthBalances extends Component{
    constructor(props){
        super(props);
        this.state = {
            ids: [],
            balance: ""
        }
    }

    componentDidMount(){
        this.setState({ ids: this.props.users})
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
            <li>{this.state.balance}</li>
        )
    }
}

export default EthBalances;
