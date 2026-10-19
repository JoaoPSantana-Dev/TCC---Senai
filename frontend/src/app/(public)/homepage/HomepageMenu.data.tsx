import type { ComponentePagina } from "@/lib/paginas";

// conteúdo reserva da homepage
// a homepage vem do gerenciador de páginas, esses dados só aparecem se o servidor
// estiver fora do ar ou se a página "homepage" for apagada do banco de dados.
// a chave "icone" é uma das chaves de iconesMenu em ./components/CartaoMenu.tsx

export const tituloPadraoHomepage =
  "Bem-vindo ao totem do SENAI Mariano Ferraz!";

export const conteudoPadraoHomepage: ComponentePagina[] = [
  {
    type: "CartaoMenu",
    props: { titulo: "Sobre o SENAI", href: "/sobre", icone: "info" },
  },
  {
    type: "CartaoMenu",
    props: {
      titulo: "Sobre o SENAI Mariano Ferraz",
      href: "/sobre-senai-mariano-ferraz",
      icone: "predio",
    },
  },
  {
    type: "CartaoMenu",
    props: {
      titulo: "Horário das aulas",
      href: "/horario-aulas",
      icone: "relogio",
    },
  },
  {
    type: "CartaoMenu",
    props: { titulo: "Mapa da escola", href: "/mapa", icone: "mapa" },
  },
  {
    type: "CartaoMenu",
    props: {
      titulo: "Vagas de emprego",
      href: "/vagas-empregos",
      icone: "emprego",
    },
  },
  {
    type: "CartaoMenu",
    props: {
      titulo: "Vagas de estágio",
      href: "/vagas-estagios",
      icone: "estagio",
    },
  },
  {
    type: "CartaoMenu",
    props: { titulo: "Cursos", href: "/vagas-cursos", icone: "curso" },
  },
  {
    type: "CartaoMenu",
    props: { titulo: "Biblioteca", href: "/biblioteca", icone: "biblioteca" },
  },
  {
    type: "CartaoMenu",
    props: { titulo: "Logout", href: "/logout", icone: "biblioteca" },
  },
];
