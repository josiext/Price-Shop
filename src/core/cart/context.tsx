import { createContext, useState, useContext, useEffect } from "react";

import { Product } from "core/products/types";

interface State {
  isOpen: boolean;
  products: { id: Product["id"]; amount: number }[];
}

const defaultValues: State = {
  isOpen: false,
  products: [],
};

const CartContext = createContext([defaultValues, {}] as [
  State,
  {
    openCart: () => void;
    closeCart: () => void;
    addProduct: (id: Product["id"]) => void;
    removeProduct: (id: Product["id"]) => void;
    decreaseAmount: (id: Product["id"]) => void;
    addAmount: (id: Product["id"]) => void;
    removeAllProducts: () => void;
  }
]);

const getProducts = () => {
  if (typeof window === "undefined") return [];
  const products = localStorage.getItem("cart-items");
  return products ? JSON.parse(products) : [];
};

const STORAGE_CART_KEY = "cart-items";

const useCart = () => {
  const [state, setState] = useState<State>(() => ({
    isOpen: false,
    products: getProducts(),
  }));

  useEffect(() => {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(state.products));
  }, [state.products]);

  const addProduct = (itemId: State["products"][0]["id"]) => {
    if (state.products.find((item) => item.id === itemId)) return;
    setState({
      ...state,
      products: [{ id: itemId, amount: 1 }, ...state.products],
    });
  };

  const removeProduct = (id: State["products"][0]["id"]) => {
    const products = state.products.filter((item) => item.id !== id);
    setState({ ...state, products });
  };

  const addAmount = (id: State["products"][0]["id"]) => {
    const products = state.products.map((item) =>
      item.id === id
        ? {
            ...item,
            amount: item.amount + 1,
          }
        : item
    );
    setState({ ...state, products });
  };

  const decreaseAmount = (id: State["products"][0]["id"]) => {
    const products = state.products.map((item) =>
      item.id === id
        ? {
            ...item,
            amount: item.amount > 1 ? item.amount - 1 : item.amount,
          }
        : item
    );
    setState({ ...state, products });
  };

  const removeAllProducts = () => {
    setState({ ...state, products: [] });
  };

  const closeCart = () => {
    setState({ ...state, isOpen: false });
  };

  const openCart = () => {
    setState({ ...state, isOpen: true });
  };

  const actions = {
    closeCart,
    openCart,
    addProduct,
    removeProduct,
    decreaseAmount,
    addAmount,
    removeAllProducts,
  };

  return { state, actions };
};

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = (props: { children: React.ReactNode }) => {
  const Cart = useCart();

  return (
    <CartContext.Provider value={[Cart.state, Cart.actions]}>
      {props.children}
    </CartContext.Provider>
  );
};
