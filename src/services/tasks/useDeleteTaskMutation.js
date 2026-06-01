import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASK_QUERY_PRIMARY_KEY } from "./useGetTasksQuery";
import { apiClient } from "@/services/apiClient";
import { showToast } from "@/utils/showToast";

export const deleteTaskMutationFn = async (id) => {
  return await apiClient.delete(`/api/tasks/${id}`);
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_PRIMARY_KEY],
      });
      showToast({ type: "success", text: "Task deleted successfully!" });
    },
    onError: () => {
      showToast({ type: "error", text: "Failed to delete task." });
    },
  });
};
