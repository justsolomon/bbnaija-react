import React from 'react';
import './assets/scss/app.scss';
import Leaderboard from './pages/Leaderboard';
import Voting from './pages/Voting';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className='home'>
      <Router>
        <Switch>
          <Route exact path='/' component={Voting} />

          {/* Route to Leaderboard if maximum vote is 0 else redirect to homepage */}
          <Route path='/leaderboard' component={Leaderboard} />
          {/* <Route path='/leaderboard' render={() => {}} /> */}
        </Switch>
      </Router>
    </div>
  );
}
