"use client";

import { useState } from "react";
import { UpdateUserDTO } from "../api/users/route";

export default function UpdateUserForm() {
  const [inputValues, setInputValues] = useState<UpdateUserDTO>({
    username: "",
    name: "",
    age: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
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
          onChange={(e) =>
            setInputValues((prev) => ({ ...prev, username: e.target.value }))
          }
          value={inputValues.username}
          type="text"
        />
      </label>
      <label>
        Name:{" "}
        <input
          onChange={(e) =>
            setInputValues((prev) => ({ ...prev, name: e.target.value }))
          }
          value={inputValues.name}
          type="text"
        />
      </label>
      <label>
        Age:{" "}
        <input
          type="text"
          onChange={(e) =>
            setInputValues((prev) => ({ ...prev, age: +e.target.value }))
          }
        />
      </label>
      <button type="submit">Actualizar</button>
    </form>
  );
}
