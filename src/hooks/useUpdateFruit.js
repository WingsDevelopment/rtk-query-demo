import { useUpdateFruitMutation } from "../api/FetchDataApi";

export const useUpdateFruit = () => {
  const [updateFruit, { isLoading, error, data }] = useUpdateFruitMutation();

  return {
    updateFruit,
    isLoading,
    error,
    data,
  };
};
