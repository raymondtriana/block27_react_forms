import { useState } from "react";

export default function SignUpForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  console.log(username);

  async function handleSubmit(event) {
    event.preventDefault();

    if(username.length < 8){
        setError("Error: username must be at least 8 characters long.");
        return;
    }
    if(password.length == 0){
        setError("Error: no password has been entered.");
        return;
    }

    setError(null);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      const result = await response.json();
      props.setToken(result.token);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
