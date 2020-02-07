import React from 'react';
import './App.css';
import LandingPage from './containers/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetailsPage from './containers/MovieDetailsPage';

function App() {
  return (
    <div className='App'>
      <main className='App-header'>
        <Router>
          <Switch>
            <Route exact path='/movies/:id' component={MovieDetailsPage} />
            <Route path='/' component={LandingPage} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
