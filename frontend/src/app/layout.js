import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>DMS</title>
      </head>
      <body>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              error: {
                style: {
                  background: "#dc2626",
                  color: "#ffffff",
                  fontWeight: "600",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#dc2626",
                },
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
