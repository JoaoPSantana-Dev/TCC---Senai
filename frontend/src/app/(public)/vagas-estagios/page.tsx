import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import { Titulo } from "@/components/shared/TituloTotem";
import { vagasEstagios } from "@/app/(public)/vagas-estagios/VagasEstagios.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasEstagios} />
      </Titulo>
    </EstruturaTotem>
  );
}
