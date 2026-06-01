import { useQuery } from "@tanstack/react-query";
import { getPrioritizedTasks } from "./getPrioritizedTasks";

export const getPrioritizedTasksKey = () => ["prioritizedTasks"];

export const usePrioritizedTasksQuery = () => {
  return useQuery({
    queryKey: getPrioritizedTasksKey(),
    queryFn: () => getPrioritizedTasks(),
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
