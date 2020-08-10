import React, { Component } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import './index.scss';
let storage = window.localStorage;
class Release extends Component {
   constructor(props) {
      super(props)
      this.state = {
         content: "",
         imgurl: [],
         open: false,
         message: ""
      }
   }
   createDynamic = () => {
      if (!this.state.content && this.state.imgurl.length === 0) {
         this.setState({
            open: true,
            message: "请填写内容"
         })
         return
      }
      axios.post('/players/createDynamic', {
         params: {
            userid: storage.getItem('userId'),
            content: this.state.content,
            imgurl: this.state.imgurl
         }
      }).then((data) => {
         console.log(data.data.result)
         if (data.data.status === "0") {
            console.log("创建成功")
            this.props.history.replace('/home/my')
         }
      }).catch((error) => {
         console.log(error);
      })
   }
   handleChange = (event) => {
      const target = event.target;
      this.setState({
         content: target.value
      })
   }
   handleClose = (e) => {
      this.setState({
         open: false
      })
   }
   selectImg = () => {
      this.inputElement.click();
   }
   upimg = (e) => {
      let file = e.target.files;
      console.log(file)
      if (file.length === 0) {
         return
      }
      this.upload(file, 0)
   }
   upload(files, index) {
      let file = files[index]
      let param = new FormData();
      param.append('tweetPic', file, file.name);
      let config = {
         headers: { 'Content-Type': 'multipart/form-data' }
      };
      axios.post('/players/uploadImg', param, config)
         .then(response => {
            console.log(response.data.result.path);
            if (response.data.status === '0') {
               this.setState({
                  imgurl: [...this.state.imgurl, response.data.result.path]
               })
               console.log(this.state.imgurl)
               // delete files[index]
               if (files[index + 1]) {
                  this.upload(files, index + 1)
               }
            }
         })
   }
   render() {
      return (
         <div className="dynamic">
            <h2>发布动态</h2>

            <TextareaAutosize aria-label="empty textarea" className="content" placeholder="分享你的想法···" onChange={this.handleChange} />
            <div className="dynamic-imgs">
               {this.state.imgurl.map((element, index) => {
                  return (
                     <img className="dynamic-img" src={element} key={index} alt={index} />
                  )
               })}
               <div className="add-dynamic-img" onClick={this.selectImg}><span>+</span></div>
               <input type='file' multiple="multiple" onChange={this.upimg} ref={input => this.inputElement = input} style={{ display: 'none' }} />
            </div>
            <Button fullWidth variant="contained" color="primary" onClick={this.createDynamic} className="sub-dynamic-btn">发布</Button>
            <Snackbar
               anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
               autoHideDuration={2000}
               open={this.state.open}
               onClose={this.handleClose}
               message={this.state.message}
               key="message"
            />
         </div>
      );
   }
}
export default Release;