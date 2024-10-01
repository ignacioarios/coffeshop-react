import { useState, useEffect } from 'react';
import styles from './ItemCount.module.css';
import {useCartContext} from "../../context/cartContext"

export function ItemCount({ stock, initial, onAdd, productId, prod }) {
     const [count, setCount] = useState(initial);
     const {addToCart} = useCartContext()


     useEffect(() => {
          const savedCount = localStorage.getItem(`itemCount-${productId}`);
          if (savedCount) {
               setCount(Number(savedCount));
          }
     }, [productId]);

     useEffect(() => {
          localStorage.setProducts(`itemCount-${productId}`, count);
     }, [count, productId]);

     const increaseCount = () => {
          if (count < stock) setCount(count + 1);
     };

     const decreaseCount = () => {
          if (count > 0) setCount(count - 1);
     };

     return (
          <div className={styles.itemCountContainer}>
               <div className={styles.counterControls}>
                    <button className={`${styles.button} ${styles.countButton}`} onClick={decreaseCount}>-</button>
                    <span className={`${styles.counter} ${styles.countDisplay}`}>{count}</span>
                    <button className={`${styles.button} ${styles.countButton}`} onClick={increaseCount}>+</button>
               </div>
               <button
                    className={`${styles.button} ${styles.addToCartButton}`}
                    onClick={() => addToCart({...prod, quantity: count})}
                    disabled={count === 0}
               >
                    Agregar al carrito
               </button>
          </div>
     );
}