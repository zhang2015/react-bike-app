import React, { Component } from 'react';
import util from '../../pub/util'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import './index.scss'
let storage = window.localStorage;
class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            subcomment: "",
            touserid: "",
            commentid: '',
            placeholdername: ''
        }
    }
    componentDidMount() {
    }
    handleClickOpen = (params) => {
        console.log(params)
        this.setState({
            open: true,
            placeholdername: params.nickname,
            commentid: params.commentid
        })
    }
    handleClose = () => {
        this.setState({
            subcomment: '',
            open: false
        })
    }
    handleChage = (e) => {
        this.setState({
            subcomment: e.target.value
        })
    }
    settouserid = (params, id) => {
        this.setState({
            open: true,
            touserid: params.fromuserid,
            placeholdername: params.fromnickname,
            commentid: id
        })
    }
    toUserDetail=(userid)=>{
        this.props.history.push(`/user-detail/${userid}`);
    }
    replycomment = () => {
        axios.post('/players/replyComment', {
            params: {
                fromuserid: storage.getItem('userId'),
                touserid: this.state.touserid,
                dynamicsid: this.props.dynamicsid,
                content: this.state.subcomment,
                commentid: this.state.commentid,
            }
        }).then(data => {
            if(data.data.status === '0'){
                this.props.commentlist.forEach(element => {
                    if(element.commentid === this.state.commentid){
                        element.subcommentlist.push(data.data.result)
                    }
                });
                this.handleClose()
            }
        })
    }
    render() {
        return (

            <div className="comments-list">
                {
                    this.props.commentlist && this.props.commentlist.map((item, index) => {
                        return (
                            <div className="comment-item" key={index}>
                                <div className="comment-head">
                                    <img src={item.avatarurl} alt={item.username} />
                                </div>
                                <div className="comment-content">
                                    <p className="comment-content-name">{item.nickname ? item.nickname : item.username}</p>
                                    <p className="comment-content-create">{util.dateDiff(item.createtime)}</p>
                                    <p className="comment-content-content" onClick={this.handleClickOpen.bind(this, item)}>{item.content}</p>
                                    {
                                        item.subcommentlist && item.subcommentlist.map((element, indexs) => {
                                            let subcomment = null
                                            if (element.tousername) {
                                                subcomment = <p className="subcomment-item" key={indexs}><span onClick={this.toUserDetail.bind(this,element.fromuserid)}>{element.fromnickname ? element.fromnickname : element.fromusername}</span><i>{element.touserid ? '回复' : ''}</i><span onClick={this.toUserDetail.bind(this,element.touserid)}>{element.tonickname ? element.tonickname : element.tousername}</span><i>：{element.content}</i></p>
                                            } else {
                                                subcomment = <p className="subcomment-item" key={indexs}><span onClick={this.toUserDetail.bind(this,element.fromuserid)}>{element.fromnickname ? element.fromnickname : element.fromusername}</span><i>：{element.content}</i></p>
                                            }
                                            return (
                                                <div className="" onClick={this.settouserid.bind(this, element, item.commentid)} key={indexs}>
                                                    {subcomment}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">回复评论</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="回复内容"
                            type="text"
                            fullWidth
                            value={this.state.subcomment}
                            onChange={this.handleChage}
                            placeholder={`回复${this.state.placeholdername}`}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.replycomment} color="primary">
                            提交
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default Comments;