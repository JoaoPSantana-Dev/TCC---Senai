import { PainelVagas } from "./PainelVagas";
import type { ConfigPainel } from "@/lib/painelVagas";

const config: ConfigPainel = {
  caminho: "/vagas-estagio",
  campoTitulo: "cargo",
  destaques: [
    { rotulo: "Empresa", campo: "nomeEmpresa" },
    { rotulo: "Cargo", campo: "cargo" },
  ],
  detalhes: [
    { rotulo: "Requisitos", campo: "requisitos" },
    { rotulo: "Salário", campo: "salario" },
    { rotulo: "Benefícios", campo: "beneficios" },
    { rotulo: "Descrição", campo: "descricao" },
    { rotulo: "Localização", campo: "localizacao" },
    { rotulo: "Contato", campo: "contato" },
    { rotulo: "Área da vaga", campo: "areaEstagio" },
  ],
  textoSelecionar: "Selecione uma vaga para visualizar sua descrição.",
  textoVazio: "Nenhuma vaga de estágio cadastrada no momento.",
};

// vagas de estágio, vindas do banco
// GET /vagas-estagio
export function VagasEstagio() {
  return <PainelVagas config={config} />;
}
