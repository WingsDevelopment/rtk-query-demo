import { useGetByPageQuery } from "../api/FetchDataApi";

export const useGetByPage = (page, perPage) => {
  const { isLoading, error, data, isFetching } = useGetByPageQuery({
    page,
    perPage,
  });

  return {
    isLoading,
    error,
    data,
    isFetching,
  };
};
