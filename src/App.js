import React from 'react';
import './App.css';
import LandingPage from './containers/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetails from './containers/MovieDetails';

function App() {
  return (
    <div className='App'>
      <main className='App-header'>
        <Router>
          <Switch>
            <Route exact path='/movies/:id' component={MovieDetails} />
            <Route path='/' component={LandingPage} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
