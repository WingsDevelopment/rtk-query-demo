import { useGetTotalCountQuery } from "../api/FetchDataApi";

export const useGetTotalCount = () => {
  const { isLoading, error, data, isFetching } = useGetTotalCountQuery();

  return {
    isLoading,
    error,
    count: data,
    isFetching,
  };
};
