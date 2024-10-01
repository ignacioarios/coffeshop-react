import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ItemCount } from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';
import { Link } from 'react-router-dom';

export function ItemDetail({ id, name, description, price, imageUrl, stock }) {
  const { addToCart } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (quantity) => {
    addToCart({ id, name, price, imageUrl, quantity });
    setAddedToCart(true);
  };

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
      <p className={styles.itemStock}>
        {stock > 0 ? `Stock disponible: ${stock}` : 'Pronto en stock!'}
      </p>
      {stock > 0 && !addedToCart && (
        <ItemCount stock={stock} initial={1} onAdd={handleAddToCart} productId={id} />
      )}
      {addedToCart && (
        <div className={styles.addedToCartMessage}>
          <p>Producto agregado al carrito.</p>
          <Link to="/cart" className={styles.goToCartButton}>
            Ir al carrito
          </Link>
        </div>
      )}
    </div>
  );
}