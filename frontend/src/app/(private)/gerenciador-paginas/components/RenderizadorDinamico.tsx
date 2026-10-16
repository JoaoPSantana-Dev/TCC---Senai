import type { ComponentePagina } from "@/lib/paginas";
import { registroComponentes } from "./registroComponentes";

export function RenderizadorDinamico({
  componente,
}: {
  componente: ComponentePagina;
}) {
  const definicao = registroComponentes[componente.type];

  if (!definicao) {
    return (
      <div>
        <p>Componente {componente.type} não registrado</p>
      </div>
    );
  }

  const RenderizarComponente = definicao.componente;

  return <RenderizarComponente {...componente.props} />;
}
