import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/app/components/totem/shared/EstruturaVagasMenu";
import { Titulo } from "@/app/components/totem/shared/TituloTotem";
import { vagasEmpregos } from "@/app/components/totem/vagas-empregos/VagasEmpregos.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasEmpregos} />
      </Titulo>
    </EstruturaTotem>
  );
}
