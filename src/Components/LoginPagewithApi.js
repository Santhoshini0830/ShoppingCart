import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

export const LoginPagewithApi = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        props.afterLogin(username);
      }
    } catch (error) {
      setError("An error occurred while signing up");
    }
  };

  return (
    <div className="Signup">
      <Form className="form" onSubmit={handleSubmit}>
        <i class="fa fa-user user" aria-hidden="true"></i>
        <Form.Field className="formField">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field className="formField">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        {error && <p>{error}</p>}
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};
