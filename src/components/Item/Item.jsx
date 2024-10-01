
import { Link } from 'react-router-dom';
import styles from './Item.module.css';

export function Item({ id, name, description, price, imageUrl, stock }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={name}
          className={`${styles.itemImage} ${stock === 0 ? styles.outOfStockImage : ''}`}
        />
        {stock === 0 && <span className={styles.outOfStockBadge}>Agotado</span>}
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
      <span className={styles.itemPriceDisplay}>Precio: ${price}</span>
      <div className={styles.itemFooter}>
        <Link to={`/item/${id}`} className={styles.button}>
          Ver detalles
        </Link>
      </div>
    </div>
  );
}