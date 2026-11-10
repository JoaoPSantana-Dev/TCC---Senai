import { buscarPaginaPorSlug } from "@/lib/paginas";
import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import { buscarItensMenu } from "@/lib/menuTotem";
import { ehAdministrador } from "@/lib/sessao";
import { conteudoPadraoHomepage } from "../homepage/HomepageMenu.data";

export default async function SobreSenai() {
    const administrador = await ehAdministrador();
    const [pagina, itensMenu] = await Promise.all([
        buscarPaginaPorSlug("sobre-senai"),
        buscarItensMenu(administrador),
    ]);

    return (
        <div>
          <Title>Sobre SENAI</Title>
    <p>SENAI (Serviço Nacional de Aprendizagem Industrial) é uma organização privada de interesse público cujo objetivo é suprir a mão de obra no estado do Brasil</p>
    <p>Missão: Promover o desenvolvimento sustentável do país, elevando a competitividade da indústria, por meio da educação profissional e da inovação e tecnologia</p>
    <ul>Visão
        <li>Ser reconhecido pela oferta de formação profissional de padrão global.</li>
        <li>Ser reconhecido como indutor da inovação e da tecnologia para a competitividade da indústria.</li>
        <li>Distinguir-se pela excelência dos seus serviços e dos seus processos.</li>
    </ul>
    <img src="conheca-senai.png"/>
    <p>Foi fundado em 22 de janeiro de 1942 sob decreto de Getúlio Vargas, e o diretor atual é Gustavo Leal Sales Filho. A filial de do estado de São Paulo é administrada por Paulo 
        Skaf desde de 2004. A ONU classificou o SENAI como uma das principais instituições educacionais no hemisfério sul. Atingiu grande crescimento: 1 milhão de matrículas anuais. 90 
        unidades distribuídas no estado de são paulo, 78 escolas móveis.</p>
    <p>Com o auxílio do setor industrial, o SENAI criou programas de educação para formar profissionais brasileiros e reduzir a dependência dos técnicos e produtos estrangeiros. O 
SENAI aplica conhecimento prático de profissionals em aprendizado formal, com objetivos claros. Seus cursos englobam uma ampla gama de conhecimentos industriais e para 
empreendedorismo. As escolas móveis permitem atender empresas em seus locais, specialmente aquelas distantes de unidades SENAI. Seus materiais didáticos são preparados e 
adaptados para as demandas dos cursos.</p>
    <img src="escola-movel.png"/>
    <p>Além de cursos, o SENAI contribui através de diversos projetos de pesquisa, desenvolvimento e inovação (PD&I). Possui programas para melhoria da produtividade e competitividade 
das empresas. Dentre eles, Programas de aceleração de startups, inovação aberta, intraempreendedorismo e fomento à cultura inovadora, atendendo empresas de todos os tamanhos e 
setores.</p>
    <p>Um grande projeto é a Jornada de Transformação Digital: um programa de consultoria e treinamento para diversas empresas de micro, pequeno e médio porte realizado pela
cooperação entre FIESP, CIESP, SENAI-SP e SEBRAE-SP.</p>
    <img src="jornada-digital-2.png"/>
    <p>Outro programa, o UpLab SENAI São Paulo é um ecossistema do SENAI cujo objetivo é facilitar a cooperação, competitividade e inovação de empresas, especialmente startups. Ele 
estimula a cultura intraempreendedora.</p>
        </div>
      );
}