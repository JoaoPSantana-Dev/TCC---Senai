import { CadastroFormComponent } from "@/app/components/administrador/cadastro/cadastro-form.component";
import { EstruturaAdministradorPublicComponent } from "@/app/components/administrador/shared/estrutura-administrador-public.component";
import { HeaderAutenticacaoComponent } from "@/app/components/administrador/shared/header-autenticacao.component";

export default function Cadastro() {
  return (
    <EstruturaAdministradorPublicComponent>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacaoComponent
          h1="Cadastro"
          p="Cadastre seu usuário usando o email e senha do SENAI"
          className="mb-8"
        />
        <CadastroFormComponent />
      </section>
    </EstruturaAdministradorPublicComponent>
  );
}
