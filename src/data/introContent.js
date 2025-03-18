// Intro content for the game
export const introContent = {
  gameConcept: {
    title: "Game Concept",
    content: "Fermi Poker is like poker, but instead of cards, players make guesses about numerical questions. Test your estimation skills, strategic betting, and ability to narrow down ranges as more information becomes available."
  },
  gameplay: {
    title: "Gameplay",
    content: [
      "A numerical question is revealed (e.g., \"How many cars were sold in 2023?\")",
      "Players have 60 seconds to submit a range guess (lower and upper bound)",
      "Betting rounds occur, with hints revealed between rounds",
      "After all bets, the correct answer is revealed",
      "The pot goes to the player with the narrowest range that includes the correct answer",
      "If no one's range includes the answer, the player whose range median is closest wins"
    ]
  },
  multipleQuestions: {
    title: "Multiple Questions",
    content: "A game consists of multiple questions. Even if you fold or lose a question, you can continue playing in subsequent questions as long as you have chips."
  },
  metaGame: {
    title: "Meta-Game Option",
    content: "In games with meta-game enabled, players can predict who will win each question. With 3 correct predictions, bankrupt players can rejoin the game with a small stack."
  },
  strategy: {
    title: "Strategy Tips",
    content: [
      "Balance precision with safety - narrow ranges are more likely to win but also more likely to miss",
      "Watch your opponents' betting patterns to gauge their confidence",
      "Use hints strategically to refine your range",
      "Sometimes folding early is better than committing too many chips to a poor guess"
    ]
  }
};
