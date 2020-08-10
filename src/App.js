import React, { Component } from 'react';
import Home from './pages/home';
import Nav from './component/nav';

class App extends Component {
  render() {
    return (
      <div>
        <Nav></Nav>
        <Home></Home>
      </div>
    );
  }
}
export default App;