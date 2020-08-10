import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config'
import './index.scss'
import AddImg from '../../static/images/add.png'

export default class My extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: props.route,
        }
    }
    toRelease = () => {
        this.props.history.push(`/release`);
     }
    render() {
        const route = this.state.route;
        return (
            <div className="wrap">
                <div className="content">{renderRoutes(route.children)}</div>
                
                <div className="nav">
                    <ul>
                        <li>
                            <Link to="/home/index">首页</Link>
                        </li>
                        <li>
                            <Link to="/home/my">个人中心</Link>
                        </li>
                    </ul>
                    <div className="release" onClick={this.toRelease}>
                        <img src={AddImg} alt="add"/>
                    </div>
                </div>
            </div>
        )
    }
}