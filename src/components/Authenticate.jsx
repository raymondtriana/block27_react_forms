import { useEffect, useState } from "react";
export default function Authenticate(props) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username,setUsername] = useState("");

  //Reset state upon new token creation
    useEffect(()=>{
     setSuccess(null);
     setError(null);   
    },[props.token])

  async function handleClick(e) {
    console.log(`Authenticating token: ${props.token}`);

    if(props.token == null){
        setError("Token is null");
        return;
    }

    setError(null);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result)
      setUsername(result.data.username);
      setSuccess(result.message);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      {error && <p className="error">Error:{error}</p>}
      {success && (
        <p className="success">
          Success: {success}
          <br />
          username: {username}
        </p>
      )}
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Authenticate Token
      </button>
    </>
  );
}
