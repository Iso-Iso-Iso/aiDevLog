"use client";

import { createStore } from "zustand";
import { createClientStore } from "@/utils/createClientStore";

const createModalStore = () =>
  createStore((set) => ({
    activeModal: null,
    actions: {
      setActiveModal: (active) => {
        set({ activeModal: active });
      },
      resetModal: () => {
        set({ activeModal: null });
      },
    },
  }));

export const { Provider: ModalStoreProvider, useStore: useModalStore } =
  createClientStore(createModalStore);

export const useSelectActiveModal = () =>
  useModalStore((state) => state.activeModal);

export const useSelectModalStoreActions = () =>
  useModalStore((state) => state.actions);
