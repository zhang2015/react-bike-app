import React from 'react';
import Head from '../../component/head'
import Dynamic from '../../component/dynamic'
import './index.scss'
let storage = window.localStorage;
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="my-wrap">
                <div className="my-wrap-bg"></div>
                <Head userid={storage.getItem('userId')} history={this.props.history}></Head>
                <div className="context">
                    <div className="dynamics-title"><span>动态</span></div>
                    <Dynamic history={this.props.history} userid={storage.getItem('userId')}></Dynamic>
                </div>
            </div>
        )

    }
}