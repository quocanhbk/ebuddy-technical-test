"use client";

import { ProtectedRoute } from "@/components/templates/ProtectedRoute";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { store } from "@/store/store";
import { theme } from "@/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <ProtectedRoute>{children}</ProtectedRoute>
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
