import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/app/components/totem/shared/EstruturaVagasMenu";
import { Titulo } from "@/app/components/totem/shared/Titulo";
import { vagasCursos } from "@/app/components/totem/vagas-cursos/VagasCursos.data";

export default function VagasCursos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasCursos} />
      </Titulo>
    </EstruturaTotem>
  );
}
