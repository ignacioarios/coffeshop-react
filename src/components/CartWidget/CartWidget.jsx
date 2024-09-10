
import { useState } from 'react';
import cart from './assets/cart.svg';
import styles from './CartWidget.module.css';

export const CartWidget = () => {
    const [itemCount] = useState(0);

    return (
        <div className={styles.cartWidgetContainer}>
            <img src={cart} alt="Shopping cart icon" />
            <span className={styles.counter}>{itemCount}</span>
        </div>
    );
}
