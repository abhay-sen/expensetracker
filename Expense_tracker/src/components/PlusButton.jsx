import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../config/theme";
function PlusButton(props){
    return (
      <div>
        <ThemeProvider theme={theme}>
          <IconButton
            aria-label="ADD Income or Expense"
            size="large"
            type={props.type}
            color="primary"
          >
            <Add fontSize="inherit" />
          </IconButton>
        </ThemeProvider>
      </div>
    );
}
export default PlusButton;