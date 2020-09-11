import React,{Component} from 'react';
import './App.css';
import Home from './Pages/Home';
import Header from './components/header';
import Topic from './Pages/Topic';
import Product from './Pages/Product';
import Notfound from './Pages/Notfound';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';

//7Kp6jLRga59j1QPemDlO8BhLeaw3keljQ5cYkKqbcwIsZwU9Ty

class App extends Component {
  state={
    token:''
  }

  componentDidMount(){
    axios.get('https://x.rajaapi.com/poe')
    .then((res)=>{
      this.setState({token:res.data.token})
    }).catch((err)=>{
      console.log(err)
    })
  }

  render(){
    if(this.state.token) {
      return(
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/">
                <Header/>
                <Home/>
              </Route>
              <Route exact path="/product">
                <Header/>
                <Product datatoken={this.state.token}/>
              </Route>
              <Route exact path="/topic">
                <Header/>
                <Topic/>
              </Route>
              <Route path="*">
                <Notfound/>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )
    } else {
      return(
        <div>Loading...</div>
      )
    }
  }
}
 
export default App;
