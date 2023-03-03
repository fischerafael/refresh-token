import { useAuth } from "@/src/hooks/useAuth";
import React, { useState } from "react";

export const PageLogin = () => {
  const { methods } = useAuth();
  const [state, setState] = useState({ email: "", password: "" });

  const handleLogIn = async (e: any) => {
    e.preventDefault();
    await methods.logIn(state.email, state.password);
  };

  return (
    <form onSubmit={handleLogIn}>
      <input
        placeholder="Email"
        type="email"
        value={state.email}
        onChange={(e) =>
          setState((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        placeholder="password"
        type="password"
        value={state.password}
        onChange={(e) =>
          setState((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <button type="submit">Log In</button>
    </form>
  );
};
