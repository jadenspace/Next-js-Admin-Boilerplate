"use client";

import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

export const MUIDataTableTheme: Theme = createTheme({
  components: {
    MUIDataTable: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
          boxShadow: "none!important",
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
          "& > span": {
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          },
          Button: {
            textTransform: "none",
            whiteSpace: "nowrap",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          justifyContent: "center",
          textAlign: "center",
        },
      },
    },
  } as ThemeOptions["components"],
});

export default theme;
