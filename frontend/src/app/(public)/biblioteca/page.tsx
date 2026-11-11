
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { BibliotecaStatus } from "./components/BibliotecaStatus";

export default function Biblioteca() {
  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto='Biblioteca SENAI "Mariano Ferraz"'>
        <section className="my-8 w-full p-8 shadow-md bg-[#f9f9f9] lg:w-1/2 lg:rounded-2xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">      
            {/* <img
              src="/biblioteca.jpg"
              alt="Biblioteca da unidade"
              className="h-auto w-full object-cover"
            /> */}
          </div>
          
          <div className="text-justify text-base mb-4">

          <h1 className="text-lg font-bold mb-4">Sobre a Biblioteca</h1>

          <p>As Bibliotecas da Faculdade Senai São Paulo têm por objetivo apoiar as atividades de ensino, pesquisa e extensão do seu corpo docente e 
          discente promovendo o acesso às diversas fontes de informações, contribuindo assim, para a formação técnica e acadêmica de seus alunos.
          </p>

          <br/>

          <p>    
          Os acervos reúnem livros técnicos, monografias, teses, periódicos, normas técnicas e recursos audiovisuais, nas áreas de Alimentos e Bebidas, 
          Automotiva, Eletroeletrônica e Eletrônica, Gráfica, Mecânica, Metalurgia e Têxtil.
          </p>

          <br/>

          <p>     
            Os clientes externos (comunidade em geral) somente poderão efetuar consultas e pesquisas no recinto das bibliotecas. Não será permitido a estes 
            o empréstimo do acervo. O acesso de cliente externo está condicionado à prévia identificação na portaria da Unidade.
          </p>    
        </div>

          <h1 className="text-lg font-bold">Serviços Ofertados</h1>
          <br />

          <h2 className="text-red-600 font-bold">Empréstimos</h2>
          <p>Pode-se pegar até 3 livros na biblioteca, sendo no máximo 1 de literatura e 3 técnicos. O tempo de devolução depende do tipo de livro.</p>    
          
          <br/>

          <h2 className="text-red-600 font-bold">Softwares Disponíveis</h2>
          <p>Os computadores da biblioteca possuem softwares específicos para o aprendizado e treinamento dos alunos. A seguir um lista de alguns dos 
          programas disponiveis:</p>

          <ul className="list-disc ml-10 mt-2" >
            <li>Autocad 2D</li>
            <li>Visual Studio Code</li>
            <li>Pacote Microsoft Office</li>
            <li>Power BI</li>
            <li>Solid Works</li>
          </ul>

          <br/>    
          <h2 className="text-red-600 font-bold ">Jogos e Atividades</h2>
          <p> A biblioteca disponibiliza alguns jogos de tabuleiro e atividades para os alunos, como:</p>

          <ul className="list-disc ml-10 mt-2" >
            <li>Xadrez</li>
            <li>Damas</li>
            <li>Lig 4</li>
            <li>Quebra-Cabeças</li>
          </ul>    
          
          <br/>    
          <h2 className="text-red-600 font-bold ">Eventos</h2>
          <p>A biblioteca realiza eventos durante o ano como SELIBI, atividades culturais e palestras.</p>


          <br />    
          <h1 className="text-lg font-bold">Serviços para Alunos de Graduação e Pós</h1>

          <ul className="list-disc ml-10 mt-2" >
            <li>EBSCO: Serviço online de periódicos científicos. </li>
            <li>Pergamum: Pesquisa todos os acervos da rede de bibliotecas do SENAI São Paulo. </li>
            <li>Biblioteca Virtual Pearson: A Biblioteca Virtual Pearson está disponível para alunos da graduação e pós-graduação, para acessar solicite o acesso diretamente na Biblioteca do seu Campus. </li>
            <li>ABNTColeção: Serviço online para disseminação do uso de normas técnicas</li>
            <li>Padronização ABNT: A biblioteca auxilia os alunos a padronizarem seus trabalhos de conclusão de curso no padrão ABNT.</li>  
          </ul>   

          <br />    
          <h1 className="text-lg font-bold">Horário de Funcionamento</h1>
              
          <div className="text-justify text-base mb-4">    
          <p>Na segunda-feira a biblioteca funciona das 7h às 13h e 14h às 16h</p>
          <p>De terça feira a sexta feira a biblioteca funciona das 7h às 13h e 14h às 21h</p>
          <p>Aos sábados funciona das 9h às 15h</p>
          </div>    
          <br />
    
          <div className="flex justify-center">
          <img
            src="/HorarioBiblioteca.jpg"
            alt="Horario de Funcionamento"
            className="h-auto w-1/2 object-contain"
          ></img>    
          </div>
        
          <BibliotecaStatus />

          <br />

          <p className="text-justify font-bold text-lg">Obs.: Para mais informações vá para a biblioteca e fale com um dos funcionários presentes.</p>
        </section>
      </Titulo>
    </EstruturaTotem>
  );
}