import React from 'react';
import Card from '../Card/Card';

import styles from './Game.module.css';

const cardImages = [
  { src: '/img/coffee-1.svg' },
  { src: '/img/doughnut-1.svg' },
  { src: '/img/hamburger-1.svg' },
  { src: '/img/ice-cream-1.svg' },
  { src: '/img/juice-1.svg' },
  { src: '/img/pizza-1.svg' }
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...cardImages, ...cardImages],
    };
  }

  handleCard(card) {
    console.log(card);
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
