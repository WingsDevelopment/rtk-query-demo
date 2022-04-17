import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAll } from "../hooks/useGetAll";

function ListAll() {
  const navigate = useNavigate();
  const { isLoading, data, error, isFetching } = useGetAll();

  if (isLoading) return <>Loading...</>;
  if (error) return <>'An error has occurred:'</>;

  const handleItemClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h2>This is list view: </h2>
        <p>{isFetching && "Updating..."}</p>
        <ul className="bg-white rounded-lg w-96 text-gray-900"></ul>

        {data.map((item, index) => {
          return (
            <li
              className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg cursor-pointer"
              key={index}
              onClick={() => handleItemClick(item.id)}
            >
              {item.name}
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default ListAll;
