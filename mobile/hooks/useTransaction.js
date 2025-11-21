//mobile/hooks/useTransaction.js
import { useCallback, useState } from "react";
import { Alert } from "react-native";

//useState = data remeber karanwa
//const [name, setName] = useState("Isuru");

//name → the current value
//setName() → a function to update that value
//"Isuru" → the starting/default value

//useEffect = side effects handle karanwa. fetching data from API, reading/writing local storage

const API_URL = "http://localhost:5001/api";

export const useTransaction = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expences: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  //data gennagannawa, callback demmama userID eka thiyenakan recreate wenne na function eka
  const fetchTransactions = useCallback(async () => {
    if (!userId) {
      console.log("No userId, skipping fetchTransactions");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        setTransactions(data.data);
      } else if (Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.warn("Unexpected response format:", data);
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    if (!userId) {
      console.log("No userId, skipping fetchSummary");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  //function 2ma parallel  call karanna puluwan
  const loadData = useCallback(async () => {
    if (!userId) {
      console.log("No userId provided to loadData");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete transaction");

      //refresh data after delete
      loadData();
      Alert.alert("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Failed to delete transaction");
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};