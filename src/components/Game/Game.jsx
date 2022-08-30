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

    this.state = {
      cards: [...cardImages, ...cardImages],
      firstCard: null,
      secondCard: null
    };
  }

  handleCard(card) {
    this.state.firstCard ? this.setState({ secondCard: card }) : this.setState({ firstCard: card });
  }

  resetCardsChoice() {
    this.setState({ firstCard: null, secondCard: null });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.firstCard !== prevState.firstCard || this.state.secondCard !== prevState.secondCard) {
      if (this.state.firstCard && this.state.secondCard) {
        if (this.state.firstCard === this.state.secondCard) {
          this.resetCardsChoice();
        } else {
          this.resetCardsChoice();
        }
      }
    }
  }

  render() {
    return (
      <div className={styles.game}>
        <h1>Memory game</h1>
        <button>New game</button>
        <div className={styles.cards}>
          {this.state.cards.map((card, i) => {
            return <Card card={card} handleCard={this.handleCard} key={i} />
          })}
        </div>
      </div>
    );
  }
}

export default Game;
