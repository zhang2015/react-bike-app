import React, { Component } from 'react';
import './index.scss';
import axios from 'axios';

class List extends Component {
   constructor(props) {
      super(props);
      this.state = {
         route: props.route,
         list: []
      }
   }
   componentDidMount() {
      this.getlist()
   }
   getlist() {
      axios.get('/players')
         .then((response) => {
            console.log(response.data)
            this.setState({
               list: response.data.result.list
            });
         })
         .catch((error) => {
            console.log(error);
         })
   }
   toDetail = (id, e) => {
      console.log(this, id)
      this.props.history.push(`/detail/${id}`);
   }
   render() {
      return (
         <div className="list">
            {this.state.list.map((element, index) => {
               return (
                  <div className="item" key={index} onClick={this.toDetail.bind(this, element.id)}>
                     <div className="icon"><img src={element.url} alt={element.name} /></div>
                     <p>{element.name}</p>
                  </div>
               )
            })}

         </div>
      );
   }
}
export default List;