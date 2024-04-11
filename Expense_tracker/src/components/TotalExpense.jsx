import React,{useState,useEffect} from "react";
import supabase from "../config/supabase";
export default function TotalExpense(){
    
    const [userData, setUserData] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [expenses,setExpenses] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await supabase.auth.getUser();
          const {
            data: { user },
          } = response;
          setUserData(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }, []);
    // Extract the current user's ID
    useEffect(() => {
      const getData = async () => {
        if (!userData || !userData.id) return; // Prevent unnecessary API calls before user data is available

        try {
          const { data: expenses, error } = await supabase
            .from("expenses")
            .select("expense_amount")
            .eq("uid", userData.id); // Add the filter for the current user's uid
            console.log(expenses);
            
          if (error) {
            // Handle any errors fetching expenses
            console.error("Error fetching expenses:", error);
            return;
          }

          setExpenses(expenses);
        } catch (error) {
          console.error("Error fetching name:", error);
        }
      };
      getData();
    }, [userData]);
    useEffect(()=>{
        const totalData= () => {
            let sum=0;
            for (const element of expenses) {
                sum += element.expense_amount;
                
            }
            setTotalExpense(sum);
            
        };
        totalData();
    },[expenses]);
    return (
      <div>
        {totalExpense.toFixed(2)}{" "}
        {/* Format to 2 decimal places */}
      </div>
    );
}
