import { useQuery } from "@tanstack/react-query";
import { getTasksAction } from "./getTasks.action";

export const TASK_QUERY_PRIMARY_KEY = "tasks";
export const getTasksQueryKey = (params) => [TASK_QUERY_PRIMARY_KEY, params];

export const useGetTasksQuery = (params) => {
  return useQuery({
    queryKey: getTasksQueryKey(params),
    queryFn: () => getTasksAction(params),
  });
};
