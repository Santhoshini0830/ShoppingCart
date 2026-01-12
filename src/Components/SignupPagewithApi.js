import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

export const SignupPagewithApi = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mobileNumber, password, username }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        props.afterSignup(username);
      }
    } catch (error) {
      setError("An error occurred while signing up");
    }
  };

  return (
    <div className="Signup">
      <Form>
        <i class="fa-sharp fa-solid fa-user-plus plus"></i>
        <Form.Field className="formField">
          <br />

          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field className="formField">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field className="formField">
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
          />
        </Form.Field>
        <Form.Field className="formField">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field className="formField">
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </Form.Field>
        <Button type="submit" className="signButton" onClick={handleSubmit}>
          Sign Up
        </Button>
        <br />
        <b className="or">or</b>
        {error && <p>{error}</p>}
      </Form>
    </div>
  );
};
