import { ItemCount } from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';

export function ItemDetail({ id, name, description, price, imageUrl, stock }) {
     const handleAdd = (quantity) => {
          console.log(`Added ${quantity} of ${name} to cart.`);
     };

     return (
          <div className={styles.card}>
               <img src={imageUrl} alt={name} className={styles.itemImage} />
               <h2>{name}</h2>
               <p>{description}</p>
               <span className={styles.itemPriceDisplay}>Precio: {price}</span>
               <p className={styles.itemStock}>Stock disponible: {Math.floor(stock)}</p>
               <ItemCount stock={Math.floor(stock)} initial={1} onAdd={handleAdd} productId={id} />
          </div>
     );
}