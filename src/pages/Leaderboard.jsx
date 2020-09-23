import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import HousemateRank from '../components/HousemateRank';

export default function Leaderboard() {
  const [evictedHM, setEvictedHM] = useState({});
  const history = useHistory();

  useEffect(() => {
    setEvictedHM(getSortedHousemate[getSortedHousemate.length - 1]);
  }, []);

  // Check if localstorage is empty
  if (localStorage.getItem('housemate') === null) {
    console.log('Empty');
  } else {
    var newHousemateCopy = JSON.parse(localStorage.getItem('housemate'));

    var getSortedHousemate = newHousemateCopy.sort(
      (firstVoteCount, secondVoteCount) => {
        return firstVoteCount.votes < secondVoteCount.votes
          ? 1
          : firstVoteCount.votes > secondVoteCount.votes
          ? -1
          : 0;
      }
    );

    var housemateRanks = getSortedHousemate.map((hm, i) => (
      <div key={hm.name} className='col-md-6'>
        <HousemateRank housemate={hm} rank={i + 1} />
      </div>
    ));
  }

  return (
    <>
      {localStorage.getItem('housemate') === null ? (
        <Redirect to='/' />
      ) : (
        <div className='leaderboard'>
          <div className='header text-center mb-3'>
            <h1 className='header-title'>Leaderboard</h1>
          </div>

          <div className='row'>{housemateRanks}</div>

          <div className='mt-5 text-center text-bold'>
            <p className='eviction-notice'>{evictedHM.name} was evicted</p>
          </div>

          <div className='text-center mt-5'>
            <button
              onClick={() => {
                localStorage.clear('housemate');
                history.push('/');
              }}
              className='text-bold'
            >
              Back To Vote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
