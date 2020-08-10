import React, { Component } from 'react';
import './index.scss'
import axios from 'axios';
let storage = window.localStorage;
class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owns: true,
            followed: false,
            benoticed: 0,
            userInfo: {}
        }
    }
    componentDidMount() {
        this.getUserInfo()
        if (this.props.userid !== storage.getItem('userId')) {
            this.setState({
                owns: false
            })
        }
    }
    getUserInfo() {
        axios.post('/players/userInfo', {
            params: {
                userid: this.props.userid
            }
        }).then((data) => {
            console.log(data.data.result)
            let followed = false
            if (data.data.result.benoticedlist) {
                data.data.result.benoticedlist.forEach(element => {
                    if (element.userid === storage.getItem('userId')) {
                        followed = true
                    }
                });
            }
            this.setState({
                userInfo: data.data.result,
                followed: followed
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    setting = () => {
        if (this.state.owns) {
            this.props.history.push(`/setting`);
        }
    }
    followStatus = () => {
        axios.post('/players/follow', {
            params: {
                type: !this.state.followed,
                userid: storage.getItem('userId'),
                targetuserid: this.props.userid
            }
        }).then(data => {
            if (data.data.status === '0') {
                let userinfo = this.state.userInfo;
                userinfo.benoticed = data.data.result.benoticed;
                this.setState({
                    followed: !this.state.followed,
                    userInfo: userinfo
                })
            }
        })
    }
    render() {
        let follow = null
        if (this.state.owns) {
            follow = <p className="follow">关注：{this.state.userInfo.follow}</p>
        } else {
            follow = <p className={this.state.followed ? "followed-btn" : "follow-btn"} onClick={this.followStatus}>{this.state.followed ? '已关注' : '关注'}</p>
        }
        return (
            <div className="head">
                <div className="userinfo" onClick={this.setting}>
                    <div className="info">
                        <p className="username">{this.state.userInfo.nickname ? this.state.userInfo.nickname : 'ACE'}</p>
                        <p className="sign">{this.state.userInfo.slogan ? this.state.userInfo.slogan : '真懒什么也不写'}</p>
                    </div>
                    <div className="avatarimg">
                        <img src={this.state.userInfo.avatarurl ? this.state.userInfo.avatarurl : "http://xdfaiweb.oss-cn-beijing.aliyuncs.com/minapp/desklamp/images/avatar.jpg"} alt={this.state.userInfo.username} />
                    </div>
                </div>
                <div className="status">
                    {follow}
                    <p className="benotice">被关注：{this.state.userInfo.benoticed}</p>
                </div>
            </div>
        );
    }
}
export default Head;