import React from "react";
import Button from "@mui/material/Button";
import { Typography, useTheme } from "@mui/material";

type ButtonType = "primary" | "secondary";

interface FeedMeButtonProps {
  type: ButtonType;
  children: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const FeedMeButton = ({
  type = "primary",
  children,
  onClick,
  disabled = false,
}: FeedMeButtonProps) => {
  const theme = useTheme();
  let textColor: string;
  switch (type) {
    case "primary":
      textColor = theme.palette.primary.contrastText;
      break;
    case "secondary":
      textColor = theme.palette.secondary.contrastText;
      break;
    default:
      textColor = theme.palette.primary.light;
  }
  return (
    <Button
      onClick={onClick}
      color={type}
      size="small"
      variant="contained"
      disabled={disabled}
      fullWidth={false}
      sx={{ textTransform: "none" }}
    >
      <Typography
        variant="body1"
        color={textColor}
        fontWeight={500}
        sx={{ letterSpacing: theme.spacing(1) }}
      >
        {children}
      </Typography>
    </Button>
  );
};
