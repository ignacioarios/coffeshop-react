
import styles from './OrderForm.module.css';

export function OrderSummary({ cart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.orderSummaryContainer}>
      <div className={styles.orderSummaryHeader}>
        <span className={styles.headerItem}>Ítem</span>
        <span className={styles.headerQuantity}>Cantidad</span>
        <span className={styles.headerPrice}>Precio</span>
      </div>
      <div className={styles.orderItems}>
        {cart.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemQuantity}>{item.quantity}</span>
            <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className={styles.totalDivider}></div>
      <div className={styles.totalPrice}>
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}