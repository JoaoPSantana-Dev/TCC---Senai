import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Alertas } from "@/components/shared/Alertas";
import { obterSessao } from "@/lib/sessao";
import { DetectorInaividade } from "@/components/shared/DetectorInatividade";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Totem SENAI",
  description: "Software para o totem do SENAI Mariano Ferraz",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessao = await obterSessao();
  const ehVisitante = sessao?.funcao === "Visitante";

  return (
    <html lang="pt-BR" className={`${montserrat.variable} font-sans`}>
      <body className="h-full flex">
        {children}
        <Alertas />
        {ehVisitante && <DetectorInaividade />}
      </body>
    </html>
  );
}
