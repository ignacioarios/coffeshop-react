import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { getSingleProduct } from '../../firebase/db';

export function ItemDetailContainer() {
    const [product, setProduct] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        getSingleProduct(itemId, setProduct)
    }, [itemId]);

    return (
        <div className="ui-container">
            {product ? <ItemDetail {...product} /> : <p>Cargando..</p>}
        </div>
    );
}
