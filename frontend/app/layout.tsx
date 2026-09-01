import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Providers from "./providers";


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      
    >
      <body className="min-h-full flex flex-col">
        <Providers>
      {children}
    </Providers>
      </body>
    </html>
  );
}
