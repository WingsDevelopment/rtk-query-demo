import { useInfiniteQuery } from "react-query";
import { getList } from "../api/FetchDataApi";

export const useGetList = (initialPage) => {
  const {
    isLoading,
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["getList"],
    ({ pageParam = initialPage }) => getList(pageParam),
    {
      //setup stale time to not get confused while debugging.
      staleTime: 5000,
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    }
  );

  return {
    isLoading,
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
