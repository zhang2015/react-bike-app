import React from 'react';
import Head from '../../component/head'
import Dynamic from '../../component/dynamic'
import './index.scss'
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
                <Head userid={this.props.match.params.userid} history={this.props.history}></Head>
                <div className="context">
                    <div className="dynamics-title"><span>动态</span></div>
                    <Dynamic history={this.props.history} match={this.props.match} userid={this.props.match.params.userid}></Dynamic>
                </div>
            </div>
        )

    }
}