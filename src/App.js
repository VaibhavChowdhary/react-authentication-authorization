import { Button, Typography } from "@mui/material";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { auth } from "./firebase-config";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
function App() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Register />
        <Login />
        <Typography variant="h5">User Logged in</Typography>
        {user?.email}
        <Button onClick={logout}>Logout</Button>
      </div>
    </Provider>
  );
}

export default App;
