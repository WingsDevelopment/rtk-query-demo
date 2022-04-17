import { useGetAllQuery } from "../api/FetchDataApi";

export const useGetAll = () => {
  const { isLoading, error, data, isFetching } = useGetAllQuery();

  return {
    isLoading,
    error,
    data,
    isFetching,
  };
};
