import React, { useState, useContext } from 'react';
import Housemate from '../components/Housemate';
import staticHousemates from '../components/HousematesList';
import { useHistory } from 'react-router-dom';
import HousematesContext from '../context/HousematesContext';

const maximumVotes = 10;

export default function Voting() {
  const [vote, setVote] = useState(maximumVotes);
  const [housemates, updateHousemates] = useState(staticHousemates);
  const [errorState, setErrorState] = useState(false);

  const history = useHistory();

  const { updateHMContext } = useContext(HousematesContext);

  const HouseMates = housemates.map((hm) => (
    <div key={hm.name} className='col-md-6'>
      <Housemate
        housemate={hm}
        housemates={housemates}
        onVote={() => voteHM(hm)}
        downVote={() => downVote(hm)}
        castVote={(vote) => castVote(vote, hm)}
        checkManualVoteError={(voteAmount) =>
          checkIfVotingIsPossible(voteAmount, hm)
        }
      />
    </div>
  ));

  const percentageOfVoteRemaining = () => {
    const percentage = (vote / maximumVotes) * 100;
    return Math.floor(percentage);
  };

  const voteHM = (hm) => {
    setErrorState(false);
    if (vote <= 0) {
      return;
    }
    const housematesCopy = [];
    hm.votes = hm.votes + 1;

    setVote((vote) => vote - 1);

    housemates.forEach((hmates) => {
      if (hmates.name === hm.name) {
        hmates = hm;
      }
      housematesCopy.push(hmates);
    });
    updateHousemates(housematesCopy);
  };

  const downVote = (hm) => {
    setErrorState(false);
    if (hm.votes <= 0) {
      return;
    }
    const housematesCopy = [];
    hm.votes = hm.votes - 1;
    setVote((vote) => vote + 1);

    housemates.forEach((hmates) => {
      if (hmates.name === hm.name) {
        hmates = hm;
      }
      housematesCopy.push(hmates);
    });
    updateHousemates(housematesCopy);
  };

  const castVote = (vote, hm) => {
    setErrorState(false);

    const isVotingPossible = checkIfVotingIsPossible(vote, hm);

    if (isVotingPossible) {
      hm.votes = vote;
    }
    const housematesCopy = [];

    housemates.forEach((hmates) => {
      if (hmates.name === hm.name) {
        hmates = hm;
      }
      housematesCopy.push(hmates);
    });
    updateHousemates(housematesCopy);

    setNumberOfRemainingVotes();
  };

  const setNumberOfRemainingVotes = () => {
    let totalVotesNow = 0;
    housemates.forEach((hmates) => {
      totalVotesNow = totalVotesNow + hmates.votes;
    });

    setVote(maximumVotes - totalVotesNow);
  };

  const checkIfVotingIsPossible = (vote, hm) => {
    const housematesCopy = [];
    hm.votes = vote;
    housemates.forEach((hmates) => {
      if (hmates.name === hm.name) {
        hmates = hm;
      }
      housematesCopy.push(hmates);
    });

    let totalVotesNow = 0;
    housemates.forEach((hmates) => {
      totalVotesNow += Number(hmates.votes);
    });

    if (maximumVotes >= totalVotesNow) {
      return true;
    }
    return false;
  };

  const viewLeaderboard = () => {
    if (vote > 0) {
      setErrorState(true);
    } else {
      //update value of housemates array in context
      updateHMContext(housemates);
      history.push('/leaderboard');
    }
  };

  return (
    <div className='voting'>
      <section className='voting__box'>
        <h1 className='voting__box__title'>My Available Votes</h1>
        <h2 className='voting__box__numbers'>{vote}</h2>
        <div className='voting__box__progressBar'>
          <div
            className={`progress length-${percentageOfVoteRemaining()}`}
          ></div>
        </div>
      </section>

      <section className='home__votes'>
        <div className='row'>{HouseMates}</div>

        <div className='mt-5 d-flex-column flex-justify-center text-center'>
          <button onClick={() => viewLeaderboard()} className='text-bold'>
            View Leaderboard
          </button>
          {errorState && <h4 className='mt-4 text-red'>*Finish the votes</h4>}
        </div>
      </section>
    </div>
  );
}
