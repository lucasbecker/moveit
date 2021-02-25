import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

  return (
    <div className={styles.container}>
      { activeChallenge ? (
        <div className={styles.active}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button 
              type="button" 
              className={styles.failed}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.succeeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.default} >
          <strong>Finalize ciclos para receber desafios!</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up!"/>
            Suba de nível completando desafios.
          </p>
        </div>
      )}
    </div>
  )
}