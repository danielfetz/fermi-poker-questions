import React from 'react';
import { useNavigate } from 'react-router-dom';

const FermiPokerIntro = ({ questionCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <main className="quiz-poker-home" aria-label="Fermi Poker home">
      <div className="quiz-poker-frame" aria-hidden="true">
        <span className="frame-corner frame-corner-top-left" />
        <span className="frame-corner frame-corner-top-right" />
        <span className="frame-corner frame-corner-bottom-left" />
        <span className="frame-corner frame-corner-bottom-right" />
        <span className="frame-knot frame-knot-top-left" />
        <span className="frame-knot frame-knot-top-right" />
        <span className="frame-knot frame-knot-left-top" />
        <span className="frame-knot frame-knot-left-bottom" />
        <span className="frame-knot frame-knot-right-top" />
        <span className="frame-knot frame-knot-right-bottom" />
        <span className="frame-knot frame-knot-bottom-left" />
        <span className="frame-knot frame-knot-bottom-right" />
      </div>

      <div className="home-flag" aria-hidden="true">
        <span className="flag-red" />
        <span className="flag-white" />
        <span className="flag-blue" />
      </div>

      <button
        type="button"
        className="home-info-button"
        onClick={() => navigate('/rules')}
        aria-label="Open rules and description"
      >
        i
      </button>

      <section className="quiz-poker-hero">
        <h1 className="quiz-poker-title">
          <span>Fermi</span>
          <span>Poker</span>
        </h1>
      </section>

      <section className="quiz-poker-actions" aria-label="Start and rules">
        <p className="question-count">
          {questionCount.toLocaleString()} questions available
        </p>

        <button
          type="button"
          className="home-action-button home-play-button"
          onClick={() => navigate('/categories')}
        >
          Play
        </button>

        <button
          type="button"
          className="home-action-button home-rules-button"
          onClick={() => navigate('/rules')}
        >
          Rules / Description
        </button>
      </section>
    </main>
  );
};

export default FermiPokerIntro;
