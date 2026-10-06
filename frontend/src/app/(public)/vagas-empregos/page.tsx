import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import { Titulo } from "@/components/shared/TituloTotem";
import { vagasEmpregos } from "@/app/(public)/vagas-empregos/VagasEmpregos.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasEmpregos} />
      </Titulo>
    </EstruturaTotem>
  );
}
