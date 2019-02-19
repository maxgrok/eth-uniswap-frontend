import React, {Component} from 'react';
import graphql from 'react-apollo';
import gql from 'graphql-tag';

class calculateTransferEth extends Component{
    constructor(props){
        super(props);
        this.state ={
            to: "",
            from: "", 
            toBalance: 0, 
            fromBalance: 0
        }
    }
    render(){
        return (
            <div>
                {}
            </div>
        )
    }
}

const mutation = gql`
    mutation TransferETH(){
        
    }
`//add transferEthAmount to the toBalance and subtract it from the fromBalance, use optimisticResponses to show the difference in the UI 

export default graphql(mutation, {
    options: (props) => {return {variables: {to: props.toBalance}, {from: props.fromBalance}}}
})(calculateTransferEth);