import React from 'react';
import axios from 'axios';
import "./index.scss";
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id:'',data:{}}
    }
    componentDidMount() {
        this.getDetail()
    }
    getDetail() {
        axios.get('/players/detail',{params:{id:this.props.match.params.id}})
           .then((response) => {
              console.log(response.data)
              this.setState({
                data: response.data.result.list[0]
              });
           })
           .catch((error) => {
              console.log(error);
           })
     }
    render (){
        return(
            <div className="detail">
                <p className="player-name"><span></span>{this.state.data.name}</p>
                <img src={this.state.data.url} alt={this.state.data.name} className="img"/>
                <div className="player-desc" dangerouslySetInnerHTML = {{ __html:this.state.data.desc }}></div>
            </div>    
        )
    
    }
}