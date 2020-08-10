import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './index.scss'
let storage = window.localStorage;
class Setting extends Component {
   constructor(props) {
      super(props)
      this.state = {
         userInfo: {
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
         }
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
            userInfo: data.data.result
         })
      }).catch((error) => {
         console.log(error);
      })
   }
   render() {
      return (
         <Form userinfo={this.state.userInfo}></Form>
      );
   }
}
export default Setting

function Form(props) {
   let defaultvalue= props.userinfo;
   console.log(defaultvalue.userid)
   let [params, setParams] = React.useState(
      {
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
      }
   )
   const handleChange = (event) => {
      const target = event.target;
      setParams({
         ...params,
         [target.name]: target.value
      });
   }
   const submit = () => {
      console.log(params)
   }
   return (
      <div className="setting">
         <h2>编辑个人信息</h2>
         <TextField fullWidth label="昵称" defaultValue={defaultvalue.userid} name='nickname' onChange={handleChange} className="setting-item" />
         <TextField fullWidth label="个性签名" name='slogan' value={params.slogan} onChange={handleChange} className="setting-item" />
         <TextField fullWidth label="电话号码" name='phone' value={params.phone} onChange={handleChange} className="setting-item" />
         <TextField fullWidth label="电子邮箱" name='email' value={params.email} onChange={handleChange} className="setting-item" />
         <Button fullWidth variant="contained" color="primary" onClick={submit} className="sub-btn">
            保存
            </Button>
      </div>
   );

}
