import {
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
    doc,
    query,
    where
} from "firebase/firestore";
import { db } from './firebase';

const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

export const getCart = async (cartId) => {
  return retry(async () => {
    const cartDocRef = doc(db, 'carts', cartId);
    const cartDoc = await getDoc(cartDocRef);
    if (cartDoc.exists()) {
      return { data: cartDoc.data().items, fail: false };
    }
    return { data: null, fail: true };
  });
};

export const createCart = async (cartId) => {
  return retry(async () => {
    const cartDocRef = doc(db, 'carts', cartId);
    await setDoc(cartDocRef, { items: [] });
    return { success: true };
  });
};

export const updateCart = async (cartId, items) => {
  return retry(async () => {
    const cartDocRef = doc(db, 'carts', cartId);
    const cartDoc = await getDoc(cartDocRef);
    if (!cartDoc.exists()) {
      await createCart(cartId);
    }
    await updateDoc(cartDocRef, { items });
    return { success: true };
  });
};

export const fetchAPI = async ({ categoryId = null, productId = null } = {}) => {
  return retry(async () => {
    if (productId !== null) {
      const productIdNumber = Number(productId);
      if (isNaN(productIdNumber)) {
        throw new Error(`Invalid productId: ${productId}`);
      }
      const q = query(collection(db, 'products'), where('id', '==', productIdNumber));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error('No se encontró el producto');
      }
      const productDoc = querySnapshot.docs[0];
      return { id: productDoc.id, ...productDoc.data() };
    }
    const q = categoryId
      ? query(collection(db, 'products'), where('category', '==', categoryId))
      : collection(db, 'products');
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
  });
};

export const updateProductStock = async (productId, newStock) => {
  return retry(async () => {
    const productIdNumber = Number(productId);
    if (isNaN(productIdNumber)) {
      throw new Error(`Invalid productId: ${productId}`);
    }
    const q = query(collection(db, 'products'), where('id', '==', productIdNumber));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const productDoc = querySnapshot.docs[0];
      const productRef = doc(db, 'products', productDoc.id);
      await updateDoc(productRef, { stock: newStock });
      return { success: true };
    }
    return { success: false };
  });
};