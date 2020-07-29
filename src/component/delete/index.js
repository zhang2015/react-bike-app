import React, { Component } from 'react';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    deleteItem =()=> {
        axios.get('/delete', {
            params: {
                id: this.props.id
            },
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log(response.data)
                this.setState({
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isLoaded: false,
                    error: error
                })
            })
    }
    render() {
        return (
            <div onClick={this.deleteItem}>
                删除                
            </div>
        );
    }
}
export default Home;