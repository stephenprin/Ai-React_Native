import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
    
  useEffect(() => {
    fetchData();
  }, []);
    
    const reFetch=()=> fetchData()
    
    return {data, reFetch, isLoading}

}
export default useAppwrite;