import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from "react";
import supabase from "../config/supabase";
import theme from "../config/theme";
import { ThemeProvider } from "@emotion/react";

const columns = [
  {
    field: "category",
    headerName: "Category",
    headerClassName: "super-app-theme--header",
    width: 250,
    editable: true,
  },
  {
    field: "expense_amount",
    headerName: "Expense Amount",
    headerClassName: "super-app-theme--header",
    width: 175,
    editable: true,
  },
  {
    field: "payment_method",
    headerName: "Mode of payment",
    headerClassName: "super-app-theme--header",
    width: 175,
    editable: true,
  },
  {
    field: "expense_date",
    headerName: "Expense Date",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 175,
    editable: true,
  },
];



export default function DataGridDemo() {
    const [test, setTest] = useState([]);
    const [userData,setUserData]=useState([]);
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
        if (!userData|| !userData.id) return; // Prevent unnecessary API calls before user data is available

        try {
          const { data: expenses, error } = await supabase
        .from("expenses")
        .select()
        .eq("uid", userData.id); // Add the filter for the current user's uid

      if (error) {
        // Handle any errors fetching expenses
        console.error("Error fetching expenses:", error);
        return;
      }

      setTest(expenses);
        } catch (error) {
          console.error("Error fetching name:", error);
        }
      };
      getData();
    }, [userData]);
       // Update the state with the filtered expenses
    

    
  return (
    <div style={{alignSelf:"center"}}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: 400,
            width: 778,
            marginLeft: 50,
            backgroundColor: "#393E46",
            "& .super-app-theme--header": {
              backgroundColor: "#A6E3E9",

              color: "black",
            },
          }}
        >
          <DataGrid
            rows={test}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            sx={{
              boxShadow: 2,
              border: 2,
              color: "#E3FDFD",

              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}
