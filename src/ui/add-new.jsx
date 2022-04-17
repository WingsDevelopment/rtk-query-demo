import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateFruit } from "../hooks/useCreateFruit";

function AddNew() {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const { createFruit, isLoading, error } = useCreateFruit();

  if (isLoading) return <>Loading...</>;
  if (error) return <>'An error has occurred: '</>;

  const handleMutate = async () => {
    await createFruit({ name: newName });
    navigate(`/`);
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter new item"
            aria-label="Full name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            onClick={handleMutate}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Add new item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNew;
