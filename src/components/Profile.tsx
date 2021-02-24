import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.container}>
      <img src="https://github.com/lucasbecker.png" alt="Foto de perfil" />
      <div>
        <strong>Lucas Becker</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}