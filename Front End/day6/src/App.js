import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';

var test = "hehehehe"

function Aest(a) {
  return a*a;
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>tester {Aest(5)}</h1>
      </div>
    );
  }
}

export default App;
