"use client";

import { useState } from "react";

export default function GetUserForm() {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState<{ username: string }>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
          />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {user && (
        <div>
          <h3>User</h3>
          <p>{JSON.stringify(user, null, 2)}</p>
        </div>
      )}
    </>
  );
}
