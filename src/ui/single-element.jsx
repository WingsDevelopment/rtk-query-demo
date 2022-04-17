import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetById } from "../hooks/useGetById";
import { useUpdateFruit } from "../hooks/useUpdateFruit";

const SingleElement = () => {
  let { id } = useParams();
  const [newName, setNewName] = useState("");
  const {
    updateFruit,
    isLoading: updateLoading,
    error: updateError,
  } = useUpdateFruit();

  const { data, error, isFetching, isLoading } = useGetById(id);

  const handleMutate = async () => {
    await updateFruit({ ...data, name: newName });
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>'An error has occurred: '</>;

  return (
    <>
      <div className="flex justify-center">
        <div>
          <h2>This is the details view: </h2>
          <hr />
          <p>{isFetching && "Updating..."}</p>
          <p>Id: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Description: {data.description}</p>
        </div>
      </div>
      <div className="flex justify-center mt-11">
        <div>
          <hr />
          <h2>This is the update part of the view: </h2>
          <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-teal-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder={data.name}
                aria-label="Full name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={handleMutate}
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
              >
                Enter new name
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleElement;
