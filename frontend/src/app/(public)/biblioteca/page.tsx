import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { BibliotecaStatus } from "./components/BibliotecaStatus";
import Image from "next/image";

export default function Biblioteca() {
  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto='Biblioteca SENAI "Mariano Ferraz"'>
        <section className="my-8 w-full p-8 shadow-md bg-[#f9f9f9] lg:w-1/2 lg:rounded-2xl">
          <div className="text-justify text-base mb-4">
            <h1 className="text-xl font-semibold text-zinc-800 mb-4">
              Sobre a Biblioteca
            </h1>

            <p className="text-zinc-600 mb-4">
              As Bibliotecas da Faculdade Senai São Paulo têm por objetivo
              apoiar as atividades de ensino, pesquisa e extensão do seu corpo
              docente e discente promovendo o acesso às diversas fontes de
              informações, contribuindo assim, para a formação técnica e
              acadêmica de seus alunos.
            </p>

            <p className="text-zinc-600 mb-4">
              Os acervos reúnem livros técnicos, monografias, teses, periódicos,
              normas técnicas e recursos audiovisuais, nas áreas de Alimentos e
              Bebidas, Automotiva, Eletroeletrônica e Eletrônica, Gráfica,
              Mecânica, Metalurgia e Têxtil.
            </p>

            <p className="text-zinc-600 mb-4">
              Os clientes externos (comunidade em geral) somente poderão efetuar
              consultas e pesquisas no recinto das bibliotecas. Não será
              permitido a estes o empréstimo do acervo. O acesso de cliente
              externo está condicionado à prévia identificação na portaria da
              Unidade.
            </p>
          </div>

          <h1 className="text-xl font-semibold text-zinc-800 mt-15">
            Horário de Funcionamento
          </h1>

          <div className="text-justify text-base mb-4">
            <p className="text-zinc-600">
              Na segunda-feira a biblioteca funciona das 7h às 13h e 14h às 16h
            </p>
            <p className="text-zinc-600">
              De terça feira a sexta feira a biblioteca funciona das 7h às 13h e
              14h às 21h
            </p>
            <p className="text-zinc-600">Aos sábados funciona das 9h às 15h</p>
          </div>

          <div className="flex justify-center">
            <Image
              src={"/horario-biblioteca.jpg"}
              alt="Horário de funcionamento"
              width={500}
              height={100}
              className="h-auto w-1/2 object-contain border rounded-xl"
            />
          </div>

          <BibliotecaStatus />

          <h1 className="text-xl font-semibold text-zinc-800 mt-8 mb-4">
            Serviços Ofertados
          </h1>

          <h2 className="text-red-600 font-semibold">Empréstimos</h2>
          <p className="text-zinc-600 mb-4">
            Pode-se pegar até 3 livros na biblioteca, sendo no máximo 1 de
            literatura e 3 técnicos. O tempo de devolução depende do tipo de
            livro.
          </p>

          <h2 className="text-red-600 font-semibold">Softwares Disponíveis</h2>
          <p className="text-zinc-600 mb-2">
            Os computadores da biblioteca possuem softwares específicos para o
            aprendizado e treinamento dos alunos. A seguir um lista de alguns
            dos programas disponiveis:
          </p>

          <ul className="list-disc ml-10 mb-4">
            <li className="text-zinc-600 mb-1">Autocad 2D</li>
            <li className="text-zinc-600 mb-1">Visual Studio Code</li>
            <li className="text-zinc-600 mb-1">Pacote Microsoft Office</li>
            <li className="text-zinc-600 mb-1">Power BI</li>
            <li className="text-zinc-600 mb-1">Solid Works</li>
          </ul>

          <h2 className="text-red-600 font-semibold">Jogos e Atividades</h2>
          <p className="text-zinc-600 mb-2">
            A biblioteca disponibiliza alguns jogos de tabuleiro e atividades
            para os alunos, como:
          </p>

          <ul className="list-disc ml-10 mb-4">
            <li className="text-zinc-600 mb-1">Xadrez</li>
            <li className="text-zinc-600 mb-1">Damas</li>
            <li className="text-zinc-600 mb-1">Lig 4</li>
            <li className="text-zinc-600 mb-1">Quebra-Cabeças</li>
          </ul>

          <h2 className="text-red-600 font-semibold">Eventos</h2>
          <p className="text-zinc-600">
            A biblioteca realiza eventos durante o ano como a SELIBI, atividades
            culturais e palestras.
          </p>

          <h1 className="text-xl font-semibold text-zinc-800 mt-6">
            Serviços para Alunos de Graduação e Pós
          </h1>

          <ul className="list-disc ml-10 mt-2">
            <li className="text-zinc-600 mb-1">
              EBSCO: Serviço online de periódicos científicos.{" "}
            </li>
            <li className="text-zinc-600 mb-1">
              Pergamum: Pesquisa todos os acervos da rede de bibliotecas do
              SENAI São Paulo.{" "}
            </li>
            <li className="text-zinc-600 mb-1">
              Biblioteca Virtual Pearson: A Biblioteca Virtual Pearson está
              disponível para alunos da graduação e pós-graduação, para acessar
              solicite o acesso diretamente na Biblioteca do seu Campus.{" "}
            </li>
            <li className="text-zinc-600 mb-1">
              ABNTColeção: Serviço online para disseminação do uso de normas
              técnicas.
            </li>
            <li className="text-zinc-600 mb-1">
              Padronização ABNT: A biblioteca auxilia alunos a padronizar seus
              trabalhos de conclusão de curso na formatação ABNT.
            </li>
          </ul>

          <p className="text-justify font-semibold text-lg mt-10">
            Obs.: Para mais informações vá para a biblioteca e fale com um dos
            funcionários presentes.
          </p>
        </section>
      </Titulo>
    </EstruturaTotem>
  );
}
