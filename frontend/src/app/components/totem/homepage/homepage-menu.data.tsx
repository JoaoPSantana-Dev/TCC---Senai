import {
  Building03Icon,
  Briefcase01Icon,
  InfoIcon,
  LibraryBigIcon,
  MapsSearchIcon,
  Mortarboard02Icon,
  PermanentJobIcon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { type HugeiconsIconProps } from "@hugeicons/react";

// estrutura dos dados da página
export interface Pagina {
  titulo: string;
  href: string;
//  icone: HugeiconsIconProps["icon"];
}
const resposta = await fetch("http://localhost:3001/pegarPagina",{
      method: "GET",
      headers:{
        "Content-Type": "application/json",
      },
    });
const paginaLista=JSON.parse(JSON.stringify(resposta.json)); 
export const paginas:Pagina[]=[];
paginaLista.forEach((element: { nomePagina: any; idPagina: any; }) => {
  paginas.push({titulo:element.nomePagina,href:`pagina${element.idPagina}`});//melhorar href. usar o id é provisório
});
// estrutura das páginas que vão pro menu
/*export const paginas: Pagina[] = [
  {
    titulo: "Sobre o SENAI",
    href: "/sobre-senai",
    icone: InfoIcon,
  },
  {
    titulo: "Sobre o SENAI Mariano Ferraz",
    href: "/sobre-senai-mariano-ferraz",
    icone: Building03Icon,
  },
  {
    titulo: "Horário das aulas",
    href: "/horario-aulas",
    icone: Clock01Icon,
  },
  {
    titulo: "Mapa da escola",
    href: "/mapa-escola",
    icone: MapsSearchIcon,
  },
  {
    titulo: "Vagas de emprego",
    href: "/vagas-empregos",
    icone: Briefcase01Icon,
  },
  {
    titulo: "Vagas de estágio",
    href: "/vagas-estagios",
    icone: PermanentJobIcon,
  },
  {
    titulo: "Cursos",
    href: "/vagas-cursos",
    icone: Mortarboard02Icon,
  },
  {
    titulo: "Biblioteca",
    href: "/biblioteca",
    icone: LibraryBigIcon,
  },
];
*/