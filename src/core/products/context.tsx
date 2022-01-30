import { createContext, useState } from "react";

import { Product } from "core/products/types";

interface State {
  isOpen: boolean;
  products: Product[];
}

const defaultValues: State = {
  isOpen: false,
  products: [],
};

export const CartContext = createContext([defaultValues, () => {}] as [
  State,
  (d: State) => void
]);

export const CartContextProvider = (props: { children: React.ReactNode }) => {
  const [state, setState] = useState<State>({
    isOpen: false,
    products: [],
  });

  return (
    <CartContext.Provider value={[state, setState]}>
      {props.children}
    </CartContext.Provider>
  );
};
