import React, { Component } from 'react';
import axios from "axios";
import Deletebtn from '../../component/delete';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { list: [] }
    }
    componentDidMount() {
        this.getListData();
    }
    getListData() {
        axios.get('/goods', {
            params: {
                page: 1,
                pageSize: 10,
                sort: 1
            },
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
        })
            .then((response) => {
                this.setState({
                    list: response.data.result.list
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
            <div>
                <h2>Home</h2>
                {this.state.list.map((element) =>
                    <div key={element._id}>{element.name}<Deletebtn id={element.id} /></div>
                )}
            </div>
        );
    }
}
export default Home;