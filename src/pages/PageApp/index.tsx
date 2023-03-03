import { useAuth } from "@/src/hooks/useAuth";
import React from "react";

export const PageApp = () => {
  const { methods } = useAuth();

  const handleLogOut = () => {
    methods.logOut();
  };

  return (
    <div>
      Área Logada
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};
