import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import UserProvider from "@/contexts/useContext";
import { Toaster } from "@/components/ui/toaster";
import AppShell from "@/components/layouts/app-shell";

export const metadata: Metadata = {
  title: "ResumeRise | AI Resume & CV Builder",
  description:
    "Build ATS-optimized, modern resumes with intelligent keyword suggestions and recruiter-tested templates.",
  icons: {
    icon: "/rb-logo.png",
    shortcut: "/rb-logo.png",
    apple: "/rb-logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/google-sans"
        />
      </head>
      <body className="font-sans m-0 p-0 min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <AppShell defaultOpen={defaultOpen}>
              {children}
            </AppShell>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
