import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { CopilotPanel } from "@/components/chat/CopilotPanel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel AI | Digital Trust & Threat Intelligence",
  description: "Next-generation AI Security Operations Center powered by GenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased dark`}
    >
      <body className="h-screen w-screen bg-[#0B0F14] text-[#E2E8F0] font-sans flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full min-w-0 relative">
          <Topbar />
          <div className="flex-1 overflow-auto relative p-6">
            <div className="max-w-7xl mx-auto h-full space-y-6">
              {children}
            </div>
          </div>
        </main>
        <CopilotPanel />
      </body>
    </html>
  );
}
