import { useContext } from "react";

import { CartContext, State } from "./context";

export const useCart = () => {
  const [state, setState] = useContext(CartContext);

  const toggleOpen = () => {
    setState({ ...state, isOpen: !state.isOpen });
  };

  const addProduct = (productId: State["products"][0]) => {
    if (state.products.includes(productId)) return;
    setState({ ...state, products: [productId, ...state.products] });
  };

  const removeProduct = (productId: State["products"][0]) => {
    setState({
      ...state,
      products: state.products.filter((id) => id !== productId),
    });
  };

  return {
    ...state,
    toggleOpen,
    addProduct,
    removeProduct,
  };
};
