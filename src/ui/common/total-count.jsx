import { useGetTotalCount } from "../../hooks/useGetTotalCount";

function TotalCount() {
  const { isLoading, error, count, isFetching } = useGetTotalCount();

  if (isLoading) return <>Loading...</>;
  if (error) return <>'An error has occurred: '</>;

  return (
    <div className="flex items-center">
      <span>
        Total fruit count: <strong className="underline"> {count} </strong>
      </span>
      {isFetching && <span className="pl-5">Updating...</span>}
    </div>
  );
}

export default TotalCount;
