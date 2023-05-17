import React from 'react';
import Modal from 'react-modal';
import Card from '../Card/Card.jsx';

import styles from './Game.module.css';

const cardImages = [
  { src: '/img/coffee.svg', matched: false },
  { src: '/img/doughnut.svg', matched: false },
  { src: '/img/hamburger.svg', matched: false },
  { src: '/img/ice-cream.svg', matched: false },
  { src: '/img/juice.svg', matched: false },
  { src: '/img/pizza.svg', matched: false }
];

Modal.setAppElement('#root');

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.handleCard = this.handleCard.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      cards: [],
      firstCard: null,
      secondCard: null,
      moves: 0,
      isModalOpen: false
    };
  }

  shuffleCards() {
    const shuffled = [...cardImages, ...cardImages].sort(() => 0.5 - Math.random()).map((image) => {
      return {...image};
    });

    this.setState({ cards: shuffled, moves: 0 });

    this.resetChosenCards();
  }

  handleCard(card) {
    const { firstCard, secondCard } = this.state;

    if (firstCard !== null && secondCard !== null) return;

    if (firstCard === null) {
      this.setState({ firstCard: card });
    } else {
      this.setState({ secondCard: card });
    }
  }

  resetChosenCards() {
    this.setState({ firstCard: null, secondCard: null });
  }

  componentDidMount() {
    this.shuffleCards();
  }

  componentDidUpdate(_, prevState) {
    const { firstCard, secondCard, moves, cards, isModalOpen } = this.state;

    if (firstCard !== prevState.firstCard || secondCard !== prevState.secondCard) {
      if (firstCard !== null && secondCard !== null) {
        this.setState({ moves: moves + 1 });

        const isMatched = firstCard.src === secondCard.src;

        if (isMatched) {
          this.setState({ cards: cards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          }) });

          this.resetChosenCards();
        } else {
          setTimeout(() => this.resetChosenCards(), 1500);
        }
      }
    }

    if (isModalOpen === false) {
      const isCompleted = cards.every((card) => card.matched);

      if (isCompleted) {
        setTimeout(() => {
          this.toggleModal();
        }, 500);
      }
    }
  }

  toggleModal() {
    const { isModalOpen } = this.state;

    if (isModalOpen === true) {
      this.shuffleCards();
    }

    this.setState({ isModalOpen: !isModalOpen });
  }

  render() {
    const {  cards, firstCard, secondCard, isModalOpen, moves } = this.state;

    return (
      <div>
        <h1>Memory game</h1>
        <button onClick={this.shuffleCards}>New game</button>
        <div className={styles.cards}>
          {cards.map((card, i) => {
            return <Card
              card={card}
              handleCard={this.handleCard}
              flipped={card === firstCard || card === secondCard || card.matched}
              key={i}
            />
          })}
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={this.toggleModal}
          className={styles.modal}
          overlayClassName={styles.overlay}>
            <img className={styles.modalCloseBtn} src='/img/close-button.svg' onClick={this.toggleModal} alt='' />
            <h2>Congratulations!</h2>
            <h3>You have completed the game in {moves} {moves === 1 ? 'move' : 'moves'}!</h3>
        </Modal>
      </div>
    );
  }
}

export default Game;
