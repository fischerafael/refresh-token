import { useAuth } from "@/src/hooks/useAuth";
import { useTask } from "@/src/hooks/useTask";
import React from "react";

export const PageApp = () => {
  const { methods, state } = useAuth();

  const { data } = useTask(state.access);

  console.log(data);

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
