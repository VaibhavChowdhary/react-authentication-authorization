import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { auth } from "../firebase-config";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const handleEmailChange = (e) => {
    setLoginEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setLoginPassword(e.target.value)
  }
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", maxWidth: "40%" }}>
          <Typography variant="h4">Login</Typography>
          <TextField placeholder="Email" onChange={handleEmailChange} />
          <TextField placeholder="Password" onChange={handlePasswordChange} />
          <Button variant="contained" onClick={login}> Login</Button>
        </Box>
      </Container>
    </>
  )
};

export default Login
