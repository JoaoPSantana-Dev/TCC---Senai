import {
  Briefcase01Icon,
  Building03Icon,
  ClipboardCheckIcon,
} from "@hugeicons/core-free-icons";
import { type Vaga } from "../shared/estrutura-vagas-menu.data";

const resposta= await fetch("http://localhost:3001/vagaEmprego",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
      },
    });

const vagaLista= await resposta.json(); 
export const vagasEmpregos:Vaga[]=[];
vagaLista.forEach((element: {nomeEmpresa: any,cargo:any,idEmprego:any}) => {
  vagasEmpregos.push({titulo:`${element.nomeEmpresa}-${element.cargo}`,href:`emprego${element.idEmprego}`,icone:Briefcase01Icon});
});

/*
export const vagasEmpregos: Vaga[] = [
  {
    titulo: "Assistente de Vendas",
    href: "/vagas/assistente-vendas",
    icone: Briefcase01Icon,
  },
  {
    titulo: "Supervisor de Produção",
    href: "/vagas/supervisor-producao",
    icone: Building03Icon,
  },
  {
    titulo: "Recepcionista",
    href: "/vagas/recepcionista",
    icone: ClipboardCheckIcon,
  },
];*/
