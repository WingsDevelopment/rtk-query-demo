import { useQuery, useQueryClient } from "react-query";
import { getSingle } from "../api/FetchDataApi";

export const useGetSingle = (id, pageId) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery(
    ["getSingle", id],
    //get single by name
    () => getSingle(id, pageId),
    {
      initialData: () => {
        //breaking change, use queryClient from hook instead of queryCache
        //filter your list from CACHE by name
        //if item is found, it will instant load and after that fetch for changes
        //if item is not found, it will load
        const data = queryClient.getQueryData("getList");
        if (data && data.pages && data.pages[pageId]) {
          const item = data.pages[pageId]?.find((x) => x.id == id);
          console.log(item);
          return item;
        }
        return undefined;
      },
    }
  );

  return {
    isLoading,
    error,
    data,
    isFetching,
  };
};
