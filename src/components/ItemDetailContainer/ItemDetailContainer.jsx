import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAPI } from '../../services/apiService';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export default function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const { itemId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAPI({ productId: itemId });
      if (result.fail) {
        setStatus('fail');
      } else {
        setProduct(result);
        setStatus('success');
      }
    };

    fetchData();
  }, [itemId]);

  return status === 'loading' ? (
    <p>Cargando...</p>
  ) : status === 'fail' ? (
    <ErrorMessage />
  ) : (
    <div className="ui-container">
      <ItemDetail {...product} />
    </div>
  );
}