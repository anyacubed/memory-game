import React from 'react';

import styles from './Game.Module.css';

class Game extends React.Component {
  render() {
    return (
      <div className={styles.game}>
        <h1>Memory game</h1>
        <button>New game</button>
      </div>
    );
  }
}

export default Game;
