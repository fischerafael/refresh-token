import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TaskServices } from "../config/api";

export const useTask = (access: string) => {
  const data = useQuery(
    ["task", access],
    async () => {
      return taskServices.get(access);
    },
    {
      enabled: !!access,
    }
  );

  return data;
};

const taskServices = new TaskServices();
