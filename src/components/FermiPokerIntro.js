import React from 'react';
import { useNavigate } from 'react-router-dom';

const FermiPokerIntro = () => {
  const navigate = useNavigate();

  const goToCategories = () => {
    navigate('/categories');
  };

  // Example gameplay steps
  const gameplaySteps = [
    {
      number: "01",
      title: "Question reveal",
      content: "What's Walmart's net profit margin in 2024?"
    },
    {
      number: "02",
      title: "Initial guesses",
      content: "Each player secretly writes down their range estimation (e.g. 1.5% - 3.5%)"
    },
    {
      number: "03",
      title: "First betting round",
      content: "Players bet based on their confidence in their range estimates"
    },
    {
      number: "04",
      title: "First hint",
      content: "Walmart's total revenue was approximately $648 billion in 2024"
    },
    {
      number: "05",
      title: "Second betting round",
      content: "Players can adjust their ranges and bet again based on new information"
    },
    {
      number: "06",
      title: "Second hint",
      content: "Retailers like Target typically have net margins of 3-4%, while Amazon's retail operations run on margins below 2%"
    },
    {
      number: "07",
      title: "Final betting round",
      content: "Last chance to bet on your confidence in your range estimate"
    },
    {
      number: "08",
      title: "Reveal",
      content: "Walmart's net profit margin was 2.63% in 2024. The player with the narrowest correct range wins!"
    }
  ];

  return (
    <div className="intro-section mb-20">
      {/* What is Fermi Poker section */}
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold pb-2 border-b border-golden-accent mb-3">What is Fermi Poker?</h2>
        <p className="leading-normal">
          Fermi Poker is like poker, but instead of cards, players make guesses about numerical questions. 
          Test your estimation skills, strategic betting, and ability to update your prior assumptions as more information becomes available.
        </p>
      </div>
      
      {/* What Do You Need section */}
      <div className="bg-golden-light bg-opacity-30 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-display font-bold mb-3">What Do You Need?</h3>
        <ul className="list-disc pl-5">
          <li className="mb-2">You need at least one other player, but you can also play it with much larger groups</li>
          <li>Pen and paper, as well as poker chips (or some other play currency)</li>
        </ul>
      </div>
      
      {/* Example Gameplay section */}
      <div className="mb-6">
        <h3 className="text-xl font-display font-bold mb-4">Example Gameplay</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gameplaySteps.map((step, index) => (
            <div key={index} className="border border-soft-brown p-4 rounded-lg">
              <div className="text-golden-dark font-bold text-sm mb-1">{step.number}</div>
              <h4 className="font-bold mb-2">{step.title}</h4>
              <p className="text-sm">{step.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Rules section */}
      <div className="mb-6">
        <h3 className="text-xl font-display font-bold mb-2">Rules</h3>
        <p className="mb-3">
          If you are familiar with No Limit Texas Hold'Em Poker, you'll find that the rules are very similar, 
          however we have made some adjustment to maximize the educational potential and to accommodate the fact that we don't have cards:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>If you were the last to raise in a betting round, you can't raise again.</li>
          <li>If everyone has folded, the remaining player doesn't have to show his answer.</li>
          <li>A player can fold at any time, which means he gives up all the chips he has already put into the pot, including the mandatory ante, but he doesn't have to show his answer.</li>
          <li>Each round, players have to pay a mandatory minimum ante. If one has less chips than the mandatory ante, one automatically goes all-in.</li>
          <li>A player going all-in, can not win from another player more than he went all-in with. If other players continue playing with more chips, a side-pot is created that only the people can win that have contributed to it.</li>
        </ul>
      </div>
      
      {/* Fixed Start Game Button */}
      <div className="fixed-start-button">
        <button 
          onClick={goToCategories}
          className="start-game-button"
        >
          <span className="mr-2">See questions</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FermiPokerIntro;
