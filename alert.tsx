import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { StellarProvider } from "@/context/StellarContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Stellar Poll - Web3 DApp",
  description: "A decentralized poll application on Stellar Testnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
        <ErrorReporter />
        <StellarProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </StellarProvider>
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
