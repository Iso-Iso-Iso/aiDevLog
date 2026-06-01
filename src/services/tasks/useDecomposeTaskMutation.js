import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASK_QUERY_PRIMARY_KEY } from "./useGetTasksQuery";
import { apiClient } from "@/services/apiClient";
import { showToast } from "@/utils/showToast";

export const decomposeTaskMutationFn = async (prompt) => {
  const result = await apiClient.post("/api/tasks/decompose", { prompt });
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
};

export const useDecomposeTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: decomposeTaskMutationFn,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_PRIMARY_KEY],
      });
      showToast({ type: "success", text: `Successfully generated ${data?.tasks?.length || "new"} task(s)!` });
    },
    onError: (error) => {
      showToast({ type: "error", text: error.message || "Failed to generate tasks." });
    },
  });
};
