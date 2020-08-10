import React, { Component } from 'react';
import axios from "axios";
import Deletebtn from '../../component/delete';
import Nav from '../../component/nav';
import './index.css';
import {withRouter,Link} from 'react-router-dom'
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
                {/* <Nav /> */}
                {/* <Link to="/home/index">首页</Link>
                <Link to="/home/my">个人中心</Link> */}
                <a href='#/home/index'>首页</a>
                {/* <a href='#/push'>发布</a> */}
                <a href='#/login'>个人中心</a>
                {this.props.children}
                {/* <h2 className="title">Home</h2>
                {this.state.list.map((element) =>
                    <div className="listItem" key={element._id}>{element.name}<Deletebtn id={element.id} /></div>
                )} */}
            </div>
        );
    }
}
export default withRouter(Home);