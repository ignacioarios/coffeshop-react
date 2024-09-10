import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../services/apiService';
import { ItemList } from '../ItemList/ItemList';
import styles from './ItemsListContainer.module.css';

export function ItemsListContainer({ greeting }) {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        fetchAPI({ categoryId })
            .then(setProducts)
            .catch(error => console.error('Failed to fetch products:', error));
    }, [categoryId]);

    return (
        <div className={styles.uiContainer}>
            <h1 className={styles.greeting}>{greeting}</h1>
            <ItemList products={products} />
        </div>
    );
}
