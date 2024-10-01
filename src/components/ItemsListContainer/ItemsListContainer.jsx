
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../services/apiService';
import { ItemList } from '../ItemList/ItemList';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import styles from './ItemsListContainer.module.css';

export function ItemsListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAPI({ categoryId });
      if (result.fail) {
        setStatus('fail');
      } else {
        setProducts(result);
        setStatus('success');
      }
    };
    fetchData();
  }, [categoryId]);

  return status === 'loading' ? (
    <p>Cargando...</p>
  ) : status === 'fail' ? (
    <ErrorMessage />
  ) : (
    <div className={styles.uiContainer}>
      <h1 className={styles.greeting}>{greeting}</h1>
      <ItemList products={products} />
    </div>
  );
}