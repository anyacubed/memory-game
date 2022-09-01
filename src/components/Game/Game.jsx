import React from 'react';
import Card from '../Card/Card';
import Modal from 'react-modal';

import styles from './Game.module.css';

const cardImages = [
  { src: '/img/coffee.svg', matched: false },
  { src: '/img/doughnut.svg', matched: false },
  { src: '/img/hamburger.svg', matched: false },
  { src: '/img/ice-cream.svg', matched: false },
  { src: '/img/juice.svg', matched: false },
  { src: '/img/pizza.svg', matched: false }
];

Modal.setAppElement("#root");

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

    this.modalMessage = React.createRef();
  }

  shuffleCards() {
    const shuffled = [...cardImages, ...cardImages].sort(() => 0.5 - Math.random()).map((image) => {
      return ({...image});
    });
    this.setState({ cards: shuffled, moves: 0 });
    this.resetChosenCards();
  }

  handleCard(card) {
    if (this.state.firstCard !== null && this.state.secondCard !== null) {
      return;
    }

    if (this.state.firstCard !== null) {
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
      if (this.state.firstCard !== null && this.state.secondCard !== null) {
        this.setState({ moves: this.state.moves + 1 });

        const isMatched = this.state.firstCard.src === this.state.secondCard.src;

        if (isMatched) {
          this.setState({ cards: this.state.cards.map((card) => {
            if (card.src === this.state.firstCard.src) {
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

    if (this.state.isModalOpen === false) {
      const isCompleted = this.state.cards.every((card) => card.matched);

      if (isCompleted) {
        setTimeout(() => {
          this.toggleModal();
        }, 500);
      }
    }
  }

  toggleModal() {
    if (this.state.isModalOpen === true) {
      this.shuffleCards();
    }

    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div className={styles.game}>
        <h1>Memory game</h1>
        <button onClick={this.shuffleCards}>New game</button>
        <div className={styles.cards}>
          {this.state.cards.map((card, i) => {
            return <Card
              card={card}
              handleCard={this.handleCard}
              flipped={card === this.state.firstCard || card === this.state.secondCard || card.matched}
              key={i}
            />
          })}
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModal}
          className={styles.modal}
          overlayClassName={styles.overlay}>
            <img className={styles.modalCloseBtn} src="/img/close-button.svg" onClick={this.toggleModal} alt="" />
            <h2>Congrats! <br /> You've completed the game in {this.state.moves} {this.state.moves === 1 ? 'move' : 'moves'}! </h2>
        </Modal>
      </div>
    );
  }
}

export default Game;
