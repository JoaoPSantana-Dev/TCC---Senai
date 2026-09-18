import { EstruturaTotem } from "@/app/components/totem/shared/EstruturaTotem";
import { Titulo } from "@/app/components/totem/shared/TituloTotem";
import { LinhaSobre } from "@/app/components/totem/sobre/LinhaSobre";

export default function Sobre() {
  return (
    <EstruturaTotem mostrarNoticias={false}>
      <main className="w-full flex-1">
        <Titulo texto="Sobre o SENAI Mariano Ferraz" />
        <div className="mx-auto max-w-6xl w-full p-6 md:p-12 flex flex-col justify-center">
          <section className="flex flex-col gap-6 w-full">
            <LinhaSobre
              texto="Bom dia"
              nomeImagem="senai-mariano-ferraz.png"
              alt="Imagem SENAI"
              primeiroEstilo={true}
            />

            <LinhaSobre
              texto="Boa tarde"
              nomeImagem="senai-mariano-ferraz.png"
              alt="Imagem SENAI"
              primeiroEstilo={false}
            />

            <LinhaSobre
              texto="Boa noite"
              nomeImagem="senai-mariano-ferraz.png"
              alt="Imagem SENAI"
              primeiroEstilo={true}
            />
          </section>
        </div>
      </main>
    </EstruturaTotem>
  );
}
