import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../services/apiService'; 
import { ItemDetail } from '../ItemDetail/ItemDetail';

export function ItemDetailContainer() {
    const [product, setProduct] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        fetchAPI({ productId: itemId })
            .then(setProduct)
            .catch(console.error);
    }, [itemId]);

    return (
        <div className="ui-container">
            {product ? <ItemDetail {...product} /> : <p>Cargando..</p>}
        </div>
    );
}
