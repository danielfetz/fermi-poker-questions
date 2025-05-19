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
      content: "Before seeing the question, each player must put one or more chips into the pot. Then the question is revealed, for example: /"How many chickens are killed every year for meat?"/ The size of this mandatory bet should increase every other question."
    },
    {
      number: "02",
      title: "Secret guesses",
      content: "Each player secretly writes down their guess as a range (e.g. 20 billion to 100 billion). Alternatively, you can also require everyone to play with exact numbers instead of ranges."
    },
    {
      number: "03",
      title: "Betting round #1",
      content: "Betting moves clockwise, starting with a different player each question. On your turn, you may <i>check</i> (pass without betting, if no one has bet yet), <i>raise</i> (bet more than the current highest bet), <i>call</i> (match it), or <i>fold</i> (drop out and forfeit the pot). Betting continues until all players have either folded or matched the highest bet."
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
    <div className="intro-section p-1 mb-20">
      {/* What is Fermi Poker section */}
      <div className="mb-6">
        <h2 className="text-header-small sm:text-header font-display font-bold pb-2.5 border-b border-golden-accent mt-0 mb-3">What is Fermi Poker?</h2>
        <p className="leading-normal">
          Fermi Poker is like poker, but instead of cards, players make guesses about questions that seem unknowable at first — like "How many chickens are killed each year?" Players write down secret guesses, bet on their answers, get helpful hints, and the closest guess wins.
        </p>
      </div>
      
      {/* What Do You Need section */}
      <div className="highlight-section p-4 rounded-xl mb-6">
        <h3 className="font-bold mt-0 mb-3">What Do You Need?</h3>
        <ul className="list-disc pl-5 m-0 space-y-3 leading-normal">
          <li>You'll need at least one other person physically present to play with you, but it's more fun with larger groups</li>
          <li>Something to write down guesses, and poker chips or other play money</li>
        </ul>
      </div>
      
      {/* Example Gameplay section */}
      <div className="mb-6">
        <h3 className="text-xl font-display font-bold mb-4">How to Play</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {gameplaySteps.map((step, index) => (
            <div key={index} className="gameplay-steps p-4 rounded-xl">
              <div className="step-number">{step.number}</div>
              <h4>{step.title}</h4>
              <p>{step.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Rules section */}
      <div className="mb-6 leading-normal">
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
      
      {/* Meta-Game Option section */}
      <div className="highlight-section p-4 rounded-xl mb-6">
        <h3 className="font-bold mt-0 mb-3">Meta-Game Option</h3>
        <ul className="list-disc pl-5 m-0 space-y-3 leading-normal">
          <li>When playing in large groups, which might have very different skill levels, it might make sense to add another layer to the game so that it is more fun for everyone even if you have folded and are just watching.</li>
          <li>In games with meta-game enabled, players can predict who will win each question. With 3 correct predictions, bankrupt players can rejoin the game with a small stack.</li>
          <li>Players can't bet on themselves</li>
        </ul>
      </div>
      
      {/* Example Worked Through section */}
      <div className="mb-6 leading-normal">
          <h3 className="text-xl font-display font-bold mb-3">An Example Worked Far Too In-Depth</h3>
          <p className="mb-3">
            It's hard to explain how to solve a Fermi Question, so let me show you one and walk you through it. Here's a classic, hoping that the pandemic didn't change the answer.
          </p>
          <p className="mb-3 font-bold italic">How many piano tuners are there in Chicago?</p>
          <p className="mb-3">
            To begin, we need the population of Chicago. The population turns out to be around 2.5 million, but keeping Remark 2.2 in mind, the metropolitan area is a bit higher, about 10 million. We'll go in between at about 5 million.
          </p>
          <p className="mb-3">
            We'll first consider how many pianos there are in Chicago, and by extension, the demand of piano tuners for those pianos. The average household size in the US is about 2; there are many people who are single, some live with a partner, and some (fewer) have children as well. Let's then say that about 1 in 10 households own a piano that needs to be tuned yearly. This gives us about:
          </p>
          <div className="p-4 bg-gray-50 dark:bg-dark-soft rounded-lg mb-3">
            5,000,000 people ÷ 2 people per household × 0.1 pianos per household = 250,000 pianos
          </div>
          <p className="mb-3">
            Let's also consider that some business establishments have pianos: schools, churches, concert venues, recording studios, and so on. These are fewer in number than households, but more likely to have pianos. Let's say there are about 10,000 such establishments with pianos in Chicago.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-dark-soft rounded-lg mb-3">
            250,000 + 10,000 = 260,000 pianos in Chicago
          </div>
          <p className="mb-3">
            Now, if a piano needs to be tuned once per year on average, and a tuner can tune, say, 5 pianos per day, working 5 days a week for 50 weeks a year, each tuner can service:
          </p>
          <div className="p-4 bg-gray-50 dark:bg-dark-soft rounded-lg mb-3">
            5 pianos/day × 5 days/week × 50 weeks/year = 1,250 pianos per year per tuner
          </div>
          <p className="mb-3">
            So the number of piano tuners needed in Chicago would be:
          </p>
          <div className="p-4 bg-gray-50 dark:bg-dark-soft rounded-lg mb-3">
            260,000 pianos ÷ 1,250 pianos per tuner = 208 piano tuners
          </div>
          <p>
            Rounding a bit, we'd estimate there are about 200 piano tuners in Chicago. The actual number is around 40-50, which is in the same order of magnitude. The discrepancy might be due to our generous estimates of Chicago's population, piano ownership rates, or tuning frequency.
          </p>
      </div>
      
      {/* Other Examples section */}
      <div className="highlight-section p-4 rounded-xl mb-6">
        <h3 className="font-bold mt-0 mb-3">Other Examples:</h3>
        <ul className="list-disc pl-5 m-0 space-y-3 leading-normal">
          <li>How many more years of life expectancy do women in Russia have compared to men?</li>
          <li>For each person having died as a result of nuclear accidents in the past 50 years, how many have died as a result of air pollution from coal?</li>
          <li>How many chickens are killed for meat every year (as of 2018)?</li>
          <li>Launch cost per kilogram of payload into space?</li>
        </ul>
      </div>
      
      {/* Strategy Tips section */}
      <div className="mb-6 leading-normal">
        <h3 className="text-xl font-display font-bold mb-3">Strategy Tips</h3>
        <p className="mb-3">
          Getting better at Fermi Poker is closely linked to becoming better at rational thinking, world-modeling and understanding the cognitive biases that we have:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            <span className="font-bold">Bayesian updating:</span> Consider how the information you've gained from hints impacts the assumptions underlying your guess. And then fold or raise your bet accordingly, but don't do it all the time, because it will make it easy for people to predict you.
          </li>
          <li>
            <span className="font-bold">World-modeling:</span> It will serve you well to memorize at least some numbers to build your sense of magnitude up. You need a baseline for the scale of various distances, populations, speeds, etc. before you can start making educated guesses about them. But unlike other trivia quiz games, rote memorization and obscure facts about celebrities aren't important in Fermi Poker.
          </li>
          <li>
            <span className="font-bold">Opponent modeling:</span> As in standard poker, there is of course some importance in understand the ticks and general psychological profile of your opponent. But also here in Fermi Poker it's unique that you can observe in what categories your opponent(s) make good guesses, in which categories they are clueless, and then act accordingly. Of course, they might try to do some deception.
          </li>
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
