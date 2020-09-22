import React from 'react';
import './assets/scss/app.scss';
import Leaderboard from './pages/Leaderboard';
import Voting from './pages/Voting';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  // // Check if all the vote is not up to 10
  // const getHousemates = JSON.parse(localStorage.getItem('housemate'));

  // const sumHousemateVotes = Object.values(getHousemates).reduce(
  //   (t, { votes }) => t + votes,
  //   0
  // );

  // console.log(sumHousemateVotes);

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
