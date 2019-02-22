import React, {Component} from 'react';
import EthBalances from './ethBalances';
import $ from 'jquery';
import {Collapsible, CollapsibleItem} from 'react-materialize';
import Web3 from 'web3';
import TransactionsList from './transactionsList';

class User extends Component{
    constructor(props){
        super(props);
        this.state ={
            user: "",
            balance: "",
            toggleOn: false
        }
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
    
    async handleClick(e){
        e.preventDefault();
       const user = e.target.id;
       const balance = await this.setBalance(e.target.id);

       if(user !== this.state.user && balance !== this.state.balance){

       this.setState({user: user, balance: balance, toggleOn:true})
       }
    }

    render(){
        return(
            <div className="row" id={`${this.props.address}`} onClick={(e)=> this.handleClick(e)}>
            <div className="col s12" id={`${this.props.address}`}>
              <div className="card gray darken-1" id={`${this.props.address}`}>
                <div className={`card-content`} id={`${this.props.address}`} >
                  <span className={`card-title`}><p id={`${this.props.address}`} style={{"float":"left"}}>{this.props.address}</p></span>
                  <span className="ethBalanceParent" style={{"font":"24px", "float":"right","fontWeight":"300"}}><EthBalances address={this.props.address} setBalance={this.setBalance} onClick={(e)=>this.handleClick}/>
                </span>
                  </div>
                <br />
                <br />
              </div>
            </div>
          </div>
        )
    }
}
export default User;