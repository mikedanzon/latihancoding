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

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/product">
              <Product/>
            </Route>
            <Route exact path="/topic">
              <Topic/>
            </Route>
            <Route path="*">
              <Notfound/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
 
export default App;
