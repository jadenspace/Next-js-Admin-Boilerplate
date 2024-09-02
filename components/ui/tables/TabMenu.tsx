"use client";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { lowerCase } from "es-toolkit/string";

export default function TabMenu({
  sheets,
  sheetIndex,
  setSheetIndex,
}: {
  sheets: string[];
  sheetIndex: number;
  setSheetIndex: (index: number) => void;
}) {
  const onTabChange = (event, newValue) => {
    setSheetIndex(newValue);
  };

  return (
    <Tabs
      value={sheetIndex}
      onChange={onTabChange}
      indicatorColor="primary"
      textColor="primary"
      variant="standard"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {sheets.map((sheet, i) => (
        <Tab key={sheet} label={lowerCase(sheet)} className="!border-b-2 !border-solid !border-gray-300" />
      ))}
    </Tabs>
  );
}
