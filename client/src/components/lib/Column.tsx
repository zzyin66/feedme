import React from "react";
import { Stack } from "@mui/material";

interface ColumnProps {
  children: React.ReactNode;
}

export const Column = ({ children }: ColumnProps) => {
  return (
    <Stack spacing={2} direction="column">
      {children}
    </Stack>
  );
};
