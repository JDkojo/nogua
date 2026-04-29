import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: {
    default: "Real Estate Portal",
    template: "%s | Real Estate Portal",
  },
  description: "Find your next property — residential, commercial, and luxury listings.",
  themeColor: "#1E3A8A",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-ink antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
