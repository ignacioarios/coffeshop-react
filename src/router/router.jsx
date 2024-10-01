import React, { Suspense, lazy } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { ItemsListContainer } from '../components/ItemsListContainer/ItemsListContainer';
import { NotFound } from '../components/NotFound/NotFound';

const ItemDetailContainer = lazy(() =>
  import('../components/ItemDetailContainer/ItemDetailContainer')
);
const Cart = lazy(() => import('../components/Cart/Cart'));
const OrderForm = lazy(() => import('../components/OrderForm/OrderForm'));

const categoryGreetings = {
  Nacional: 'Aquí encuentras café de origen Nacional:',
  Internacional: 'Aquí encuentras café de origen Internacional:',
  Vajilla: 'Aquí encuentras nuestra Vajilla:',
  default: 'Aquí están todos nuestros productos de esta categoría.',
};

export function AppRouter() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <ItemsListContainer greeting="¡Bienvenidos a Caffè maledetto ! Aquí están todos nuestros productos." />
          }
        />
        <Route path="/category/:categoryId" element={<CategoryItemsList />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<OrderForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function CategoryItemsList() {
  const { categoryId } = useParams();
  const greeting = categoryGreetings[categoryId] || categoryGreetings.default;
  return <ItemsListContainer greeting={greeting} />;
}

