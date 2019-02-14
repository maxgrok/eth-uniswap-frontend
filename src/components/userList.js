import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class UserList extends Component{
    renderUsers(){
        return this.props.data.users.map(({id}) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`users/${id}`}>User: {id}</Link>
                </li>
            )
        });
    }

    render(){
        return (
            <div>
                {this.renderUsers()}
            </div>
        )
    }
}

const query = gql`
    {
        users(first:10){
            id
        }
    }
`

export default graphql(query)(UserList);