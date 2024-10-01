import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx';
import './shared.css'
import cartProvider from './context/cartProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <cartProvider> 
       <App />
    </cartProvider>
  </StrictMode>,
)