import { HeaderAutenticacaoComponent } from "../shared/header-autenticacao.component";
import { EsqueciSenhaFormComponent } from "./esqueci-senha-form.component";

export function EsqueciSenhaComponent() {
  return (
    <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
      <HeaderAutenticacaoComponent
        h1="Esqueceu a senha?"
        p="Insira sua nova senha e a confirme"
        className="mb-8"
      />

      <EsqueciSenhaFormComponent />
    </section>
  );
}
