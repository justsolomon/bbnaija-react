import React, { useContext, useState, useEffect } from 'react';
import HousemateRank from '../components/HousemateRank';
import { useHistory } from 'react-router-dom';
import HousematesContext from '../context/HousematesContext';

export default function Leaderboard() {
  const [hmPositions, setHmPositions] = useState([]);
  const [evictedHM, setEvictedHM] = useState({});

  const { housemates } = useContext(HousematesContext);

  useEffect(() => {
    //sort housemates array in descending order
    housemates.sort((a, b) => b.votes - a.votes);

    setHmPositions(housemates);
    setEvictedHM(housemates[housemates.length - 1]);
  }, []);

  const history = useHistory();

  const housemateRanks = hmPositions.map((hm, i) => (
    <div key={hm.name} className='col-md-6'>
      <HousemateRank housemate={hm} rank={i + 1} />
    </div>
  ));

  return (
    <div className='leaderboard'>
      <div className='header text-center mb-3'>
        <h1 className='header-title'>Leaderboard</h1>
      </div>

      <div className='row'>{housemateRanks}</div>

      <div className='mt-5 text-center text-bold'>
        <p className='eviction-notice'>{evictedHM.name} was evicted</p>
      </div>

      <div className='text-center mt-5'>
        <button onClick={() => history.push('/')} className='text-bold'>
          Back To Vote
        </button>
      </div>
    </div>
  );
}
