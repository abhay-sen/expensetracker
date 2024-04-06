import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from "react";
import supabase from "../config/supabase";
import theme from "../config/theme";
import { ThemeProvider } from "@emotion/react";

const columns = [
  {
    field: "expense_type",
    headerName: "Expense Type",
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
    
    useEffect(() => {
      getData();
    }, []);
    async function getData() {
      const { data: testing, error } = await supabase
        .from("testing")
        .select("*");
      setTest(testing);
    }
    
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: 400,
          width: 603,
          
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
  );
}
