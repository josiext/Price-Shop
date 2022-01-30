import { createContext, useState } from "react";

import { Product } from "core/products/types";

const defaultValues = {
  isOpen: false,
  products: [] as Product[],
};

export const CartContext = createContext([defaultValues, () => {}] as [
  typeof defaultValues,
  (d: typeof defaultValues) => void
]);

export const CartContextProvider = (props: { children: React.ReactNode }) => {
  const [state, setState] = useState({
    isOpen: false,
    products: [] as Product[],
  });

  return (
    <CartContext.Provider value={[state, setState]}>
      {props.children}
    </CartContext.Provider>
  );
};
