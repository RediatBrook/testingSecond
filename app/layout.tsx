
"use client"

import "@/styles/globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4b00ad',
        contrastText: "#fff" //button text white instead of black
      },
      secondary: {
        main: purple[500],
      },
    },
  });

  return (
    <html lang="en">
      <body style={{background: 'rgb(249 250 251)'}}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
