'use client'
import {globalStyles} from "./GlobalStyles";
import { Global } from "@emotion/react";
import { CssBaseline } from '@mui/material';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>PANTrack</title>
        <meta name="description" content="Pantrack pantry tracker" />
      </head>
      <body>
        <Global styles={globalStyles} />
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
