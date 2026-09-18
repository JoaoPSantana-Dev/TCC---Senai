import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/app/components/totem/shared/EstruturaVagasMenu";
import { Titulo } from "@/app/components/totem/shared/Titulo";
import { vagasEstagios } from "@/app/components/totem/vagas-estagios/VagasEstagios.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasEstagios} />
      </Titulo>
    </EstruturaTotem>
  );
}
