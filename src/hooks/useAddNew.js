import { useMutation, useQueryClient } from "react-query";
import { addElement } from "../api/FetchDataApi";

export const useAddNew = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, error } = useMutation(
    (newName) => addElement(newName),
    {
      //default behavior is to retry 3 times, but we don't will override this behavior
      retry: null,
      //optimistic update, add item to the cache array before server response
      onMutate: () => {
        queryClient.setQueriesData(["getTotalCount"], (prevData = 0) => {
          return ++prevData;
        });
      },
      onSuccess: (data) => {
        // refresh the cash by invalidating queries
        queryClient.invalidateQueries(["getList"]);
      },
      onError: (err) => {
        queryClient.setQueriesData(["getTotalCount"], (prevData = 0) => {
          if (prevData === 0) return prevData;
          return --prevData;
        });
      },
    }
  );

  return {
    isLoading,
    error,
    mutateAsync, //retun the length of the array
  };
};
