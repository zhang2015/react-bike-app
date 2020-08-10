import React from 'react';
import dianzan from '../../static/images/dianzan.png'
import undianzan from '../../static/images/undianzan.png'
import pinglun from '../../static/images/pinglun.png'
import shoucang from '../../static/images/shoucang.png'
import util from '../../pub/util'
import Comments from '../../component/comments'
import Button from '@material-ui/core/Button';
import './index.scss'
import axios from 'axios';
let storage = window.localStorage;
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            userInfo: {},
            dynamicid: '',
            dynamicDetail: {},
            reply: '',
            commentlist: []
        }
    }
    componentDidMount() {
        this.setState({ dynamicid: this.props.match.params.dynamicid }, () => {
            this.getDynamicDetail(this.props.match.params.dynamicid)
        })
    }
    getDynamicDetail = (dynamicid) => {
        axios.get('/players/getDynamicDetail', {
            params: {
                dynamicid: dynamicid,
            }
        }).then((data) => {
            console.log(data.data.result)
            let dynamicDetail = data.data.result
            dynamicDetail.thumbslist.forEach(item => {
                if (item.userid === storage.getItem('userId')) {
                    dynamicDetail.dianzan = true
                }
            })
            this.setState({
                dynamicDetail: dynamicDetail,
                commentlist: dynamicDetail.commentlist
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    thumbs = (params, e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
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
                let dynamicDetail = this.state.dynamicDetail
                dynamicDetail.dianzan = type;
                dynamicDetail.thumbs = type ? dynamicDetail.thumbs + 1 : dynamicDetail.thumbs - 1
                this.setState({
                    dynamicDetail: dynamicDetail
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
        this.props.history.push(`/user-detail/${userid}`);
    }
    handleChange = (e) => {
        this.setState({
            reply: e.target.value
        })
    }
    submit = () => {
        axios.post('/players/sendComment', {
            params: {
                userid: storage.getItem('userId'),
                dynamicsid: this.state.dynamicDetail.dynamicsid,
                content: this.state.reply
            }
        }).then(data => {
           if(data.data.status==='0'){
               console.log(data.data.result)
               this.setState({
                reply: '',
                commentlist: [...this.state.commentlist,data.data.result]
               })
           }
        })
    }
    render() {
        return (
            <div className="my-wrap">
                <div className="context">
                    <div className="dynamics-list">
                        <div className="dynamics-item">
                            <div className="dynamics-head" onClick={this.toDetail.bind(this, this.state.dynamicDetail.userid)}>
                                <img src={this.state.dynamicDetail.avatarurl ? this.state.dynamicDetail.avatarurl : 'http://xdfaiweb.oss-cn-beijing.aliyuncs.com/minapp/desklamp/images/avatar.jpg'} alt={this.state.dynamicDetail.username} className="dynamics-avatar" />
                                <div className="dynamics-user">
                                    <p className="dynamics-username">{this.state.dynamicDetail.nickname ? this.state.dynamicDetail.nickname : this.state.dynamicDetail.username}</p>
                                    <p className="dynamics-createtime">{util.dateDiff(this.state.dynamicDetail.createtime)}</p>
                                </div>
                            </div>
                            <p className="content">{this.state.dynamicDetail.content}</p>
                            <div className={`dynamic-img ${this.state.dynamicDetail.imgurl && this.state.dynamicDetail.imgurl.length===1?'dynamic-img-only':null}`} >
                                {this.state.dynamicDetail.imgurl && this.state.dynamicDetail.imgurl.map((item, indexs) => {
                                    return <img src={item} key={indexs} alt={indexs} className="dynamic-imgitem" />
                                })}
                            </div>
                            <div className="dynamic-option">
                                <p onClick={this.thumbs.bind(this, { dynamicsid: this.state.dynamicDetail.dynamicsid, dianzan: this.state.dynamicDetail.dianzan })}><img src={this.state.dynamicDetail.dianzan ? dianzan : undianzan} alt="点赞" className="dianzan" /><span>{this.state.dynamicDetail.thumbs}</span></p>
                                <p><img src={pinglun} alt="评论" className="pinglun" /><span>{this.state.dynamicDetail.comment}</span></p>
                                <p><img src={shoucang} alt="收藏" className="shoucang" /><span>{this.state.dynamicDetail.forward}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="comment-list">
                        <p className="comment-title">评论：</p>
                        <Comments history={this.props.history} dynamicsid={this.state.dynamicDetail.dynamicsid} commentlist={this.state.commentlist}></Comments>
                        <div className="reply-box">
                            <input type='text' className='reply-input' value={this.state.reply} onChange={this.handleChange} placeholder={`回复${this.state.dynamicDetail.nickname ? this.state.dynamicDetail.nickname : this.state.dynamicDetail.username}:`} />
                            <Button variant="contained" color="primary" onClick={this.submit} className="sub-btn">发送</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}