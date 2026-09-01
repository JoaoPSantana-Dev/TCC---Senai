import { FooterComponent } from "../../shared/footer.component";
import { ImagemAutenticacaoComponent } from "../shared/imagem-autenticacao.component";
import { CadastroFormComponent } from "./cadastro-form.component";

export function CadastroComponent() {
  return (
    <>
      <main className="flex flex-1 flex-col md:flex-row">
        <ImagemAutenticacaoComponent
          nomeImagem="tubarao.png"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />

        <CadastroFormComponent />
      </main>

      <div className="mt-auto">
        {/* parte onde fica o rodapé */}
        <FooterComponent />
      </div>
    </>
  );
}
