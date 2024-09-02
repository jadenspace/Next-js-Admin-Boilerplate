"use client";

import { ThemeProvider } from "@mui/material/styles";
import { useSuspenseQuery } from "@tanstack/react-query";
import { lowerCase } from "es-toolkit/string";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useState, useEffect } from "react";

import { MUIDataTableTheme } from "@/app/theme";
import CustomToolbar from "@/components/ui/tables/CustomTollbar";
import TabMenu from "@/components/ui/tables/TabMenu";
import { keepBlankToPascalCase } from "@/helpers/string";
import { kyDefault } from "@/libs/fetchExtended";

type TableData = {
  [sheet: string]: {
    [column: string]: string | number | boolean;
  }[];
};

type Columns = {
  name: string;
  label: string;
};

export default function BulkDataTable({
  name,
  subName = undefined,
  url,
}: {
  name: string;
  subName?: string;
  url: string;
}) {
  const { data: tableData } = useSuspenseQuery<TableData>({
    queryKey: url.split("/").slice(2),
    queryFn: () => kyDefault(url.slice(1)).json(),
  });
  const [sheets, setSheets] = useState<string[]>([]);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [columns, setColumns] = useState<Columns[] | []>([]);
  const [rows, setRows] = useState([]);

  const options = {
    selectableRows: "none",
    download: false,
    print: false,
    search: false,
    filter: false,
    searchable: false,
    viewColumns: false,
    // eslint-disable-next-line react/no-unstable-nested-components
    customToolbar: () => {
      return <CustomToolbar name={name} subName={subName} url={url} columns={columns} sheets={sheets} />;
    },
    textLabels: {
      body: {
        noMatch: "해당 시트에 데이터가 없습니다.",
      },
    },
  } as MUIDataTableOptions;

  useEffect(() => {
    if (typeof tableData === "object") {
      const sheetKeys = Object.keys(tableData);
      const sheetValues = Object.values(tableData);
      const columnsData = sheetValues.map((item) => {
        if (item.length === 0) return [];
        return Object.keys(item[0]).map((it) => ({ name: it, label: keepBlankToPascalCase(lowerCase(it)) }));
      }) as Columns[];
      const rowsData = sheetValues.map((item) =>
        item.map((it) => Object.values(it).map((value) => (typeof value === "boolean" ? `${value}` : value))),
      );

      setSheets(sheetKeys);
      setColumns(columnsData);
      setRows(rowsData);
    }
  }, [tableData]);

  return (
    <ThemeProvider theme={MUIDataTableTheme}>
      <MUIDataTable
        key={sheets[sheetIndex]}
        title={<TabMenu sheets={sheets} sheetIndex={sheetIndex} setSheetIndex={setSheetIndex} />}
        columns={columns[sheetIndex]}
        data={rows[sheetIndex]}
        options={options}
      />
    </ThemeProvider>
  );
}
