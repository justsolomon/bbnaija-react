import { useState } from 'react';

export const useErrorState = (value) => {
  const [errorState, setErrorState] = useState(value);

  return [errorState, setErrorState];
}

export const usePercentageOfVoteRemaining = (vote, maximumVotes) => {
  const percentage = (vote / maximumVotes) * 100;
  return Math.floor(percentage);
};


export const useVoteHM = (hm, maximumVotes, staticHousemates) => {
  const [ vote, setVote ] = useState(maximumVotes);
  const [housemates, updateHousemates] = useState(staticHousemates);
  useErrorState(false)
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


// export const useSetNumberOfRemainingVotes = (maximumVotes) => {
//   const [vote, setVote] = useState(maximumVotes);
//   let totalVotesNow = 0;
//   staticHousemates.forEach((hmates) => {
//     totalVotesNow = totalVotesNow + hmates.votes;
//   });

//   setVote(maximumVotes - totalVotesNow);

//   return [ vote];
// };

// export const useVoteHM = (hm, { maximumVotes, housemates, staticHousemates }) => {
//   const [housemates, updateHousemates] = useState(staticHousemates);
//   const [vote, setVote] = useState(maximumVotes);
//   useErrorState(false);
//     if (vote <= 0) { 
//       return;
//     }
//     const housematesCopy = [];
//     hm.votes = hm.votes + 1;

//     setVote((vote) => vote - 1); 

//     housemates.forEach((hmates) => {
//       if (hmates.name === hm.name) {
//         hmates = hm;
//       }
//       housematesCopy.push(hmates);
//     });
//     updateHousemates(housematesCopy);

//     return [housemates, vote]
//   };



// export const percentageOfVoteRemaining = () => {
//   const percentage = (vote / maximumVotes) * 100;
//   return Math.floor(percentage);
// };

// export const voteHM = (hm) => {
//   setErrorState(false);
//   if (vote <= 0) {
//     return;
//   }
//   const housematesCopy = [];
//   hm.votes = hm.votes + 1;

//   setVote((vote) => vote - 1);

//   housemates.forEach((hmates) => {
//     if (hmates.name === hm.name) {
//       hmates = hm;
//     }
//     housematesCopy.push(hmates);
//   });
//   updateHousemates(housematesCopy);
// };

// export const downVote = (hm) => {
//   setErrorState(false);
//   if (hm.votes <= 0) {
//     return;
//   }
//   const housematesCopy = [];
//   hm.votes = hm.votes - 1;
//   setVote((vote) => vote + 1);

//   housemates.forEach((hmates) => {
//     if (hmates.name === hm.name) {
//       hmates = hm;
//     }
//     housematesCopy.push(hmates);
//   });
//   updateHousemates(housematesCopy);
// };

// export const castVote = (vote, hm) => {
//   setErrorState(false);

//   const isVotingPossible = checkIfVotingIsPossible(vote, hm);

//   if (isVotingPossible) {
//     hm.votes = vote;
//   }
//   const housematesCopy = [];

//   housemates.forEach((hmates) => {
//     if (hmates.name === hm.name) {
//       hmates = hm;
//     }
//     housematesCopy.push(hmates);
//   });
//   updateHousemates(housematesCopy);
//   console.log(housemates);

//   setNumberOfRemainingVotes();
// };

// export const setNumberOfRemainingVotes = () => {
//   let totalVotesNow = 0;
//   housemates.forEach((hmates) => {
//     totalVotesNow = totalVotesNow + hmates.votes;
//   });

//   setVote(maximumVotes - totalVotesNow);
// };

// export const checkIfVotingIsPossible = (vote, hm) => {
//   const housematesCopy = [];
//   hm.votes = vote;
//   housemates.forEach((hmates) => {
//     if (hmates.name === hm.name) {
//       hmates = hm;
//     }
//     housematesCopy.push(hmates);
//   });

//   let totalVotesNow = 0;
//   housemates.forEach((hmates) => {
//     totalVotesNow += Number(hmates.votes);
//   });

//   if (maximumVotes >= totalVotesNow) {
//     return true;
//   }
//   return false;
// };

// export const viewLeaderboard = () => {
//   if (vote > 0) {
//     setErrorState(true);
//   }
// };
