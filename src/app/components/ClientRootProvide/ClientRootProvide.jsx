"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/getQueryClient";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalStoreProvider } from "@/stores/modalProviderStore";

export default function ClientRootProvide({ children }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalStoreProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ModalStoreProvider>
    </QueryClientProvider>
  );
}
