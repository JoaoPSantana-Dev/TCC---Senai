import { Titulo } from "@/components/shared/TituloTotem";
import Image from "next/image";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";


export default async function SobreSenai() {
    return (
        <EstruturaTotem mostrarNoticias={false}>
            <Titulo texto='Serviço Nacional de Aprendizagem Industrial'>
                <section className="my-8 w-full p-8 shadow-md bg-[#f9f9f9] lg:w-1/2 lg:rounded-2xl items-center justify-center">
                    <div className="text-justify text-base mb-4">
                        <h1 className="text-xl font-semibold text-zinc-800 mb-4">
                            Indrodução
                        </h1>

                        <p className="text-zinc-600 mb-4">
                            O Serviço Nacional de Aprendizagem Industrial(SENAI) é uma organização privada
                            de interesse público cujo objetivo é promover a educação profissional e tecnológica
                            ,a inovação e a transferência de tecnologias para elevar a competitividade da indústria
                            brasileira e suprir a necessidade nacional de mão de obra qualificada para o mercado industrial.
                        </p>

                        <h1 className=" text-xl font-semibold text-zinc-800 mb-4">
                            Identidade Organizacional
                        </h1>

                        <p className="text-zinc-600 mb-4">
                            A identidade organizacional é o conjunto de características centrais, duradouras e distintivas
                            que definem quem é uma empresa, no que ela acredita e qual a sua razão de existir, funcionando como
                            uma "bússola" que orienta o comportamento dos colaboradores e suas decisões do negócio.
                        </p>


                        <p className="text-zinc-600 mb-4">
                            Ela é muito associada com três itens centrais: Missão que é o propósito da organização; Visão que é o grande objetivo a longo prazo da empresa, e;
                            Valores que são os príncipios éticos e morais que guiam o comportamento, decisões e atitudes dos membros da empresa.
                        </p>


                        <h2 className="text-red-600 font-semibold">Missão</h2>
                        <p className="text-zinc-600 mb-4">
                            Promover o desenvolvimento sustentável do país, elevando a competitividade da indústria,
                            por meio da educação profissional e da inovação e tecnologia
                        </p>

                        <h2 className="text-red-600 font-semibold">Visão</h2>
                        <ul className="list-disc list-inside text-zinc-600 mb-4">
                            <li>Ser reconhecido pela oferta de formação profissional de padrão global.</li>
                            <li>Ser reconhecido como indutor da inovação e da tecnologia para a competitividade da indústria.</li>
                            <li>Distinguir-se pela excelência dos seus serviços e dos seus processos.</li>
                        </ul>


                        <h2 className="text-red-600 font-semibold">Valores</h2>
                        <ul className="list-disc list-inside text-zinc-600 mb-4">
                            <li>Credibilidade e Integridade</li>
                            <li>Compromisso e Disciplina</li>
                            <li>Diversidade e Inclusão</li>
                            <li>Excelência e Inovação</li>
                            <li>Agilidade e Responsabilidade</li>

                        </ul>

                        <h1 className=" text-xl font-semibold text-zinc-800 mb-4">
                            História
                        </h1>

                        <p className="text-zinc-600 mb-4">
                            Foi fundado em 22 de janeiro de 1942 sob decreto de Getúlio Vargas. Sua criação ocorreu em um período de
                            crescimento da insústria brasileira, quando havia uma grande necessidade de profissionais qualificados, pois
                            na época a grande maioria da mão de obra para serviços industriais eram imigrantes europeus.
                        </p>

                        <p className="text-zinc-600 mb-4">
                            Ao longo dos anos, o SENAI expandiu sua atuação, oferecendo cursos de aprendizagem industrial e qualificações
                            profissionais, cursos técnicos e de formação tecnológica. Além da educação, passou a investir em inovação, pesquisa
                            e desenvolvimento de novas tecnologias.
                        </p>


                        <p className="text-zinc-600 mb-4">
                            Atualmente, o SENAI é classificado como uma das principais instituições educacionais no hemisfério sul pela ONU, participando de inúmeras competições
                            nacionais e internacionais de conhecimentos técnicos como a "World Skills". A organização possui 515 escolas no Brasil e 519 unidades móveis, sendo 90 escolas
                            e 78 unidades móveis distríbuidas pelo estado de São Paulo.
                        </p>

                        
                        <h1 className=" text-xl font-semibold text-zinc-800 mb-4">
                            Outros Projetos
                        </h1>

                        <p className="text-zinc-600 mb-4 ">
                            Além da parte educacional, o SENAI contribui em diversos projetos de pesquisa, desenvolvimento e inovação. Possui programas para a melhoria da produtividade
                            e competitividade de empresas. Dentre eles, programas aceleradores de startups, inovação aberta, intraempreendedorismo e fomento à cultura inovadora, atendendo
                            empresas de todos os tamanhos e setores.
                        </p>
                    </div>
                </section>
            </Titulo>
        </EstruturaTotem>
    );

}