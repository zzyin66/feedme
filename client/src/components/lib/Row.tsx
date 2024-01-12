import React from "react";
import { Stack } from "@mui/material";

interface RowProps {
  children: React.ReactNode;
}

export const Row = ({ children }: RowProps) => {
  return (
    <Stack spacing={2} direction="row">
      {children}
    </Stack>
  );
};
