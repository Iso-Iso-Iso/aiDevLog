"use client";
import { ManageTask } from "@/modals/ManageTask/ManageTask";
import { DeleteTask } from "@/modals/DeleteTask/DeleteTask";
import { useSelectActiveModal, useSelectPropsModal } from "@/stores/modalProviderStore";

const modalMap = {
  manageTask: ManageTask,
  deleteTask: DeleteTask,
};

export const ModalProvider = ({ children }) => {
  const activeModal = useSelectActiveModal();
  const props = useSelectPropsModal();

  const ModalRenderer = modalMap[activeModal];

  return (
    <>
      {children}
      {activeModal && <ModalRenderer {...props} />}
    </>
  );
};
