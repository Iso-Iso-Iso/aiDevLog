import { Header } from "./components/Header/Header";
import { TaskList } from "./components/TaskList/TaskList";
import styles from "./page.module.css";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/getQueryClient";
import { getTasksAction } from "@/services/tasks/getTasks.action";
import { getTasksQueryKey } from "@/services/tasks/useGetTasksQuery";

export default async function Page() {
  const queryClient = getQueryClient();
  const defaultParams = { sortBy: "createdAt", sortOrder: "desc" };

  await queryClient.prefetchQuery({
    queryKey: getTasksQueryKey(defaultParams),
    queryFn: () => getTasksAction(defaultParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.main}>
        <Header />
        <TaskList />
      </main>
    </HydrationBoundary>
  );
}
