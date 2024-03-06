import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase-config"
import {
  setEmail,
  setPassword,
  setConfirmPassword,
} from "../redux/features/registerSlice";
import { useState } from "react";
const Register = () => {
  const { email, password, confirmPassword } = useSelector(
    (state) => state.register
  );
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cnfmPassError, setconfmPassError] = useState(false);
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(e.target.value) || !e.target.value) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
    if (e.target.value.length >= 6 || !e.target.value) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    dispatch(setConfirmPassword(e.target.value));
    if (password === e.target.value || !e.target.value) {
      setconfmPassError(false);
    } else {
      setconfmPassError(true);
    }
  };

  const handleRegister = async () => {
    setEmailError(emailError === true || !email);
    setPasswordError(passwordError === true || !password);
    setconfmPassError(cnfmPassError === true || !confirmPassword);
    if (
      !emailError &&
      email &&
      !passwordError &&
      password &&
      !cnfmPassError &&
      confirmPassword
    ) {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user)
    }
  };
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "40%",
            gap: "5px",
          }}
        >
          <Typography variant="h4">Register User</Typography>
          <TextField
            error={emailError}
            placeholder="Email"
            helperText={emailError ? "Enter valid Email" : ""}
            type="email"
            onChange={handleEmailChange}
            required
          />
          <TextField
            error={passwordError}
            placeholder="Password"
            helperText={
              passwordError
                ? "Password length must be 6 characters or greater"
                : ""
            }
            onChange={handlePasswordChange}
            type="password"
          />
          <TextField
            placeholder="Confirm Password"
            error={cnfmPassError}
            helperText={cnfmPassError ? "Password did not match" : ""}
            onChange={handleConfirmPasswordChange}
            type="password"
          />
          <Button variant="contained" onClick={handleRegister}>
            Create User
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Register;
