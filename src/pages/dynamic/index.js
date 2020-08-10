import React from 'react';
import Dynamic from '../../component/dynamic'
import './index.scss'
// import axios from 'axios';
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            userInfo: {}
        }
    }
    render() {
        return (
            <div className="my-wrap">
                <div className="context">
                    <Dynamic history={this.props.history}></Dynamic>
                </div>
            </div>
        )

    }
}