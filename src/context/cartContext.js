import { createContext } from "react";

export const cartContext = createContext([])
export const useCartContext = () => useContext(cartContext)