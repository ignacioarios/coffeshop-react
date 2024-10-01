
import { Item } from '../Item/Item';
import styles from './ItemList.module.css';

export function ItemList({ products = [] }) {
  return (
    <div className={styles.itemList}>
      {products.length > 0 ? (
        products.map((product) => <Item key={product.id} {...product} />)
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
}