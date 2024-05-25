import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const parties = [
    { name: 'BJP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bharatiya_Janata_Party_logo.svg/800px-Bharatiya_Janata_Party_logo.svg.png' },
    { name: 'INC', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/INC_Logo.png' },
    { name: 'AAP', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Aam_Aadmi_Party_%28AAP%29_Logo_New.png' },
    { name: 'BSP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Elephant_Bahujan_Samaj_Party.svg/800px-Elephant_Bahujan_Samaj_Party.svg.png' },
  ];

  useEffect(() => {
    // Load votes from local storage
    const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    setVotes(storedVotes);

    const total = Object.values(storedVotes).reduce((sum, voteCount) => sum + voteCount, 0);
    setTotalVotes(total);

    // Check if user has already voted
    const voted = localStorage.getItem('hasVoted') === 'true';
    setHasVoted(voted);
  }, []);

  const handleVote = (party) => {
    if (hasVoted) return;

    const newVotes = { ...votes, [party]: (votes[party] || 0) + 1 };
    setVotes(newVotes);
    setTotalVotes(totalVotes + 1);
    setHasVoted(true);

    // Save votes and voting status to local storage
    localStorage.setItem('votes', JSON.stringify(newVotes));
    localStorage.setItem('hasVoted', 'true');
  };

  return (
    <div className="App">
      <h1>Voting Your Govenment</h1>
      <h2>Total Votes: {totalVotes}</h2>
      <div className="voting-container">
        {parties.map(party => (
          <div key={party.name} className="party">
            <img src={party.logo} alt={party.name} />
            <h3>{party.name}</h3>
            <p>Votes: {votes[party.name] || 0}</p>
            <button onClick={() => handleVote(party.name)} disabled={hasVoted}>Vote</button>
          </div>
        ))}
      </div>
      {hasVoted && <p>You have already voted.</p>}
    </div>
  );
}

export default App;
