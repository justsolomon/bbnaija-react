import React from 'react';
import HousemateRank from '../components/HousemateRank';
import staticHousemates from '../components/HousematesList';
import { useHistory } from 'react-router-dom';

export default function Leaderboard() {
  const history = useHistory();
  const housemateRanks = staticHousemates.map((hm) => (
    <div key={hm.name} className='col-md-6'>
      <HousemateRank housemate={hm} />
    </div>
  ));
  return (
    <div className='leaderboard'>
      <div className='header text-center mb-3'>
        <h1 className='header-title'>Leaderboard</h1>
      </div>

      <div className='row'>{housemateRanks}</div>

      <div className='mt-5 text-center text-bold'>
        <p className='eviction-notice'>Dorathy was evicted</p>
      </div>

      <div className='text-center mt-5'>
        <button onClick={() => history.push('/')} className='text-bold'>
          Back To Vote
        </button>
      </div>
    </div>
  );
}
