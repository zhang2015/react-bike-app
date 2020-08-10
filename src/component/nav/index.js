import React, { Component } from 'react';
import './index.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state={ }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="nav">
                <a href='#/home'>首页</a>
                {/* <a href='#/push'>发布</a> */}
                <a href='#/login'>个人中心</a>
            </div>
        );
    }
}
export default Nav;