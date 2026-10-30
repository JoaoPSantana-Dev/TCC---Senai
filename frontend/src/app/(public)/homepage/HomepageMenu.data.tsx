import { rotasFixasTotem } from "@/lib/menuTotem";
import type { ComponentePagina } from "@/lib/paginas";

// conteúdo reserva da homepage
// a homepage vem do gerenciador de páginas, esses dados só aparecem se o servidor
// estiver fora do ar ou se a página "homepage" for apagada do banco de dados.
// a chave "icone" é uma das chaves de iconesMenu em ./components/CartaoMenu.tsx

export const tituloPadraoHomepage =
  "Bem-vindo ao totem do SENAI Mariano Ferraz!";

export const conteudoPadraoHomepage: ComponentePagina[] = rotasFixasTotem.map(
  ({ titulo, href, icone }) => ({
    type: "CartaoMenu",
    props: { titulo, href, icone },
  }),
);
