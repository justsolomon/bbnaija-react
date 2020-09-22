import React, { useState } from 'react';
import './assets/scss/app.scss';
import Leaderboard from './pages/Leaderboard';
import Voting from './pages/Voting';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HousematesProvider } from './context/HousematesContext';

export default function App() {
  const [housemates, setHousemates] = useState([]);

  const updateHMContext = (newHMList) => setHousemates(newHMList);

  return (
    <div className='home'>
      <Router>
        <Switch>
          <HousematesProvider value={{ housemates, updateHMContext }}>
            <Route exact path='/' component={Voting} />
            <Route path='/leaderboard' component={Leaderboard} />
          </HousematesProvider>
        </Switch>
      </Router>
    </div>
  );
}
