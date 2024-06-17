import { useEffect, useState } from "react";

function useData(url) {
    const [users, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUser(data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); 
      }
    }

    fetchData();
  }, [url]);
    return { users, isLoading ,setUser};
}
export default useData;