import React from 'react';

import styles from './Card.module.css';

class Card extends React.Component {
  // className() {
  //   const { flipped } = this.props;
  //   const classes = [styles.card];

  //   if (flipped) classes.push(styles.list_centered);

  //   return classes.join(' ');
  // }

  handleClick = () => {
    const { handleCard, card } = this.props;

    handleCard(card);
  };

  render() {
    const { flipped, card } = this.props;

    return (
      <>
        <img
          className={`${styles.card} ${flipped ? '' : styles.covered}`}
          src={card.src}
          alt=''>
        </img>
        <img
          className={`${styles.card} ${flipped ? styles.covered : ''}`}
          src='/img/default.svg'
          onClick={this.handleClick}
          alt='default card'>
        </img>
      </>
    )
  }
}

export default Card;
