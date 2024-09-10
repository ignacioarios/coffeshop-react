import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
    return (
        <div className={`ui-container ${styles.notFoundContainer}`}>
            <h1>¡Ups!</h1>
            <p>Esta página no existe, por favor hacé click <Link to="/">aqui</Link> para volver a la página principal.</p>
        </div>
    );
}
