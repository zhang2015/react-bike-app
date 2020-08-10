import React from 'react';
import { Link } from 'react-router-dom';
 
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render (){
        return(
            <div>
                <ul>
                    <li>
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/home/my">home</Link>
                    </li>
                </ul>
            </div>    
        )
    
    }
}