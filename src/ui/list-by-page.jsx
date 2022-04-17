import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetByPage } from "../hooks/useGetByPage";
import { useGetTotalCount } from "../hooks/useGetTotalCount";

function ListByPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const {
    isLoading: isCountLoading,
    error: countError,
    count,
    isFetching: isCountFetcing,
  } = useGetTotalCount();

  const { isLoading, data, error, isFetching } = useGetByPage(page, perPage);

  if (isLoading) return <>Loading...</>;
  if (error) return <>'An error has occurred:'</>;

  const handleItemClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handlePreviousClick = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h2>This is list by page view: </h2>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Fruit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr
                          className="border-b"
                          key={index}
                          onClick={() => handleItemClick(item.id, page - 1)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.name}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <label>Items per page </label>
            <select
              className="select-per-page-param"
              aria-label="Default select example"
              onChange={(e) => setPerPage(e.target.value)}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {page + 1}
            </span>{" "}
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {data.length}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {perPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {isCountFetcing ? (
                <>Fatching...</>
              ) : isCountLoading ? (
                <>Loading!!!</>
              ) : (
                count
              )}
            </span>{" "}
            Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePreviousClick}
              disabled={page === 0}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button
              onClick={handleNextClick}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <p>{isFetching && "Updating..."}</p>
      </div>
    </div>
  );
}

export default ListByPage;
