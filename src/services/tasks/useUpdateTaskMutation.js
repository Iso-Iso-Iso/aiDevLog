import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASK_QUERY_PRIMARY_KEY } from "./useGetTasksQuery";
import { apiClient } from "@/services/apiClient";
import { showToast } from "@/utils/showToast";

export const updateTaskMutationFn = async (taskData) => {
  const { id, ...data } = taskData;
  return await apiClient.put(`/api/tasks/${id}`, data);
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_PRIMARY_KEY],
      });
      showToast({ type: "success", text: "Task updated successfully!" });
    },
    onError: () => {
      showToast({ type: "error", text: "Failed to update task." });
    },
  });
};
