import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Totem SENAI",
  description: "Software para o totem do SENAI Mariano Ferraz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} font-sans`}>
      <body className="h-full flex">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            unstyled: true,
            actionButtonStyle: {
              color: "red",
            },
            classNames: {
              toast:
                "flex items-center gap-3 w-356px rounded-xl border border-2 border-red-700 bg-white px-4 py-3.5 shadow-lg text-black",
            },
          }}
        />
      </body>
    </html>
  );
}
