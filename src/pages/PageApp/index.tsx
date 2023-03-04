import { useAuth } from "@/src/hooks/useAuth";
import { useTask } from "@/src/hooks/useTask";
import React from "react";

export const PageApp = () => {
  const { methods, state } = useAuth();

  const { data: firstCallData } = useTask(state.access);
  const { data: secondCallData } = useTask(state.access, "secondCall");

  console.log(firstCallData, secondCallData);

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
