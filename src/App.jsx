import { useEffect, useState } from "react";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";
import "./App.css";
function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    console.log(token);
  }, [token]);
  return (
    <>
      <Authenticate token={token} />
      <SignUpForm setToken={setToken} />
    </>
  );
}

export default App;
