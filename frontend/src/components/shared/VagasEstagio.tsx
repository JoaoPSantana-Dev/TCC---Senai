import { PainelVagas } from "./PainelVagas";
import type { ConfigPainel } from "@/lib/painelVagas";

const config: ConfigPainel = {
  caminho: "/vagas-estagio",
  campoId: "idEstagio",
  campoTitulo: "cargo",
  campoMarca: "nomeEmpresa",
  meta: [
    { campo: "nomeEmpresa", icone: "empresa" },
    { campo: "localizacao", icone: "local" },
  ],
  campoDestaque: "salario",
  campoArea: "areaEstagio",
  detalhes: [
    { rotulo: "Descrição", campo: "descricao" },
    { rotulo: "Requisitos", campo: "requisitos" },
    { rotulo: "Benefícios", campo: "beneficios" },
    { rotulo: "Contato", campo: "contato" },
  ],
  nomeSingular: "vaga",
  nomePlural: "vagas",
  textoVazio: "Nenhuma vaga de estágio cadastrada no momento.",
};

// vagas de estágio, vindas do banco
// GET /vagas-estagio
export function VagasEstagio() {
  return <PainelVagas config={config} />;
}
