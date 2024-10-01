import { useState, useContext } from 'react';
import {
  collection,
  addDoc,
  doc,
  writeBatch,
  increment,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import { CartContext } from '../../context/CartContext';
import { OrderSummary } from './OrderSummary';
import { FormField } from './FormField';
import styles from './OrderForm.module.css';

export default function OrderForm() {
  const { cart, emptyCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido.';
    }
    if (!/^\d{8,}$/.test(formData.phone)) {
      errors.phone = 'El teléfono debe tener al menos 8 dígitos numéricos.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El correo electrónico no es válido.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const ordersCollection = collection(db, 'orders');
      const order = { buyer: formData, items: cart, date: new Date() };
      const orderDoc = await addDoc(ordersCollection, order);
      setOrderId(orderDoc.id);

      const batch = writeBatch(db);

      for (const item of cart) {
        
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('id', '==', Number(item.id)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const productDoc = querySnapshot.docs[0];
          const productRef = doc(db, 'products', productDoc.id);

    
          batch.update(productRef, { stock: increment(-item.quantity) });
        } else {
          console.error(`Producto con id ${item.id} no encontrado en Firestore.`);
        }
      }

      await batch.commit();
      emptyCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error al procesar la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (orderPlaced) {
    return (
      <div className={styles.thankYouMessage}>
        <h2>¡Gracias por comprar!</h2>
        <p>Número de orden: {orderId}</p>
      </div>
    );
  }

  return (
    <div className={styles.orderFormContainer}>
      <h2>Revisar y confirmar tu pedido</h2>
      <OrderSummary cart={cart} />

      <form onSubmit={handlePlaceOrder} className={styles.formGroup}>
        <FormField
          label="Nombre"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          label="Teléfono"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormField
          label="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <button type="submit" className={styles.placeOrderButton} disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </form>
    </div>
  );
}