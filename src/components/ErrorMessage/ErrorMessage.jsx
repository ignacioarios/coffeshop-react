
import styles from './ErrorMessage.module.css';

export function ErrorMessage() {
  return (
    <div className={styles.errorContainer}>
      <p>Lo sentimos, hay un problema con el servidor. Por favor intentar más tarde nuevamente.</p>
    </div>
  );
}