import React from 'react';
import dianzan from '../../static/images/dianzan.png'
import undianzan from '../../static/images/undianzan.png'
import pinglun from '../../static/images/pinglun.png'
import shoucang from '../../static/images/shoucang.png'
import util from '../../pub/util'
import './index.scss'
import axios from 'axios';
let storage = window.localStorage;
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            userInfo: {},
            dynamicList: [],
            page: 1,
            noMore: false
        }
    }
    componentDidMount() {
        if (this.props.userid) {
            this.getDynamicList(this.props.userid)
        } else {
            this.getDynamicList()
        }
    }

    getDynamicList(userid) {
        axios.get('/players/getDynamicsList', {
            params: {
                userid: userid,
                page: this.state.page,
                pageSize: 10,
                sort: -1
            }
        }).then((data) => {
            console.log(data.data.result)
            let arr = data.data.result.list;
            if (arr.length<10) {
                this.setState({
                    noMore: true
                })
            }
            arr.forEach(element => {
                element.thumbslist.forEach(item => {
                    if (item.userid === storage.getItem('userId')) {
                        element.dianzan = true
                    }
                })
            });
            this.setState({
                dynamicList: [...this.state.dynamicList, ...arr]
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    thumbs = (params, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        console.log(params.dynamicsid, params.dianzan)
        let type = true;
        if (params.dianzan) {
            type = false
        }
        axios.post('/players/thumbs', {
            params: {
                dynamicsid: params.dynamicsid,
                commentid: '',
                userid: storage.getItem('userId'),
                type: type
            }
        }).then(data => {
            console.log(data.data.status)
            if (data.data.status === '0') {
                let dynamicList = this.state.dynamicList
                dynamicList.forEach((element, index) => {
                    if (element.dynamicsid === params.dynamicsid) {
                        element.dianzan = type;
                        element.thumbs = type ? element.thumbs + 1 : element.thumbs - 1
                    }
                })
                this.setState({
                    dynamicList: dynamicList
                })
            }
        })
    }
    toDetail(userid, e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (userid === storage.getItem('userId')) {
            return
        }
        if (this.props.match && this.props.match.path === '/user-detail/:userid') {
            return
        }
        this.props.history.push(`/user-detail/${userid}`);
    }
    toDynamicDetail(dynamicsid, e) {
        this.props.history.push(`/dynamic-detail/${dynamicsid}`);
    }
    loadnext = () => {
        if (this.state.noMore) {
            return
        }
        this.setState({
            page: this.state.page + 1
        }, () => {
            if (this.props.userid) {
                this.getDynamicList(this.props.userid)
            } else {
                this.getDynamicList()
            }
        })
    }
    render() {
        return (
            <div className="dynamics-list">
                {
                    this.state.dynamicList.map((element, index) => {
                        return (
                            <div className="dynamics-item" key={index} onClick={this.toDynamicDetail.bind(this, element.dynamicsid)}>
                                <div className="dynamics-head" onClick={this.toDetail.bind(this, element.userid)}>
                                    <img src={element.avatarurl ? element.avatarurl : 'http://xdfaiweb.oss-cn-beijing.aliyuncs.com/minapp/desklamp/images/avatar.jpg'} alt={element.username} className="dynamics-avatar" />
                                    <div className="dynamics-user">
                                        <p className="dynamics-username">{element.nickname ? element.nickname : element.username}</p>
                                        <p className="dynamics-createtime">{util.dateDiff(element.createtime)}</p>
                                    </div>
                                </div>
                                <p className="content">{element.content}</p>
                                <div className={`dynamic-img ${element.imgurl.length === 1 ? 'dynamic-img-only' : null}`}>
                                    {element.imgurl.map((item, indexs) => {
                                        return <img src={item} key={indexs} alt={indexs} className="dynamic-imgitem" />
                                    })}
                                </div>
                                <div className="dynamic-option">
                                    <p onClick={this.thumbs.bind(this, { dynamicsid: element.dynamicsid, dianzan: element.dianzan })}><img src={element.dianzan ? dianzan : undianzan} alt="点赞" className="dianzan" /><span>{element.thumbs}</span></p>
                                    <p><img src={pinglun} alt="评论" className="pinglun" /><span>{element.comment}</span></p>
                                    <p><img src={shoucang} alt="收藏" className="shoucang" /><span>{element.forward}</span></p>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="loadnext" onClick={this.loadnext}>{!this.state.noMore?"加载更多":"没有更多"}</div>
            </div>
        )
    }
}