# Fermi Poker

A numerical estimation game combining Fermi questions with poker-style betting mechanics.

## About the Game

Fermi Poker is a game of numerical estimation and strategic betting. Players make range guesses about numerical questions (known as Fermi questions) and bet on their confidence in their estimates.

### Game Concept

Fermi Poker is like poker, but instead of cards, players make guesses about numerical questions. Test your estimation skills, strategic betting, and ability to narrow down ranges as more information becomes available.

### Gameplay

1. A numerical question is revealed (e.g., "How many cars were sold in 2023?")
2. Players have 60 seconds to submit a range guess (lower and upper bound)
3. Betting rounds occur, with hints revealed between rounds
4. After all bets, the correct answer is revealed
5. The pot goes to the player with the narrowest range that includes the correct answer
6. If no one's range includes the answer, the player whose range median is closest wins

## Features

- Beautiful, responsive UI with light/dark mode support
- Hierarchical question categories
- Flippable hints and answer cards
- Question management system
- Custom styling with CSS variables

## Technologies

- React
- JavaScript
- CSS

## Project Structure

```
fermi-poker/
├── components/
│   ├── FermiPokerIntro.js
│   └── FermiPokerGame.js
├── data/
│   ├── introContent.js
│   └── questionSets.js
├── App.js
├── index.js
├── styles.css
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fermi-poker.git
   cd fermi-poker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy your application

## License

[MIT License](LICENSE)
