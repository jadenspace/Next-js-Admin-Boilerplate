"use client";

import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";

import { MUIDataTableTheme } from "@/app/theme";

const fadeInOut = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;
const sx = {
  "& .MuiTableBody-root, & .MuiTableFooter-root": {
    opacity: 0,
  },
  "& td.MuiTableCell-root": {
    border: 0,
  },
  "& .MuiTableHead-root .MuiTableCell-root": {
    opacity: 0.3,
    animation: `${fadeInOut} 1.5s ease-in-out infinite alternate`,
  },
};

export default function BulkDataTableSkeleton() {
  const options = {
    selectableRows: "none",
    download: false,
    print: false,
    search: false,
    filter: false,
    searchable: false,
    viewColumns: false,
    customToolbar: () => <div />,
  } as MUIDataTableOptions;
  return (
    <ThemeProvider theme={MUIDataTableTheme}>
      <Box sx={sx}>
        <MUIDataTable title="" columns={[""]} options={options} />
      </Box>
    </ThemeProvider>
  );
}
