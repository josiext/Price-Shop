import { useContext } from "react";

import { CartContext, State } from "./context";

export const useCart = () => {
  const [state, setState] = useContext(CartContext);

  const toggleOpen = () => {
    setState({ ...state, isOpen: !state.isOpen });
  };

  const addProduct = (itemId: State["products"][0]["id"]) => {
    if (state.products.find((item) => item.id === itemId)) return;
    setState({
      ...state,
      products: [{ id: itemId, amount: 1 }, ...state.products],
    });
  };

  const removeProduct = (id: State["products"][0]["id"]) => {
    setState({
      ...state,
      products: state.products.filter((item) => item.id !== id),
    });
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
    setState({
      ...state,
      products,
    });
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
    setState({
      ...state,
      products,
    });
  };

  return {
    ...state,
    toggleOpen,
    addProduct,
    removeProduct,
    addAmount,
    decreaseAmount,
  };
};
