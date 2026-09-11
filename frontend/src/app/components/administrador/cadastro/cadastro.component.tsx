import { HeaderAutenticacaoComponent } from "../shared/header-autenticacao.component";
import { CadastroFormComponent } from "./cadastro-form.component";

export function CadastroComponent() {
  return (
    <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
      <HeaderAutenticacaoComponent
        h1="Cadastro"
        p="Cadastre seu usuário usando o email e senha do SENAI"
        className="mb-8"
      />

      <CadastroFormComponent />
    </section>
  );
}
