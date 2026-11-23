import { Titulo } from "@/components/shared/TituloTotem";
import Image from "next/image";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";



export default async function SobreMariano() {
    return (
        <EstruturaTotem mostrarNoticias={false}>
            <Titulo texto='SENAI Mariano Ferraz'>
                <section className="my-8 w-full p-8 shadow-md bg-[#f9f9f9] lg:w-1/2 lg:rounded-2xl items-center justify-center">
                    <div className="text-justify text-base mb-4">
                        <h1 className="text-xl font-semibold text-zinc-800 mb-4">
                            História 
                        </h1>
                        
                        <p className="text-zinc-600 mb-4">
                            Em 3 de novembro de 1943 o SENAI passa a atender a zona oeste de São Paulo, devido a um processo de transformação
                            econômica na região graças a chegada de grandes indústrias. Para atender a demanda de mão de obra o SENAI instalou
                            uma escola na rua Anastásio próxima à estação da Lapa.
                        </p>

                         
                        <p className="text-zinc-600 mb-4">
                            Porém, o aumento significativo no número de matrículas dessa unidade, que dificultou a execução eficaz de todos os 
                            seus trabalhos, fez com que, em 1949, fosse iniciada a construção de um novo prédio no local. Em 1959, a escola recebe
                            como patrono o engenheiro mecânico Mariano Jatahy Marcondes Ferraz e mudou seu nome para SENAI Mariano Ferraz. 

                        </p>

                        
                        <p className="text-zinc-600 mb-4"> 
                            Com o passar dos anos, com o aumento da industrialização e ampliação da zona de influência da escola, foi necessário
                            a transferência para instalações maiores em 1980 localizadas na região da Vila Leopoldina, o que permitiu aumentar em
                            cinco vezes o seu atendimento. A partir desse ponto a escola passou a oferecer uma grande gama de cursos de aprendizagem
                            industrial, qualificação técnica, aperfeiçoamento e especialização profissional.
                        </p>

                        <h1 className="text-xl font-semibold text-zinc-800 mb-4">
                            Áreas Atendidas e Cursos  
                        </h1>

                        <p className="text-zinc-600 mb-4"> 
                            A escola, apoiada em políticas educaionais eficientes, é resultado da ação integrada de professores, alunos, pais, 
                            funcionarios e coordenadores, e visa solucionar os problemas da indústria através da formação integral de jovens e adultos para atuarem
                            em diferentes segmentos industriais. 
                        </p>

                        <p className="text-red-600 mb-4"> 
                            As principais áreas atendidas por essa unidade são: 
                        </p>

                        <ul className="list-disc list-inside text-zinc-600 mb-4">
                            <li>Mecatrônica, Automação e Eletrônica</li>
                            <li>Metalmecânica e Fabricação Mecânica</li>
                            <li>Automotiva e Metroferroviária</li>
                            <li>Tecnologia da Informação e Indústria 4.0</li>
                            <li>Gestão, Logística e Segurança do Trabalho</li>
                        </ul>

                        <p className="text-zinc-600 mb-4"> 
                            Veja quais cursos podem ser realizado em nossa unidade:
                        </p>

                        
                        <h2 className="text-red-600 font-semibold">Cursos Livres</h2>
                        
                        <p className="text-zinc-600 mb-4"> 
                            Formação inicial e continuada, a partir de cursos de curta duração, para jovens e adultos que visam a qualificação, requalificação, 
                            aperfeiçoamento ou especialização nas áreas de: administração e gestão, alimentos e bebidas, construção civil, fabricação mecânica, 
                            logística e transporte, mecatrônica, mecânica automotiva, meio ambiente, saúde e segurança do trabalho, tecnologia da informação.
                        </p>

                        <h2 className="text-red-600 font-semibold">Cursos Técnicos</h2>
                        
                        <p className="text-zinc-600 mb-4"> 
                            Habilitações técnicas gratuitas em: administração e gestão, fabricação mecânica, mecatrônica, meio ambiente, saúde e segurança, 
                            tecnologia da informação.
                        </p>

                        <h2 className="text-red-600 font-semibold">Graduação</h2>
                        
                        <p className="text-zinc-600 mb-4"> 
                            Cursos superiores aprovados pelo MEC (Ministério da Educação e Cultura) em mecatrônica, sistemas de automação, energia e eletrônica.
                        </p>

                        <h2 className="text-red-600 font-semibold">Aprendiz SENAI</h2>
                        
                        <p className="text-zinc-600 mb-4"> 
                            Cursos gratuitos de aprendizagem nas áreas de administração e gestão, fabricação mecânica, logística e transporte, mecânica automotiva, mecatrônica.
                        </p>


                        <h1 className="text-xl font-semibold text-zinc-800 mb-4">
                            Além da Escola  
                        </h1>
                        
                        <p className="text-zinc-600 mb-4"> 
                            Além da escola, a estrutura da unidade também inclui a Faculdade Mariano Ferraz e o Instituto SENAI de Tecnologia em Eletrônica e Automação,
                            de onde é levado inovação e tecnologia para as empresas industriais, prestando assistência técnica e tecnológica através de uma ampla estrutura de 
                            laboratórios, pesquisadores e profissionais. 
                        </p>

                        



                    </div>
                </section>
            </Titulo>
        </EstruturaTotem>
    );

}