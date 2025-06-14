import React, { useEffect, useState } from "react";
import supabase from "../config/supabase";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import "./../../public/styles/CreateExpense.css"
function CreateExpense(){
  const [userData, setUserData] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date()); // Set a default date
    const navigate = useNavigate();
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
  const createExpense = async (e) => {
    e.preventDefault();

    try {
      // Get current user ID (assuming it's available from authentication)
      

      const { data, error } = await supabase.from("expenses").insert({
        expense_amount: amount,
        payment_method:description,
        category,
        expense_date:date,
        uid: userData.id, // Add user ID to the expense
      });

      if (error) {
        // Handle any errors during expense creation
        console.error("Error creating expense:", error);
      } else {
        navigate("/dashboard");// Handle successful expense creation (e.g., reset form fields, display success message)

      }
    } catch (error) {
      console.error("Error in createExpense:", error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={createExpense} className="form-style-4">
        <label htmlFor="amount">Amount :</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <br />
        <label htmlFor="description">Method of payment:</label>
        <select
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        >
          <option value="">-- Select mode of payment --</option>
          {/* Add your category options here */}
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          {/* Add more options as needed */}
        </select>
        <br />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select Category --</option>
          {/* Add your category options here */}
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="transportation">Transportation</option>
          {/* Add more options as needed */}
        </select>
        <br />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          required
        />
        <br />
        <Button type="submit" variant="contained" endIcon={<Add />}>
          Create Expense
        </Button>
      </form>
    </div>
  );
}
export default CreateExpense;