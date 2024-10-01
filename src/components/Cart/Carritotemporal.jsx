
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { fetchAPI, updateProductStock } from '../../services/apiService';
import styles from './Cart.module.css';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
  const { cart, emptyCart, updateQuantity, removeItem } = useContext(CartContext);
  const [stockInfo, setStockInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStock = async () => {
      const stocks = {};
      for (const item of cart) {
        const product = await fetchAPI({ productId: item.id });
        if (product && product.stock !== undefined) {
          stocks[item.id] = product.stock;
        } else {
          stocks[item.id] = 0;
        }
      }
      setStockInfo(stocks);
    };
    fetchStock();
  }, [cart]);

  const increaseQuantity = (item) => {
    if (item.quantity < stockInfo[item.id]) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const removeFromCart = (item) => {
    removeItem(item.id);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className='titulocart'>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} />
              <div className={styles.cartItemDetails}>
                <p>{item.name}</p>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>
                  Stock disponible:{' '}
                  {stockInfo[item.id] === 0 ? '0 - Pronto nuevo stock!' : stockInfo[item.id]}
                </p>
                {stockInfo[item.id] === 0 && <p>Sin stock. Vuelve pronto.</p>}
                {stockInfo[item.id] > 0 && item.quantity >= stockInfo[item.id] && (
                  <p>No puedes agregar más de {stockInfo[item.id]} unidades.</p>
                )}
              </div>
              <div className={styles.cartItemControls}>
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <button onClick={() => removeFromCart(item)} className={styles.removeButton}>
                  Sacar del carrito
                </button>
                <button
                  onClick={() => increaseQuantity(item)}
                  disabled={item.quantity >= stockInfo[item.id]}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className={styles.cartSummary}>
            <button onClick={emptyCart} className={styles.checkoutButton}>
              Vaciar carrito
            </button>
            <button onClick={proceedToCheckout} className={styles.checkoutButton}>
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}