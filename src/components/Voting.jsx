import React, { useState } from "react";
import Housemate from "./Housemate";

const staticHousemates = [
  {
    name: "Dorathy",
    picture: "https://dailypost.ng/wp-content/uploads/2020/08/Dorathy-1.jpg",
    votes: 0
  },
  {
    name: "Ozo",
    votes: 0,
    picture:
      "https://scontent.fabv2-1.fna.fbcdn.net/v/t1.0-9/110161165_1150928051973512_5031557519512403774_o.jpg?_nc_cat=111&_nc_sid=dd9801&_nc_ohc=4FXuo0DJ2AEAX8avFNS&_nc_ht=scontent.fabv2-1.fna&oh=fdc7bc48961cf7042368df6738f6318d&oe=5F8A6493"
  },
  {
    name: "Kiddwaya",
    votes: 0,
    picture:
      "https://i1.wp.com/media.premiumtimesng.com/wp-content/files/2020/08/Screenshot-270-e1597078639510.png?fit=566%2C561&ssl=1"
  },
  {
    name: "Laycon",
    votes: 0,
    picture:
      "https://ichef.bbci.co.uk/news/1024/branded_pidgin/8C52/production/_113522953_oda11.jpg"
  }
];


const maximumVotes = 10;

export default function Voting() {
  const [vote, setVote] = useState(maximumVotes);
  const [housemates, updateHousemates] = useState(staticHousemates);
  const [errorState, setErrorState] = useState(false);


  const HouseMates = housemates.map((hm) => (
    <div key={hm.name} className="col-md-6">
      <Housemate
        housemate={hm}
        housemates={housemates}
        onVote={() => voteHM(hm)}
        downVote={() => downVote(hm)}
        castVote={(vote) => castVote(vote, hm)}
        checkManualVoteError={(voteAmount) => checkIfVotingIsPossible(voteAmount, hm)}
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
    console.log(housemates);

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
    }
  };

  return (
    <div className="voting">
      <section className="voting__box">
        <h1 className="voting__box__title">My Available Votes</h1>
        <h2 className="voting__box__numbers">{vote}</h2>
        <div className="voting__box__progressBar">
          <div
            className={`progress length-${percentageOfVoteRemaining()}`}
          ></div>
        </div>
      </section>

      <section className="home__votes">
        <div className="row">{HouseMates}</div>

        <div className="mt-5 d-flex-column flex-justify-center text-center">
          <button onClick={() => viewLeaderboard()} className="text-bold">View Leaderboard</button>
          {errorState && <h4 className="mt-4 text-red">*Finish the votes</h4>}
        </div>
      </section>
    </div>
  );
}
