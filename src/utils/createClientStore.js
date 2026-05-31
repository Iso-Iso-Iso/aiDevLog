import { createContext, useState, useContext } from "react";
import { useStore as useZustandStore } from "zustand";

export const createClientStore = (storeCreator) => {
  const StoreContext = createContext(null);

  const Provider = ({ children, initialState }) => {
    const [store] = useState(() => storeCreator(initialState));

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  };

  const useStore = (selector) => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error(
        "useStore must be used within its corresponding StoreProvider",
      );
    }
    return useZustandStore(store, selector);
  };

  return {
    Provider,
    useStore,
  };
};
