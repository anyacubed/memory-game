import React from 'react';
import Card from '../Card/Card';

import styles from './Game.module.css';

const cardImages = [
  { src: '/img/coffee.svg' },
  { src: '/img/doughnut.svg' },
  { src: '/img/hamburger.svg' },
  { src: '/img/ice-cream.svg' },
  { src: '/img/juice.svg' },
  { src: '/img/pizza.svg' }
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleCard = this.handleCard.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);

    this.state = {
      cards: [],
      firstCard: null,
      secondCard: null,
      matched: []
    };
  }

  shuffleCards() {
    const shuffled = [...cardImages, ...cardImages].sort(() => 0.5 - Math.random()).map((image, i) => {
      return ({ ...image, id: i});
    });
    this.setState({ cards: shuffled, matched: []});
  }

  handleCard(card) {
    if (this.state.firstCard && this.state.secondCard) {
      return;
    }

    if (this.state.firstCard) {
      this.setState({ secondCard: card });
    } else {
      this.setState({ firstCard: card });
    }
  }

  resetChosenCards() {
    this.setState({ firstCard: null, secondCard: null });
  }

  componentDidMount() {
    this.shuffleCards();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.firstCard !== prevState.firstCard || this.state.secondCard !== prevState.secondCard) {
      if (this.state.firstCard && this.state.secondCard) {
        const isMatched = this.state.firstCard.src === this.state.secondCard.src;

        if (isMatched) {
          this.setState({ matched: [...this.state.matched, this.state.firstCard.id, this.state.secondCard.id] });
          this.resetChosenCards();
        } else {
          setTimeout(() => this.resetChosenCards(), 1500);
        }
      }
    }

    const isCompleted = this.state.matched.length === this.state.cards.length;

    if (isCompleted) {
      setTimeout(() => {
        alert('Game completed!');
        this.shuffleCards();
      }, 500);
    }
  }

  render() {
    return (
      <div className={styles.game}>
        <h1>Memory game</h1>
        <button onClick={this.shuffleCards}>New game</button>
        <div className={styles.cards}>
          {this.state.cards.map((card, i) => {
            const isFlipped =
            card === this.state.firstCard ||
            card === this.state.secondCard ||
            this.state.matched.includes(card.id);

            return <Card
              card={card}
              handleCard={this.handleCard}
              flipped={isFlipped}
              key={i}
            />
          })}
        </div>
      </div>
    );
  }
}

export default Game;
