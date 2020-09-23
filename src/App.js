import React from 'react';
import './assets/scss/app.scss';
import Leaderboard from './pages/Leaderboard';
import Voting from './pages/Voting';
import Background from './assets/img/background.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const getBgImg = {
  background: `url(${Background})`,
};
export default function App() {
  return (
    <div className='home' style={getBgImg}>
      <Router>
        <Switch>
          <Route exact path='/' component={Voting} />
          <Route path='/leaderboard' component={Leaderboard} />
        </Switch>
      </Router>
    </div>
  );
}
