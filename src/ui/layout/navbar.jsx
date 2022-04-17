import { Link } from "react-router-dom";
import TotalCount from "../common/total-count";

const Navbar = () => {
  return (
    <nav className="nav-bar" role="navigation">
      <Link className="pl-8 hover:text-blue-400s" to="/">
        :)
      </Link>

      <TotalCount />
      <div className="px-4 cursor-pointer md:hidden ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="pr-8 md:block hidden">
        <Link className="p-4 hover:text-blue-400" to="/">
          ListAll
        </Link>
        <Link className="p-4 hover:text-blue-400" to="/ListByPage">
          ListByPage
        </Link>
        <Link className="p-4 hover:text-blue-400" to="/AddNew">
          AddNew
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
