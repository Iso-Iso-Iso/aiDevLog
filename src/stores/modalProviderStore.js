"use client";

import { createStore } from "zustand";
import { createClientStore } from "@/utils/createClientStore";

const createModalStore = () =>
  createStore((set) => ({
    activeModal: null,
    props: {},
    actions: {
      setActiveModal: (active, props = {}) => {
        set({ activeModal: active, props });
      },
      resetModal: () => {
        set({ activeModal: null, props: {} });
      },
    },
  }));

export const store = createClientStore(createModalStore);

export const ModalStoreProvider = store.Provider;
export const useModalStore = store.useStore;

export const useSelectActiveModal = () =>
  useModalStore((state) => state.activeModal);

export const useSelectPropsModal = () => useModalStore((state) => state.props);

export const useSelectModalStoreActions = () =>
  useModalStore((state) => state.actions);
