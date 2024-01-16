import React from "react";
import { Stack } from "@mui/material";

interface ColumnProps {
  children: React.ReactNode;
  gap?: number;
}

export const Column = ({ children, gap }: ColumnProps) => {
  return (
    <Stack spacing={gap} direction="column">
      {children}
    </Stack>
  );
};
