import React, { Component } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import './index.scss';
class Login extends Component {
   constructor(props) {
      super(props);
      this.state = { userName: '', pass: '', open: false, message: "" };
      this.handleChangeUserName = this.handleChangeUserName.bind(this);
      this.handleChangePass = this.handleChangePass.bind(this);
   }
   handleChangeUserName(event) {
      this.setState({ userName: event.target.value });
   }
   handleChangePass(event) {
      this.setState({ pass: event.target.value });
   }
   login(e) {
      if (!this.state.userName || !this.state.pass) {
         this.setState({
            message: "请填写用户名密码",
            open: true
         })
         return false
      }
      axios.post('/players/login', {
         params: {
            userName: this.state.userName,
            pass: this.state.pass
         }
      }).then((response) => {
         console.log(response.data)
         if (response.data.status==0) {//eslint-disable-line
            let storage=window.localStorage;
            storage.setItem('userId',response.data.result.userid);
            storage.setItem('userInfo',JSON.stringify(response.data.result));
            this.props.history.push(`/home/my`);
         }else if(response.data.status ==1){//eslint-disable-line
            this.setState({
               message: response.data.msg,
               open: true
            })
            return false
         }
      }).catch((error) => {
         console.log(error);
      })
   }
   handleClose = (e) => {
      this.setState({
         open: false
      })
   }
   render() {
      return (
         <div className="login-wrap">
            <div className="login-box">
               <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} placeholder="Username"/>
               <input type="password" value={this.state.pass} onChange={this.handleChangePass} placeholder="Password"/>
               <p className="desc">《木有用户协议》</p>
               <div className="login-btn" onClick={this.login.bind(this)}>sign in/sign up</div>
               <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  autoHideDuration={2000}
                  open={this.state.open}
                  onClose={this.handleClose}
                  message={this.state.message}
                  key="message"
               />
            </div>
         </div>
      );
   }
}
export default Login;