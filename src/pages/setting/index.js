import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import './index.scss'
let storage = window.localStorage;
class Setting extends Component {
   constructor(props) {
      super(props)
      this.state = {
         // userInfo: {
         userid: "",
         nickname: "",
         password: "",
         avatarurl: "",
         slogan: "",
         createtime: "",
         follow: "",
         benoticed: "",
         phone: "",
         email: "",
         gender: "",
         province: "",
         city: "",
         country: "",
         // }
      }
   }
   componentDidMount() {
      this.getUserInfo()
   }
   getUserInfo() {
      axios.post('/players/userInfo', {
         params: {
            userid: storage.getItem('userId')
         }
      }).then((data) => {
         console.log(data.data.result)
         this.setState({
            ...data.data.result
         })
         this.setState({
            gender: this.state.gender.toString()
         })
      }).catch((error) => {
         console.log(error);
      })
   }
   selectAvatar = () => {
      this.inputElement.click();
   }
   handleChange = (event) => {
      const target = event.target;
      this.setState({
         [target.name]: target.value
      })
   }
   submit = () => {
      let params = this.state
      for (var key in params) {
         if (params[key] === '' || key.indexOf('_') === 0) {
            delete params[key]
         }
      }
      console.log(params)
      axios.post('/players/updateUserInfo', {
         params: params
      }).then((data) => {
         console.log(data.data.status)
         if(data.data.status==='0'){
            console.log("修改成功")
         }

      }).catch((error) => {
         console.log(error);
      })
   }
   upimg = (e) => {
      let file = e.target.files[0];
      let param = new FormData();
      param.append('tweetPic', file, file.name);   
      let config = {
         headers: { 'Content-Type': 'multipart/form-data' }
      };
      axios.post('/players/uploadImg', param, config)
         .then(response => {
            console.log(response.data);
            if (response.data.status==='0') {
               this.setState({
                  avatarurl: response.data.result.path
               })
            }
         })
   }
   render() {
      return (
         <div className="setting">
            <h2>编辑个人信息</h2>
            <p className="label">头像</p>
            <img className="avatarurl" src={this.state.avatarurl?this.state.avatarurl:'http://xdfaiweb.oss-cn-beijing.aliyuncs.com/minapp/desklamp/images/avatar.jpg'} alt={this.state.username} onClick={this.selectAvatar}/>
            <TextField fullWidth label="昵称" value={this.state.nickname} name='nickname' onChange={this.handleChange} className="setting-item" />
            <TextField fullWidth label="个性签名" name='slogan' value={this.state.slogan} onChange={this.handleChange} className="setting-item" />
            <FormControl component="fieldset" className="gender-select">
               <FormLabel component="legend">性别</FormLabel>
               <RadioGroup name="gender" value={this.state.gender} onChange={this.handleChange} className='gender'>
                  <FormControlLabel value='1' control={<Radio color="primary" />} label="男" />
                  <FormControlLabel value='2' control={<Radio color="primary" />} label="女" />
               </RadioGroup>
            </FormControl>
            <TextField fullWidth label="电话号码" name='phone' value={this.state.phone} onChange={this.handleChange} className="setting-item" />
            <TextField fullWidth label="电子邮箱" name='email' value={this.state.email} onChange={this.handleChange} className="setting-item" />
            <Button fullWidth variant="contained" color="primary" onClick={this.submit} className="sub-btn">保存</Button>
            <input type='file' onChange={this.upimg} ref={input => this.inputElement = input} style={{display:'none'}}/>
         </div>
      );
   }
}
export default Setting
