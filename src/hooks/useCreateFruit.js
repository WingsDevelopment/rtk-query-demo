import { useCreateFruitMutation } from "../api/FetchDataApi";

export const useCreateFruit = () => {
  const [createFruit, { isLoading, error, data }] = useCreateFruitMutation();

  return {
    createFruit,
    isLoading,
    error,
    data,
  };
};
