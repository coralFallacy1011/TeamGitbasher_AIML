import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'D:/Akshat/RVCE/Extracurriculars/Gitbashers/jmss/jmss/src/styles/LoginPage.css';
import { LockOutlined } from "@mui/icons-material";
import { Sidebar } from './Sidebar';
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  async function sendData() {
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Ensure JSON is used
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
      });
  
      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setPassword("");
      } else {
        const data = await response.json();
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };


  return (
    <>
      <Sidebar />
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'seagreen' }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <p></p>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:'seagreen'}}
              onClick={sendData}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success" sx={{ mt: 2 }}>
                Login successful!
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;