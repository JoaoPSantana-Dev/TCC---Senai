import { FooterComponent } from "../../shared/footer.component";
import { HeaderAutenticacaoComponent } from "../shared/header-autenticacao.component";
import { ImagemAutenticacaoComponent } from "../shared/imagem-autenticacao.component";
import { EsqueciSenhaFormComponent } from "./esqueci-senha-form.component";

export function EsqueciSenhaComponent() {
  return (
    <>
      <main className="flex flex-1 flex-col md:flex-row">
        <ImagemAutenticacaoComponent
          nomeImagem="tubarao.png"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />

        <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
          <HeaderAutenticacaoComponent
            h1="Esqueceu a senha?"
            p="Insira sua nova senha e a confirme"
            className="mb-8"
          />

          <EsqueciSenhaFormComponent />
        </section>
      </main>

      <div className="mt-auto">
        {/* parte onde fica o rodapé */}
        <FooterComponent />
      </div>
    </>
  );
}
