import React, { useEffect, useState } from "react";
import useData from "./Components/Data";
import "./list.css";
import ListItem from "./Components/ListItem";
import CustomButton from "./Components/CustomButton";

function App() {
  const { users, isLoading, setUser } = useData(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);
  function handleSearchClick() {
    const newSearchHistory = [...searchHistory, search];
    setSearchHistory(newSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));

    const filteredUsers = search
      ? users.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      : users; // Display all users if search term is empty

    setFilteredUsers(filteredUsers);
    filteredUsers.length > 0 ? setFilterState(true) : "";
    // Update filteredUsers state
    console.log(filteredUsers, filterState); // For debugging (remove in production)
  }

  function handleSorting() {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUser(sortedUsers);
  }
  function handleClear() {
    setFilterState(false);
    setSearch("");
  }
  return (
    <>
      {showHistory && (
        <div className="history">
          { searchHistory.length > 0 ? (
            <ol>
              { searchHistory.map((item, index) => (
                <li key={ index }>{ item }</li>
              )) }
            </ol>) : ("None") }
        </div>
      )}
      <nav>
        <div>
          <input
            className="search-box"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CustomButton className={"btn-search"} onClick={handleSearchClick}>
            Search
          </CustomButton>
          <CustomButton className={"btn-search"} onClick={handleClear}>
            Clear Search
          </CustomButton>
        </div>
        <div>
          <CustomButton className={"btn-search"} onClick={handleSorting}>
            Sort
          </CustomButton>
          <CustomButton
            className={"btn-search btn-history"}
            onClick={() => setShowHistory(!showHistory)}
          >
            Search History
          </CustomButton>
        </div>
      </nav>

      <div className="main-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          (filterState ? filteredUsers : users).map((user) => (
            <ListItem key={user.id} user={user} />
          ))
        )}
      </div>
    </>
  );
}

export default App;
