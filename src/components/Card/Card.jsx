import React from 'react';

import styles from './Card.module.css';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleCard(this.props.card);
  }

  render() {
    return (
      <>
        <img className={styles.card} src={this.props.card.src} alt=''></img>
        <img className={styles.defaultCard} src='/img/default.svg' onClick={this.handleClick} alt='default card'></img>
      </>
    )
  }
}

export default Card;
