import {
  Briefcase01Icon,
  Building03Icon,
  ClipboardCheckIcon,
} from "@hugeicons/core-free-icons";
import { type Vaga } from "../shared/estrutura-vagas-menu.data";

const resposta= await fetch("http://localhost:3001/vaga-emprego",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
      },
    });
const inter=await resposta.json();
const vagaLista= Array.from(inter); 
export const vagasEmpregos:Vaga[]=[];
vagaLista.forEach((element: {idEmprego:any,nomeEmpresa: any,cargo:any}) => {
  vagasEmpregos.push({titulo:`${element.nomeEmpresa}-${element.cargo}`,href:`emprego${element.idEmprego}`,icone:Briefcase01Icon});
});

//element: {idEmprego:any,nomeEmpresa: any,cargo:any,requisitos:any,salario:any,requisitos:any,descricao:any,localizacao:any,contato:any,areaEmprego:any,beneficios:any}
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
