"use client";

import { useState } from "react";

export default function DeleteUserForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:{" "}
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
        />
      </label>
      <button type="submit">Borrar</button>
    </form>
  );
}
