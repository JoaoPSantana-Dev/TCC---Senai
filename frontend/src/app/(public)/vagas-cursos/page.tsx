import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import { Titulo } from "@/components/shared/TituloTotem";
import { vagasCursos } from "@/app/(public)/vagas-cursos/VagasCursos.data";

export default function VagasCursos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasCursos} />
      </Titulo>
    </EstruturaTotem>
  );
}
