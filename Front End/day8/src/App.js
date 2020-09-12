import React from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/header';
import Comments from './pages/Comments';
import Hitung from './pages/Hitung';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/hitung' component={Hitung}/>
        <Route path='/comments/:id' component={Comments}/>
      </Switch>
    </div>
  );
}

export default App;
