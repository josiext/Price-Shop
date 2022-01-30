import { useContext } from "react";

import { CartContext } from "./context";

export const useCart = () => {
  const [state, setState] = useContext(CartContext);

  const toggleOpen = () => {
    setState({ ...state, isOpen: !state.isOpen });
  };

  return {
    ...state,
    toggleOpen,
  };
};
