import styles from './ErrorMessage.module.css';

export function ErrorMessage({ retryCount, maxRetries, dots, nextRetryDelay }) {
    return (
        <div className={styles.errorContainer}>
            {retryCount <= maxRetries ? (
                <p>
                    Por favor, unos instantes. Intento {retryCount} de {maxRetries}. Próximo intento en {nextRetryDelay / 1000} segundos.
                </p>
            ) : (
                <p>Lamentablemente, no me puedo comunicar con el servidor. Por favor intente más tarde.</p>
            )}
            <p>{'.'.repeat(dots)}</p>
        </div>
    );
}
