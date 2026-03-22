import React from "react";
import { Button as MUIButton } from "@mui/material";

export function Button({ className = "", children, ...props }) {
  return (
    <MUIButton
      {...props}
      className={
        "normal-case rounded-full bg-[#BA5C1E] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#9E4E19] shadow-sm " +
        className
      }
      disableElevation
      sx={{
        color: "white !important",
        "&:hover": {
          color: "white !important",
        },
      }}
    >
      {children}
    </MUIButton>
  );
}
