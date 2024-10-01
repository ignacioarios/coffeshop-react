import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { AppRouter } from './router/router';
import { CartProvider } from './context/CartContext';
import './shared.css';
import Footer from './components/Footer/Footer';

export function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <AppRouter />
        </BrowserRouter>
        <Footer />
      </CartProvider>
    </div>
  );
}