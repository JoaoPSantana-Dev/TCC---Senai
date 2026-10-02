import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";
import { EstruturaVagasMenu } from "@/app/components/totem/shared/EstruturaVagasMenu";
import { Titulo } from "@/app/components/totem/shared/TituloTotem";
import { vagasEstagios } from "@/app/components/totem/vagas-estagios/VagasEstagios.data";

export default function VagasEmpregos() {
  return (
    <EstruturaTotem>
      <Titulo texto="Oportunidades de emprego">
        <EstruturaVagasMenu itens={vagasEstagios} />
      <section className="w-full mb-8 p-60 md:w-3/4 bg-red flex items-center justify-center rounded-2xl shadow-md">
        <div className="w-full p-4 bg-white min-h-[200px] rounded-2xl">
          <h1>Teste</h1>
        </div>
      </section>
      </Titulo>
    </EstruturaTotem>
  );
}
