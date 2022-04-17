import { useGetByIdQuery } from "../api/FetchDataApi";

export const useGetById = (id) => {
  const { isLoading, error, data, isFetching } = useGetByIdQuery(id);

  return {
    isLoading,
    error,
    data,
    isFetching,
  };
};
