import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const useErrorState = (value) => {
  const [errorState, setErrorState] = useState(value);

  return [errorState, setErrorState];
};

export const usePercentageOfVoteRemaining = (vote, maximumVotes) => {
  const percentage = (vote / maximumVotes) * 100;
  return Math.floor(percentage);
};

export const useUpdateHousemates = (staticHousemates) => {
  const [housemates, updateHousemates] = useState(staticHousemates);

  return [housemates, updateHousemates];
};

export const useSetVote = (maximumVotes) => {
  const [vote, setVote] = useState(maximumVotes);

  return [vote, setVote];
};

// export const useViewLeaderboard = (maximumVotes, errorState) => {
//   const history = useHistory();
//   const [error, setError] = useState(errorState);
//   const [vote, setVote] = useState(maximumVotes);
//   if (vote > 0) {
//     setError(errorState);
//   } else history.push('/leaderboard');

//   return [setVote, error];
// };
