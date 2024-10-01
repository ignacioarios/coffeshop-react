import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../services/apiService';
import { ItemList } from '../ItemList/ItemList';
import styles from './ItemsListContainer.module.css';
import { getProducts } from '../../firebase/db';

export function ItemsListContainer({ greeting }) {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        getProducts(setProducts)


    }, [categoryId]);

    return (
        <div className={styles.uiContainer}>
            <h1 className={styles.greeting}>{greeting}</h1>
            <ItemList products={products} />
        </div>
    );
}
