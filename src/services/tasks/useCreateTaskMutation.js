import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";
import { showToast } from "@/utils/showToast";
import { TASK_QUERY_PRIMARY_KEY } from "./useGetTasksQuery";

export const createTaskMutationFn = async (taskData) => {
  return await apiClient.post("/api/tasks", taskData);
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_PRIMARY_KEY],
      });
      showToast({ type: "success", text: "Task created successfully!" });
    },
    onError: () => {
      showToast({ type: "error", text: "Failed to create task." });
    },
  });
};
