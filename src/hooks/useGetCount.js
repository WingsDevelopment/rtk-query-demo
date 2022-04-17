import { useQuery } from "react-query";
import { getTotalCount } from "../api/FetchDataApi";

export const useGetCount = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ["getTotalCount"],
    getTotalCount
  );

  return {
    isLoading,
    error,
    count: data, //retun the length of the array
    isFetching,
  };
};
