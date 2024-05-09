import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { Providers } from "./_contexts";
import Header from "./_components/Header";
import { HStack, VStack } from "@chakra-ui/react";
import { MAX_PAGE_WIDTH } from "./_utils/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coinalytics",
  description: "Beep boop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <HStack justify="center">{children}</HStack>
        </Providers>
      </body>
    </html>
  );
}
