import React from "react";
import Box from "@mui/material/Box";
import theme from "../config/theme";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Done } from "@mui/icons-material";
import { useEffect } from "react";
import supabase from "../config/supabase";
import { useNavigate } from "react-router-dom";
function NameForm() {
  const [value, setValue] = React.useState(30);
    const [name, setName] = React.useState("");
    const [userId, setUserId] = React.useState(null);
    const navigate = useNavigate();
     useEffect(() => {
       // Fetch user ID from Supabase session
       supabase.auth.onAuthStateChange((event, session) => {
         if (session) {
           setUserId(session.user.id);
         } else {
           // Handle user not being logged in
         }
       });
     }, []);
     const handleSubmit = async (e) => {
       e.preventDefault();

       if (!userId) {
         // Handle user not being logged in
         return;
       }

       try {
        //  const { data, error } = await supabase.from("user profile").upsert({
        //    id: userId,
        //    name,
        //    age: value,
        //  });
        const { data, error } = await supabase
          .from("user profiles")
          .insert([{ id: userId, name: name, age: value, }])
          .select();

         if (error) {
           console.log(error);
         } else {
            navigate("/dashboard");
         }
       } catch (error) {
         // Handle other errors
       }
     };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#31363F",
          height: 400,
          width: 500,
          border: "solid",
          borderWidth: 2,
          borderColor: "#CBF1F5",
        }}
      >
        <h1 style={{ marginLeft: "20px", color: "#00ADB5" }}>
          Please enter your name and age
        </h1>
        <form
          onSubmit={handleSubmit}
          method="get"
          style={{ marginTop: "20px", marginLeft: "50px" }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            required
            id="Nameinput"
            label="Enter your name"
            sx={{ color: "#EEEEEE" }}
            variant="standard"
            name="Name"
            value={name} // Bind name state to input value
            onChange={(e) => setName(e.target.value)}
          />
          <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
              Age
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof value === "number" ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <MuiInput
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="contained"
            endIcon={<Done />}
            sx={{ marginTop: 5 }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
}
export default NameForm;
