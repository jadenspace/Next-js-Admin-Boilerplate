import { Box } from "@mui/material";
import { ReactNode } from "react";

import Breadcrumb from "@/components/layout/Breadcrumb";
import Deploy from "@/components/layout/Deploy";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";

export function AuthRootWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        display: "grid",
        gridTemplateAreas: `
        "header header"
        "nav main"
        "footer footer"
      `,
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr auto",
        width: "100%",
        minHeight: "100vh",
        fontFamily: "Pretendard, -apple-system, Roboto, Arial, sans-serif",

        "& header": {
          height: "var(--header-height)",
          gridArea: "header",
          borderBottom: "1px solid #e0e0e0",
        },
        "& nav": {
          width: "var(--navigation-width)",
          gridArea: "nav",
          borderRight: "1px solid #e0e0e0",
        },
        "& main": {
          gridArea: "main",
          width: "calc(100vw - var(--navigation-width) - var(--scroll-width, 0))",
          backgroundColor: "#fafafa",
        },
        "& footer": {
          height: "var(--footer-height)",
          gridArea: "footer",
          borderTop: "1px solid #e0e0e0",
        },
        "& .MuiButton-root": {
          fontFamily: "Pretendard, -apple-system, Roboto, Arial, sans-serif",
        },
      }}
    >
      <Header />
      <Navigation />
      <main>
        <Breadcrumb />
        <Deploy />
        <Box
          sx={{
            overflow: "hidden",
            margin: "20px",
            height: "calc(100% - var(--header-height) - var(--footer-height) - var(--deploy-height, 0px) - 2px)", // 2px: border
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          {children}
        </Box>
      </main>
      <Footer />
    </Box>
  );
}
