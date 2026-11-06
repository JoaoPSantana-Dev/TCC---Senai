import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import { buscarPaginaPorSlug, type ComponentePagina } from "@/lib/paginas";

// conteúdo reserva, a tela de descanso é a primeira coisa que o totem mostra,
// então ela nunca pode ficar em branco se o servidor tiver fora do ar
const conteudoPadrao: ComponentePagina[] = [
  {
    type: "TelaDescanso",
    props: {
      titulo: "Bem-vindo ao SENAI Mariano Ferraz!",
      nomeImagem: "senai-logo.png",
      alt: "Imagem do logo SENAI",
      textoBotao: "Clique para começar",
      destino: "/homepage",
    },
  },
];

export default async function TelaDescanso() {
  const pagina = await buscarPaginaPorSlug("descanso");
  const conteudo = pagina?.conteudo ?? conteudoPadrao;

  return (
    <PaginaRenderizada
      slug="descanso"
      nomePagina="Descanso"
      conteudo={conteudo}
    />
  );
}
